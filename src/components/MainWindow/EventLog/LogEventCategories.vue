<template>
    <div class="w-60 bg-main_darktext flex flex-col py-4">
        <div class="flex flex-col px-4">
            <TaskButton :taskActive="$store.state.event == 'AllLogEvents'" 
            :taskUpdated="true" :name="'All Log Events'"
            @click="$store.state.event = 'AllLogEvents'"/>
        
            <div class="text-2xl font-bold mt-4"> Log Events </div>
            <hr class="border-2 border-bg_main_white rounded-full my-2">
        </div>
        <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow px-4">
            <TaskButton :taskActive="$store.state.event == 'ProcessEvents'" 
            :taskUpdated="true" :name="'Process Events'" 
            @click="$store.state.event = 'ProcessEvents'"/>

            <TaskButton :taskActive="$store.state.event == 'TaskEvents'" 
            :taskUpdated="true" :name="'Task Events'"
            @click="$store.state.event = 'TaskEvents'"/>

            <TaskButton :taskActive="$store.state.event == 'ConversationEvents'" 
            :taskUpdated="true" :name="'Conversation Events'"
            @click="$store.state.event = 'ConversationEvents'"/>

            <TaskButton :taskActive="$store.state.event == 'GlobalEventsAlerts'" 
            :taskUpdated="true" :name="'Global Events/Alerts'"/>
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
       
    },
}
</script>