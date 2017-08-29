<template>
  <div>
    <button @click="openDialog('dialog1')">New Board</button>
    <ul>
      <li v-for="board in boards">
        <router-link :to="'/boards/'+board._id">{{board.name}}</router-link> <span @click="removeBoard(board)">x</span></li>
    </ul>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Create New Account</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Name</label>
            <md-input v-model="name"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', {
          name: 'Testing board creation',
          description: 'blarg'
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      cancelDialog(ref) {
        this.$refs[ref].close();
      },
      closeDialog(ref) {
        var board = {
          name: this.name,
          creatorId: this.user._id
        }
        this.$refs[ref].close()
        this.$store.dispatch('createBoard', board)
        this.name = ''
      }
    }
  }

</script>

<style scoped>

</style>