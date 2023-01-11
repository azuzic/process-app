<template>
    <div class="w-60 bg-main_darktext flex flex-col p-4">
        <div class="text-lg font-bold"> Tasks </div>
        <hr class="border-2 border-bg_main_white rounded-full my-2">
        <TaskButton v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" 

            :taskActive="item.active"
            :taskUpdated="item.updated"
            :name="item.active ? $store.state.task.name : item.name"

            @click="!this.$store.state.creatingTask ? setActive(item.hash) : ''" />

        <AddTaskButton @click="!$store.state.creatingTask ? createTask() : ''" />
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
        //ENTER THE PROCESS
        setActive(hash) {
            let previousHash = this.$store.state.task.hash;
            let previousTaskUpdated = this.$store.state.taskUpdated;
            this.$store.state.currentWindow = "EditTask";
            this.$store.state.process.tasks.forEach(task => {
                if (task.hash == previousHash)
                    task.updated = previousTaskUpdated;
                if (task.hash == hash) {
                    task.active = true;
                    this.$store.state.taskUpdated = task.updated;
                    this.$store.state.task = task;
                    this.$store.state.taskSelected = true;
                }
                else
                    task.active = false;
            });
            this.$store.dispatch('updateUserStep');
        },
        async createTask() {
            this.$store.state.creatingTask = true;
            this.$store.state.taskSelected = true;
            this.$store.state.process.tasks.forEach(task => {
                if (task.active)
                    task.active = false;
            });
            this.$store.state.task = {
                hash: cryptoRandomString({ length: 32, type: 'url-safe' }),
                active: true,
                updated: false,
                name: "...",
                details: "",
                fields: []
            };
            this.$store.state.process.tasks.push(this.$store.state.task);
            this.$store.dispatch('updateUserStep');
        },
    },
}
</script>