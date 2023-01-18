<template>
    <div :class="!disabled ? selected ? 'bg-main_bg underline' : 'hover:bg-main_bg hover:cursor-pointer bg-main_darkblue' : selected ?
    'bg-main_bg underline' : 'opacity-30 bg-main_darkblue'" class="h-16 flex justify-between mt-4 pl-5 pr-3 rounded items-center">
        <b :class="disabled ? selected ? '' : 'opacity-40' : ''" class="text-xl text-main_lighttext"> {{ name }} </b>
        <i :class="disabled ? selected ? ('fa-' + icon + '') : ('opacity-40 fa-' + icon + '') : ('fa-' + icon + '')" class="fa-solid rounded-full text-2xl"></i>
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
}
</script>