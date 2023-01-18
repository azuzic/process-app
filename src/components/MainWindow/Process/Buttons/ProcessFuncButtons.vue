<template>
    <div class="flex bg-main_blackblue p-4 -my-3 -mx-4 z-10">
        
        <!--SAVE/UPDATE PROCESS-->
        <div v-if="!$store.state.loading" @click="$store.state.creatingProcess ? saveProcess() : updateProcess()"
            class="process justify-around bg-main_green px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">{{ $store.state.creatingProcess ? 'Save process' : 'Update process'}}</b>
        </div>

        <!--DELETE PROCESS-->
        <div v-if="!$store.state.loading" @click="deleteProcess()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">Delete process</b>
        </div>

        <!--LOADING-->
        <div class="flex items-center">
            <i v-if="$store.state.loading" class="fa-solid fa-spinner fa-spin-pulse text-main_white text-2xl"></i>
        </div>

    </div>
</template>

<script>
import { doc, db, setDoc, updateDoc, deleteDoc, arrayRemove, arrayUnion } from "@/firebase";
export default {
    name: "EditTask",
    methods: {
        //DELETE PROCESS
        async deleteProcess() {
            try {
                this.$store.state.loading = true;
                var index = this.$store.state.processes.map(e => e.active).indexOf(true);
                let hash = this.$store.state.processes[index].hash;
                this.$store.state.processes.splice(index, 1);
                
                for (let task of this.$store.state.process.tasks) {
                    try {
                        await deleteDoc(doc(db, "process/" + this.$store.state.process.hash + "/tasks/", task.hash));
                    } catch (error) { console.error("TaskFuncButtons.vue - deleteTask - deleteDoc:", error); }
                }
                try {
                    await deleteDoc(doc(db, "process/", hash));
                } catch (error) { console.error("ProcessFuncButtons.vue - deleteProcess - deleteDoc:", error); }
        
                try {
                    let updateRef = doc(db, "users/", this.$store.state.data.id);
                    await updateDoc(updateRef, {
                        processes: arrayRemove(this.$store.state.process.hash),
                    });
                } catch (error) { console.error("ProcessFuncButtons.vue - deleteProcess - updateDoc:", error); }

                this.$store.dispatch('resetValues');
                this.$store.state.currentWindow = "None";
                this.$store.dispatch('updateUserStep');
                this.$store.state.creatingProcess = false;
                this.$store.state.processSelected = false;
                this.$store.state.loading = false;
            } catch (error) { console.error("ProcessFuncButtons.vue - deleteProcess:", error); }
        },

        //SAVE PROCESS IN DATABASE
        async saveProcess() {
            try {
                this.$store.state.loading = true;

                try {
                    await setDoc(doc(db, "process/", this.$store.state.process.hash), {
                        hash: this.$store.state.process.hash,
                        name: this.$store.state.process.name,
                        details: this.$store.state.process.details,
                        tasks: [],
                        eventLog: this.$store.state.process.eventLog,

                        visibilityUsers: this.$store.state.process.visibilityUsers,
                        editUsers: this.$store.state.process.editUsers,
                        completionUsers: this.$store.state.process.completionUsers,

                        users: this.$store.state.process.users,
                        admin: this.$store.state.process.admin,
                    });
                } catch (error) { console.error("ProcessFuncButtons.vue - saveProcess - setDoc:", error); }

                try {
                    let updateRef = doc(db, "users/", this.$store.state.data.id);
                    await updateDoc(updateRef, {
                        processes: arrayUnion(this.$store.state.process.hash),
                    });
                } catch (error) { console.error("ProcessFuncButtons.vue - saveProcess - updateDoc:", error); }

                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " created process ",
                    what: this.$store.state.process.name,
                });

                this.$store.state.creatingProcess = false;
                this.$store.state.processUpdated = false;
                this.$store.state.loading = false;

                this.$store.state.processes.forEach(process => {
                    process.updated = true;
                });

            } catch (error) { console.error("ProcessFuncButtons.vue - saveProcess:", error); }
        },

        //UPDATE PROCESS
        async updateProcess() {
            try {
                this.$store.state.loading = true;
                this.$store.state.processUpdated = true;
                this.$store.state.processes.forEach(process => {
                    if (process.hash == this.$store.state.process.hash)
                        process.updated = true;
                });
                try {
                    let updateRef = doc(db, "process/", this.$store.state.process.hash);
                    await updateDoc(updateRef, {
                        name: this.$store.state.process.name,
                        details: this.$store.state.process.details,
                        visibilityUsers: this.$store.state.process.visibilityUsers,
                        editUsers: this.$store.state.process.editUsers,
                        completionUsers: this.$store.state.process.completionUsers,
                        users: this.$store.state.process.users,
                    });
                } catch (error) { console.error("ProcessFuncButtons.vue - updateProcess - updateDoc:", error); }
                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " updated process ",
                    what: this.$store.state.process.name,
                });
                this.$store.state.loading = false;
            } catch (error) { console.error("ProcessFuncButtons.vue - updateProcess:", error); }
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