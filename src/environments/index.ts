export const environments = {
  appMode: import.meta.env.VITE_APP_MODE,
  apiConfig: {
    scopes: import.meta.env.VITE_API_CONFIG_SCOPES,
    uri: import.meta.env.VITE_API_CONFIG_URI,
    timeout: 10000
  }
}
