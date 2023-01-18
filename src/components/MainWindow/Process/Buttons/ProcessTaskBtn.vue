<template>
    <div v-if="task.visibilityUsers.includes($store.state.data.tag)"
    :class="selected ? 'border-2 border-main_green' : 'hover:bg-main_blackblue hover:cursor-pointer'" class="bg-main_darkblue rounded px-3 py-4 flex font-bold items-center mr-3 mb-6 text-sm w-36 h-24 relative">
        <!--NUMBER-->
        <div class="mr-2 text-main_cyan h-full">
            {{ index+1 }}.
        </div>
        <!--NAME-->
        <div class="h-full text3 overflow-hidden w-48">
            {{ task.name }}
        </div>

        <!----------------------------------------Task Progress------------------------------------------>       
        <div v-if="$store.state.process.editUsers.includes($store.state.data.tag)" 
        class="absolute h-6 -top-3 w-full right-0 flex justify-evenly">
            <div :class="selected ? 'border-main_green border-2' : 'border-main_bg border-3'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_cyan">{{task.started.length}}</div>
            <div :class="selected ? 'border-main_green border-2' : 'border-main_bg border-3'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_red">{{task.inProgress.length}}</div>
            <div :class="selected ? 'border-main_green border-2' : 'border-main_bg border-3'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs text-main_yellow">{{task.finished.length}}</div>
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Task Progress-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>
</template>
<script>
export default {
    name: "ProcessTaskBtn",
    props: {
        index: Number,
        task: Object,
        selected: Boolean,
    },
}
</script>