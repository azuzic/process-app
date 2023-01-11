<template>
    <div class="processesPanel bg-main_darkblue flex flex-col p-2 justify-between">

        <div>
            <!--TITLE-->
            <div class="text-center text-3xl font-bold py-3"> PROCESSES </div>
            <hr class="border-main_blackblue border-4 rounded-full">

            <!--PROCESS LIST-->
            <div>
                <ProcessButton v-for="(item, index) in $store.state.processes" v-bind:key="index" 

                    :processActive="item.active" 
                    :processUpdated="item.updated"
                    :name="item.active ? $store.state.process.name : item.name" 

                    @click="!this.$store.state.creatingProcess ? setActive(item.hash) : ''" />

                <AddProcessButton @click="!$store.state.creatingProcess ? createProcess() : ''" />
            </div>
        </div>

        <user-settings />

    </div>
</template>

<script>
import AddProcessButton from './ProcessesPanel/AddProcessButton.vue'
import Label from "./ProcessesPanel/Label.vue";
import UserSettings from './ProcessesPanel/UserSettings.vue';
import ProcessButton from './ProcessesPanel/ProcessButton.vue';
import cryptoRandomString from 'crypto-random-string';

export default {
    components: { AddProcessButton, Label, UserSettings, ProcessButton },
    name: 'ProcessesPanel',

    data() {
        return {
            userData: {},
        };
    },
    methods: {
        //ENTER THE PROCESS
        setActive(hash) {
            this.$store.dispatch('resetValues');
            let previousHash = this.$store.state.process.hash;
            let previousProcessUpdated = this.$store.state.processUpdated;
            this.$store.state.processes.forEach(process => {
                if (process.hash == previousHash)
                    process.updated = previousProcessUpdated;
                if (process.hash == hash) {
                    process.active = true;
                    this.$store.state.processUpdated = process.updated;
                    this.$store.state.process = process;
                    this.$store.state.processSelected = true;
                }
                else
                    process.active = false;
            });
            this.$store.dispatch('updateUserStep');
        },
        //CREATE PROCCESS, IT'S NOT YET ADDED TO THE DATABASE
        async createProcess() {
            this.$store.dispatch('resetValues');
            this.$store.state.creatingProcess = true;
            this.$store.state.processSelected = true;
            this.$store.state.processes.forEach(process => {
                if (process.active)
                    process.active = false;
            });
            this.$store.state.process = {
                hash: cryptoRandomString({ length: 32, type: 'url-safe' }),
                active: true,
                updated: false,
                name: "...",
                details: "",
                tasks: []
            };
            this.$store.state.processes.push(this.$store.state.process);
            this.$store.state.currentWindow = 'EditProcess';
            this.$store.dispatch('updateUserStep');
        },
    },
}

</script>

<style lang="scss" scoped>
.processesPanel {
    width: 223px;
}
</style>