<template>
    <div class="flex w-full">
        <processes-panel/>
        <console-panel v-if="$store.state.processSelected"/>
        <div v-if="$store.state.processSelected" class="flex flex-col grow">
            <top-menu />
            <edit-process class="grow" />
        </div>
    </div>
</template>

<script>
import ProcessesPanel from '../components/ProcessesPanel.vue';
import ConsolePanel from '../components/ConsolePanel.vue';
import TopMenu from '../components/MainWindow/TopMenu.vue';
import EditProcess from '../components/MainWindow/Process/EditProcess.vue';

export default {
    name: "MainPage",
    components: {
        ProcessesPanel,
        ConsolePanel,
        TopMenu,
        EditProcess
    },
};
</script>