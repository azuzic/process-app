<template>
    <div class="w-72 min-w-[288px] py-2 px-4 bg-black flex flex-col p-2 justify-between">

        <div>
            <!--PROCESS NAME-->
            <div class="font-bold py-3 h-16 text relative"> 
                <div class="absolute bottom-1 text">
                    {{$store.state.process.name}}
                </div>
            </div>
            <hr class="border-main_white border-2 rounded-full">

            <!--PROCESS LIST-->
            <div>
                <block-button @click="!['ViewProcess', 'EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow) ?
                (!$store.state.creatingProcess ? $store.state.currentWindow = !$store.state.process.editUsers.includes($store.state.data.tag) ? 'ViewProcess' : 'EditProcess' : '', 
                $store.dispatch('updateUserStep')) : ''" 
                :name="'Process'" 
                v-if="$store.state.process.visibilityUsers.includes($store.state.data.tag)"
                :icon="'book'" 
                :selected="['ViewProcess', 'EditProcess', 'ProcessDiagram', 'ProcessAnalytics', 'ProcessUsers'].includes($store.state.currentWindow)" 
                :disabled="$store.state.creatingProcess"/>

                <block-button @click="!['EditTask', 'TaskUsers'].includes($store.state.currentWindow) ? 
                !$store.state.creatingProcess ? ($store.state.currentWindow = 'EditTask', $store.dispatch('updateUserStep')) : '' : ''" 
                :name="'Tasks'" 
                v-if="$store.state.process.editUsers.includes($store.state.data.tag)"
                :icon="'list-check'" 
                :selected="['EditTask', 'TaskUsers'].includes($store.state.currentWindow)" 
                :disabled="$store.state.creatingProcess"/>

                <block-button @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'CurrentTask', $store.dispatch('updateUserStep')) : ''" 
                :name="'Curent task'" 
                v-if="$store.state.data.startedProcesses[this.$store.state.process.hash] && this.$store.state.task.visibilityUsers.includes(this.$store.state.data.tag)"
                :icon="'list-check'" 
                :selected="['CurrentTask'].includes($store.state.currentWindow)" 
                :disabled="$store.state.creatingProcess"/>

                <block-button 
                :name="'Conversation Session'" 
                :icon="'comments'" 
                :selected="false" 
                :disabled="true"/>

                <block-button @click="!$store.state.creatingProcess ? ($store.state.currentWindow = 'ViewEvent', $store.dispatch('updateUserStep')) : ''"  
                v-if="$store.state.process.editUsers.includes($store.state.data.tag)"
                :name="'Event Log'" 
                :icon="'bell'" 
                :selected="['ViewEvent', 'CreateEvent'].includes($store.state.currentWindow)" 
                :disabled="$store.state.creatingProcess"/>
            </div>
        </div>
    </div>
</template>

<script>
import BlockButton from './ConsolePanel/BlockButton.vue';

export default {
    name: 'ConsolePanel',
    components: {
        BlockButton
    },
}
</script>