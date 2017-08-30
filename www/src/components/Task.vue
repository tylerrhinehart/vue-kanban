<template>
    <div>

        <md-list-item>
            <md-button class="md-icon-button md-list-action" @click="removeTask">
                <md-icon>remove_circle</md-icon>
            </md-button>
            <div class="md-title">{{task.name}}</div>
            <div class="md-subhead">{{task.description}}</div>
        </md-list-item>

    </div>
</template>
<script>
    export default {
        name: 'task',
        data() {
            return {

            }
        },
        props: ['task'],
        methods: {
            removeTask() {
                console.log(this.task._id)
                this.$store.dispatch('removeTask', this.task._id)
            }
        }
    }

</script>