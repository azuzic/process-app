<template>
    <div class="bg-main_bg flex flex-col py-3 px-4 grow">
        <!----------------------------------------Process Analytics------------------------------------------>

        <!--NAME-->
        <b class="text-xl">{{ $store.state.process.name }} - Process Analytics</b>

        <!--PROCESSES ANALYTICS-->
        <div v-if="!$store.state.task.active">
            <b class="text-base mt-2 underline underline-offset-4">Processes:</b>
            <div class="my-4 flex">
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Started').length" :what="'Processes'" :name="''" :did="'started'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Started').length - $store.state.process.users.filter(u => u.state === 'Finished').length" :what="'Processes'" :name="''" :did="'in progress'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Finished').length" :what="'Processes'" :name="''" :did="'finished'" />
            </div> 
        </div>

        <!--TASKS ANALYTICS-->
        <div class="flex mt-2">
            <b class="text-base underline underline-offset-4">{{ !$store.state.task.active ? 'Tasks:' : 'Task:' }} </b>
            <b class="text-main_cyan text-base ml-2" v-if="$store.state.task.active">{{ $store.state.task.index+1 + '. ' + $store.state.task.name}}</b>
        </div>
        
        <div v-if="!$store.state.task.active" class="overflow-x-hidden flex-col overflow-y-auto h-0 grow">
            <div v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" class="my-8 flex items-end">
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.started.length" :what="'Task'" :name="item.name" :did="'started'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.inProgress.length" :what="'Task'" :name="item.name" :did="'in progress'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.finished.length" :what="'Task'" :name="item.name" :did="'finished'" />
            </div> 
        </div>
        <div v-else class="overflow-x-hidden flex-col overflow-y-auto h-0 grow">
            <div class="my-4 flex items-start">
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="$store.state.task.started.length" :what="'Task'" :name="''" :did="'started'" :users="$store.state.task.started"/>            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="$store.state.task.inProgress.length" :what="'Task'" :name="''" :did="'in progress'" :users="$store.state.task.inProgress"/>            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="$store.state.task.finished.length" :what="'Task'" :name="''" :did="'finished'" :users="$store.state.task.finished"/>
            </div> 
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Process Analytics-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>
</template>

<script>
import AnalyticsBar from "./Buttons/AnalyticsBar.vue"
export default {
    name: "ProcessAnalytics",
    components: {
        AnalyticsBar,
    }
}
</script>