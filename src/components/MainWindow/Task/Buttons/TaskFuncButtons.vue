<template>
    <div class="flex">
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
            });
        },
        async updateTask() {
            this.$store.state.fieldSelected = false;
            this.$store.state.taskUpdated = true;
            this.$store.state.process.tasks.forEach(task => {
                if (task.hash == this.$store.state.task.hash)
                    task.updated = true;
            });
            let updateRef = doc(db, "process/" + this.$store.state.process.hash + "/tasks/", this.$store.state.task.hash);
            let fields = this.$store.state.task.fields;
            fields.forEach(field => {
                delete field.active;
                delete field.updated;
            });
            await updateDoc(updateRef, {
                name: this.$store.state.task.name,
                details: this.$store.state.task.details,
                fields: this.$store.state.task.fields,
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