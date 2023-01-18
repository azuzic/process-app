<template>
    <div class="vue-list bg-main_darkblue px-3 py-4 flex flex-col text-sm">
        <div class="flex flex-col">
            <div class="mb-1">Search users</div>
            <div class="vue-input2 mb-2 flex items-center">
                <i class="fa-solid fa-magnifying-glass text-main_lighttext text-lg opacity-50"></i>
                <input v-model="$store.state.eventLogUser" class="w-full ml-2 bg-transparent outline-none" placeholder="User name ..." type="text">
            </div>
            <div v-if="$store.state.event != 'ConversationEvents'">
                <select v-model="$store.state.eventLogTask" class="vue-select w-full mb-2 text-main_lighttext">
                    <option value="None">None</option>
                    <option v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" :value="item.name">{{item.name}}</option>
                </select>
            </div>
            
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Created process'" :value="$store.state.eventLog.createdProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Updated process'" :value="$store.state.eventLog.updatedProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Joined process'" :value="$store.state.eventLog.joinedProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Left process'" :value="$store.state.eventLog.leftProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Started process'" :value="$store.state.eventLog.startedProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Finished process'" :value="$store.state.eventLog.finishedProcess"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Created task'" :value="$store.state.eventLog.createdTask"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Started task'" :value="$store.state.eventLog.startedTask"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Updated task'" :value="$store.state.eventLog.updatedTask"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Finished task'" :value="$store.state.eventLog.finishedTask"/>
            <LogCheckBox :disabled="false" v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Deleted task'" :value="$store.state.eventLog.deletedTask"/>
            <LogCheckBox :disabled="true" v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Opened session'" :value="$store.state.eventLog.openedSession"/>
            <LogCheckBox :disabled="true" v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Closed session'" :value="$store.state.eventLog.closedSession"/>

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