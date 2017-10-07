import Vue from 'vue';
import Vuex from 'vuex';
import { isDevelop } from '@/util';
// modules
import userModule from '@/store/modules/user';
import DBMModule from '@/store/modules/DBM';
import fileModule from '@/store/modules/file';

Vue.use(Vuex);


export const createStore = () => {
  return new Vuex.Store({
    strict: isDevelop(),
    modules: {
      user: userModule,
      DBM: DBMModule,
      file: fileModule,
    }
  });
};
