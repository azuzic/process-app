<template>
    <div class="vue-list bg-main_darktext flex flex-col py-4">
        <!----------------------------------------PROCESS ANALYTICS LIST------------------------------------------>
        <!--PROCESS OVERVIEW-->
        <div class="flex flex-col px-4">
            <TaskButton :taskActive="processOverview" :taskUpdated="true" :name="'Process Overview'" @click="setActive('', -1)" />
        </div>
        <!--PROCESS TASK NAME-->
        <div class="flex flex-col px-4">
            <div class="text-lg font-bold mt-4"> Tasks </div>
            <hr class="border-2 border-bg_main_white rounded-full my-2">
        </div>
        <!--PROCESS TASK LIST-->
        <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow px-4">
            <TaskButton v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :taskActive="item.active"
                :taskUpdated="true" :name="item.active ? (index+1+'. '+ $store.state.task.name) : (index+1+'. '+item.name)"
                @click="setActive(item.hash, index)" />
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-PROCESS ANALYTICS LIST-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>  
</template>

<script>
import TaskButton from "../Task/Buttons/TaskButton.vue"
export default {
    name: "TaskListAnalytics",
    components: {
        TaskButton,
    },
    data() {
        return {
            processOverview: false,
        }
    },  
    mounted() {
        this.setActive('', -1);
    },
    methods: {
        //SET ACTIVE TASK ANALYTICS
        setActive(hash, index) {
            try {
                if (index == -1) {
                    this.$store.state.task = {
                        active: false,
                        updated: true,

                        creationTime: 0,
                        hash: "",
                        name: "",
                        details: "",

                        fields: [],

                        visibilityUsers: [],
                        editUsers: [],
                        completionUsers: [],

                        next: {},

                        started: [],
                        inProgress: [],
                        finished: [],
                    }
                }
                this.processOverview = (index == -1);
                let previousHash = this.$store.state.task.hash;
                let previousTaskUpdated = this.$store.state.taskUpdated;
                this.$store.state.process.tasks.forEach(task => {
                    if (task.hash == previousHash)
                        task.updated = previousTaskUpdated;
                    if (task.hash == hash) {
                        task.active = true;
                        this.$store.state.taskUpdated = task.updated;
                        this.$store.state.task = task;
                        this.$store.state.prevTask = JSON.stringify(task).toString();
                        this.$store.state.task.index = index;
                        this.$store.state.task.fields.forEach(field => {
                            field.active = false;
                        });
                        this.$store.state.taskSelected = true;
                    }
                    else
                        task.active = false;
                });
                this.$store.dispatch('updateUserStep');
            } catch (error) { console.error("TaskListAnalytics.js - setActive:", error); }
        },
    },
}
</script>