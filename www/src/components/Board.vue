<template>
  <div class="board-view">
    <h3>Active Board: {{board.name}}</h3>
    <!-- <form class="list-form">
      <md-input-container>
        <label>Name</label>
        <md-input v-model="listName"></md-input>
      </md-input-container> -->
      <md-button class="md-raised md-primary list-btn" type="button" @click="openDialog('add-list')">Add New List</md-button>
    <!-- </form> -->
    <div class="list-container">
      <div style="display: inline-block" v-for="(list, i) in lists" :key="i">
        <!-- <draggable class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> -->
          <List :list="list"></List>
        <!-- </draggable> -->
      </div>
    </div>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="add-list">
      <md-dialog-title>Create New Account</md-dialog-title>

      <md-dialog-content>
          <form>
              <md-input-container>
                  <label>Name</label>
                  <md-input v-model="listName"></md-input>
              </md-input-container>
              <md-input-container>
                  <label>Description</label>
                  <md-input v-model="listDescription"></md-input>
              </md-input-container>
          </form>
      </md-dialog-content>

      <md-dialog-actions>
          <md-button class="md-primary" @click="cancelDialog('add-list')">Cancel</md-button>
          <md-button class="md-primary" @click="closeDialog('add-list')">Create</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
import List from "./List";
import draggable from "vuedraggable";
export default {
  name: "board",
  data() {
    return {
      listName: "",
      listDescription: "",
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  components: {
    List,
    draggable
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    addList() {
      var list = {
        name: this.listName,
        description: this.listDescription,
        creatorId: this.$store.state.user._id,
        boardId: this.$route.params.id,
        position: this.$store.state.activeLists.length
      };
      this.$store.dispatch("addList", list);
      this.listName = "";
      this.listDescription = "";
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    cancelDialog(ref) {
      this.$refs[ref].close();
      this.listName = "";
      this.listDescription = "";
    },
    closeDialog(ref) {
      this.addList();
      this.$refs[ref].close();
    }
  },
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.id);
    this.$store.dispatch("getLists", this.$route.params.id);
    //getlists
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.activeLists;
    }
  }
};
</script>

<style scoped>
.board-view {
  display: flex;
  flex-direction: column;
}

.list-btn {
  width: 133px;
  margin-left: auto;
  margin-right: auto;
}
</style>