<template>
    <div>
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">{{list.name}}</div>
                    <div class="md-subhead">Description goes here</div>
                </md-card-header-text>

                <md-menu md-size="4" md-direction="top right">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item @click="openDialog('dialog1')">
                            <span>Add Task</span>
                            <md-icon>add_circle</md-icon>
                        </md-menu-item>
                        <md-menu-item>
                            <span>Change name</span>
                            <md-icon>message</md-icon>
                        </md-menu-item>
                        <md-menu-item @click="removeList">
                            <span>Remove List</span>
                            <md-icon>remove_circle</md-icon>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-card-header>
            <md-card-content>
                Tasks will eventually go here
                <md-list v-for="task in tasks">
                    <!-- <task :task="task"></task> -->
                    <draggable :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                        <Task :task="task"></Task>
                    </draggable>
                </md-list>
            </md-card-content>
        </md-card>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
            <md-dialog-title>Create New Account</md-dialog-title>

            <md-dialog-content>
                <form>
                    <md-input-container>
                        <label>Name</label>
                        <md-input v-model="name"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Description</label>
                        <md-input v-model="description"></md-input>
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
    import Task from './Task'
    import draggable from 'vuedraggable'
    export default {
        name: 'list',
        data() {
            return {
                name: '',
                description: ''
            }
        },
        components: {
            Task,
            draggable
        },
        props: ['list'],
        methods: {
            orderList() {
                this.list = this.list.sort((one, two) => { return one.order - two.order; })
            },
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            removeList() {
                this.$store.dispatch('removeList', this.list._id)
            },
            openDialog(ref) {
                this.$refs[ref].open();
            },
            cancelDialog(ref) {
                this.$refs[ref].close();
            },
            closeDialog(ref) {
                var task = {
                    name: this.name,
                    description: this.description,
                    boardId: this.$store.state.activeBoard._id,
                    listId: this.list._id,
                    creatorId: this.$store.state.user._id,
                    position: this.$store.state.tasks[this.list._id].length
                }
                this.$refs[ref].close()
                this.$store.dispatch('createTask', task)
                this.name = ''

            }
        },
        mounted() {
            this.$store.dispatch('getTasks', this.list._id)
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
            tasks() {
                return this.$store.state.tasks[this.list._id].sort(function(a,b) {
                    return a.position - b.position
                })
            }
        }

    }

</script>