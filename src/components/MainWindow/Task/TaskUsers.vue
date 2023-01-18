<template>
    <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow overflow-hidden ">
        <div class="flex flex-col">
            <!----------------------------------------Task visibility------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Task visibility</b>
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <Chip v-for="(item, index) in $store.state.task.visibilityUsers" v-bind:key="index" :name="item" class="mr-2" 
                    :array="$store.state.task.visibilityUsers" :index="index" :type="'TaskVisibility'" />
                <input list="visibilityChip" @input="updateVisibilityChips()" v-model="visibilityChip" class="chipInput py-2 bg-transparent outline-none" type="text"> 
                <datalist id="visibilityChip">
                    <option v-for="(item, index) in array(1)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Task visibility-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            <!----------------------------------------Task edit------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Task edit</b>
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <Chip v-for="(item, index) in $store.state.task.editUsers" v-bind:key="index" :name="item" class="mr-2"
                    :array="$store.state.task.editUsers" :index="index" :type="'TaskEdit'" />
                <input list="editChip" @input="updateEditChips()" v-model="editChip" class="chipInput py-2 bg-transparent outline-none" type="text">
                <datalist id="editChip">
                    <option v-for="(item, index) in array(2)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Task edit-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            <!----------------------------------------Task completion------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Task completion</b>
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <Chip v-for="(item, index) in $store.state.task.completionUsers" v-bind:key="index" :name="item" class="mr-2"
                    :array="$store.state.task.completionUsers" :index="index" :type="'TaskCompletion'" />
                <input list="completionChip" @input="updateCompletionChips()" v-model="completionChip" class="chipInput py-2 bg-transparent outline-none" type="text">
                <datalist id="completionChip">
                    <option v-for="(item, index) in array(3)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Task completion-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
        </div>
        <TaskFuncButtons />
    </div>
</template>

<script>
import Chip from '../../Other/Chip.vue';
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
            editChip: "",
            completionChip: "",
        }
    },
    methods: {
        updateVisibilityChips() {
            try {
                if (this.visibilityChip.includes(",")) {
                    let newChip = this.visibilityChip.split(",")[0].trim();

                    if (this.$store.state.task.visibilityUsers == undefined)
                        this.$store.state.task.visibilityUsers = [];

                    if (!this.$store.state.task.visibilityUsers.includes(newChip)) {

                        this.$store.dispatch('checkTaskUpdate');

                        if (newChip != "") this.$store.state.task.visibilityUsers.push(newChip);
                        this.visibilityChip = this.visibilityChip.split(",").slice(1).join(",").trim();
                    }
                    else this.visibilityChip = newChip;
                }
            } catch (error) { console.error("TaskUsers.vue - updateVisibilityChips:", error); }
        },
        updateEditChips() {
            try {
                if (this.editChip.includes(",")) {
                    let newChip = this.editChip.split(",")[0].trim();

                    if (this.$store.state.task.editUsers == undefined)
                        this.$store.state.task.editUsers = [];

                    if (!this.$store.state.task.editUsers.includes(newChip)) {

                        this.$store.dispatch('checkTaskUpdate');

                        if (newChip != "") this.$store.state.task.editUsers.push(newChip);
                        this.editChip = this.editChip.split(",").slice(1).join(",").trim();
                    }
                    else this.editChip = newChip;
                }
            } catch (error) { console.error("TaskUsers.vue - updateEditChips:", error); }
        },
        updateCompletionChips() {
            try {
                if (this.completionChip.includes(",")) {
                    let newChip = this.completionChip.split(",")[0].trim();

                    if (this.$store.state.task.completionChip == undefined)
                        this.$store.state.task.completionChip = [];

                    if (!this.$store.state.task.completionChip.includes(newChip)) {

                        this.$store.dispatch('checkTaskUpdate');

                        if (newChip != "") this.$store.state.task.completionUsers.push(newChip);
                        this.completionChip = this.completionChip.split(",").slice(1).join(",").trim();
                    }
                    else this.completionChip = newChip;
                }
            } catch (error) { console.error("TaskUsers.vue - updateCompletionChips:", error); }
        },
        array(a) {
            try {
                switch (a) {
                    case 1:
                        return [...new Set(this.$store.state.task.editUsers
                            .concat(this.$store.state.task.completionUsers)
                            .filter(n => !this.$store.state.task.visibilityUsers.includes(n))
                            .map(val => val + ","))];
                    case 2:
                        return [...new Set(this.$store.state.task.visibilityUsers
                            .concat(this.$store.state.task.completionUsers)
                            .filter(n => !this.$store.state.task.editUsers.includes(n))
                            .map(val => val + ","))];
                    case 3:
                        return [...new Set(this.$store.state.task.editUsers
                            .concat(this.$store.state.task.visibilityUsers)
                            .filter(n => !this.$store.state.task.completionUsers.includes(n))
                            .map(val => val + ","))];
                    default:
                        break;
                }
            } catch (error) { console.error("TaskUsers.vue - array:", error); }
        }
    }
}
</script>

<style lang="scss" scoped>
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