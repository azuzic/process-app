<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            <div class="flex flex-col grow">
                <!----------------------------------------TASK NAME AND DETAILS------------------------------------------>
                <div class="flex flex-col">
                    <!--NAME-->
                    <b class="text-lg pl-1 mt-3 mb-1">Task Name</b>
                    <input @input="$store.dispatch('checkTaskUpdate')" v-model="$store.state.task.name"
                        class="vue-input2 text-sm" placeholder="Enter task name ..." type="text">
                    <!--DETAILS-->
                    <b class="text-lg pl-1 my-1">Details</b>
                    <textarea @input="$store.dispatch('checkTaskUpdate')" v-model="$store.state.task.details"
                        class="vue-input2 text-sm" placeholder="Enter details ..." type="text" rows="4"></textarea>
                </div>
                <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-TASK NAME AND DETAILS-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

                <!----------------------------------------FIELDS------------------------------------------>
                <b class="text-lg pl-1 my-2">Fields</b>
                <hr class="border-2 border-bg_white rounded-full mb-2" />
                <div class="flex flex-col overflow-y-auto px-4 -mx-4 overflow-x-hidden pb-4 h-0 grow">
                    <Field v-for="(item, index) in $store.state.task.fields" v-bind:key="index" :hash="item.hash"
                        :type="item.active ? $store.state.field.type : item.type" :isActive="item.active"
                        :data="item.active ? $store.state.field.data : item.data" @click="!item.active ? setActiveField(item.hash) : ''" />
                    <AddFieldButton @click="fieldSelected = true, createField()" class="w-fit" />
                </div>
                <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-FIELDS-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

                <!----------------------------------------NEXT TASK------------------------------------------>
                <hr class="border-2 border-bg_white rounded-full mb-2" />
                <div class="mb-6 flex items-end mt-3">
                    <!--NEXT TYPE-->
                    <select v-model="$store.state.task.next.type" @input="nextTaskType()" class="vue-select">
                        <option value="Automatic">Automatic</option>
                        <option value="Task">Task</option>
                        <option value="If">If</option>
                        <option value="Switch" disabled>Switch</option>
                        <option value="Divide" disabled>Divide</option>
                    </select>
                    <!--AUTOMATIC-->
                    <div v-if="$store.state.task.next.type=='Automatic'" class="ml-4">
                        Next task is:
                        <b class="text-main_red" v-if="$store.state.task.index + 1 >= $store.state.process.tasks.length">End</b>
                        <b class="text-main_cyan" v-else-if="$store.state.process.tasks[$store.state.task.index + 1] != undefined">{{$store.state.process.tasks[$store.state.task.index+1].name}}</b>
                        <b class="text-main_red" v-else>End</b>
                    </div>
                    <!--TASK-->
                    <div v-if="$store.state.task.next.type=='Task'" class="ml-4 flex grow items-end">
                        <div class="min-w-fit mr-2">
                            Next task is:
                        </div>
                        <select v-model="$store.state.task.next.data" @input="$store.dispatch('checkTaskUpdate')"  
                        class="hover:bg-main_darkblue bg-main_darktext w-full -m-0.5 p-0.5 rounded font-bold" 
                        :class="$store.state.task.next.data.name!='End' ? 'text-main_cyan' : 'text-main_red'">
                            <option v-for="(item, index) in array(1)" v-bind:key="index" :value="item"
                            class="text-main_cyan">{{item.name}}
                            </option>
                            <option :value="{ name: 'End', id: '' }" class="text-main_red">End</option>
                        </select>
                    </div>
                    <!--IF-->
                    <div v-if="$store.state.task.next.type=='If'" class="ml-4 flex flex-col grow items-end">
                        <!--ACCEPTED-->
                        <div>
                            <div class="min-w-fit mr-2">
                                If <b class="text-main_green">accepted</b> next task is:
                            </div>
                            <select v-model="$store.state.task.next.data.accepted" @input="$store.dispatch('checkTaskUpdate')"
                                class="hover:bg-main_darkblue bg-main_darktext w-full -m-0.5 p-0.5 rounded font-bold"
                                :class="$store.state.task.next.data.accepted != undefined ? $store.state.task.next.data.accepted.name!='End' ? 
                                'text-main_cyan' : 'text-main_red' : ''">
                                <option v-for="(item, index) in array(1)" v-bind:key="index" :value="item" class="text-main_cyan">{{item.name}}
                                </option>
                                <option :value="{ name: 'End', id: '' }" class="text-main_red">End</option>
                            </select>
                        </div>
                        <!--DECLINED-->
                        <div>
                            <div class="min-w-fit mr-2">
                                If <b class="text-main_red">declined</b> next task is:
                            </div>
                            <select v-model="$store.state.task.next.data.declined" @input="$store.dispatch('checkTaskUpdate')"
                                class="hover:bg-main_darkblue bg-main_darktext w-full -m-0.5 p-0.5 rounded font-bold"
                                :class="$store.state.task.next.data.declined != undefined ? $store.state.task.next.data.declined.name!='End'
                                ? 'text-main_cyan' : 'text-main_red' : ''">
                                <option v-for="(item, index) in array(1)" v-bind:key="index" :value="item" class="text-main_cyan">{{item.name}}
                                </option>
                                <option :value="{ name: 'End', id: '' }" class="text-main_red">End</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-NEXT TASK-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            </div>
            <!--TASK SAVE/UPDATE/DELETE-->
            <TaskFuncButtons />
        </div>
        <!--FIELD OPTION-->
        <FieldOptions />
    </div>
