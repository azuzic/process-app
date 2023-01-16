<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col grow">
                <div class="flex flex-col">
                    <span class="my-3">
                        <b class="text-lg pl-1">{{($store.state.task.index+1)+ '. '}}</b>
                        <b class="text-lg pl-1 underline underline-offset-2">{{$store.state.task.name}}</b>
                    </span>                    
                    
                    <div class="text-sm whitespace-pre p-1" placeholder="Enter details ..." type="text" rows="4">
                        {{ $store.state.task.details ? $store.state.task.details : 'No details ...' }}
                    </div>
                </div>
                
                <b class="text-2xl mt-4">Fields</b>
                <div class="flex flex-col overflow-y-auto px-4 -mx-4 overflow-x-hidden pb-4 h-0 grow">
                    <FieldInput v-for="(item, index) in array()" v-bind:key="index" :hash="item.hash"
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
            for (let f of this.$store.state.task.fields) {
                f.data.value="";
            }
            return this.$store.state.task.fields;
        }
    }
}

/**

*/
</script>