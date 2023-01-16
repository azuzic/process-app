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
                        <ProcessTaskBtn v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :task="item" :index="index" :selected="false"/>
                    </div>
                </div>
                <div v-else>
                    Empty ...
                </div>
            </div>
        </div>
        
        <div>
            <div v-if="!$store.state.loading && !$store.state.data.startedProcesses[this.$store.state.process.hash]" @click="startProcess()"
                class="process justify-around bg-main_green px-4 rounded flex items-center w-fit">
                <b class="text-lg text-main_darktext">Start process</b>
            </div>
            <div class="justify-around px-4 rounded flex items-center w-fit" v-else-if="!$store.state.loading">
                <b class="text-lg text-main_cyan">Process started !</b>
            </div>
            <font-awesome-icon v-if="$store.state.loading" icon="fa-spinner" class="fa-spin-pulse" size="2xl" />
        </div>
    </div>
</template>

<script>
import ProcessFuncButtons from "./Buttons/ProcessFuncButtons.vue"
import ProcessTaskBtn from "./Buttons/ProcessTaskBtn.vue"

import { collection, getDocs, db, updateDoc, doc, increment, arrayRemove, arrayUnion } from "@/firebase";

export default {
    name: "ViewProcess",
    methods: {
        /*async increment(process) {
            console.log(process);
            let updateRef = doc(db, "process/", process.hash);
            await updateDoc(updateRef, {
                number: increment(1)
            });
            console.log("yay");
        }*/
        async startProcess() {
            this.$store.state.loading = true;
            let updatingUser = {};
            let updateRef = doc(db, "process/", this.$store.state.process.hash);
            for (let user of this.$store.state.process.users) {
                if (user.id == this.$store.state.data.id) {
                    await updateDoc(updateRef, {
                        users: arrayRemove(user)
                    });
                    user.state = "Started";
                    updatingUser = user;
                }
            }
            await updateDoc(updateRef, {
                users: arrayUnion(updatingUser)
            });

            updateRef = doc(db, "users/", this.$store.state.data.id);

            let startedProcess = {};
            startedProcess = {
                currentTaskID: this.$store.state.process.tasks[0].hash,
                tasks: {},
            }

            let startedProcesses = "startedProcesses." + this.$store.state.process.hash;

            await updateDoc(updateRef, {
                [startedProcesses]: startedProcess,
            });

            this.$store.state.data.startedProcesses[this.$store.state.process.hash] = startedProcess;
            
            await this.$store.dispatch('logEvent', {
                who: this.$store.state.data.username,
                did: " started process ",
                what: this.$store.state.process.name,
            });
            this.$store.state.loading = false;
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