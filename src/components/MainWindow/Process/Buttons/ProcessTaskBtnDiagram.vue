<template>
    <div :class="selected ? 'border-main_green border-4' : 'hover:bg-main_blackblue border-4 hover:cursor-pointer border-main_blackblue'"
    class="bg-main_darkblue rounded px-3 flex font-bold items-center text-sm w-36 relative z-10"
    :style="!$store.state.process.editUsers.includes($store.state.data.tag) ? 
    'height: 112px; padding-top: 20px; padding-bottom: 20px;' : 
    'height: 96px; padding-top: 16px; padding-bottom: 16px;'">
        <!--NUMBER-->
        <div class="mr-2 text-main_cyan h-full">
            {{ index+1 }}.
        </div>
        <!--NAME-->
        <div class="h-full text3 overflow-hidden w-48">
            {{ name }}
        </div>
        
        <!----------------------------------------Task Progress------------------------------------------>
        <div v-if="$store.state.process.editUsers.includes($store.state.data.tag)" 
        class="absolute h-6 -top-3 w-full right-0 flex justify-evenly">
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue  border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_cyan">{{task.started.length}}</div>
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_red">{{task.inProgress.length}}</div>
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_yellow">{{task.finished.length}}</div>
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Task Progress-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>
</template>
<script>
export default {
    name: "ProcessTaskBtnDiagram",
    props: {
        index: Number,
        name: String,
        selected: Boolean,
        task: Object,
    }
}
</script>