<template>
    <div :class="processActive ? 'selected' : !this.$store.state.creatingProcess ? 'btn' : ''" class="process mt-3 bg-main_bg px-2 rounded flex items-center">
        <b :class="processActive ? 'animate-pulse' : ''" class="text-xl text-main_lighttext text"> {{ name }} </b>
    </div>
</template>

<script>
export default {
    name: 'ProcessButton',
    props: {
        processActive: Boolean,
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