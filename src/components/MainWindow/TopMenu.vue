<template>
    <div v-if="['EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow)" 
    class="menu bg-main_blackblue flex px-4 items-center">  
        <menu-item @click="$store.state.currentWindow = 'EditProcess', $store.dispatch('updateUserStep')"
        :selected="$store.state.currentWindow == 'EditProcess'"
        :disabled="false">Edit <br> Process</menu-item>

        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ProcessDiagram', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'ProcessDiagram'"
        :disabled="$store.state.creatingProcess">Process <br> Diagram</menu-item>

        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ProcessAnalytics', $store.dispatch('updateUserStep')) : ''" 
        :selected="$store.state.currentWindow == 'ProcessAnalytics'"
        :disabled="$store.state.creatingProcess">Process <br> Analytics</menu-item>

        <menu-item @click="$store.state.currentWindow = 'ProcessUsers', $store.dispatch('updateUserStep')"
        :selected="$store.state.currentWindow == 'ProcessUsers'"
        :disabled="false">Process <br> Users</menu-item>
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
        :selected="$store.state.currentWindow == 'ViewEvent'"
        :disabled="false">View Event</menu-item>
        <menu-item 
        :selected="$store.state.currentWindow == 'CreateEvent'"
        :disabled="true">Create Event</menu-item>
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