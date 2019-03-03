<template>
  <div>
    <header>
      <Navbar/>
    </header>
    <main>
      <div class="container">
        <RouterView/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style scoped>

</style>
