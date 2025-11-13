#!/usr/bin/env bash
set -euo pipefail

# release.sh — Automate release branch creation and trigger GitLab pipeline
#
# Features:
# - Ensures latest dev branch is checked out locally
# - Creates and pushes a new release.{N} branch where N auto-increments from existing release.* branches on origin
# - Triggers a GitLab pipeline for the new release branch via API
#
# Usage examples:
#   chmod +x scripts/release.sh
#   scripts/release.sh
#   scripts/release.sh --force
#   GITLAB_PERSONAL_ACCESS_TOKEN=xxxxx GITLAB_PROJECT_ID=12345 scripts/release.sh
#   GITLAB_TRIGGER_TOKEN=xxxx GITLAB_PROJECT_ID=12345 scripts/release.sh
#   GITLAB_API_URL=https://gitlab.mycorp.example/api/v4 GITLAB_PROJECT_PATH=mygroup/myproj \
#     GITLAB_PERSONAL_ACCESS_TOKEN=xxxxx scripts/release.sh --dry-run
#
# Environment variables:
#   GIT_REMOTE                 Git remote to use (default: origin)
#   DEV_BRANCH                 Dev branch name (default: dev)
#   RELEASE_PREFIX             Prefix for release branches (default: release.)
#   GITLAB_API_URL             GitLab API base (default: https://gitlab.com/api/v4)
#   GITLAB_PROJECT_ID          GitLab project ID (numeric) OR
#   GITLAB_PROJECT_PATH        GitLab project path (e.g., group/subgroup/project); will be URL-encoded
#   GITLAB_PERSONAL_ACCESS_TOKEN  Personal Access Token for standard pipeline creation
#   PRIVATE_TOKEN              Alias for GITLAB_PERSONAL_ACCESS_TOKEN
#   GITLAB_TRIGGER_TOKEN       Trigger token for Triggered Pipelines API (alternative to personal token)
#
# Flags:
#   --force     Proceed even if the working tree is dirty (will stash and restore)
#   --dry-run   Show what would be done without making changes (no push, no API calls)
#   -v|--verbose  Verbose logging

REMOTE=${GIT_REMOTE:-origin}
DEV_BRANCH=${DEV_BRANCH:-dev}
RELEASE_PREFIX=${RELEASE_PREFIX:-release.}
API_URL=${GITLAB_API_URL:-https://gitlab.com/api/v4}
FORCE=false
DRY_RUN=false
VERBOSE=false

log() { echo "[release] $*"; }
logv() { if [ "$VERBOSE" = true ]; then echo "[release][v] $*"; fi }
fail() { echo "[release][error] $*" >&2; exit 1; }

urlencode() {
  # URL-encode a string
  local LANG=C
  local length="${#1}"
  for (( i = 0; i < length; i++ )); do
    local c=${1:i:1}
    case $c in
      [a-zA-Z0-9.~_-]) printf '%s' "$c" ;;
      *) printf '%%%02X' "'\''$c" ;;  # shellcheck disable=SC printf semantics
    esac
  done
}

while (( "$#" )); do
  case "$1" in
    --force) FORCE=true ;;
    --dry-run) DRY_RUN=true ;;
    -v|--verbose) VERBOSE=true ;;
    -h|--help)
      sed -n '1,80p' "$0"
      exit 0
      ;;
    *) fail "Unknown argument: $1" ;;
  esac
  shift
done

# Validate git is available
command -v git >/dev/null 2>&1 || fail "git is required"
command -v curl >/dev/null 2>&1 || log "curl not found; pipeline trigger will fail unless installed"

# Ensure we are inside a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  fail "This script must be run inside a git repository"
fi

# Check working tree state
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  if [ "$FORCE" = true ]; then
    log "Working tree is dirty; stashing changes due to --force"
    git stash push -u -m "release.sh auto-stash $(date +%Y-%m-%dT%H:%M:%S)" >/dev/null
    STASHED=true
  else
    fail "Working tree has uncommitted changes. Commit, stash, or use --force to proceed."
  fi
fi

restore_stash() {
  if [ "$STASHED" = true ]; then
    log "Restoring stashed changes"
    git stash pop >/dev/null || log "No stash to pop or merge conflicts occurred; please resolve manually."
  fi
}
trap restore_stash EXIT

# Fetch latest from remote
log "Fetching from $REMOTE"
 git fetch "$REMOTE" --prune

# Ensure dev exists on remote
if ! git show-ref --verify --quiet "refs/remotes/$REMOTE/$DEV_BRANCH"; then
  fail "Remote branch $REMOTE/$DEV_BRANCH not found"
fi

# Checkout and update dev
log "Checking out $DEV_BRANCH and syncing with $REMOTE/$DEV_BRANCH"
if git show-ref --verify --quiet "refs/heads/$DEV_BRANCH"; then
  git checkout "$DEV_BRANCH"
else
  git checkout -b "$DEV_BRANCH" "$REMOTE/$DEV_BRANCH"
