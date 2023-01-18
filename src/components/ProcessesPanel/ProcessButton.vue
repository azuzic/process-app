<template>
    <div :class="processActive ? 'border-2 border-main_green bg-main_blackblue' : 
    $store.state.creatingTask ? 'bg-main_blackblue' : 
    'bg-main_bg hover:bg-main_blackblue hover:border-2 hover:border-main_lighttext hover:cursor-pointer'" 
    class="h-16 mt-3  px-2 rounded flex items-center relative">
        <b :class="processActive ? 'animate-pulse' : ''" class="text-lg text-main_lighttext text"> {{ name }} </b>
        <span v-if="!processUpdated" class="flex h-3 w-3 absolute -top-1 -right-1 ">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'ProcessButton',
    props: {
        processActive: Boolean,
        processUpdated: Boolean,
        name: String,
    },
}
</script>