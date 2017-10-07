<template>
  <v-layout class="main" column align-center>
    <h4>LOGIN</h4>
    <v-form v-model="valid" ref="form" class="form">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            label="邮箱"
            v-model="data.email"
            :rules="emailRules"
            :counter="10"
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
      <v-btn class="white--text" @click.stop="submit" :class="{ green: valid, red: !valid }">登陆</v-btn>
      <router-link :to="{ name: 'register' }">注册用户</router-link>
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
          email: '',
          password: '',
        },
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
      ...mapActions('user', ['LOGIN']),
      submit () {
        if (this.$refs.form.validate()) {
          this.LOGIN(this.data).then(() => {
            if (this.$route.query.redirect) {
              this.$router.push({ path: this.$route.query.redirect });
            } else {
              this.$router.push({ name: 'DBM_index' });
            }
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
