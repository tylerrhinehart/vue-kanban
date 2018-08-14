<template>
  <div id="boards-page">
    <button @click="openDialog('dialog1')">New Board</button>
    <div class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <md-list class="md-double-line">
          <div v-for="(board, i) in boards" :key="i">
            <md-list-item>

              <div class="md-list-text-container">
                <span><router-link :to="'/boards/'+board._id">{{board.name}}</router-link></span>
              </div>

              <md-button @click="removeBoard(board._id)" class="md-icon-button md-list-action">
                <md-icon>remove_circle</md-icon>
              </md-button>
            </md-list-item>
          </div>
        </md-list>
      </div>
    </div>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Create New Board</md-dialog-title>

      <md-dialog-content>
        <form @submit.prevent="closeDialog('dialog1')">
          <md-input-container>
            <label>Name</label>
            <md-input v-model="name"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" type="submit">Create</md-button>
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
      this.$store.dispatch('clearBoard')
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
      removeBoard(id) {
        this.$store.dispatch('removeBoard', id)
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
  #boards-page {
    text-align: center;
  }

</style>