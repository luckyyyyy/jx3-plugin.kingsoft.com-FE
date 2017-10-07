<template>
  <v-layout column class="white lighten-4 elevation-0">
    <div class="card-title">数据下载</div>
    <el-table class="f-cp" :data="list" @row-click="to" style="width: 100%">
      <el-table-column prop="fid" label="ID" width="60"></el-table-column>
      <el-table-column prop="user.username" label="作者" width="120"></el-table-column>
      <el-table-column label="标题">
        <template scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">公开</el-tag>
            <el-tag v-if="scope.row.status === 2" type="primary">自用</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">置顶</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
            {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="160"></el-table-column>
      <el-table-column prop="downloads" label="下载次数" width="180"></el-table-column>
      <el-table-column label="操作" width="280">
        <template scope="scope">
          <v-btn small color="info" @click.stop="down(scope.row.fid, 'gbk')">下载</v-btn>
          <v-btn small @click.stop="down(scope.row.fid, 'utf8')">下载台服版本</v-btn>
        </template>
      </el-table-column>
    </el-table>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { Tag, Table, TableColumn } from 'element-ui';
export default {
  components: {
    [Tag.name]: Tag,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  asyncData({store}) {
    return store.dispatch('file/GET_LIST', 'all');
  },
  computed: {
    ...mapState('file', ['list']),
  },
  methods: {
    to(row, event, column) {
      this.$router.push({ name: 'DBM_detail', params: { id: row.fid } });
    },
    down(fid, type) {
      window.open(`/api/dbm/file/down/${fid}?type=${type}`)
    }
  },
};
</script>
