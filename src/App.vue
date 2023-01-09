<template>
    <div class="bg-main_bg w-screen h-screen flex relative">
        <Debug/>
        <RouterView />
    </div>
</template>

<script>
import router from "@/router"

import { getAuth, onAuthStateChanged } from "@/firebase";
import Debug from "./components/Other/debug.vue";

const auth = getAuth();

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default {
    name: "App",
    components: {
        Debug
    },
    methods: {
    },
    async mounted() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("LOGGED IN: " + user.email);
                if (router.currentRoute._value.path == "/") {
                    router.push('/main');
                }
                this.$store.state.data.email = user.email;
                await this.$store.dispatch('getUserData');
            } else {
                console.log("NO USER");
                router.push('/');
            }
        });
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
    transition: 0.2s all ease-in-out;
    caret-color: rgba(217, 217, 217);
    color:rgb(217, 217, 217);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.5px;
}
.icon {
    filter: invert(85%) sepia(37%) saturate(962%) hue-rotate(148deg) brightness(95%) contrast(97%);
}
.icon2 {
    filter: invert(20%) sepia(21%) saturate(229%) hue-rotate(133deg) brightness(88%) contrast(90%);
}
.vue-input {
    padding: 8px 16px 8px 16px;
    border-radius: 64px;
    background: rgba(4, 38, 48, 0.5);
    outline-width: 0;
    border: solid #010910 2px;

    &:hover {
        background: rgba(4, 38, 48, 0.75);
    }

    &:focus {
        background: rgba(4, 38, 48, 1);
    }
}
.vue-input2 {
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    background: rgba(4, 38, 48, 0.5);
    outline-width: 0;
    border: solid #010910 2px;

    &:hover {
        background: rgba(4, 38, 48, 0.75);
    }

    &:focus {
        background: rgba(4, 38, 48, 1);
        border-color: #50A45E;
    }
}
.text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>