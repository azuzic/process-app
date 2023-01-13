import { createStore } from "vuex";

import { collection, getDocs, db, updateDoc, doc } from "@/firebase";

export default createStore({
    state: {
        currentWindow: "none",

        eventLogUser: "",
        eventLogTask: "None",
        eventLog: {
            joinedProcess: true,
            finishedProcess: true,
            createdTask: true,
            startedTask: true,
            updatedTask: true,
            finishedTask: true,
            deletedTask: true,
            openedSession: true,
            closedSession: true,
        },

        event: "AllLogEvents",

        fieldSelected: false,
        creatingField: false,
        fieldUpdated: false,

        field: {
            active: false,
            updated: true,

            hash: "",
            type: "",
            data: {},
        },

        taskSelected: false,
        creatingTask: false,
        taskUpdated: false,

        task: {
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
        },

        creatingProcess: false,
        processSelected: false,
        processUpdated: true,

        process: {
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
        },
        processes: [],

        data: {
            username: "",
            email: "",
            id: "",
            processes: [],
            lastProcess: "",
            lastTask: "",
            lastWindow: "",
        },

        allUsers: [],
        userToAdd: {
            username: "",
            id: "",
        },
    },
    mutations: {},
    actions: {
        async getUserData({ commit, state }) {
            const querySnapshot = await getDocs(collection(db, "users"));
            this.state.allUsers = [];
            querySnapshot.forEach((doc) => {
                this.state.allUsers.push({
                    username: `${doc.data().username}`,
                    id: `${doc.id}`,
                });
                if (this.state.data.email === `${doc.data().email}`) {
                    this.state.data.email = `${doc.data().email}`;
                    this.state.data.username = `${doc.data().username}`;
                    this.state.data.id = `${doc.id}`;
                    this.state.data.processes = `${doc.data().processes}`;
                    this.state.data.lastProcess =
                        `${doc.data().lastProcess}` != "undefined"
                            ? `${doc.data().lastProcess}`
                            : "";
                    this.state.data.lastTask =
                        `${doc.data().lastTask}` != "undefined"
                            ? `${doc.data().lastTask}`
                            : "";
                    this.state.data.lastWindow =
                        `${doc.data().lastWindow}` != "undefined"
                            ? `${doc.data().lastWindow}`
                            : "";
                }
            });
            const querySnapshot2 = await getDocs(collection(db, "process"));
            querySnapshot2.forEach(async (doc) => {
                if (this.state.data.processes.includes(`${doc.id}`)) {
                    let process = {
                        hash: `${doc.data().hash}`,
                        active: false,
                        updated: true,
                        name: `${doc.data().name}`,
                        details: `${doc.data().details}`,
                        tasks: [],
                        eventLog:
                            `${doc.data().eventLog}` != "undefined"
                                ? doc.data().eventLog
                                : {},
                        visibilityUsers:
                            `${doc.data().visibilityUsers}` != "undefined"
                                ? doc.data().visibilityUsers
                                : [],
                        editUsers:
                            `${doc.data().editUsers}` != "undefined"
                                ? doc.data().editUsers
                                : [],
                        completionUsers:
                            `${doc.data().completionUsers}` != "undefined"
                                ? doc.data().completionUsers
                                : [],
                        users:
                            `${doc.data().users}` != "undefined"
                                ? doc.data().users
                                : [],
                    };
                    const querySnapshot3 = await getDocs(
                        collection(db, "process/" + `${doc.id}` + "/tasks")
                    );
                    querySnapshot3.forEach(async (doc2) => {
                        let task = {
                            creationTime: `${doc2.data().creationTime}`,
                            hash: `${doc2.data().hash}`,
                            active: false,
                            updated: true,
                            name: `${doc2.data().name}`,
                            details: `${doc2.data().details}`,
                            fields:
                                `${doc2.data().fields}` != "undefined"
                                    ? doc2.data().fields
                                    : [],

                            visibilityUsers: `${doc2.data().visibilityUsers}`
                                .split(",")
                                .filter((i) => i),
                            editUsers: `${doc2.data().editUsers}`
                                .split(",")
                                .filter((i) => i),
                            completionUsers: `${doc2.data().completionUsers}`
                                .split(",")
                                .filter((i) => i),
                        };
                        task.fields.forEach((field) => {
                            field.active = false;
                            field.updated = true;
                        });
                        process.tasks.push(task);
                    });
                    process.tasks.sort((a, b) => {
                        return a.creationTime - b.creationTime;
                    });
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
        checkUpdate2({ commit, state }) {
            this.state.taskUpdated = false;
            this.state.process.tasks.forEach((task) => {
                if (task.active) task.updated = false;
            });
        },
        async updateUserStep({ commit, state }) {
            let updateRef = doc(db, "users/", this.state.data.id);
            await updateDoc(updateRef, {
                lastProcess: this.state.process.hash,
                lastTask: this.state.task.hash,
                lastWindow: this.state.currentWindow,
            });
        },
        resetValues({ commit, state }) {
            this.state.processes.forEach((process) => {
                if (process.hash == this.state.process.hash) {
                    process.tasks.forEach((task) => {
                        task.active = false;
                    });
                }
            });

            this.state.fieldSelected = false;
            this.state.creatingField = false;
            this.state.fieldUpdated = false;

            this.state.field = {
                active: false,
                updated: true,

                hash: "",
                type: "",
                data: {},
            };

            this.state.taskSelected = false;
            this.state.creatingTask = false;
            this.state.taskUpdated = false;

            this.state.task = {
                active: false,
                updated: true,

                hash: "",
                name: "",
                details: "",
                fields: [],
            };
        },
        async loadUserStep({ commit, state }) {
            this.state.currentWindow = this.state.data.lastWindow;
            let previousProcessHash = this.state.process.hash;
            let previousProcessUpdated = this.state.processUpdated;
            this.state.processes.forEach((process) => {
                if (process.hash == previousProcessHash)
                    process.updated = previousProcessUpdated;
                if (process.hash == this.state.data.lastProcess) {
                    process.active = true;
                    this.state.processUpdated = process.updated;
                    this.state.process = process;
                    this.state.processSelected = true;
                } else process.active = false;
            });
            if (
                ["EditTask", "TaskUsers"].includes(
                    this.state.data.lastWindow
                ) &&
                this.state.data.lastTask != ""
            ) {
                let previousTaskHash = this.state.task.hash;
                let previousTaskUpdated = this.state.taskUpdated;
                this.state.process.tasks.forEach((task) => {
                    if (task.hash == previousTaskHash)
                        task.updated = previousTaskUpdated;
                    if (task.hash == this.state.data.lastTask) {
                        task.active = true;
                        this.state.taskUpdated = task.updated;
                        this.state.task = task;
                        this.state.taskSelected = true;
                    } else task.active = false;
                });
            }
        },
    },
    getters: {},
});

//this.$store.state.
