<template>
  <v-layout column class="dbm-detail white lighten-4 elevation-0">
    <div class="dbm-detail__title">
      <h1>{{ file.title }}</h1>
      <div class="dbm-detail__desc">
        <p>
          <v-chip small outline class="primary primary--text">ID: {{ file.fid }}</v-chip>
          <v-chip small outline v-for="item of file.tag" :key="item" class="green green--text">{{ item }}</v-chip>
        </p>
        <p>
         作者：{{ file.user.username }} 更新时间：{{ file.update_time }}
        </p>
        <p>
          <v-btn small color="primary" @click="down(file.fid, 'gbk')">下载</v-btn>
          <v-btn small @click="down(file.fid, 'utf8')">下载台服版本</v-btn>
          <v-btn v-if="user && user.uid === file.uid || user.god" small color="success" @click="edit(file.fid)">编辑</v-btn>
        </p>
      </div>
    </div>
    <div class="markdown-body" v-html="liveMarkDown"></div>
    <div class="dbm-detail-footer">
      <v-chip small outline class="primary primary--text">下载次数：{{ file.downloads }}</v-chip>
      <v-chip small outline class="primary primary--text">version: {{ file.version }}</v-chip>
    </div>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MarkdownIt from 'markdown-it';
import { dbmMixin } from '@/util/mixin';

const md = new MarkdownIt();

export default {
  mixins: [dbmMixin],
  asyncData({ store, route }) {
    return store.dispatch('file/GET_FILE', route.params.id);
  },
  computed: {
    ...mapState('file', ['file']),
    ...mapState('user', ['user']),
    liveMarkDown() {
      return md.render(this.file.message);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~github-markdown-css/github-markdown.css';
.dbm-detail {
  padding: 30px;
  &__title {
    text-align: center;
    border-bottom: 1px solid #ccc;
    h1 {
      font-size: 40px;
    }
  }
  &__desc {
    color: #ccc;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
  }
}
.markdown-body {
  margin: 10px;
}

</style>
