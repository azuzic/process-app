<template>
    <div class="flex bg-main_blackblue p-4 -my-3 -mx-4 z-10">
        <div v-if="!$store.state.loading" @click="$store.state.creatingTask ? saveTask() : updateTask()"
        class="process justify-around bg-main_green px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">{{ $store.state.creatingTask ? 'Save task' : 'Update task' }}</b>
        </div>
        <div v-if="!$store.state.loading" @click="deleteTask()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">Delete task</b>
        </div>
        <div class="flex items-center">
            <i v-if="$store.state.loading" class="fa-solid fa-spinner fa-spin-pulse text-main_white text-2xl"></i>
        </div>
    </div>
</template>
<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
export default {
    name: "EditTask",
    methods: {
        async deleteTask() {
            try {
                this.$store.state.loading = true;
                var index = this.$store.state.process.tasks.map(e => e.active).indexOf(true);
                let hash = this.$store.state.process.tasks[index].hash;
                try {
                    await deleteDoc(doc(db, "process/" + this.$store.state.process.hash + "/tasks/", hash));
                } catch (error) { console.error("TaskFuncButtons.vue - deleteTask - deleteDoc:", error); }
                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " deleted task ",
                    what: this.$store.state.task.name,
                });
                if (index > -1) {
                    this.$store.state.process.tasks.splice(index, 1);
                    this.$store.state.creatingTask = false;
                    this.$store.state.taskSelected = false;
                }
                this.$store.state.loading = false;
            } catch (error) { console.error("TaskFuncButtons.vue - deleteTask:", error); }
        },
        async saveTask() {
            try {
                this.$store.state.loading = true;
                this.$store.state.creatingTask = false;
                this.$store.state.taskUpdated = true;
                this.$store.state.fieldSelected = false;
                this.$store.state.process.tasks.forEach(task => {
                    if (task.active) {
                        task = this.$store.state.task;
                        task.updated = true;
                        task.fields.forEach(field => {
                            field.active = false;
                            field.updated = true;
                        });
                    }
                });
                try {
                    await setDoc(doc(db, "process/" + this.$store.state.process.hash + "/tasks/", this.$store.state.task.hash), {
                        creationTime: this.$store.state.task.creationTime,
                        hash: this.$store.state.task.hash,
                        name: this.$store.state.task.name,
                        details: this.$store.state.task.details,
                        fields: this.$store.state.task.fields,
                        visibilityUsers: this.$store.state.task.visibilityUsers,
                        editUsers: this.$store.state.task.editUsers,
                        completionUsers: this.$store.state.task.completionUsers,
                        next: this.$store.state.task.next,
                        started: [],
                        inProgress: [],
                        finished: [],
                    });
                } catch (error) { console.error("TaskFuncButtons.vue - saveTask - setDoc:", error); }
                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " created task ",
                    what: this.$store.state.task.name,
                });
                this.$store.state.loading = false;
            } catch (error) { console.error("TaskFuncButtons.vue - saveTask:", error); }      
        }, 
        async updateTask() {
            try {
                this.$store.state.loading = true;
                this.$store.state.fieldSelected = false;
                this.$store.state.taskUpdated = true;
                this.$store.state.process.tasks.forEach(task => {
                    if (task.hash == this.$store.state.task.hash)
                        task.updated = true;
                });
                this.$store.state.task.fields.forEach(field => {
                    delete field.active;
                    delete field.updated;
                    switch (field.type) {
                        case "Checkbox": field.data = { fieldLabel: field.data.fieldLabel }; break;
                        case "Text Field" || "Text Area": field.data = {
                            fieldLabel: field.data.fieldLabel,
                            fieldDescription: field.data.fieldDescription,
                            defaultValue: field.data.defaultValue,
                            required: field.data.required
                        };
                            break;
                        case "Dropdown": field.data = {
                            fieldLabel: field.data.fieldLabel,
                            fieldDescription: field.data.fieldDescription,
                            dropdownValues: field.data.dropdownValues,
                            required: field.data.required
                        };
                            break;
                        default: break;
                    }
                });
                try {
                    let updateRef = doc(db, "process/" + this.$store.state.process.hash + "/tasks/", this.$store.state.task.hash);
                    await updateDoc(updateRef, {
                        name: this.$store.state.task.name,
                        details: this.$store.state.task.details,
                        fields: this.$store.state.task.fields,
                        visibilityUsers: this.$store.state.task.visibilityUsers,
                        editUsers: this.$store.state.task.editUsers,
                        completionUsers: this.$store.state.task.completionUsers,
                        next: this.$store.state.task.next,
                    });
                } catch (error) { console.error("TaskFuncButtons.vue - updateTask - updateDoc:", error); }      
                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.data.username,
                    did: " updated task ",
                    what: this.$store.state.task.name,
                });
                this.$store.state.prevTask = JSON.stringify(this.$store.state.task).toString();
                this.$store.state.loading = false;
            } catch (error) { console.error("TaskFuncButtons.vue - updateTask:", error); }      
        },
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