<template>
    <div class="bg-main_bg flex flex-col py-3 px-4 grow">

        <b class="text-xl">{{ $store.state.process.name }} - Process Analytics</b>

        <b class="text-base mt-2 underline underline-offset-4">Processes:</b>

        <div class="my-4 flex">
            <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Started').length" :what="'Processes'" :name="''" :did="'started'" />            
            <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Started').length - $store.state.process.users.filter(u => u.state === 'Finished').length" :what="'Processes'" :name="''" :did="'in progress'" />            
            <AnalyticsBar class="mr-10" :total="$store.state.process.users.length-1" :value="$store.state.process.users.filter(u => u.state === 'Finished').length" :what="'Processes'" :name="''" :did="'finished'" />
        </div> 

        <b class="text-base mt-2 underline underline-offset-4">Tasks:</b>

        <div class="overflow-x-hidden flex-col overflow-y-auto h-0 grow">
            <div v-for="(item, index) in $store.state.process.tasks" v-bind:key="index" class="my-8 flex items-end">
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.started.length" :what="'Task'" :name="item.name" :did="'started'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.inProgress.length" :what="'Task'" :name="item.name" :did="'in progress'" />            
                <AnalyticsBar class="mr-10" :total="$store.state.process.users.length - 1" :value="item.finished.length" :what="'Task'" :name="item.name" :did="'finished'" />
            </div> 
        </div>

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