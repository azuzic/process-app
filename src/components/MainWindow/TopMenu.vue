<template>
    <div v-if="['EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow)" 
    class="menu bg-main_blackblue flex px-4 items-center">  
        <menu-item :selected="true" :disabled="$store.state.creatingProcess">Edit <br> Process</menu-item>
        <menu-item :selected="false" :disabled="$store.state.creatingProcess">Process <br> Diagram</menu-item>
        <menu-item :selected="false" :disabled="$store.state.creatingProcess">Process <br> Analytics</menu-item>
        <menu-item :selected="false" :disabled="$store.state.creatingProcess">Process <br> Users</menu-item>
    </div>
    <div v-if="['EditTask', 'TaskUsers'].includes($store.state.currentWindow)" 
    class="menu bg-main_blackblue flex px-4 items-center">
        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'EditTask', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'EditTask'">Edit Task</menu-item>
        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'TaskUsers', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'TaskUsers'">Task Users</menu-item>
    </div>
    <div v-if="['ViewEvent', 'CreateEvent'].includes($store.state.currentWindow)" 
    class="menu bg-main_blackblue flex px-4 items-center">
        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ViewEvent', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'ViewEvent'">View Event</menu-item>
        <menu-item 
        :selected="$store.state.currentWindow == 'CreateEvent'">Create Event</menu-item>
    </div>
</template>

<script>
import MenuItem from '../Other/MenuItem.vue'
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