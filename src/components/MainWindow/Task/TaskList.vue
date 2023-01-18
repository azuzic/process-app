<template>
    <div class="vue-list bg-main_darktext flex flex-col py-4">
        <!----------------------------------------TASK LIST------------------------------------------>
        <!--TASK NAME-->
        <div class="flex flex-col px-4">
            <div class="text-lg font-bold"> Tasks </div>
            <hr class="border-2 border-bg_main_white rounded-full my-2">
        </div>
        <!--TASK BUTTONS-->
        <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow px-4">
            <TaskButton v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :taskActive="item.active"
                :taskUpdated="item.updated" :name="item.active ? (index+1+'. '+ $store.state.task.name) : (index+1+'. '+item.name)"
                @click="!this.$store.state.creatingTask ? setActive(item.hash, index) : ''" />
            <AddTaskButton @click="!$store.state.creatingTask ? createTask() : ''" />
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-TASK LIST-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>  
</template>

<script>
import AddTaskButton from "./Buttons/AddTaskButton.vue"
import TaskButton from "./Buttons/TaskButton.vue"
import cryptoRandomString from 'crypto-random-string';
export default {
    name: "TaskList",
    components: {
        TaskButton,
        AddTaskButton
    },
    methods: {
        setActive(hash, index) {
            try {
                this.$store.state.process.tasks.forEach(task => {
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
                    else task.active = false;
                });
                this.$store.dispatch('updateUserStep');
            } catch (error) { console.error("TaskList.vue - setActive:", error); }
        },
        async createTask() {
            try {
                this.$store.state.creatingTask = true;
                this.$store.state.taskSelected = true;
                this.$store.state.currentWindow = "EditTask";
                this.$store.state.process.tasks.forEach(task => {
                    if (task.active)
                        task.active = false;
                });
                this.$store.state.task = {
                    active: true,
                    updated: false,
                    
                    creationTime: new Date().getTime(),
                    hash: cryptoRandomString({ length: 32, type: 'alphanumeric' }),
                    name: "...",
                    details: "",

                    fields: [],

                    visibilityUsers: ["ADMIN", "USER"],
                    editUsers: ["ADMIN"],
                    completionUsers: ["USER"],

                    next: {
                        type: "Automatic",
                        data: {},
                    },

                    started: [],
                    inProgress: [],
                    finished: [],
                };
                this.$store.state.prevTask = JSON.stringify(this.$store.state.task).toString();
                this.$store.state.process.tasks.push(this.$store.state.task);
                this.$store.dispatch('updateUserStep');
            } catch (error) { console.error("TaskList.vue - createTask:", error); }
        },
    },
}
</script>