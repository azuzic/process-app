<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col grow">
                <div class="flex flex-col">
                    <b class="text-lg pl-1 mt-3 mb-1">Task Name</b>
                    <div class="vue-input2 text-sm hover:bg-main_darktext whitespace-pre" placeholder="Enter task name ..." type="text">{{$store.state.task.name}}</div>
                    
                    <b class="text-lg pl-1 my-1">Details</b>
                    <div class="vue-input2 text-sm hover:bg-main_darktext whitespace-pre" placeholder="Enter details ..." type="text" rows="4">
                        {{ $store.state.task.details ? $store.state.task.details : 'No details ...' }}
                    </div>
                </div>
                
                <b class="text-lg pl-1 my-2">Fields</b>
                <hr class="border-2 border-bg_white rounded-full mb-2" />
                <div class="flex flex-col overflow-y-auto px-4 -mx-4 overflow-x-hidden pb-4 h-0 grow">
                    <FieldInput v-for="(item, index) in $store.state.task.fields" v-bind:key="index" :hash="item.hash"
                        :type="item.active ? $store.state.field.type : item.type" :isActive="item.active"
                        :data="item.active ? $store.state.field.data : item.data" />
                </div>
            </div>
            <TaskFuncButtons />
        </div>

    </div>
</template>

<script>
import { doc, db, setDoc, updateDoc, deleteDoc } from "@/firebase";
import AddFieldButton from "./Buttons/AddFieldButton.vue"
import FieldOptions from "./FieldOptions.vue";
import FieldInput from "./Buttons/FieldInput.vue";
import cryptoRandomString from 'crypto-random-string';
import TaskFuncButtons from "./Buttons/TaskFuncButtons.vue";

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default {
    name: "CurrentTask",
    components: {
    AddFieldButton,
    FieldOptions,
        FieldInput,
    TaskFuncButtons
    },
    mounted(){
        this.$store.state.task = this.$store.state.process.tasks.filter(a => a.hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID)[0];
    },
    methods: {
        async createField() {
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
            this.$store.dispatch('checkUpdate2');
        },  
        array(n) {
            switch (n) {
                case 1:
                    let temp = [];
                    this.$store.state.process.tasks.forEach( task => {
                        temp.push({
                            name: task.name,
                            id: task.hash,
                        });
                    });
                    return temp;
                default: break;
            }
        }
    }
}

/**

*/
</script>