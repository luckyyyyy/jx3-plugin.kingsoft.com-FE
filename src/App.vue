<template>
  <v-app id="app" class="grey lighten-3">
    <router-view></router-view>
    <footer>
      有任何建议请联系青阳魂 <a href="https://weibo.com/2128637385">https://weibo.com/2128637385</a>
    </footer>
  </v-app>
</template>

<script>
export default {
  title : '《剑网3》DBM数据上传' // 懒得改
}
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/app.styl'
</style>


<style lang="scss">
@import 'styles/main.scss';
footer {
  text-align: center;
  padding: 20px;
}
</style>
