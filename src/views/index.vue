<template>
  <v-layout class="main" column align-center justify-center>
    <h2 class="teal--text">剑网3插件服务中心</h2>
    <!-- <h4 class="light-green--text">请开始你的表演</h4> -->
    <div class="btns" align-center justify-center>
      <v-btn :to="{ name: 'DBM_index' }">DBM 插件数据</v-btn>
      <v-btn disabled>敬请期待</v-btn>
    </div>
  </v-layout>
</template>
<style lang="scss" scoped>
.main {
  height: 600px;
}
</style>
<script>
export default {
  title: '《剑网3》插件服务中心',
}
</script>
