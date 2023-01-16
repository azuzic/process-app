<template>
    <div class="vue-list bg-main_darkblue px-3 py-4 flex flex-col text-sm">
        <div class="flex flex-col">
            <div class="mb-1">Search users</div>
            <div class="vue-input2 mb-2 flex">
                <font-awesome-icon icon="magnifying-glass" class="rounded-full icon2" size="lg" />
                <input v-model="$store.state.eventLogUser" class="w-full ml-2 bg-transparent outline-none" placeholder="User name ..." type="text">
            </div>
            <div v-if="$store.state.event != 'ConversationEvents'">
                <select v-model="$store.state.eventLogTask" class="vue-select w-full mb-2 text-main_lighttext">
                    <option value="None">None</option>
                    <option v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :value="item.name">{{item.name}}</option>
                </select>
            </div>

            <LogCheckBox v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Joined process'" :value="$store.state.eventLog.joinedProcess"/>
            <LogCheckBox v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Finished process'" :value="$store.state.eventLog.finishedProcess"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Created task'" :value="$store.state.eventLog.createdTask"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Started task'" :value="$store.state.eventLog.startedTask"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Updated task'" :value="$store.state.eventLog.updatedTask"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Finished task'" :value="$store.state.eventLog.finishedTask"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Deleted task'" :value="$store.state.eventLog.deletedTask"/>
            <LogCheckBox v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Opened session'" :value="$store.state.eventLog.openedSession"/>
            <LogCheckBox v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Closed session'" :value="$store.state.eventLog.closedSession"/>

        </div>
    </div>
</template>

<script>
import LogCheckBox from "./LogCheckBox.vue";
export default {
    name: "LogEventOptions",
    components: {
        LogCheckBox
    },  
    data() {
        return {
        }
    },
}
</script>