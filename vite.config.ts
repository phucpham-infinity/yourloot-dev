import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function swetrixConditionalPlugin(env: any) {
  return {
    name: 'swetrix-conditional',
    transformIndexHtml(html: string) {
      if (env.VITE_APP_MODE !== 'production') {
        html = html.replace(
          /<!-- SWETRIX_ANALYTICS_START -->[\s\S]*?<!-- SWETRIX_ANALYTICS_END -->/g,
          ''
        )
        html = html.replace(
          /<!-- Matomo -->[\s\S]*?<!-- End Matomo Code -->/g,
          ''
        )
        html = html.replace(
          /<!-- Matomo Tag Manager -->[\s\S]*?<!-- End Matomo Tag Manager -->/g,
          ''
        )
      }
      return html
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const sentryEnabled =
    !!env.SENTRY_AUTH_TOKEN &&
    !!env.SENTRY_ORG &&
    !!env.SENTRY_PROJECT &&
    env.VITE_APP_MODE === 'production'

  return {
    define: {
      global: 'globalThis'
    },
    plugins: [
      react(),
      tailwindcss(),
      swetrixConditionalPlugin(env),
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './dist/**'
        },
        release: {
          name:
            env.VERCEL_GIT_COMMIT_SHA ||
            env.SENTRY_RELEASE ||
            process.env.npm_package_version
        },
        disable: !sentryEnabled,
        telemetry: false
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: Number(env.VITE_PORT) || 4200,
      open: true,
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '.lhr.life'],
      proxy: {
        '/api': {
          target: 'https://api.yourloot.online',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      devSourcemap: true
    },
    build: {
      sourcemap: true
    }
  }
})