</template>

<script>
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
        async nextTaskType() {
            try {
                this.$store.state.task.next.data = {
                    name: "",
                    id: "",
                }
                await this.$store.dispatch('wait', 0.01);
                switch (this.$store.state.task.next.type) {
                    case "Task":
                        let next = {};
                        next = this.$store.state.task.index + 1 >= this.$store.state.process.tasks.length ? "End" :
                            this.$store.state.process.tasks[this.$store.state.task.index + 1] != undefined ?
                                this.$store.state.process.tasks[this.$store.state.task.index + 1] : 'End';
                        if (next == "End") {
                            this.$store.state.task.next.data = {
                                name: "End",
                                id: "",
                            }
                        }
                        else {
                            this.$store.state.task.next.data = {
                                name: next.name,
                                id: next.hash,
                            }
                        }
                        break;
                    case "If":
                        let next2 = {};
                        next2 = this.$store.state.task.index + 1 >= this.$store.state.process.tasks.length ? "End" :
                            this.$store.state.process.tasks[this.$store.state.task.index + 1] != undefined ?
                                this.$store.state.process.tasks[this.$store.state.task.index + 1] : 'End';
                        if (next2 == "End") {
                            this.$store.state.task.next.data = {
                                accepted: {
                                    name: "End",
                                    id: "",
                                },
                                declined: {
                                    name: "End",
                                    id: "",
                                }
                            }
                        }
                        else {
                            this.$store.state.task.next.data = {
                                accepted: {
                                    name: next2.name,
                                    id: next2.hash,
                                },
                                declined: {
                                    name: next2.name,
                                    id: next2.hash,
                                }
                            }
                        }
                        break;
                    default: break;
                };
                await this.$store.dispatch('wait', 0.01);
                this.$store.dispatch('checkTaskUpdate');
            } catch (error) { console.error("EditTask.vue - nextTaskType:", error); }
        },
        setActiveField(hash) {
            try {
                this.$store.state.task.fields.forEach(field => {
                    if (field.hash == hash) {
                        field.active = true;
                        this.$store.state.fieldUpdated = field.updated;
                        this.$store.state.field = field;
                        this.$store.state.fieldSelected = true;
                    }
                    else
                        field.active = false;
                });
                this.$store.dispatch('checkTaskUpdate');
            } catch (error) { console.error("EditTask.vue - setActiveField:", error); }
        },
        async createField() {
            try {
                this.$store.state.creatingField = true;
                this.$store.state.fieldSelected = true;
                this.$store.state.task.fields.forEach(field => {
                    if (field.active)
                        field.active = false;
                });
                this.$store.state.field = {
                    hash: cryptoRandomString({ length: 32, type: 'alphanumeric' }),
                    active: true,
                    updated: false,
                    type: "Text Field",
                    data: {
                        fieldLabel: "Field Name",
                        fieldDescription: "Field Description",
                        defaultValue: "Enter text ...",
                        dropdownValues: "1,2,3",
                        required: "true"
                    },
                };
                this.$store.state.task.fields.push(this.$store.state.field);
                this.$store.dispatch('checkTaskUpdate');
            } catch (error) { console.error("EditTask.vue - createField:", error); }
        },  
        array(n) {
            try {
                switch (n) {
                    case 1:
                        let temp = [];
                        this.$store.state.process.tasks.forEach(task => {
                            temp.push({
                                name: task.name,
                                id: task.hash,
                            });
                        });
                        return temp;
                    default: break;
                }
            } catch (error) { console.error("EditTask.vue - array:", error); }
        }
    }
}
</script>