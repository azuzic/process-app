<template>
    <div :class="processActive ? 'selected' : !$store.state.creatingProcess ? 'btn' : ''" class="process mt-3 bg-main_bg px-2 rounded flex items-center relative">
        <b :class="processActive ? 'animate-pulse' : ''" class="text-xl text-main_lighttext text"> {{ name }} </b>
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
    data() {
        return {
        };
    },
}
</script>

<style lang="scss" scoped>
.process {
    height: 60px;
}
.selected {
    border: solid 2px #50A45E;
}
.btn:hover {
    background-color: #0b3c4b;
    border: solid 2px #A5C4C5;
    cursor: pointer;
}
</style>