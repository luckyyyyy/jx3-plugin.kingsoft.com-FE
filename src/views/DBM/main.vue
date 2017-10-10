<template>
  <v-container fluid>
    <header class="white--text" :class="bgcolor">
      <h2>《剑网3》DBM数据上传</h2>
    </header>
    <menu :class="bgcolor">
      <v-layout row justify-center>
        <router-link class="item" tag="div" :to="item.route" v-for="item of tab" :key="item.name">
          {{ item.name }}
        </router-link>
      </v-layout>
    </menu>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: [
        { name: '所有数据', route: { name: 'DBM_index' }, color: 'deep-purple' },
        { name: '我的数据', route: { name: 'DBM_me' }, color: 'light-blue' },
        { name: '上传数据', route: { name: 'DBM_upload' }, color: 'deep-orange' },
      ],
    };
  },
  title: '《剑网3》DBM数据上传与下载',
  computed: {
    bgcolor() {
        const tab = this.tab.find((item) => {
          return item.route.name === this.$route.name;
        });
        return tab && tab.color || 'green';
    },
    active() {
      const tab = this.tab.find((item) => {
        return item.route.name === this.$route.name;
      });
      return tab && tab.name || this.$route.meta.name || this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  padding: 20px 60px;
}
menu, header {
  transition: background .3s ease-in-out;
}
menu {
  .item {
    padding: 10px 30px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    user-select: none;
    transition: .3s cubic-bezier(.25,.8,.5,1), color 1ms;
    &.router-link-exact-active {
      background: white;
      color: #333;
    }
  }
}
</style>
