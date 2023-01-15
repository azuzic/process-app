<template>
    <div class="userSettings bg-main_blackblue -m-2 flex items-center justify-between p-2">
        <!--USER SETTINGS-->
        <div class="flex">
            <img src="https://picsum.photos/200" width="43" height="43" class="rounded-full">
            <div class="flex flex-col-reverse ml-2">
                <Label :name="usertag()" />
                <div class="text-main_lighttext font-bold mb-1">
                    {{ $store.state.data.username }}
                </div>
            </div>
        </div>
        <div class="relative">
            <div v-if="cog" @click="logout()" class="items-center justify-between absolute bottom-8 bg-main_white text-main_darktext font-bold flex w-32 p-2 rounded hover:cursor-pointer hover:underline">
                Log Out <font-awesome-icon class="icon mr-2" icon="right-from-bracket" />
            </div>
            <font-awesome-icon @click="cog = !cog" class="cog" icon="cog" size="xl" />
        </div>
    </div>
</template>

<script>
import Label from './Label.vue';
import { signOut, getAuth } from "@/firebase";

const auth = getAuth();

export default {
    name: "UserSettings",
    components: { Label },
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
                .catch(() => {
                    console.error("Signed out error!");
                });
        },
        usertag() {
            let tag = "";
            this.$store.state.process.users.forEach(user => {
                if (user.name == this.$store.state.data.username) {
                    tag = user.tag;
                }
            });
            if (tag == "") tag = "- NO TAG -";
            return tag;
        },
        resetValues() {
            this.$store.state.currentWindow = "none",

            this.$store.state.eventLogUser = "",
            this.$store.state.eventLogTask = "None",
            this.$store.state.eventLog = {
                joinedProcess: true,
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

                next: {
                    type: "",
                    data: {},
                },
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
            };

            this.$store.state.allUsers = [],
            this.$store.state.userToAdd = {
                username: "None",
                id: "",
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.userSettings {
    height: 58px;
}
.cog {
    &:hover {
        cursor: pointer;
        filter: invert(85%) sepia(37%) saturate(962%) hue-rotate(148deg) brightness(95%) contrast(97%);
    }
}
</style>