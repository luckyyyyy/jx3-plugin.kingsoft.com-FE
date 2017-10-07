import createApp from '@/entry/main';
import { setUserCookie } from '@/store/api';
import { ROUTER_BASE, BASE_URL, AUTH_URL } from '@/config';

export default (context) => {
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = createApp();
    const { cookie } = context;
    let { url } = context;
    if (url.indexOf(ROUTER_BASE) === 0) {
      url = url.substr(ROUTER_BASE.length);
    }

    const { fullPath } = router.resolve(url).route;
    if (fullPath !== url) {
      return reject({ url: fullPath });
    }
    setUserCookie(cookie);
    let user;
    try {
      user = await store.dispatch('user/GET_USER');
    } catch (err) {
      // 用户未登录 接口返回401 所以会进catch
    }
    const { route } = router.resolve(url);
    const requiresAuth = route.matched.some(record => record.meta.requiresAuth);
    if (!user && requiresAuth) {
      return reject({ url: `${AUTH_URL}?redirect_uri=${encodeURIComponent(context.url)}` });
    }
    router.push(url);
    return router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      setUserCookie(cookie); // 因为上面是async axios 是单实例
      return Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute,
      }))).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch((err) => {
        // console.log(err)
        reject({ code: 404 });
      });
    });
  });
};
