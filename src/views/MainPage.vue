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
import data from "@/data";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@/firebase";
import { collection, addDoc, getDocs } from "@/firebase";
import { db } from "@/firebase";
import ProcessesPanel from '../components/ProcessesPanel.vue';
import ConsolePanel from '../components/ConsolePanel.vue';
import TopMenu from '../components/TopMenu.vue';
import EditProcess from '../components/EditProcess.vue';

export default {
    name: "MainPage",
    components: {
        ProcessesPanel,
        ConsolePanel,
        TopMenu,
        EditProcess
    },
    data() {
        return {
        };
    },
    methods: {
        dummy() { },
    },
    mounted() {
    },
};
</script>

<style lang="scss" scoped>

</style>