<template>
    <div class="flex w-full">
        <processes-panel/>
        <console-panel v-if="$store.state.processSelected"/>
        <div v-if="$store.state.processSelected" class="flex flex-col grow">
            <top-menu />

            <edit-process v-if="$store.state.currentWindow == 'EditProcess'" class="grow" />
            <view-process v-if="$store.state.currentWindow == 'ViewProcess'" class="grow" />
            <process-users v-if="$store.state.currentWindow == 'ProcessUsers'" class="grow" />
            <process-diagram v-if="$store.state.currentWindow == 'ProcessDiagram'" class="grow" />

            <current-task v-if="$store.state.currentWindow == 'CurrentTask'" class="grow" />

            <div v-if="['EditTask', 'TaskUsers'].includes($store.state.currentWindow)" class="flex grow">
                <task-list /> 
                <edit-task v-if="$store.state.currentWindow == 'EditTask' && $store.state.taskSelected" class="grow" />
                <task-users v-if="$store.state.currentWindow == 'TaskUsers' && $store.state.taskSelected" class="grow" />
            </div>

            <div v-if="['ProcessAnalytics'].includes($store.state.currentWindow)" class="flex grow">
                <task-list-analytics />
                <process-analytics v-if="$store.state.currentWindow == 'ProcessAnalytics'" class="grow" />
            </div>
            
            <div v-if="['ViewEvent', 'CreateEvent'].includes($store.state.currentWindow)" class="flex grow">
                <log-event-categories />
                <view-event />
            </div>

        </div>
    </div>
</template>

<script>
import ProcessesPanel from '../components/ProcessesPanel.vue';
import ConsolePanel from '../components/ConsolePanel.vue';
import TopMenu from '../components/MainWindow/TopMenu.vue';
import EditProcess from '../components/MainWindow/Process/EditProcess.vue';
import ViewProcess from '../components/MainWindow/Process/ViewProcess.vue';
import ProcessDiagram from '../components/MainWindow/Process/ProcessDiagram.vue';
import ProcessUsers from '../components/MainWindow/Process/ProcessUsers.vue';
import TaskListAnalytics from '../components/MainWindow/Process/TaskListAnalytics.vue';
import EditTask from '../components/MainWindow/Task/EditTask.vue';
import CurrentTask from '../components/MainWindow/Task/CurrentTask.vue';
import TaskUsers from '../components/MainWindow/Task/TaskUsers.vue';
import TaskList from '../components/MainWindow/Task/TaskList.vue';
import ProcessAnalytics from '../components/MainWindow/Process/ProcessAnalytics.vue';
import LogEventCategories from '../components/MainWindow/EventLog/LogEventCategories.vue';
import ViewEvent from '../components/MainWindow/EventLog/ViewEvent.vue';

export default {
    name: "MainPage",
    components: {
    ProcessesPanel,
    ConsolePanel,
    TopMenu,
    EditProcess,
    ProcessDiagram,
    EditTask,
    TaskList,
    ProcessAnalytics,
    TaskUsers,
    LogEventCategories,
    ViewEvent,
    ProcessUsers,
    ViewProcess,
    CurrentTask,
    TaskListAnalytics
},
};
</script>