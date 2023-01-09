<template>
    <div :class="!$store.state.creatingProcess ? 'process' : 'disabled'" class="mt-3 justify-around bg-main_white px-2 rounded flex items-center">
        <b class="text-xl text-main_darktext">Create process</b> 
        <font-awesome-icon icon="circle-plus" class="rounded-full icon" size="2xl" />
    </div>
</template>

<script>
export default {
    name: 'AddProcessButton',
    props: {
    }
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