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
      }
    },

    methods: {
      login () {
        console.log(this.loginForm)
      },
      register () {
        console.log(this.registerForm)
      },

      loginTabClick () {
        this.tab = LOGIN
      },
      registerTabClick () {
        this.tab = REGISTER
      }
    }
  }
</script>

<style scoped>

</style>
