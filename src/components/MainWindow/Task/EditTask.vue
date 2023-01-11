<template>
    <div class="flex">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow overflow-y-scroll">
            <div class="flex flex-col">
                <b class="text-lg pl-1 mt-3 mb-1">Task Name</b>
                <input @input="$store.state.taskUpdated ? $store.dispatch('checkUpdate2') : ''" v-model="$store.state.task.name"
                    class="vue-input2" placeholder="Enter task name ..." type="text">
        
                <b class="text-lg pl-1 my-1">Details</b>
                <textarea @input="$store.state.taskUpdated ? $store.dispatch('checkUpdate2') : ''" v-model="$store.state.task.details"
                    class="vue-input2" placeholder="Enter details ..." type="text" rows="4"></textarea>
        
                <b class="text-lg pl-1 my-1">Fields</b>
                <div class="flex flex-col fields overflow-y-scroll px-4 -mx-4 overflow-x-hidden">
                    <Field v-for="(item, index) in $store.state.task.fields" v-bind:key="index" 
                    :hash="item.hash" 
                    :type="item.active ? $store.state.field.type : item.type" 
                    :isActive="item.active" 
                    :data = "item.active ? $store.state.field.data : item.data"
                    @click="!item.active ? setActive(item.hash) : ''"/>
                    <AddFieldButton @click="fieldSelected = true, createField()" class="w-fit" />
                </div>
            </div>
        
            <div class="flex">
                <div @click="$store.state.creatingTask ? saveTask() : updateTask()"
                    class="process justify-around bg-main_green px-4 rounded flex items-center">
                    <b class="text-lg text-main_darktext">{{ $store.state.creatingTask ? 'Save task' : 'Update task' }}</b>
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
import AddFieldButton from "./Buttons/AddFieldButton.vue"
import FieldOptions from "./FieldOptions.vue";
import Field from "./Buttons/Field.vue";
import cryptoRandomString from 'crypto-random-string';
export default {
    name: "EditTask",
    data() {
    },
    components: {
    AddFieldButton,
    FieldOptions,
    Field
},
    data() {
        return {
        }
    },
    methods: {
        setActive(hash) {
            this.$store.dispatch('checkUpdate2');
            let previousHash = this.$store.state.field.hash;
            let previousFieldUpdated = this.$store.state.fieldUpdated;
            this.$store.state.task.fields.forEach(field => {
                if (field.hash == previousHash)
                    field.updated = previousFieldUpdated;
                if (field.hash == hash) {
                    field.active = true;
                    this.$store.state.fieldUpdated = field.updated;
                    this.$store.state.field = field;
                    this.$store.state.fieldSelected = true;
                }
                else
                    field.active = false;
            });
        },
        async createField() {
            if (this.$store.state.taskUpdated) this.$store.dispatch('checkUpdate2');
            this.$store.state.creatingField = true;
            this.$store.state.fieldSelected = true;         
            this.$store.state.task.fields.forEach(field => {
                if (field.active)
                    field.active = false;
            });
            this.$store.state.field = {
                hash: cryptoRandomString({ length: 32, type: 'url-safe' }),
                active: true,
                updated: false,
                type: "Text Field",
                data: {
                    fieldLabel: "Field Name",
                    fieldDescription: "Field Description",
                    defaultValue: "Enter text ...",
                    required: "true"
                },
            };
            this.$store.state.task.fields.push(this.$store.state.field);
        },  
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
.fields {
    height: 500px;
}
</style>