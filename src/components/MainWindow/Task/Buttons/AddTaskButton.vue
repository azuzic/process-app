<template>
    <div :class="!$store.state.creatingTask ? 'field' : 'disabled'"  class="mt-3 justify-between bg-main_white py-4 px-2 rounded flex items-center">
        <b class="text-lg text-main_darktext">Add new task</b>
        <font-awesome-icon icon="circle-plus" class="rounded-full icon ml-2" size="2xl" />
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
    height: 48px;

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
.disabled {
    height: 60px;
    background-color: #08313E;

    b {
        color: rgba(217, 217, 217, 0.25);
    }

    .icon {
        filter: opacity(25%);
    }
}
</style>