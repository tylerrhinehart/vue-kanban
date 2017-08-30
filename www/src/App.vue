<template>
  <div id="app">
    <!-- <error></error> -->
    <Navbar></Navbar>
    <div id="id">
      <router-view></router-view>
    </div>
    <div v-show="!loggedIn">
      <h3>Sign in to see your boards</h3>
    </div>
  </div>
</template>

<script>
  import Error from './components/Error'
  import Navbar from './components/NavBar'

  export default {
    name: 'app',
    components: {
      Navbar,
      Error
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      },
    },
    mounted() {
      this.$store.dispatch('getAuth')
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #id {
    margin-top: 20vh;
  }
</style>