<template>
    <div>
        <p>Comment: {{comment.content}}</p>
        <md-button class="md-raised md-primary" @click="removeComment">Remove Comment</md-button>
    </div>
</template>
<script>
    export default {
        name: 'comment',
        data() {
            return {}
        },
        props: ['comment'],
        methods: {
            removeComment() {
                this.$store.dispatch('removeComment', this.comment._id)
            }
        }
    }

</script>
<style>

</style>