<template>
  <v-app id="app" class="grey lighten-3">
    <div class="news">
     <span>前端代码开源，有兴趣修改的同学可以直接到GitHub修改，适合初入前端学习的同学，这里以后不光只做DBM相关的内容。</span>
     <span>https://github.com/jx3-addon/jx3-plugin.kingsoft.com-FE</span>
    </div>
    <router-view></router-view>
    <footer>
      有任何建议请联系青阳魂 <a href="https://weibo.com/2128637385">https://weibo.com/2128637385</a>
    </footer>
  </v-app>
</template>


<style lang="stylus">
  @import '~vuetify/src/stylus/app.styl'
</style>


<style lang="scss">
@import 'styles/main.scss';
.news {
  background: #feffab;
  color: #900000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
footer {
  text-align: center;
  padding: 20px;
}
</style>
