<template>
    <div class="w-56 min-w-[224px] bg-main_darkblue flex flex-col p-2 justify-between">
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
                    @click="!this.$store.state.creatingProcess ? setActive(item.hash, item.active) : ''" />
                <AddProcessButton @click="!$store.state.creatingProcess ? createProcess() : ''" />
            </div>
        </div>
        <!--USER SETTINGS-->
        <UserSettings />
    </div>
</template>

<script>
import AddProcessButton from './ProcessesPanel/AddProcessButton.vue'
import UserSettings from './ProcessesPanel/UserSettings.vue';
import ProcessButton from './ProcessesPanel/ProcessButton.vue';
import cryptoRandomString from 'crypto-random-string';

export default {
    components: { AddProcessButton, UserSettings, ProcessButton },
    name: 'ProcessesPanel',

    data() {
        return {
            userData: {},
        };
    },
    methods: {
        //Set process as active
        setActive(hash, active) {
            try {
                if (!active) {
                    this.$store.dispatch('resetValues');
                    this.$store.state.processes.forEach(process => {
                        if (process.hash == hash) {
                            process.active = true;
                            this.$store.state.processUpdated = process.updated;
                            this.$store.state.process = process;
                            this.$store.state.processSelected = true;
                        }
                        else process.active = false;
                    });
                    let tag = "";
                    this.$store.state.process.users.forEach(user => {
                        if (user.id == this.$store.state.data.id)
                            tag = user.tag;
                    });
                    this.$store.state.data.tag = tag;
                    this.$store.state.currentWindow = this.$store.state.process.editUsers.includes(tag) ? "EditProcess" : "ViewProcess";
                    this.$store.dispatch('updateUserStep');
                }
            } catch (error) {
                console.error("ProcessesPanel.vue - setActive:", error);
            }
        },
        //Create process, it's not added to the database
        async createProcess() {
            this.$store.dispatch('resetValues');
            this.$store.state.creatingProcess = true;
            this.$store.state.processSelected = true;
            this.$store.state.processes.forEach(process => {
                if (process.active)
                    process.active = false;
            });
            this.$store.state.process = {
                active: true,
                updated: false,
                hash: cryptoRandomString({ length: 32, type: 'alphanumeric' }),
                name: "...",
                details: "",
                tasks: [],
                eventLog: {},
                visibilityUsers: ["ADMIN", "USER"],
                editUsers: ["ADMIN"],
                completionUsers: ["ADMIN", "USER"],
                users: [ { name: this.$store.state.data.username, tag: "ADMIN", id: this.$store.state.data.id, state: "None" } ], 
                admin: this.$store.state.data.username,
            };
            this.$store.state.processes.push(this.$store.state.process);
            let tag = "";
            this.$store.state.process.users.forEach(user => {
                if (user.id == this.$store.state.data.id)
                    tag = user.tag;
            });
            this.$store.state.data.tag = tag;
            this.$store.state.currentWindow = 'EditProcess';
            this.$store.dispatch('updateUserStep');
        },
    },
    async mounted() {
        this.$store.state.currentWindow = "none";
        this.$store.state.processes = [];
    }
}
</script>