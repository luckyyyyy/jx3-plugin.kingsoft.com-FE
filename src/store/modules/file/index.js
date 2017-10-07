import * as api from '@/api/file';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    file: {},
  }),
  getters: {},
  actions: {
    GET_LIST({ commit }, type) {
      return new Promise((resolve, reject) => {
        api.getList(type).then((res) => {
          commit('GET_LIST', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    GET_FILE({ commit }, id) {
      return new Promise((resolve, reject) => {
        api.getFile(id).then((res) => {
          commit('GET_FILE', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  mutations: {
    GET_LIST(state, { data }) {
      state.list = data;
    },
    GET_FILE(state, { data }) {
      state.file = data;
    }
  },
};
