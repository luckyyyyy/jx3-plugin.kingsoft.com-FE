import Vue from 'vue';
import createApp from '@/entry/main';
import ProgressBar from '@/components/ProgressBar';

if (!!window.ActiveXObject || "ActiveXObject" in window) {
  alert('请更换非IE内核浏览器访问，本站不再兼容任何IE浏览器，如果您使用360等，请切换到极速模式内核。');
  window.location.href = 'https://www.tmall.com/wow/portal/act/ali-page-updater';
}

Vue.prototype.$bar = new Vue(ProgressBar).$mount();
const bar = Vue.prototype.$bar;
document.body.appendChild(bar.$el);

// 横竖屏方案
// window.addEventListener('orientationchange', () => {
//   const orientation = window.orientation;
//   if (orientation === 90 || orientation === -90) {
//     alert('111');
//   }
// });

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
  // 客户端下先放行view方案
  // beforeMount () {
  //   const { asyncData } = this.$options;
  //   if (asyncData) {
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route,
  //     });
  //   }
  // },
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && Object.keys(store.state.user.user).length === 0) {
      return next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c));
      });
      const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
      if (!asyncDataHooks.length) {
        return next();
      }
      bar.start();
      return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
        bar.finish();
        next();
      }).catch(next);
    }
  });
  return app.$mount('#app');
});

if (window.location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js');
}
