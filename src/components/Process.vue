<template>
    <div class="process mt-3 flex justify-around bg-main_white px-2 rounded flex items-center">
        <b class="text-xl text-main_darktext">Create process</b> <font-awesome-icon icon="circle-plus" class="rounded-full icon" size="2xl" />
    </div>
</template>

<script>

export default {
    name: 'Processes',
}

</script>

<style lang="scss" scoped>
.process {
    height: 60px;
    &:hover {
        background-color: #08313E;
        cursor: pointer;
        b {
            color: rgb(217, 217, 217);
        }
        .icon {
            filter: none;
        }
    }
}
</style>