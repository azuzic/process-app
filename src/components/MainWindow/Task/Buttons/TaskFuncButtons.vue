<template>
    <div class="flex bg-main_blackblue p-4 -my-3 -mx-4 z-10">
        <div @click="$store.state.creatingTask ? saveTask() : updateTask()"
        class="process justify-around bg-main_green px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">{{ $store.state.creatingTask ? 'Save task' : 'Update task' }}</b>
        </div>
        <div @click="deleteTask()" class="process ml-4 justify-around bg-main_red px-4 rounded flex items-center">
            <b class="text-lg text-main_darktext">Delete task</b>
        </div>
    </div>
</template>
<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
export default {
    name: "EditTask",
    methods: {
        async deleteTask() {
            var index = this.$store.state.process.tasks.map(e => e.active).indexOf(true);
            let hash = this.$store.state.process.tasks[index].hash;
            if (index > -1) {
                this.$store.state.process.tasks.splice(index, 1);
                this.$store.state.creatingTask = false;
                this.$store.state.taskSelected = false;
            }
            await deleteDoc(doc(db, "process/" + this.$store.state.process.hash + "/tasks/", hash));
            await this.logEvent(" deleted task ");
        },
        async saveTask() {
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
            await setDoc(doc(db, "process/" + this.$store.state.process.hash + "/tasks/", this.$store.state.task.hash), {
                hash: this.$store.state.task.hash,
                name: this.$store.state.task.name,
                details: this.$store.state.task.details,
                fields: this.$store.state.task.fields,
                visibilityUsers: this.$store.state.task.visibilityUsers,
                editUsers: this.$store.state.task.editUsers,
                completionUsers: this.$store.state.task.completionUsers,
            });
            await this.logEvent(" created task ");
        }, 
        async updateTask() {
            this.$store.state.fieldSelected = false;
            this.$store.state.taskUpdated = true;
            this.$store.state.process.tasks.forEach(task => {
                if (task.hash == this.$store.state.task.hash)
                    task.updated = true;
            });
            let updateRef = doc(db, "process/" + this.$store.state.process.hash + "/tasks/", this.$store.state.task.hash);

            this.$store.state.task.fields.forEach(field => {
                delete field.active;
                delete field.updated;
                switch (field.type) {
                    case "Checkbox": field.data = { fieldLabel: field.data.fieldLabel }; break;
                    case "Text Field" || "Text Area": field.data = { 
                        fieldLabel: field.data.fieldLabel, 
                        fieldDescription: field.data.fieldDescription,
                        defaultValue: field.data.defaultValue, 
                        required: field.data.required }; 
                        break;
                    case "Dropdown": field.data = { 
                        fieldLabel: field.data.fieldLabel, 
                        fieldDescription: field.data.fieldDescription,
                        dropdownValues: field.data.defaultValue, 
                        required: field.data.required }; 
                        break;
                    default: break;
                }
            });
            await updateDoc(updateRef, {
                name: this.$store.state.task.name,
                details: this.$store.state.task.details,
                fields: this.$store.state.task.fields,
                visibilityUsers: this.$store.state.task.visibilityUsers,
                editUsers: this.$store.state.task.editUsers,
                completionUsers: this.$store.state.task.completionUsers,
            });
            await this.logEvent(" updated task ");
        },
        async logEvent(event) {
            if (this.$store.state.process.eventLog == undefined)
                this.$store.state.process['eventLog'] = {};

            let date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');

            if (this.$store.state.process.eventLog[date] == undefined)
                this.$store.state.process.eventLog[date] = [];

            this.$store.state.process.eventLog[date].unshift({
                who: this.$store.state.data.username,
                did: event,
                what: this.$store.state.task.name,
            });

            let updateRef = doc(db, "process/", this.$store.state.process.hash);
            await updateDoc(updateRef, {
                eventLog: this.$store.state.process.eventLog,
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