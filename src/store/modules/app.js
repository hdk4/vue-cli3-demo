import Cookies from 'js-cookie'

const getIndex = (cur, list) => {
  for (const [i, v] of list.entries()) {
    if (v.path === cur.path) {
      return i
    }
  }
  return -1;
}

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.set('sidebarStatus')
    },
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      let curIndex = getIndex(view, state.visitedViews)
      let showIndex = getIndex(view, state.visitedViews.slice(-7))

      if (curIndex > -1) {
        if (showIndex === -1) {
          // 确保添加的视图在可见范围
          state.visitedViews.splice(curIndex, 1)
          state.visitedViews.push({ name: view.meta.title, path: view.path })
        }
      } else {
        state.visitedViews.push({ name: view.meta.title, path: view.path })
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index = getIndex(view, state.visitedViews)
      state.visitedViews.splice(index, 1)
    },
    CLEAR_EDIT_ADD: (state, type) => {
      let temp = [];
      state.visitedViews.forEach((elem, index) => {
        let reg = new RegExp(type + '\/(edit|add|bind|detail)');
        if (!reg.test(elem.path)) {
          temp.push(elem);
        }
      });
      state.visitedViews = temp;
    },
    CLEAR_VISITED_VIEWS: (state) => {
      state.visitedViews = [];
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    clearEditAdd({ commit }, type) {
      commit('CLEAR_EDIT_ADD', type)
    },
    clearVisitedViews({ commit }) {
      commit('CLEAR_VISITED_VIEWS')
    }
  }
}

export default app
