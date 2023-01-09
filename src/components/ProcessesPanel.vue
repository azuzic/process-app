<template>
    <div class="processesPanel bg-main_darkblue flex flex-col p-2 justify-between">

        <div>
            <!--TITLE-->
            <div class="text-center text-3xl font-bold py-3"> PROCESSES </div>
            <hr class="border-main_blackblue border-4 rounded-full">

            <!--PROCESS LIST-->
            <div>
                <ProcessButton v-for="(item, index) in $store.state.processes" v-bind:key="index" :processActive="item.active" :name="item.name" 
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
            this.$store.state.processes.forEach(process => {
                if (process.hash == hash) {
                    process.active = true;
                    this.$store.state.process.name = process.name;
                    this.$store.state.process.details = process.details
                    this.$store.state.processSelected = true;
                }
                else
                    process.active = false;
            });
        },
        //CREATE PROCCESS, IT'S NOT YET ADDED TO THE DATABASE
        async createProcess() {
            this.$store.state.creatingProcess = true;
            this.$store.state.processSelected = true;
            this.$store.state.processes.forEach(process => {
                if (process.active)
                    process.active = false;
            });
            let newProcess = {
                hash: cryptoRandomString({ length: 32, type: 'url-safe' }),
                active: true,
                name: "...",
                details: "",
            };
            this.$store.state.processes.push(newProcess);
        },
    },
}

</script>

<style lang="scss" scoped>
.processesPanel {
    width: 223px;
}
</style>