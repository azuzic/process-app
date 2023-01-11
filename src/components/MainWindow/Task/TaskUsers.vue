<template>
    <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow overflow-hidden ">
        <div class="flex flex-col">

            <b class="text-xs pl-1 mt-3 mb-1">Task visibility</b>

            <div class="vue-labelInput flex itmes-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in visibilityChips" v-bind:key="index" :name="item" class="mr-2" :array="visibilityChips" :index="index"/>
                </div>
                <input @input="updateVisibilityChips()" v-model="visibilityChip" class="chipInput py-2 bg-transparent outline-none" type="text"> 
            </div>

            <b class="text-xs pl-1 mt-3 mb-1">Task edit</b>
            
            <div class="vue-labelInput flex itmes-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in editChips" v-bind:key="index" :name="item" class="mr-2"
                        :array="editChips" :index="index" />
                </div>
                <input @input="updateEditChips()" v-model="editChip" class="chipInput py-2 bg-transparent outline-none"
                    type="text">
            </div>

            <b class="text-xs pl-1 mt-3 mb-1">Task completion</b>
            
            <div class="vue-labelInput flex itmes-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in completionChips" v-bind:key="index" :name="item" class="mr-2"
                        :array="completionChips" :index="index" />
                </div>
                <input @input="updateCompletionChips()" v-model="completionChip" class="chipInput py-2 bg-transparent outline-none"
                    type="text">
            </div>

            <br>
        </div>
        <TaskFuncButtons />
    </div>
</template>

<script>
import Chip from './Buttons/Chip.vue';
import TaskFuncButtons from "./Buttons/TaskFuncButtons.vue";
export default {
    name: "TaskUsers",
    components: {
        Chip,
        TaskFuncButtons
    },
    data() {
        return {
            visibilityChip: "",
            visibilityChips: [],
            editChip: "",
            editChips: [],
            completionChip: "",
            completionChips: []
        }
    },
    methods: {
        updateVisibilityChips() {
            if (this.visibilityChip.includes(",")) {
                let newChip = this.visibilityChip.split(",")[0];
                if (newChip != "") this.visibilityChips.push(newChip);
                this.visibilityChip = this.visibilityChip.split(",").slice(1).join(",").trim();
            }
        },
        updateEditChips() {
            if (this.editChip.includes(",")) {
                let newChip = this.editChip.split(",")[0];
                if (newChip != "") this.editChips.push(newChip);
                this.editChip = this.editChip.split(",").slice(1).join(",").trim();
            }
        },
        updateCompletionChips() {
            if (this.completionChip.includes(",")) {
                let newChip = this.completionChip.split(",")[0];
                if (newChip != "") this.completionChips.push(newChip);
                this.completionChip = this.completionChip.split(",").slice(1).join(",").trim();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fields {
    height: 500px;
}
.vue-labelInput {
    border-radius: 8px;
    background: #042630;
    border: solid #010910 2px;

    &:hover {
        background: rgb(4, 30, 40);
    }

    &:focus {
        background: rgb(4, 20, 30);
        border-color: #50A45E;
    }
}
.chipInput {
    width: calc(100% + 100px);
}
</style>