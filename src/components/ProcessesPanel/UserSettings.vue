<template>
    <div class="flex h-14 bg-main_blackblue -m-2 items-center justify-between p-2">
        <!----------------------------------------User data------------------------------------------>
        <div class="flex w-full items-center">
            <!--PROFILE IMAGE-->
            <img src="https://picsum.photos/200" class="rounded-full w-11 h-11">
            <div class="flex flex-col mx-2 overflow-hidden grow w-[120px]">
                <!--PROFILE USERNAME-->
                <div class="text-main_lighttext font-bold mb-1 truncate"> {{ $store.state.data.username }}</div>
                <!--PROFILE TAG-->
                <div class="bg-main_yellow text-main_darktext truncate w-fit font-bold text-center rounded-full overflow-hidden text-xs h-4 px-2">
                    {{ getUserTag() }}
                </div>
            </div>
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-User data-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

        <!----------------------------------------User settings------------------------------------------>
        <div class="relative items-center h-full flex">
            <!--PROFILE SETTINGS-->
            <i @click="cog = !cog" class="fa-solid fa-gear hover:cursor-pointer hover:text-main_bg text-2xl" :class="cog ? 'rotate-45' : ''"></i>
            <!--LOG OUT-->
            <div v-if="cog" @click="logout()"
                class=" absolute bottom-10 font-bold bg-main_white w-32 p-2 rounded text-main_darktext text-base hover:cursor-pointer hover:underline grow flex justify-between items-center">
                Log Out
                <i class="fa-solid text-main_bg fa-right-from-bracket"></i>
            </div>
        </div >        
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-User settings-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>
</template>

<script>
import { signOut, getAuth } from "@/firebase";
const auth = getAuth();

export default {
    name: "UserSettings",
    data() {
        return {
            cog: false,
        };
    },
    methods: {
        logout() {
            signOut(auth)
                .then(() => {
                    console.log("Signed out!");
                    this.resetValues();
                    this.$store.state.data.username = "";
                    this.$store.state.data.email = "";
                    this.dataUsername = "";
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.error("UserSettings.vue - logout:", error);
                });
        },
        //GET USER TAG FROM ACTIVE PROCESS
        getUserTag() {
            try {
                let user = this.$store.state.process.users.filter(user => user.id == this.$store.state.data.id);
                return user[0] != undefined ? user[0].tag : "- NO TAG -";
            } catch (error) {
                console.error("UserSettings.vue - getUserTag:", error);
            }
        },
        resetValues() {
            this.$store.state.currentWindow = "none",

            this.$store.state.eventLogUser = "",
            this.$store.state.eventLogTask = "None",
            this.$store.state.eventLog = {
                createdProcess: true,
                updatedProcess: true,
                joinedProcess: true,
                startedProcess: true,
                leftProcess: true,
                finishedProcess: true,
                createdTask: true,
                startedTask: true,
                updatedTask: true,
                finishedTask: true,
                deletedTask: true,
                openedSession: true,
                closedSession: true,
            };

            this.$store.state.event = "AllLogEvents",

            this.$store.state.fieldSelected = false,
            this.$store.state.creatingField = false,
            this.$store.state.fieldUpdated = false,

            this.$store.state.field = {
                active: false,
                updated: true,

                hash: "",
                type: "",
                data: {},
            };

            this.$store.state.taskSelected = false,
            this.$store.state.creatingTask = false,
            this.$store.state.taskUpdated = false,

            this.$store.state.task = {
                active: false,
                updated: true,

                creationTime: 0,
                hash: "",
                name: "",
                details: "",

                fields: [],

                visibilityUsers: [],
                editUsers: [],
                completionUsers: [],

                next: {},
            };

            this.$store.state.creatingProcess = false,
            this.$store.state.processSelected = false,
            this.$store.state.processUpdated = true,

            this.$store.state.process = {
                active: false,
                updated: true,

                hash: "",
                name: "...",
                details: "",
                tasks: [],
                eventLog: {},

                visibilityUsers: [],
                editUsers: [],
                completionUsers: [],
                users: [],
            };
            this.$store.state.processes = [],

            this.$store.state.data = {
                username: "",
                email: "",
                id: "",
                processes: [],
                lastProcess: "",
                lastTask: "",
                lastWindow: "",
                startedProcesses: {},
            };

            this.$store.state.allUsers = [],

            this.$store.state.userToAdd = {
                username: "None",
                id: "",
                state: "None",
            };
        }
    }
}
</script>