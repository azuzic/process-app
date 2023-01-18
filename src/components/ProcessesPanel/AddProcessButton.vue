<template>
    <div :class="!$store.state.creatingProcess ? 'group active hover:bg-main_bg hover:cursor-pointer bg-main_white' : 'group disabled bg-main_bg'"
        class="h-16 mt-3 justify-around px-2 rounded flex items-center">
        <b class="group-[.active:hover]:text-main_white text-lg group-[.active]:text-main_darktext group-[.disabled]:opacity-25">Create process</b>
        <i class="group-[.active:hover]:text-main_white fa-solid fa-circle-plus text-3xl group-[.active]:text-main_darktext group-[.disabled]:opacity-25"></i>
    </div>
</template>

<script>
export default {
    name: 'AddProcessButton',
}
</script>