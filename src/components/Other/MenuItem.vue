<template>
    <div class="flex flex-col mr-4">
        <div class="text-center font-bold px-4 py-1" :class="!selected ? !disabled ? 'hover:cursor-pointer hover:text-main_green' : '' : ''">
            <slot></slot>
        </div>
        <hr v-if="selected" class="border-main_white border-2 rounded-full">
    </div>
</template>

<script>
export default {
    name: "MenuItem",
    props: {
        selected: Boolean,
        disabled: Boolean,
    }
}
</script>