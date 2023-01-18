<template>
    <!----------------------------------------PROCESS------------------------------------------>
    <div v-if="['ViewProcess', 'EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow)" 
    class="h-20 bg-main_blackblue flex px-4 items-center">  
        <menu-item @click="$store.state.currentWindow = 'ViewProcess', $store.dispatch('updateUserStep')"
        v-if="!$store.state.process.editUsers.includes($store.state.data.tag)"
        :selected="$store.state.currentWindow == 'ViewProcess'"
        :disabled="false">View <br> Process</menu-item>

        <menu-item @click="$store.state.currentWindow = 'EditProcess', $store.dispatch('updateUserStep')"
        v-if="$store.state.process.editUsers.includes($store.state.data.tag)"
        :selected="$store.state.currentWindow == 'EditProcess'"
        :disabled="false">Edit <br> Process</menu-item>

        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ProcessDiagram', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'ProcessDiagram'"
        :disabled="$store.state.creatingProcess">Process <br> Diagram</menu-item>

        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ProcessAnalytics', $store.dispatch('updateUserStep')) : ''" 
        v-if="$store.state.process.editUsers.includes($store.state.data.tag)"
        :selected="$store.state.currentWindow == 'ProcessAnalytics'"
        :disabled="$store.state.creatingProcess">Process <br> Analytics</menu-item>

        <menu-item @click="$store.state.currentWindow = 'ProcessUsers', $store.dispatch('updateUserStep')"
        v-if="$store.state.process.editUsers.includes($store.state.data.tag)"
        :selected="$store.state.currentWindow == 'ProcessUsers'"
        :disabled="$store.state.creatingProcess">Process <br> Users</menu-item>
    </div>
    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-PROCESS-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    <!----------------------------------------TASKS------------------------------------------>
    <div v-if="['EditTask', 'TaskUsers'].includes($store.state.currentWindow)" 
    class="h-20 bg-main_blackblue flex px-4 items-center">
        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'EditTask', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'EditTask'">Edit Task</menu-item>

        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'TaskUsers', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'TaskUsers'">Task Users</menu-item>
    </div>
    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-TASKS-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    <!----------------------------------------EVENT LOG------------------------------------------>
    <div v-if="['ViewEvent', 'CreateEvent'].includes($store.state.currentWindow)" 
    class="h-20 bg-main_blackblue flex px-4 items-center">
        <menu-item @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ViewEvent', $store.dispatch('updateUserStep')) : ''"
        :selected="$store.state.currentWindow == 'ViewEvent'"
        :disabled="false">View Event</menu-item>
        <menu-item 
        :selected="$store.state.currentWindow == 'CreateEvent'"
        :disabled="true">Create Event</menu-item>
    </div>
    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-EVENT LOG-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    <!----------------------------------------CURRENT TASK------------------------------------------>
    <div v-if="['CurrentTask'].includes($store.state.currentWindow)" 
    class="h-20 bg-main_blackblue flex px-4 items-center">
        <menu-item :selected="$store.state.currentWindow == 'CurrentTask'"
        :disabled="false">View Task</menu-item>
    </div>
    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-CURRENT TASK-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
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