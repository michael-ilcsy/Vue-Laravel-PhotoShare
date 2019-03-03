<template>
  <footer class="footer">
    <button class="button button--link" v-if="isLogin" @click="logout">Logout</button>
    <RouterLink class="button button--link" v-else to="/login">
      Login / Register
    </RouterLink>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      isLogin () {
        return this.$store.getters['auth/check']
      }
    },
    methods: {
      async logout () {
        await this.$store.dispatch('auth/logout')

        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
