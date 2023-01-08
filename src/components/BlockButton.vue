<template>
    <div :class="selected ? 'bg-main_bg underline' : 'bg-main_darkblue hover:bg-main_bg hover:cursor-pointer'" class="process flex justify-between mt-4 flex pl-5 pr-3 rounded flex items-center">
        <b class="text-xl text-main_lighttext"> {{ name }} </b>
        <font-awesome-icon :icon="icon" class="rounded-full icon2" size="2xl" />
    </div>
</template>

<script>
export default {
    name: 'BlockButton',
    props: {
        name: String,
        icon: String,
        selected: Boolean
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
</style>