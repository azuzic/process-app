<template>
    <div :class="!disabled ? taskActive ? 'border-2 border-main_green' : !$store.state.creatingTask ? 
    'bg-main_bg hover:bg-main_darkblue hover:border-2 hover:border-main_lighttext hover:cursor-pointer' : '' : 'opacity-40'" 
    class="h-14 mt-3 bg-main_blackblue py-4 px-2 rounded flex items-center relative">
        <b :class="!disabled ? taskActive ? 'animate-pulse' : '' : 'opacity-50'" class="text-base text-main_lighttext text"> {{ name }} </b>
        <span v-if="!taskUpdated" class="flex h-3 w-3 absolute -top-1 -right-1 ">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'TaskButton',
    props: {
        taskActive: Boolean,
        taskUpdated: Boolean,
        disabled: Boolean,
        name: String,
    },
}
</script>