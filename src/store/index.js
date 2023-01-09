import { createStore } from "vuex";

import { collection, getDocs } from "@/firebase";
import { db } from "@/firebase";

export default createStore({
    state: {
        currentWindow: "none",

        creatingProcess: false,
        processSelected: false,
        processUpdated: true,

        data: {
            username: "",
            email: "",
            id: "",
            processes: [],
        },

        process: {
            active: false,

            hash: "",
            name: "...",
            details: "",
        },
        processes: [],
    },
    mutations: {},
    actions: {
        async getUserData({ commit, state }) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (this.state.data.email === `${doc.data().email}`) {
                    this.state.data.email = `${doc.data().email}`;
                    this.state.data.username = `${doc.data().username}`;
                    this.state.data.id = `${doc.id}`;
                    this.state.data.processes = `${doc.data().processes}`;
                }
            });
            const querySnapshot2 = await getDocs(collection(db, "process"));
            querySnapshot2.forEach((doc) => {
                if (this.state.data.processes.includes(`${doc.id}`)) {
                    let process = {
                        hash: `${doc.data().hash}`,
                        active: false,
                        updated: true,
                        name: `${doc.data().name}`,
                        details: `${doc.data().details}`,
                    };
                    this.state.processes.push(process);
                }
            });
        },
        checkUpdate({ commit, state }) {
            this.state.processUpdated = false;
            this.state.processes.forEach((process) => {
                if (process.active) process.updated = false;
            });
        },
    },
    getters: {},
});

//this.$store.state.
