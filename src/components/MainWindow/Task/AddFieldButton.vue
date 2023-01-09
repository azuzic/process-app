<template>
    <div class="field mt-3 justify-around bg-main_white px-2 rounded flex items-center">
        <b class="text-sm text-main_darktext">Add field</b> 
        <font-awesome-icon icon="circle-plus" class="rounded-full icon ml-2" size="lg" />
    </div>
</template>

<script>
export default {
    name: 'AddFieldButton',
    props: {
    }
}
</script>

<style lang="scss" scoped>
.field {
    height: 30px;
    &:hover {
        background-color: rgb(4, 20, 33);
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