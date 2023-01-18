<template>
    <div class="field mt-3 justify-around bg-main_white px-2 py-2 rounded flex items-center">
        <b class="text-sm text-main_darktext">Add field</b> 
        <i class="fa-solid fa-circle-plus text-main_darktext text-lg rounded-full ml-2"></i>
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
        b, i{
            color: rgb(217, 217, 217);
        }
    }
}
</style>