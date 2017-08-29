<template>
  <div>
    Active Board: {{board.name}}
    <md-list v-for="list in board.lists.data.data">
      <md-list-item>
        <md-button class="md-icon-button md-list-action">
          <md-icon>remove_circle</md-icon>
        </md-button>
        <span>{{list.name}}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'board',
    mounted() {
      this.$root.$store.dispatch('getBoard', this.$route.params.id)
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      }
    }
  }

</script>

<style scoped>

</style>