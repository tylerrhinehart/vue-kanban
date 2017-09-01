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
    <!-- <Test></Test> -->
  </div>
</template>

<script>
  import Error from './components/Error'
  import Navbar from './components/NavBar'
  import Test from './components/Test'

  export default {
    name: 'app',
    components: {
      Navbar,
      Error,
      Test
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
    /* background-image: url("https://images.pexels.com/photos/542608/pexels-photo-542608.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb") */
  }

  #id {
    margin-top: 20vh;
  }
  body {
    background-image: url("https://images.pexels.com/photos/542608/pexels-photo-542608.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb");
    background-position-x: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    text-align: center;
    background-size: cover
  }
</style>