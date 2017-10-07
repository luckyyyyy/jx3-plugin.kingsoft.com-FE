<template>
  <v-layout class="main" column align-center>
    <h4>REGISTER</h4>
    <v-form v-model="valid" ref="form" class="form">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="用户名"
            v-model="data.username"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="邮箱"
            v-model="data.email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="密码"
            v-model="data.password"
            :rules="passwordRules"
            required
            type="password"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn class="white--text" @click.stop="submit" :class="{ green: valid, red: !valid }">注册</v-btn>
      <router-link :to="{ name: 'login' }">登陆</router-link>
    </v-form>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data () {
      return {
        valid: false,
        data: {
          username: '',
          email: '',
          password: '',
        },
        nameRules: [
          (v) => !!v || '请输入用户名',
          (v) => v.length <= 10 || '用户名太长'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          (v) => !!v || '请输入密码',
          (v) => v.length >= 6 || '密码太短',
        ],
      }
    },
    methods: {
      ...mapActions('user', ['REGISTER']),
      submit () {
        if (this.$refs.form.validate()) {
          this.REGISTER(this.data).then(() => {
            this.$router.push({ name: 'DBM_index' });
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.main {
  padding-top: 200px;
  .form {
    width: 400px;
  }
}
</style>
