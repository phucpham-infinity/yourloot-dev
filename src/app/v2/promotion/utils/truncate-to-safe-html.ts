export function toTruncatedSafeHtml(html: string, max = 110): string {
  const allowedInlineTags = new Set(['b', 'strong', 'i', 'em'])

  type Token =
    | { type: 'text'; value: string }
    | { type: 'br' }
    | { type: 'open'; tag: 'b' | 'strong' | 'i' | 'em' }
    | { type: 'close'; tag: 'b' | 'strong' | 'i' | 'em' }

  const tokens: Token[] = []

  const source = String(html || '')

  const regex = /(<\/?[^>]+>)/g
  const parts = source.split(regex)

  for (const part of parts) {
    if (!part) continue
    if (part.startsWith('<') && part.endsWith('>')) {
      const tagNameMatch = part.match(/^<\/?\s*([a-zA-Z0-9]+)/)
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : ''

      // Handle line breaks and block separators as <br/>
      if (
        tagName === 'br' ||
        part.toLowerCase() === '</p>' ||
        part.toLowerCase() === '</div>' ||
        part.toLowerCase() === '</li>'
      ) {
        tokens.push({ type: 'br' })
        continue
      }

      // Keep only a whitelist of simple inline formatting tags (without attributes)
      if (allowedInlineTags.has(tagName as any)) {
        if (part.startsWith('</')) {
          tokens.push({ type: 'close', tag: tagName as any })
        } else {
          tokens.push({ type: 'open', tag: tagName as any })
        }
        continue
      }

      // Ignore all other tags/attributes for safety
      continue
    }

    // Plain text
    tokens.push({ type: 'text', value: part })
  }

  // Build truncated output, counting only text characters
  let remaining = Math.max(0, max)
  const openStack: Array<'b' | 'strong' | 'i' | 'em'> = []
  let output = ''

  const escapeText = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;')

  for (const token of tokens) {
    if (remaining <= 0) break
    if (token.type === 'text') {
      if (!token.value) continue
      const slice = token.value.slice(0, remaining)
      output += escapeText(slice)
      remaining -= slice.length
      if (remaining <= 0) break
    } else if (token.type === 'br') {
      output += '<br/>'
    } else if (token.type === 'open') {
      openStack.push(token.tag)
      output += `<${token.tag}>`
    } else if (token.type === 'close') {
      // Close only if it matches the latest opened tag
      const idx = openStack.lastIndexOf(token.tag)
      if (idx !== -1) {
        // Close any nested tags above it to maintain order
        while (openStack.length - 1 >= idx) {
          const closed = openStack.pop()!
          output += `</${closed}>`
        }
      }
    }
  }

  // If we truncated early, add ellipsis
  if (remaining <= 0) {
    output += '...'
  }

  // Close any remaining open tags in reverse order
  while (openStack.length) {
    const tag = openStack.pop()!
    output += `</${tag}>`
  }

  return output
}
