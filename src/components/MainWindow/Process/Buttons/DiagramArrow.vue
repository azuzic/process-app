<template>
    <div class="w-8 border-2 rounded-full border-main_blackblue relative flex items-center justify-end mr-1.5">
        <font-awesome-icon icon="play" class="rounded-full darkIcon absolute -mr-2" />
    </div>
</template>

<script>
export default {
    name: "DiagramArrow",
}
</script>

<style lang="scss" scoped>
.darkIcon {
    filter: sepia(7%) saturate(7496%) hue-rotate(163deg) brightness(24%) contrast(160%);
}
</style>