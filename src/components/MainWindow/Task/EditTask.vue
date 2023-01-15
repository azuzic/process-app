<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col grow">
                <div class="flex flex-col">
                    <b class="text-lg pl-1 mt-3 mb-1">Task Name</b>
                    <input @input="$store.state.taskUpdated ? $store.dispatch('checkUpdate2') : ''" v-model="$store.state.task.name"
                        class="vue-input2 text-sm" placeholder="Enter task name ..." type="text">
                    
                    <b class="text-lg pl-1 my-1">Details</b>
                    <textarea @input="$store.state.taskUpdated ? $store.dispatch('checkUpdate2') : ''" v-model="$store.state.task.details"
                        class="vue-input2 text-sm" placeholder="Enter details ..." type="text" rows="4"></textarea>
                </div>
                
                <b class="text-lg pl-1 my-2">Fields</b>
                <hr class="border-2 border-bg_white rounded-full mb-2" />
                <div class="flex flex-col overflow-y-auto px-4 -mx-4 overflow-x-hidden pb-4 h-0 grow">
                    <Field v-for="(item, index) in $store.state.task.fields" v-bind:key="index" :hash="item.hash"
                        :type="item.active ? $store.state.field.type : item.type" :isActive="item.active"
                        :data="item.active ? $store.state.field.data : item.data" @click="!item.active ? setActive(item.hash) : ''" />
                    <AddFieldButton @click="fieldSelected = true, createField()" class="w-fit" />
                </div>
                <div class="mb-6 flex items-end">
                    <select v-model="$store.state.task.next.type" class="vue-select">
                        <option value="Automatic">Automatic</option>
                        <option value="Task">Task</option>
                        <option value="If">If</option>
                        <option value="Switch">Switch</option>
                        <option value="Divide">Divide</option>
                    </select>
                    <div class="ml-4">
                        Next task is: {{ $store.state.task.index + 1 >= $store.state.process.tasks.length ? "End" : 
                        $store.state.process.tasks[$store.state.task.index+1] != undefined ?
                        $store.state.process.tasks[$store.state.task.index+1].name : 'End' }}
                    </div>
                </div>
            </div>
            <TaskFuncButtons />
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
import TaskFuncButtons from "./Buttons/TaskFuncButtons.vue";
export default {
    name: "EditTask",
    components: {
    AddFieldButton,
    FieldOptions,
    Field,
    TaskFuncButtons
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
    }
}

/**

*/
</script>