# jx3-plugin.kingsoft.com 前端代码
项目使用VueSSR，两个UI组件`vuetify`和`element-ui`，由于比较赶时间，代码略粗糙，不过挺适合新人练手，比那些45个页面大应用之类的好得多。

## 内置模块
 * 项目使用 ES6，内置了诸多开发插件，该有的都有。
 * 两个UI组件均是按需引用，如果不明白请勿修改.babelrc。
 * 本地调试方便，内置了`express-http-proxy`，可直接对线上的API做Mock。

## 开发启动方式
 * 如果您有本地后端服务器，请修改PROXY，否则请使用以下方式启动，直接代理线上API，方便快速调试。
 * 由于CSS注入问题，开发模式下`vuetify`可能一些意外情况。
 * 此命令不支持Windows CMD，请使用git bash替代。
 > PROXY=https://jx3-plugin.kingsoft.com npm run dev

