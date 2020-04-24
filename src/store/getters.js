const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isAuthenticated = state => state.auth.isAuthenticated
const user = state => state.auth.user
const userName = state => state.auth.user.name

export {
  config,
  palette,
  isLoading,
  isAuthenticated,
  user,
  userName,
}
