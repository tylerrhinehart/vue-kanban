<template>
    <div>
        <!-- <draggable class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="updateTask"> -->
            <md-list-item>
                <md-button class="md-icon-button md-list-action" @click="removeTask">
                    <md-icon>remove_circle</md-icon>
                </md-button>
                <div class="task-info">
                    <div class="md-title">{{task.name}}</div>
                    <div class="md-subhead">{{task.description}}</div>
                </div>
                <md-button @click="toggleComments" class="md-icon-button" md-menu-trigger v-if="(comments && comments.length > 0)">
                    <md-icon>comment</md-icon>
                </md-button>
                
                <md-menu md-size="4" md-direction="top right">
                    <md-button class="md-icon-button task-options" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click="openDialog('dialog1')">
                            <span>Add Comment</span>
                            <md-icon>add_circle</md-icon>
                        </md-menu-item>
                        <div v-for="(list, i) in lists" :key="i">
                            <md-menu-item @click="updateTask(list._id)">
                                <span>Move to: {{list.name}}</span>
                                <md-icon>add_circle</md-icon>
                            </md-menu-item>
                        </div>
                    </md-menu-content>
                </md-menu>
            </md-list-item>
        <!-- </draggable> -->
        <div v-show="showComments">
            <md-list-item v-for="(comment, i) in comments" :key="i">
                <Comment :comment="comment"></Comment>
            </md-list-item>
        </div>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
            <md-dialog-title>Create New Comment</md-dialog-title>

            <md-dialog-content>
                <form>
                    <md-input-container>
                        <label>Comment</label>
                        <md-input v-model="comment"></md-input>
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
import Comment from "./Comment";
import draggable from "vuedraggable";
export default {
  name: "task",
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
      comment: "",
      showComments: false
    };
  },
  props: ["task"],
  components: {
    draggable,
    Comment
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

    removeTask() {
      console.log(this.task._id);
      this.$store.dispatch("removeTask", this.task._id);
    },
    updateTask(listId) {
      this.isDragging = false;
      var obj = {
        taskId: this.task._id,
        listId: listId,
        previousListId: this.task.listId,
        position: this.$store.state.tasks[listId].length
      };
      this.$store.dispatch("updateTask", obj);
    },
    createComment() {
      this.$store.dispatch("createComment");
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    cancelDialog(ref) {
      this.$refs[ref].close();
    },
    closeDialog(ref) {
      var comment = {
        content: this.comment,
        boardId: this.$store.state.activeBoard._id,
        creatorId: this.$store.state.user._id,
        taskId: this.task._id,
        position: this.$store.state.comments[this.task._id].length
      };
      this.$refs[ref].close();
      this.$store.dispatch("createComment", comment);
      this.comment = "";
    },
    toggleComments() {
      this.showComments = !this.showComments;
    }
  },
  mounted() {
    this.$store.dispatch("getComments", this.task._id);
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
    lists() {
      return this.$store.state.activeLists;
    },
    comments() {
      return this.$store.state.comments[this.task._id];
    }
  }
};
</script>

<style scoped>
    .task-options {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
