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
                    </md-menu-content>
                </md-menu>
            </md-card-header>
            <md-card-content>
                Tasks will eventually go here
                <md-list v-for="task in list.task.data.data">
                    <task :task="task"></task>
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
    export default {
        name: 'list',
        data() {
            return {
                name: '',
                description: ''
            }
        },
        components:{
            Task
        },
        props: ['list'],
        methods: {
            createTask() {
                console.log('yipyip')
                // this.$store.dispatch('createTask')
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
                    creatorId: this.$store.state.user._id
                }
                this.$refs[ref].close()
                this.$store.dispatch('createTask', task)
                this.name = ''

            }
        }

    }

</script>