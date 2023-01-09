<template>
    <div class="processesPanel bg-main_darkblue flex flex-col p-2 justify-between">

        <div>
            <!--TITLE-->
            <div class="text-center text-3xl font-bold py-3"> PROCESSES </div>
            <hr class="border-main_blackblue border-4 rounded-full">

            <!--PROCESS LIST-->
            <div>
                <ProcessButton v-for="(item, index) in $store.state.processes" v-bind:key="index" :processActive="item.active" :name="item.name" @click="!this.$store.state.creatingProcess ? setActive(item.hash) : ''" />
                <AddProcessButton @click="!$store.state.creatingProcess ? createProcess() : ''" />
            </div>
        </div>

        <user-settings :userData="userData" />

    </div>
</template>

<script>
import data from "@/data"
import AddProcessButton from './ProcessesPanel/AddProcessButton.vue'
import { collection, addDoc, getDocs } from "@/firebase";
import { db } from "@/firebase";
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
        async addNewProcess() {
            const docRef = await addDoc(collection(db, "processes"), {
                name: "temp",
            });
        },
        async getUserData() {
            const querySnapshot = await getDocs(collection(db, "users"));
            let hashes = [];
            querySnapshot.forEach((doc) => {
                if (data.email === `${doc.data().email}`) {
                    data.email = `${doc.data().email}`;
                    data.username = `${doc.data().username}`;
                    data.id = `${doc.id}`;
                    this.dataUsername = `${doc.data().username}`;
                    hashes = `${doc.data().processes}`;
                }
            });
            const querySnapshot2 = await getDocs(collection(db, "process"));
            querySnapshot2.forEach((doc) => {
                if (hashes.includes(`${doc.id}`)) {
                    let process = {
                        hash: `${doc.data().hash}`,
                        active: false,
                        name: `${doc.data().name}`,
                        details: `${doc.data().details}`,
                    };
                    this.$store.state.processes.push(process);
                }
            });
            console.log(this.$store.state.processes);
        },
    },
    async mounted() {
        await this.getUserData();
        this.userData = data;
    },
}

</script>

<style lang="scss" scoped>
.processesPanel {
    width: 223px;
}
</style>