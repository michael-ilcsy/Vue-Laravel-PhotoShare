<template>
  <footer class="footer">
    <button class="button button--link" v-if="isLogin" @click="logout">Logout</button>
    <RouterLink class="button button--link" v-else to="/login">
      Login / Register
    </RouterLink>
  </footer>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'Footer',
    computed: {
      ...mapState(['apiStatus']),
      ...mapGetters({
        isLogin: 'auth/check'
      })
    },
    methods: {
      async logout () {
        await this.$store.dispatch('auth/logout')

        if (this.apiStatus) {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style scoped>

</style>
