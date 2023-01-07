<template>
    <div class="processesPanel bg-main_darkblue flex flex-col p-2 justify-between">

        <div>
            <!--TITLE-->
            <div class="text-center text-3xl font-bold py-3"> PROCESSES </div>
            <hr class="border-main_blackblue border-4 rounded-full">
            
            <!--PROCESS LIST-->
            <process />
        </div>

        <user-settings :userData="userData" />

    </div>
</template>

<script>
import data from "@/data"
import Process from './Process.vue'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@/firebase";
import { collection, addDoc, getDocs } from "@/firebase";
import { db } from "@/firebase";
import Label from "./Label.vue";
import UserSettings from './UserSettings.vue';

export default {
	components: { Process, Label, UserSettings },
    name: 'ProcessesPanel',

    data() {
        return {
            userData: {},
        };
    },
    methods: {
        async getUserData() {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (data.email === `${doc.data().email}`) {
                    data.email = `${doc.data().email}`;
                    data.username = `${doc.data().username}`;
                    data.id = `${doc.id}`;
                    this.dataUsername = `${doc.data().username}`;
                }
            });
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