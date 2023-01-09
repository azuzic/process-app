<template>
    <div class="flex">

        <div>

        </div>

        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col">
                <b class="text-lg pl-1 mt-3 mb-1">Task Name</b>
                <input @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="task.name"
                    class="vue-input2" placeholder="Enter task name ..." type="text">
        
                <b class="text-lg pl-1 my-1">Details</b>
                <textarea @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="task.details"
                    class="vue-input2" placeholder="Enter details ..." type="text" rows="4"></textarea>
        
                <b class="text-lg pl-1 my-1">Fields</b>
                <div class="flex flex-col">
                    <AddFieldButton class="w-fit" />
                </div>
            </div>
        
            <div class="flex">
                <div @click="$store.state.creatingProcess ? saveTask() : updateTask()"
                    class="process justify-around bg-main_green px-4 rounded flex items-center">
                    <b class="text-lg text-main_darktext">{{ $store.state.creatingProcess ? 'Save task' : 'Update task' }}</b>
                </div>
                <div @click="deleteTask()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
                    <b class="text-lg text-main_darktext">Delete task</b>
                </div>
            </div>
        </div>

        <FieldOptions />

    </div>
    

</template>

<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
import AddFieldButton from "./AddFieldButton.vue"
import FieldOptions from "./FieldOptions.vue";
export default {
    name: "EditTask",
    components: {
    AddFieldButton,
    FieldOptions
},
    data() {
        return {
            task: {
                name: "",
                details: ""
            }
        }
    },
    methods: {
        async deleteTask() {
            var index = this.$store.state.processes.map(e => e.active).indexOf(true);
            let hash = this.$store.state.processes[index].hash;
            if (index > -1) {
                this.$store.state.processes.splice(index, 1);
                this.$store.state.creatingProcess = false;
                this.$store.state.processSelected = false;
            }
            await deleteDoc(doc(db, "process/", hash));

            let hashes = [];
            this.$store.state.processes.forEach(process => {
                hashes.push(process.hash);
            });
            let updateRef = doc(db, "users/", this.$store.state.data.id);
            await updateDoc(updateRef, {
                processes: hashes
            });
        },
        async saveTask() {
            this.$store.state.creatingProcess = false;
            let hashes = [];
            this.$store.state.processes.forEach(process => {
                hashes.push(process.hash);
                if (process.active)
                    process = this.$store.state.process;
            });
            await setDoc(doc(db, "process/", this.$store.state.process.hash), {
                hash: this.$store.state.process.hash,
                name: this.$store.state.process.name,
                details: this.$store.state.process.details,
            });
            let updateRef = doc(db, "users/", this.$store.state.data.id);
            await updateDoc(updateRef, {
                processes: hashes
            });
        },
        async updateTask() {
            this.$store.state.processUpdated = true;
            this.$store.state.processes.forEach(process => {
                if (process.hash == this.$store.state.process.hash)
                    process.updated = true;
            });
            let updateRef = doc(db, "process/", this.$store.state.process.hash);
            await updateDoc(updateRef, {
                name: this.$store.state.process.name,
                details: this.$store.state.process.details,
            });
        }
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