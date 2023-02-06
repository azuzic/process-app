<template>
    <div class="bg-main_bg px-4 flex flex-col pb-3">

        <div class="flex flex-col h-full">
            <b class="text-lg pl-1 mt-3 mb-1">Process Name</b>
            <div class="vue-input2 hover:bg-main_darktext text-sm whitespace-pre">{{ $store.state.process.name }}</div>
            <b class="text-lg pl-1 my-1">Details</b>
            <div class="vue-input2 hover:bg-main_darktext text-sm whitespace-pre">{{$store.state.process.details}}</div>

            <b class="text-lg pl-1 my-1">Tasks</b>
            <div class="text-sm pl-4 text-main_lighttext h-full flex flex-col">
                <div v-if="$store.state.process.tasks.length > 0" class="flex flex-wrap py-4 overflow-y-auto overflow-x-hidden h-0 grow w-full"> 
                    <div class="flex flex-wrap h-fit">
                        <ProcessTaskBtn v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :task="item" :index="index" :selected="currentTaskCheck(item)"/>
                    </div>
                </div>
                <div v-else>
                    Empty ...
                </div>
            </div>
        </div>
        
        <div v-if="$store.state.process.tasks.length > 0">
            <div v-if="!$store.state.loading && !$store.state.data.startedProcesses[$store.state.process.hash]" @click="startProcess()"
                class="process justify-around bg-main_green px-4 rounded flex items-center w-fit">
                <b class="text-lg text-main_darktext">Start process</b>
            </div>
            <div class="justify-around px-4 rounded flex items-center w-fit" v-else-if="!$store.state.loading && $store.state.data.startedProcesses[$store.state.process.hash].currentTaskID != 'End'">
                <b class="text-lg text-main_cyan">Process started !</b>
                <b v-if="!$store.state.task.visibilityUsers.includes($store.state.data.tag)" 
                class="text-lg text-main_red ml-4">Waiting for next task ...</b>
            </div>
            <div v-else-if="$store.state.data.startedProcesses[$store.state.process.hash].currentTaskID == 'End'" class="justify-around px-4 rounded flex items-center w-fit">
                <b class="text-lg text-main_green">Process completed !</b>
            </div>
            <div class="flex items-center">
                <i v-if="$store.state.loading" class="fa-solid fa-spinner fa-spin-pulse text-main_white text-2xl"></i>
            </div>
        </div>
    </div>
</template>

<script>
import ProcessFuncButtons from "./Buttons/ProcessFuncButtons.vue"
import ProcessTaskBtn from "./Buttons/ProcessTaskBtn.vue"
import { db, updateDoc, doc, arrayRemove, arrayUnion } from "@/firebase";

export default {
    name: "ViewProcess",
    methods: {
        currentTaskCheck(task) {
            try {
                if (this.$store.state.data.startedProcesses[this.$store.state.process.hash]) {
                    let task2 = this.$store.state.tasksOriginal.filter(a => a.hash == task.hash)[0];
                    if (!this.$store.state.task.visibilityUsers.includes(this.$store.state.data.tag)) {
                        if (task2 != undefined)
                            switch (task2.next.type) {
                                case "Automatic":
                                    if (this.$store.state.tasksOriginal[task2.index + 1] != undefined) {
                                        return this.$store.state.tasksOriginal[task2.index + 1].hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID;
                                    } break;
                                default: break;
                        }
                    }
                    return task.hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID;
                }
                return false;
            } catch (error) { console.error("ViewProcess.vue - currentTaskCheck:", error); }            
        },
        async startProcess() {
            try {
                this.$store.state.loading = true;
                let updatingUser = {};
                let updateRef = doc(db, "process/", this.$store.state.process.hash);

                try { //Remove user from process users in database, update user state 
                    for (let user of this.$store.state.process.users) {
                        if (user.id == this.$store.state.data.id) {
                            await updateDoc(updateRef, {
                                users: arrayRemove(user)
                            });
                            user.state = "Started";
                            user.started = new Date().getTime();
                            updatingUser = user;
                        }
                    }
                } catch (error) { console.error("ViewProcess.vue - startProcess - updateDoc - arrayRemove:", error); }   
                
                try { //Add back user to process users with updated data
                    await updateDoc(updateRef, {
                        users: arrayUnion(updatingUser)
                    });
                } catch (error) { console.error("ViewProcess.vue - startProcess - updateDoc - arrayUnion:", error); }   
                
                try { //Update task started & inProgress users
                    updateRef = doc(db, "process/", this.$store.state.process.hash, "tasks/", this.$store.state.process.tasks[0].hash);
                    await updateDoc(updateRef, {
                        started: arrayUnion({userID: this.$store.state.data.id, startTime: new Date().getTime()}),
                        inProgress: arrayUnion(this.$store.state.data.id)
                    });
                } catch (error) { console.error("ViewProcess.vue - startProcess - updateDoc2 - arrayUnion:", error); }   
         
                let startedProcess = {};
                startedProcess = {
                    currentTaskID: this.$store.state.process.tasks[0].hash,                                                                        
                    tasks: {},
                }
                let startedProcesses = "startedProcesses." + this.$store.state.process.hash;

                try {
                    updateRef = doc(db, "users/", this.$store.state.data.id);
                    await updateDoc(updateRef, {
                        [startedProcesses]: startedProcess,
                    });
                } catch (error) { console.error("ViewProcess.vue - startProcess - updateDoc3:", error); }      

                this.$store.state.data.startedProcesses[this.$store.state.process.hash] = startedProcess;

                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " started process ",
                    what: this.$store.state.process.name,
                });
                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " started task ",
                    what: this.$store.state.process.tasks[0].name,
                });
                this.$store.state.currentWindow = "CurrentTask",
                this.$store.state.loading = false;
            } catch (error) { console.error("ViewProcess.vue - startProcess:", error); }     
        }
    },
    components: {
        ProcessFuncButtons,
        ProcessTaskBtn
    }
}
</script>

<style lang="scss" scoped>
.process {
    height: 40px;
    &:hover {
        background-color: rgb(217, 217, 217);
        cursor: pointer;
    }
}
</style>