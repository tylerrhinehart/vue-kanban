<template>
    <div class="comment">
        <p>Comment: {{comment.content}}</p>
        <!-- <md-button class="md-raised md-primary" @click="removeComment">Remove Comment</md-button> -->

        <md-menu md-size="4" md-direction="top right" md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
                <md-menu-item @click="removeComment">
                    <span>Remove Comment</span>
                    <md-icon>remove_circle</md-icon>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  props: ["comment"],
  methods: {
    removeComment() {
      this.$store.dispatch("removeComment", this.comment._id);
    }
  }
};
</script>

<style>
    .comment {
        display: flex;

    }
</style>
