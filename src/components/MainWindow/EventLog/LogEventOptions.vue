<template>
    <div class="w-60 bg-main_darkblue px-3 py-4 flex flex-col text-sm">
        <div class="flex flex-col">
            <div class="mb-1">Search users</div>
            <div class="vue-input2 mb-2 flex">
                <font-awesome-icon icon="magnifying-glass" class="rounded-full icon2" size="lg" />
                <input class="w-full ml-2 bg-transparent outline-none" placeholder="User name ..." type="text">
            </div>

            <select v-if="$store.state.event != 'ConversationEvents'" class="vue-select w-full mb-2 text-main_lighttext">
                <option value="None">None</option>
                <option v-for="(item, index) in $store.state.process.tasks"
                    v-bind:key="index" :value="item.name">{{item.name}}</option>
            </select>

            <LogCheckBox v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Joined process'" :value="$store.state.joinedProcess"/>
            <LogCheckBox v-if="['AllLogEvents', 'ProcessEvents'].includes($store.state.event)" :label="'Finished process'" :value="$store.state.finishedProcess"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Started task'" :value="$store.state.startedtask"/>
            <LogCheckBox v-if="['AllLogEvents', 'TaskEvents'].includes($store.state.event)" :label="'Finished task'" :value="$store.state.finishedtask"/>
            <LogCheckBox v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Opened session'" :value="$store.state.openedSession"/>
            <LogCheckBox v-if="['AllLogEvents', 'ConversationEvents'].includes($store.state.event)" :label="'Closed session'" :value="$store.state.closedSession"/>

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

<style lang="scss" scoped>

</style>