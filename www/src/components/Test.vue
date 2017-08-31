<template>
    <div class="fluid container">
        <div class="row">
            <div class="col-md-3" v-for="list in activeLists">
                <draggable class="list-group" element="ul" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    {{list._id}}
                    <div v-for="task in tasks[list._id]">
                        <draggable :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                            <Task :task="task"></Task>
                        </draggable>
                    </div>
                    <!-- <li class="list-group-item" v-for="element in list" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>                        {{element.name}}
                        <span class="badge">{{element.name}}</span>
                    </li> -->
                </draggable>
            </div>
            <div class="col-md-3">
                <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
                    <li class="list-group-item" v-for="element in list2" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>                        {{element.name}}
                        <span class="badge">{{element.order}}</span>
                    </li>
                </draggable>
            </div>
        </div>

        <!-- <div class="col-md-3">
            <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in list2" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>                        {{element.name}}
                        <span class="badge">{{element.order}}</span>
                    </li>
                </transition-group>
            </draggable>
        </div> -->
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import Task from './Task'
    export default {
        name: 'test',
        data() {
            return {
                lists: {
                    A: [
                        {
                            "id": 1,
                            "label": "Item A1"
                        },
                        {
                            "id": 2,
                            "label": "Item A2"
                        },
                    ],
                    B: [
                        {
                            "id": 1,
                            "label": "Item B1"
                        },
                        {
                            "id": 2,
                            "label": "Item B2"
                        },
                    ]
                },
                list: [
                    { name: "Tyler", alias: "Clark" },
                    { name: "Austin", alias: "Jim" }
                ],
                list2: [
                    { name: "Tyler", alias: "Clark" },
                    { name: "Austin", alias: "Jim" }
                ],
                editable: true,
                isDragging: false,
                delayedDragging: false
            }
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
            activeLists() {
                return this.$store.state.activeLists
            },
            tasks() {
                return this.$store.state.tasks
            }
        },
        methods: {
            orderList() {
                this.list = this.list.sort((one, two) => { return one.order - two.order; })
            },
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            }
        },
        components: {
            draggable,
            Task
        }
    }

</script>

<style>
    .vddl-list,
    .vddl-draggable {
        position: relative;
    }

    .vddl-list {
        min-height: 44px;
    }

    .vddl-dragging {
        opacity: 0.7;
    }

    .vddl-dragging-source {
        display: none;
    }
</style>