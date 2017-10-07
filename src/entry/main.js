import Vue from 'vue';
import {
  Vuetify,
  VApp,
  VBtn,
  VForm,
  VTabs,
  VGrid,
  VTextField,
  VChip,
  VSelect,
  VCheckbox,
  VCard,
  VRadioGroup,
  VSubheader,
} from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from '@/App';
import { createStore } from '@/store';
import { createRouter } from '@/router';
import titleMixin from '@/util/title';

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VForm,
    VTabs,
    VGrid,
    VTextField,
    VChip,
    VSelect,
    VCheckbox,
    VCard,
    VRadioGroup,
    VSubheader,
  }
})

Vue.mixin(titleMixin);

export default function createApp() {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
