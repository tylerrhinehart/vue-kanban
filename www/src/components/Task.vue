<template>
    <div>
        <draggable class="list-group" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="updateTask">
            <md-list-item>
                <md-button class="md-icon-button md-list-action" @click="removeTask">
                    <md-icon>remove_circle</md-icon>
                </md-button>
                <div class="md-title">{{task.name}}</div>
                <div class="md-subhead">{{task.description}}</div>
                <md-menu md-size="4" md-direction="top right">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content >
                        <div v-for="list in lists">

                            <md-menu-item @click="updateTask(list._id)">
                                <span>Add To: {{list.name}}</span>
                                <md-icon>add_circle</md-icon>
                            </md-menu-item>
                        </div>
                    </md-menu-content>
                </md-menu>
            </md-list-item>
        </draggable>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'task',
        data() {
            return {
                editable: true,
                isDragging: false,
                delayedDragging: false
            }
        },
        props: ['task'],
        components: {
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

            removeTask() {
                console.log(this.task._id)
                this.$store.dispatch('removeTask', this.task._id)
            },
            updateTask(listId) {
                this.isDragging = false
                var obj = {
                    taskId: this.task._id,
                    listId: listId,
                    previousListId: this.task.listId
                }
                this.$store.dispatch('updateTask', obj)
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: 'description',
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                }
            },
            lists() {
                return this.$store.state.activeLists

            }

        }
    }

</script>