const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews.slice(-7),
  userData: state => state.user.userData,
  token: state => state.user.userData && state.user.userData.token,
  hasModPassword: state => state.user.hasModPassword,
}
export default getters
