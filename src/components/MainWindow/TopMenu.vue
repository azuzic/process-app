<template>
    <div v-if="['EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow)" 
        class="menu bg-main_blackblue flex px-4 items-center">  
        <menu-item :selected="true">Edit <br> Process</menu-item>
        <menu-item :selected="false">Process <br> Diagram</menu-item>
        <menu-item :selected="false">Process <br> Analytics</menu-item>
        <menu-item :selected="false">Process <br> Users</menu-item>
    </div>
    <div v-if="['EditTask', 'EditUsers'].includes($store.state.currentWindow)" class="menu bg-main_blackblue flex px-4 items-center">
        <menu-item :selected="true">Edit Task</menu-item>
        <menu-item :selected="false">Task Users</menu-item>
    </div>
</template>

<script>
import MenuItem from '../TopMenu/MenuItem.vue'
export default {
    name: "TopMenu",
    components: {
        MenuItem
    }
}
</script>

<style lang="scss" scoped>
.menu {
    height: 90px;
}
</style>