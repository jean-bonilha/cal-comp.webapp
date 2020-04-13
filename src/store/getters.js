const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isAuthenticated = state => state.auth.isAuthenticated

export {
  config,
  palette,
  isLoading,
  isAuthenticated,
}
