<template>
    <div :class="!disabled ? selected ? 'bg-main_bg underline' : 'hover:bg-main_bg hover:cursor-pointer bg-main_darkblue' : selected ? 'bg-main_bg underline' : 'opacity-30 bg-main_darkblue'" class="process flex justify-between mt-4 pl-5 pr-3 rounded items-center">
        <b :class="disabled ? selected ? '' : 'opacity-40' : ''" class="text-xl text-main_lighttext"> {{ name }} </b>
        <font-awesome-icon :icon="icon" class="rounded-full icon2" :class="disabled ? selected ? '' : 'opacity-40' : ''" size="2xl" />
    </div>
</template>

<script>
export default {
    name: 'BlockButton',
    props: {
        name: String,
        icon: String,
        selected: Boolean,
        disabled: Boolean,
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