import * as api from '@/store/api/user';

export default {
  namespaced: true,
  state: () => ({
    user: [],
  }),
  getters: {},
  actions: {
    GET_USER({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUser().then((res) => {
          commit('GET_USER', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    LOGIN({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.login(data).then((res) => {
          commit('GET_USER', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    REGISTER({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.register(data).then((res) => {
          commit('GET_USER', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  mutations: {
    GET_USER(state, data) {
      state.user = data.data;
    },
    UPDATE_USER(state, data) {
      state.user = data.data;
    },
  },
};
