
export default {
  state: {
    rule: null,
  },
  mutations: {
    RULE_DATA: (state, rule) => {
      state.rule = rule;
    }
  },
  actions: {
    setRuleData({commit}, data) {
      commit('RULE_DATA', data);
    }
  }
}
