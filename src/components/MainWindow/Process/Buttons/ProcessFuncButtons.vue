<template>
    <div class="flex bg-main_blackblue p-4 -my-3 -mx-4 z-10">

        <div v-if="!$store.state.loading" @click="$store.state.creatingProcess ? saveProcess() : updateProcess()"
            class="process justify-around bg-main_green px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">{{ $store.state.creatingProcess ? 'Save process' : 'Update process'}}</b>
        </div>

        <div v-if="!$store.state.loading" @click="deleteProcess()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">Delete process</b>
        </div>

        <font-awesome-icon v-if="$store.state.loading" icon="fa-spinner" class="fa-spin-pulse" size="2xl" />

    </div>
</template>

<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
export default {
    name: "EditTask",
    methods: {
        async deleteProcess() {
            this.$store.state.loading = true;
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
            this.$store.state.process = {
                active: false,
                updated: true,

                hash: "",
                name: "...",
                details: "",
                tasks: [],
                eventLog: {},

                visibilityUsers: [],
                editUsers: [],
                completionUsers: [],
                users: [],
            },
            this.$store.dispatch('resetValues');
            this.$store.dispatch('updateUserStep');
            this.$store.state.loading = false;
        },
        async saveProcess() {
            this.$store.state.loading = true;
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
                visibilityUsers: this.$store.state.process.visibilityUsers,
                eventLog: this.$store.state.process.eventLog,
                editUsers: this.$store.state.process.editUsers,
                completionUsers: this.$store.state.process.completionUsers,
                admin: this.$store.state.process.admin,
                processStartedUsers: this.$store.state.process.processStartedUsers,
                processInProgressUsers: this.$store.state.process.processInProgressUsers,
                processFinishedUsers: this.$store.state.process.processFinishedUsers,
            });
            let updateRef = doc(db, "users/", this.$store.state.data.id);
            await updateDoc(updateRef, {
                processes: hashes
            });
            this.$store.state.loading = false;
            await this.$store.dispatch('logEvent', {
                who: this.$store.state.data.username,
                did: " created process ",
                what: this.$store.state.process.name,
            });
        },
        async updateProcess() {
            this.$store.state.loading = true;
            this.$store.state.processUpdated = true;
            this.$store.state.processes.forEach(process => {
                if (process.hash == this.$store.state.process.hash)
                    process.updated = true;
            });
            let updateRef = doc(db, "process/", this.$store.state.process.hash);
            await updateDoc(updateRef, {
                name: this.$store.state.process.name,
                details: this.$store.state.process.details,
                visibilityUsers: this.$store.state.process.visibilityUsers,
                eventLog: this.$store.state.process.eventLog,
                editUsers: this.$store.state.process.editUsers,
                completionUsers: this.$store.state.process.completionUsers,
                users: this.$store.state.process.users,
            });
            this.$store.state.loading = false;
            await this.$store.dispatch('logEvent', {
                who: this.$store.state.data.username,
                did: " updated process ",
                what: this.$store.state.process.name,
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