<template>
    <div class="bg-main_bg px-4 flex flex-col justify-between pb-3">

        <div class="flex flex-col">
            <b class="text-lg pl-1 mt-3 mb-1">Process Name</b>
            <input @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="$store.state.process.name" class="vue-input2" placeholder="Enter process name ..." type="text">
            
            <b class="text-lg pl-1 my-1">Details</b>
            <textarea @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="$store.state.process.details" class="vue-input2" placeholder="Enter details ..." type="text" rows="4"></textarea>
            
            <b class="text-lg pl-1 my-1">Tasks</b>
            <div class="text-sm pl-4 pt-2 text-main_lighttext">
                Empty ...
            </div>
        </div>
        
        <div class="flex">
            <div @click="$store.state.creatingProcess ? saveProcess() : updateProcess()" class="process justify-around bg-main_green px-4 rounded flex items-center">
                <b class="text-lg text-main_darktext">{{ $store.state.creatingProcess ? 'Save process' : 'Update process'}}</b>
            </div>
            <div @click="deleteProcess()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
                <b class="text-lg text-main_darktext">Delete process</b>
            </div>
        </div>

    </div>
</template>

<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
export default {
    name: "EditProcess",
    methods: {
        async deleteProcess() {
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
            this.$store.dispatch('resetValues');
            this.$store.dispatch('updateUserStep');
        },
        async saveProcess() {
            this.$store.state.creatingProcess = false;
            this.$store.state.processUpdated = false;
            let hashes = [];
            this.$store.state.processes.forEach(process => {
                hashes.push(process.hash);
                if (process.active)
                    process = this.$store.state.process;
                process.updated = true;
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
        async updateProcess() {
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