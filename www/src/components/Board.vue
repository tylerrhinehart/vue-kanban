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
      <!-- <List :list="list"></List> -->
      <draggable class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <List :list="list"></List>
      </draggable>
    </div>
  </div>
</template>

<script>
  import List from './List'
  import draggable from 'vuedraggable'
  export default {
    name: 'board',
    data() {
      return {
        listName: '',
        editable: true,
        isDragging: false,
        delayedDragging: false
      }
    },
    components: {
      List,
      draggable
    },
    methods: {
      orderList() {
        this.list = this.list.sort((one, two) => { return one.order - two.order; })
      },
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      addList() {
        var list = {
          name: this.listName,
          creatorId: this.$store.state.user._id,
          boardId: this.$route.params.id,
          position: this.$store.state.activeLists.length
        }
        this.$store.dispatch('addList', list)
        this.listName = ''
      },
      removeList() {
        this.$store.dispatch('removeList', this.list.listId)
      }
    },
    mounted() {
      this.$store.dispatch('getBoard', this.$route.params.id)
      this.$store.dispatch('getLists', this.$route.params.id)
      //getlists
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      },
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