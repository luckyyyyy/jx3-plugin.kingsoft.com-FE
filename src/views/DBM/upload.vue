<template>
  <v-layout column class="white lighten-4 elevation-0">
    <div class="card-title">{{ $route.params.id && dat && dat.title && data.title || '数据上传' }}</div>
    <v-form class="upload" v-model="valid" ref="form">
      <v-layout row>
        <v-flex xs12>
          <v-text-field label="数据标题" v-model="data.title" :rules="nameRules" :counter="20" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
          <v-flex xs12>
            <v-select
              label="标签"
              :items="states"
              v-model="data.type"
              multiple
              chips
              persistent-hint
            ></v-select>
          </v-flex>
      </v-layout>
      <v-layout class="drop"
        justify-center
        align-center
        column
        :class="{ active: dropActive }"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
        v-html="fileCheck"
      ></v-layout>
      <v-layout row>
        <v-flex xs6>
          <v-radio-group row v-model="data.status">
            <v-radio :value="1" label="公开" class="success--text"></v-radio>
            <v-radio :value="2" label="自用" class="info--text"></v-radio>
            <v-radio v-if="user.god || $route.params.id && dat && dat.status === 3" :value="3" label="置顶" class="warning--text"></v-radio>
            <v-radio v-if="user.god || $route.params.id && dat && dat.uid === user.uid" :value="4" label="删除" class="error--text"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-card class="white elevation-0">
        <v-card-text>
          <v-subheader>请填写数据描述，仅支持（<a target="_blank" href="http://note.youdao.com/iyoudao/?p=2411&vendor=unsilent14">Markdown语法</a>）</v-subheader>
          <v-tabs fixed centered v-model="active">
            <v-tabs-bar class="grey lighten-4">
              <v-tabs-slider class="info"></v-tabs-slider>
              <v-tabs-item href="#write">Write</v-tabs-item>
              <v-tabs-item href="#preview">Preview</v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content id="write" class="tab-content">
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="data.text"
                        name="input-1"
                        label="请填写数据描述，下方有实时预览。"
                        textarea
                        auto-grow
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tabs-content>
              <v-tabs-content id="preview" class="tab-content">
                <v-card class="white elevation-0">
                  <div class="markdown-body" v-html="liveMarkDown"></div>
                </v-card>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
        </v-card-text>
      </v-card>
      <v-btn
        @click.stop="submit"
        :disabled="this.status !== 'checked' && !$route.params.id"
        class="white--text"
        :class="{ green: valid, red: !valid
      }">提交</v-btn>

    </v-form>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MarkdownIt from 'markdown-it';
import { edit, upload } from '@/api/DBM';

const md = new MarkdownIt();
export default {
  asyncData({ store, route }) {
    const id = route.params.id;
    if (id) {
      return store.dispatch('file/GET_FILE', id);
    } else {
      return Promise.resolve();
    }
  },
  title: '《剑网3》DBM数据上传与下载 - 上传数据',
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.data.title = this.dat.title;
      this.data.type = this.dat.tag;
      this.data.status = this.dat.status;
      this.data.text = this.dat.message;
    }
  },
  data() {
    return {
      active: 'write',
      dropActive: false,
      status: '',
      file: {},
      fileData: {},
      data: {
        file: '',
        title: '',
        type: [],
        raw: '',
        status: 2,
        text: '',
        id: 0,
      },
      states: [
        'PVE', '宠物', '抓马', '成就', 'PVP', '自用'
      ],
      valid: false,
      nameRules: [
        (v) => !!v || '请输入数据标题',
        (v) => v.length <= 20 || '数据标题太长'
      ],
      emailRules: [
        (v) => !!v || '请输入密码',
        (v) => v.length >= 6 || '密码太短'
      ]
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('file', { dat: state => state.file }),
    liveMarkDown() {
      return md.render(this.data.text);
    },
    fileCheck() {
      switch (this.status) {
        case 'release':
          return '请松开鼠标。';
          break;
        case 'checked':
          const txt = `<span><span class="red--text">${this.file.name}</span> 效验通过，格式合法。</span>
          <span>Author: ${this.fileData.__meta.szAuthor}@${this.fileData.__meta.szServer} Lang: ${this.fileData.__meta.szLang}</span>`;
          return txt;
          break;
        case 'read':
          return '文件正在读取中，请稍后。';
          break;
        case 'upload':
          return '文件正在传送给服务器进行下一步效验，请稍后。';
          break;
        default:
          if (!this.$route.params.id) {
            return '请将扩展名为 jx3dat 的文件拖拽到此处，仅支持一个文件，仅支持GBK。';
          } else {
            return '如果您不想修改文件，请勿把文件拖拽至此。';
          }
          break;
      }
    },
  },
  methods: {
      ...mapActions('DBM', ['CHECK', 'UPLOAD']),
    dragleave() {
      if (this.status === 'release') {
        this.status = '';
        this.dropActive = false;
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        const id = this.$route.params.id;
        if (id) {
          edit(id, this.data).then((res) => {
            if (this.data.status != 4) {
              this.$router.push({ name: 'DBM_detail', params: { id: res.data.data } })
            } else {
              this.$router.push({ name: 'DBM_index' })
            }
          });
        } else {
          upload(this.data).then((res) => {
            this.$router.push({ name: 'DBM_detail', params: { id: res.data.data } })
          });
        }
      }
    },
    dragover() {
      if (this.status === '' || this.status === 'checked') {
        this.status = 'release';
        this.dropActive = true;
      }
    },
    drop(e) {
      if (this.status === 'release') {
        this.status = 'read';
        this.dropActive = false;
        if (e.dataTransfer.files[0]) {
          this.read = true;
          this.file = e.dataTransfer.files[0];
        }
        const reader = new FileReader();
        reader.onloadend = (event) => {
          if (event.target.readyState == FileReader.DONE) {
            this.status = 'upload';
            this.data.raw = event.target.result;
            this.CHECK(this.data.raw).then((res) => {
              if (res.data.data.__meta && res.data.data.__meta.szAuthor) {
                this.status = 'checked';
                this.fileData = res.data.data;
                this.checked = true;
              } else {
                this.status = '';
              }
            }).catch(() => {
              this.status = '';
            })
          }
        }
        reader.readAsText(this.file, 'GB2312');
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~github-markdown-css/github-markdown.css';
.upload {
  width: 70%;
  padding: 0 60px;
  margin: 0 auto;
  .drop {
    width: 100%;
    height: 100px;
    border: 1px dashed #bbb;
    &.active {
      border: 2px dashed red;
    }
  }
}
.tab-content {
  min-height: 250px;
}
</style>
