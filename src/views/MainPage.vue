<template>
    <div class="flex w-full">
        <processes-panel></processes-panel>
    </div>
</template>

<script>
import data from "@/data";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@/firebase";
import { collection, addDoc, getDocs } from "@/firebase";
import { db } from "@/firebase";
import ProcessesPanel from '../components/ProcessesPanel.vue';

export default {
    name: "MainPage",
    components: {
        ProcessesPanel
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