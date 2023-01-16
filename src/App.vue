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
    async mounted() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("LOGGED IN: " + user.email);
                if (router.currentRoute._value.path == "/") {
                    router.push('/main');
                }
                this.$store.state.data.email = user.email;
                this.$store.state.creatingProcess = true;
                await wait(0.5);
                await this.$store.dispatch('getUserData');
                await wait(0.5);
                await this.$store.dispatch('loadUserStep');
                this.$store.state.creatingProcess = false;
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
    background: #042630;
    outline-width: 0;
    border: solid #010910 2px;

    &:hover {
        background: rgb(4, 30, 40);
    }

    &:focus {
        background: rgb(4, 20, 30);
    }
}
.vue-input2 {
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    background: #042630;
    outline-width: 0;
    border: solid #010910 2px;

    &:hover {
        background: rgb(4, 30, 40);
    }

    &:focus {
        background: rgb(4, 20, 30);
        border-color: #50A45E;
    }
}
.vue-select {
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    outline-width: 0;
    background: rgba(4, 38, 48, 0.75);
    border: solid #010910 2px;

    &:hover {
        background: rgba(4, 38, 48, 0.5);
    }

    &:focus {
        background: rgba(0, 18, 28, 1);
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
.text3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
}
.vue-list {
    min-width: 240px;
    max-width: 240px;
}
</style>