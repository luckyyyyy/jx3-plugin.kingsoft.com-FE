import * as api from '@/store/api/DBM';

export default {
  namespaced: true,
  state: () => ({
  }),
  getters: {},
  actions: {
    CHECK({ commit }, data) {
      return api.check(data);
    },
  },
  mutations: {

  },
};