fi

git reset --hard "$REMOTE/$DEV_BRANCH"

# Determine next release number from remote branches
log "Determining next release number from $REMOTE"
# List release.* branches from remote and extract the trailing integer
RELEASE_PATTERN="^\s*remotes/$REMOTE/${RELEASE_PREFIX}([0-9]+)$"
nums=$(git branch -a | sed 's#\* ##' | grep -E "remotes/$REMOTE/${RELEASE_PREFIX}[0-9]+$" | sed -E "s#^\s*remotes/$REMOTE/${RELEASE_PREFIX}([0-9]+)$#\1#")

next=1
if [ -n "$nums" ]; then
  max=$(echo "$nums" | awk 'BEGIN{max=0} {if($1>max) max=$1} END{print max}')
  next=$((max + 1))
fi

NEW_BRANCH="${RELEASE_PREFIX}${next}"
log "Next release branch will be: $NEW_BRANCH"

# Create the release branch from current dev
if git show-ref --verify --quiet "refs/heads/$NEW_BRANCH"; then
  fail "Local branch $NEW_BRANCH already exists; aborting to avoid confusion"
fi

if [ "$DRY_RUN" = true ]; then
  log "[DRY-RUN] Would create branch $NEW_BRANCH from $DEV_BRANCH and push to $REMOTE"
else
  git checkout -b "$NEW_BRANCH" "$DEV_BRANCH"
  log "Pushing $NEW_BRANCH to $REMOTE"
  git push -u "$REMOTE" "$NEW_BRANCH"
fi

# Trigger GitLab pipeline
PROJECT_ID_OR_PATH="${GITLAB_PROJECT_ID:-}"
if [ -z "$PROJECT_ID_OR_PATH" ] && [ -n "${GITLAB_PROJECT_PATH:-}" ]; then
  PROJECT_ID_OR_PATH=$(urlencode "$GITLAB_PROJECT_PATH")
fi

PERSONAL_TOKEN="${GITLAB_PERSONAL_ACCESS_TOKEN:-${PRIVATE_TOKEN:-}}"
TRIGGER_TOKEN="${GITLAB_TRIGGER_TOKEN:-}"

if [ -z "$PERSONAL_TOKEN" ] && [ -z "$TRIGGER_TOKEN" ]; then
  log "No GitLab token provided; skipping pipeline trigger. Set GITLAB_PERSONAL_ACCESS_TOKEN or GITLAB_TRIGGER_TOKEN to enable."
  exit 0
fi

if [ -z "$PROJECT_ID_OR_PATH" ]; then
  log "GITLAB_PROJECT_ID or GITLAB_PROJECT_PATH not set; skipping pipeline trigger."
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  log "curl is not installed; cannot trigger GitLab pipeline."
  exit 0
fi

if [ "$DRY_RUN" = true ]; then
  log "[DRY-RUN] Would trigger GitLab pipeline for ref $NEW_BRANCH on project $PROJECT_ID_OR_PATH via $API_URL"
  exit 0
fi

log "Triggering GitLab pipeline for $NEW_BRANCH"
if [ -n "$PERSONAL_TOKEN" ]; then
  # Standard pipeline creation API
  resp=$(curl -sS -X POST \
    -H "PRIVATE-TOKEN: $PERSONAL_TOKEN" \
    --data-urlencode "ref=$NEW_BRANCH" \
    "$API_URL/projects/$PROJECT_ID_OR_PATH/pipeline") || fail "Failed to call GitLab API"
  logv "GitLab response: $resp"
  # Try to extract web_url/id if present
  url=$(echo "$resp" | sed -n 's/.*"web_url"\s*:\s*"\([^"]*\)".*/\1/p')
  id=$(echo "$resp" | sed -n 's/.*"id"\s*:\s*\([0-9][0-9]*\).*/\1/p')
  if [ -n "$url" ]; then
    log "Pipeline created: $url (id: ${id:-unknown})"
  else
    log "Pipeline trigger attempted; see response above."
  fi
elif [ -n "$TRIGGER_TOKEN" ]; then
  # Trigger pipelines API (requires a project-level trigger token)
  resp=$(curl -sS -X POST \
    --data-urlencode "token=$TRIGGER_TOKEN" \
    --data-urlencode "ref=$NEW_BRANCH" \
    "$API_URL/projects/$PROJECT_ID_OR_PATH/trigger/pipeline") || fail "Failed to call GitLab Trigger API"
  logv "GitLab response: $resp"
  url=$(echo "$resp" | sed -n 's/.*"web_url"\s*:\s*"\([^"]*\)".*/\1/p')
  id=$(echo "$resp" | sed -n 's/.*"id"\s*:\s*\([0-9][0-9]*\).*/\1/p')
  if [ -n "$url" ]; then
    log "Pipeline triggered: $url (id: ${id:-unknown})"
  else
    log "Pipeline trigger attempted; see response above."
  fi
fi

log "Done."