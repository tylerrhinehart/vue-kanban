<template>
  <div>
    Active Board: {{board.name}}
    <form>
      <md-input-container>
        <label>Name</label>
        <md-input v-model="listName"></md-input>
      </md-input-container>
      <md-button class="md-primary" type="button" @click="addList">Add New List</md-button>
    </form>
    <div style="display: inline-block" v-for="list in lists">
      <md-card>
        <md-card-header>
          <div class="md-title">{{list.name}}</div>
          <div class="md-subhead">Description goes here</div>
        </md-card-header>
        <md-card-content>
          Tasks will eventually go here
        </md-card-content>
      </md-card>
    </div>
    <!-- <md-list v-for="list in lists">
      <md-list-item>
        <md-button class="md-icon-button md-list-action">
          <md-icon>remove_circle</md-icon>
        </md-button>
        <span>{{list.name}}</span>
      </md-list-item>
    </md-list> -->
  </div>
</template>

<script>
  export default {
    name: 'board',
    data() {
      return {
        listName: ''
      }
    },
    methods: {
      addList() {
        var list = {
          name: this.listName,
          creatorId: this.$store.state.user._id,
          boardId: this.$route.params.id
        }
        this.$store.dispatch('addList', list)
      }
    },
    mounted() {
      this.$root.$store.dispatch('getBoard', this.$route.params.id)
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.activeLists
      }
    }
  }

</script>

<style scoped>

</style>