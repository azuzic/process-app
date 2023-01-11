<template>
    <div class="flex w-full">
        <processes-panel/>
        <console-panel v-if="$store.state.processSelected"/>
        <div v-if="$store.state.processSelected" class="flex flex-col grow">
            <top-menu />

            <edit-process v-if="$store.state.currentWindow == 'EditProcess'" class="grow" />

            <div v-if="['EditTask', 'TaskUsers'].includes($store.state.currentWindow)" class="flex grow">
                <task-list />
                <edit-task v-if="$store.state.currentWindow == 'EditTask' && $store.state.taskSelected" class="grow" />
                <task-users v-if="$store.state.currentWindow == 'TaskUsers' && $store.state.taskSelected" class="grow" />
            </div>
        </div>
    </div>
</template>

<script>
import ProcessesPanel from '../components/ProcessesPanel.vue';
import ConsolePanel from '../components/ConsolePanel.vue';
import TopMenu from '../components/MainWindow/TopMenu.vue';
import EditProcess from '../components/MainWindow/Process/EditProcess.vue';
import EditTask from '../components/MainWindow/Task/EditTask.vue';
import TaskUsers from '../components/MainWindow/Task/TaskUsers.vue';
import TaskList from '../components/MainWindow/Task/TaskList.vue';

export default {
    name: "MainPage",
    components: {
    ProcessesPanel,
    ConsolePanel,
    TopMenu,
    EditProcess,
    EditTask,
    TaskList,
    TaskUsers
},
};
</script>