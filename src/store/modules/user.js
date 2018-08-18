export default {
  state: {
    userData: localStorage.userData ? JSON.parse(localStorage.userData) : null,
    hasModPassword: true,
  },
  mutations: {
    SET_USER_DATA: (state, userData) => {
      userData.lastLoginTime = Date.now();
      localStorage.userData = JSON.stringify(userData);
      state.userData = userData;
    },
    LOGOUT_USER: state => {
      state.userData = null;
      localStorage.clear()
    }
  },
  actions: {
    loginSuccess({ commit }, data) {
      commit('SET_USER_DATA', data);
    },
    userLogout({ commit }, flag) {
      commit('LOGOUT_USER')
    }
  }
}
