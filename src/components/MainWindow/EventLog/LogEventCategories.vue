<template>
    <div class="vue-list bg-main_darktext flex flex-col py-4">
        <div class="flex flex-col px-4">
            <TaskButton :taskActive="$store.state.event == 'AllLogEvents'" 
            :taskUpdated="true" :disabled="false" :name="'All Log Events'"
            @click="eventSort([], true) , $store.state.event = 'AllLogEvents'"/>
        
            <div class="text-xl font-bold mt-4"> Log Events </div>
            <hr class="border-2 border-bg_main_white rounded-full my-2">
        </div>
        <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow px-4">
            <TaskButton :taskActive="$store.state.event == 'ProcessEvents'" 
            :taskUpdated="true" :disabled="false" :name="'Process Events'" 
            @click="eventSort(['joinedProcess', 'finishedProcess', 'leftProcess', 'startedProcess', 'createdProcess', 'updatedProcess'], false), $store.state.event = 'ProcessEvents'"/>

            <TaskButton :taskActive="$store.state.event == 'TaskEvents'" 
            :taskUpdated="true" :disabled="false" :name="'Task Events'"
            @click="eventSort(['createdTask', 'startedTask', 'updatedTask', 'finishedTask', 'deletedTask'], false), $store.state.event = 'TaskEvents'"/>

            <TaskButton :taskActive="$store.state.event == 'ConversationEvents'" 
            :taskUpdated="true" :disabled="true" :name="'Conversation Events'"/>+0+
            <!-- @click="eventSort(['openedSession', 'closedSession'], false), $store.state.event = 'ConversationEvents'"/> -->

            <TaskButton :taskActive="$store.state.event == 'GlobalEventsAlerts'" 
            :taskUpdated="true" :disabled="true" :name="'Global Events/Alerts'"/>
        </div>
    </div>  
</template>

<script>
import TaskButton from "../Task/Buttons/TaskButton.vue"
export default {
    name: "LogEventCategories",
    components: {
        TaskButton,
    },
    data() {
        return {
        }
    },
    methods: {
        eventSort(array, t) {
            for (let key in this.$store.state.eventLog)
                this.$store.state.eventLog[key] = t ? true : array.includes(key);
        }
    },
}
</script>
<style lang="scss" scoped>
.taskList {
    min-width: 240px;
    max-width: 240px;
}
</style>