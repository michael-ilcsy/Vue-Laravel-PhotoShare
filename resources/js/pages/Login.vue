<template>
  <div class="container--small">
    <ul class="tab">
      <li
        class="tab__item"
        :class="loginClass"
        @click="loginTabClick"
      >Login
      </li>
      <li
        class="tab__item"
        :class="registerClass"
        @click="registerTabClick"
      >Register
      </li>
    </ul>

    <div class="panel" v-show="isLoginTab">
      <form class="form" @submit.prevent="login">
        <div v-if="loginErrorMessages" class="errors">
          <ul v-if="loginErrorMessages.email">
            <li v-for="msg in loginErrorMessages.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrorMessages.password">
            <li v-for="msg in loginErrorMessages.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <label for="login-email">Email</label>
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email">
        <label for="login-password">Password</label>
        <input type="password" class="form__item" id="login-password" v-model="loginForm.password">
        <div class="form__button">
          <button type="submit" class="button button--inverse">login</button>
        </div>
      </form>
    </div>

    <div class="panel" v-show="isRegisterTab">
      <form class="form" @submit.prevent="register">
        <div v-if="registerErrorMessages" class="errors">
          <ul v-if="registerErrorMessages.name">
            <li v-for="msg in registerErrorMessages.name" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.email">
            <li v-for="msg in registerErrorMessages.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.password">
            <li v-for="msg in registerErrorMessages.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <label for="username">Name</label>
        <input type="text" class="form__item" id="username" v-model="registerForm.name">
        <label for="email">Email</label>
        <input type="text" class="form__item" id="email" v-model="registerForm.email">
        <label for="password">Password</label>
        <input type="password" class="form__item" id="password" v-model="registerForm.password">
        <label for="password-confirmation">Password (confirm)</label>
        <input type="password" class="form__item" id="password-confirmation"
               v-model="registerForm.password_confirmation">
        <div class="form__button">
          <button type="submit" class="button button--inverse">register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  const LOGIN = 'login'
  const REGISTER = 'register'

  export default {
    name: 'Login',
    data () {
      return {
        tab: LOGIN,
        loginForm: {
          email: '',
          password: ''
        },
        registerForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    computed: {
      isLoginTab () {
        return this.tab === LOGIN
      },
      isRegisterTab () {
        return this.tab === REGISTER
      },

      loginClass () {
        return { 'tab__item--active': this.isLoginTab }
      },
      registerClass () {
        return { 'tab__item--active': this.isRegisterTab }
      },

      ...mapState('auth', ['apiStatus', 'loginErrorMessages', 'registerErrorMessages']),
    },

    methods: {
      async login () {
        // authストアのloginアクションを呼び出す
        await this.$store.dispatch('auth/login', this.loginForm)

        if (this.apiStatus) {
          // トップページに移動する
          this.$router.push('/')
        }
      },
      async register () {
        // authストアのregisterアクションを呼び出す
        await this.$store.dispatch('auth/register', this.registerForm)

        if (this.apiStatus) {
          // トップページに移動する
          this.$router.push('/')
        }
      },

      loginTabClick () {
        this.tab = LOGIN
      },
      registerTabClick () {
        this.tab = REGISTER
      },

      clearError () {
        this.$store.commit('auth/setLoginErrorMessages', null)
        this.$store.commit('auth/setRegisterErrorMessages', null)
      }
    },
    created () {
      this.clearError()
    }
  }
</script>

<style scoped>

</style>
