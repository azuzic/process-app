<template>
    <div class="bg-main_blackblue text-main_white font-bold text-center rounded-full text-xs px-2.5 py-1.5 flex">
        <div class="whitespace-nowrap">{{ name }}</div>
        <div>
            <font-awesome-icon @click="array.splice(index, 1)" icon="circle-xmark" class="ml-1.5 rounded-full icon2 hover:cursor-pointer x" size="lg" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'Chip',
    props: {
        name: String,
        array: Array,
        index: Number,
    }
}
</script>
<style lang="scss" scoped>
.x:hover {
    filter: invert(75%) sepia(88%) saturate(2267%) hue-rotate(347deg) brightness(92%) contrast(86%);
}
</style>