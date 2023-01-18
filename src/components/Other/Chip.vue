<template>
    <div class="bg-main_blackblue text-main_white font-bold text-center rounded-full text-xs px-2.5 py-1.5 flex items-center">
        <div class="whitespace-nowrap">{{ name }}</div>

        <i v-if="!['ProcessVisibility', 'ProcessEdit','TaskEdit'].includes(type) || name != 'ADMIN'"
        @click="array.splice(index, 1), $store.state.currentWindow == 'TaskUsers' ? $store.dispatch('checkTaskUpdate') : ''"  
        class="fa-solid text-main_white fa-circle-xmark ml-1.5 rounded-full hover:cursor-pointer hover:text-main_red text-sm"></i>
    </div>
</template>

<script>

export default {
    name: 'Chip',
    props: {
        name: String,
        array: Array,
        index: Number,
        type: String,
    }
}
</script>