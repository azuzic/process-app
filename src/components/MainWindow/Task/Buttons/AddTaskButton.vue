<template>
    <div :class="!$store.state.creatingTask ? 'field' : 'disabled'"  class="mt-3 justify-between bg-main_white py-4 px-2 rounded flex items-center">
        <b class="text-base text-main_darktext">Add new task</b>
        <i class="fa-solid fa-circle-plus text-main_darktext text-3xl rounded-full ml-2"></i>
    </div>
</template>

<script>
export default {
    name: 'AddTaskButton',
    props: {
    }
}
</script>

<style lang="scss" scoped>
.field {
    height: 55px;
    &:hover {
        background-color: rgb(4, 20, 33);
        cursor: pointer;
        b, i {
            color: rgb(217, 217, 217);
        }
    }
}
.disabled {
    height: 60px;
    background-color: #08313E;
    b, i {
        color: rgba(217, 217, 217, 0.25);
    }
}
</style>