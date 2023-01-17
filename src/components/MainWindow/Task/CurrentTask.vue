<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col grow">
                <div class="flex flex-col">
                    <span class="my-3">
                        <b class="text-lg pl-1">{{($store.state.task.index+1)+ '. '}}</b>
                        <b class="text-lg pl-1 underline underline-offset-2">{{$store.state.task.name}}</b>
                    </span>                    
                    
                    <div class="text-sm whitespace-pre p-1" placeholder="Enter details ..." type="text" rows="4">
                        {{ $store.state.task.details ? $store.state.task.details : 'No details ...' }}
                    </div>
                </div>
                
                <b class="text-2xl mt-4">Fields</b>
                <div class="flex flex-col overflow-y-auto px-4 -mx-4 overflow-x-hidden pb-4 h-0 grow">
                    <FieldInput v-for="(item, index) in $store.state.task.fields" v-bind:key="index" :hash="item.hash"
                        :type="item.active ? $store.state.field.type : item.type" :isActive="item.active"
                        :data="item.active ? $store.state.field.data : item.data" :disabled="checkCompleted()"/>
                </div>
            </div>
            
            <div v-if="!$store.state.loading && !checkCompleted()" @click="checkRequired() ? completeTask() : ''"
                class="process justify-around bg-main_green px-4 rounded flex items-center w-fit py-2"
                :class="checkRequired() ? 'hover:bg-main_white hover:cursor-pointer' : 'opacity-50 brightness-50'">
                <b class="text-lg text-main_darktext">{{ $store.state.creatingTask ? 'Save task' : 'Update task' }}</b>
            </div>
            <div v-else-if="!$store.state.loading" class="justify-around px-4 rounded flex items-center w-fit">
                <b class="text-lg text-main_cyan">Task completed !</b>
            </div>
            <div v-if="$store.state.loading" class="process justify-around px-4 rounded flex items-center w-fit py-2">
                <font-awesome-icon icon="fa-spinner" class="fa-spin-pulse" size="2xl" />
            </div>
        </div>

    </div>
</template>

<script>
import { db, updateDoc, doc, arrayRemove, arrayUnion } from "@/firebase";
import AddFieldButton from "./Buttons/AddFieldButton.vue"
import FieldOptions from "./FieldOptions.vue";
import FieldInput from "./Buttons/FieldInput.vue";

export default {
    name: "CurrentTask",
    components: {
    AddFieldButton,
    FieldOptions,
    FieldInput,
    },
    mounted(){
        this.load();
    },
    methods: {
        load() {
            this.$store.state.task = this.$store.state.process.tasks.filter(a => a.hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID)[0];
            if (!this.checkCompleted())
                for (let f of this.$store.state.task.fields)
                    f.data.value = f.type != "Checkbox" ? "" : false;
            else {
                for (let f of this.$store.state.task.fields)
                    f.data.value = this.$store.state.data.startedProcesses[this.$store.state.process.hash].tasks[this.$store.state.task.hash][f.hash];
            }
        },
        checkRequired() {
            for (let f of this.$store.state.task.fields) {
                if (f.data.value != undefined)
                    if (f.data.required && f.data.value.toString() == "") 
                        return false;
            }
            return true;
        },
        checkCompleted() {
            return !!this.$store.state.data.startedProcesses[this.$store.state.process.hash].tasks[this.$store.state.task.hash];
        },
        async completeTask() {
            this.$store.state.loading = true;
            let values = {};
            for (let f of this.$store.state.task.fields)
                values[f.hash] = f.data.value;

            let next = "";
            for (let t of this.$store.state.process.tasks) {
                if (t.hash == this.$store.state.task.hash)
                    switch (t.next.type) {
                        case "Automatic":
                            next = this.$store.state.process.tasks[t.index + 1].hash; break;
                        case "Task": next = t.next.data.next; break;
                        default: break;
                    }
            }

            let task = "startedProcesses." + this.$store.state.process.hash + ".tasks." + this.$store.state.task.hash;
            let nextTaskId = "startedProcesses." + this.$store.state.process.hash + ".currentTaskID";

            let updateRef = doc(db, "users/", this.$store.state.data.id);
            await updateDoc(updateRef, {
                [task]: values,
                [nextTaskId]: next,
            });

            updateRef = doc(db, "process/", this.$store.state.process.hash, "tasks/", this.$store.state.task.hash);
            await updateDoc(updateRef, {
                inProgress: arrayRemove(this.$store.state.data.id),
                finished: arrayUnion(this.$store.state.data.id)
            });

            await this.$store.dispatch('logEvent', {
                who: this.$store.state.data.username,
                did: " finished task ",
                what: this.$store.state.task.name,
            });

            this.$store.state.data.startedProcesses[this.$store.state.process.hash].tasks[this.$store.state.task.hash] = values;
            this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID = next;

            this.$store.state.loading = false;
            this.load();
            if (!this.$store.state.task.visibilityUsers.includes(this.$store.state.data.tag))
                this.$store.state.currentWindow = "ViewProcess";
        }
    }

}
</script>