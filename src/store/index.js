// @/store.js
import { createStore } from "vuex";

export default createStore({
    state: {
        creatingProcess: false,
        processSelected: false,
        process: {
            hash: "",
            active: false,
            name: "...",
            details: "",
        },
        processes: [],
    },
    mutations: {},
    actions: {},
    getters: {},
});

//this.$store.state.
