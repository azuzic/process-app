<template>
    <div class="bg-main_bg px-4 flex flex-col pb-3">

        <div class="flex flex-col h-full">
            <b class="text-lg pl-1 mt-3 mb-1">Process Name</b>
            <input @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="$store.state.process.name" class="vue-input2 text-sm" placeholder="Enter process name ..." type="text">
            
            <b class="text-lg pl-1 my-1">Details</b>
            <textarea @input="$store.state.processUpdated ? $store.dispatch('checkUpdate') : ''" v-model="$store.state.process.details" class="vue-input2 text-sm" placeholder="Enter details ..." type="text" rows="10"></textarea>
            
            <b class="text-lg pl-1 my-1">Tasks</b>
            <div class="text-sm pl-4 text-main_lighttext h-full flex flex-col">
                <div v-if="$store.state.process.tasks.length > 0" class="flex flex-wrap py-4 overflow-y-auto overflow-x-hidden h-0 grow w-full"> 
                    <div class="flex flex-wrap h-fit">
                        <ProcessTaskBtn v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :task="item" :index="index" :selected="false"/>
                    </div>
                </div>
                <div v-else>
                    Empty ...
                </div>
            </div>
        </div>
        
        <ProcessFuncButtons />
    </div>
</template>

<script>
import ProcessFuncButtons from "./Buttons/ProcessFuncButtons.vue"
import ProcessTaskBtn from "./Buttons/ProcessTaskBtn.vue"

export default {
    name: "EditProcess",
    components: {
        ProcessFuncButtons,
        ProcessTaskBtn
    },
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