import { createStore } from "vuex";

import {
    collection,
    getDocs,
    db,
    updateDoc,
    doc,
    deleteField,
    arrayRemove,
    arrayUnion,
} from "@/firebase";

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default createStore({
    state: {
        currentWindow: "none",
        loading: false,

        eventLogUser: "",
        eventLogTask: "None",
        eventLog: {
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

        prevTask: {},
        tasksOriginal: [],
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

            next: {},

            started: [],
            inProgress: [],
            finished: [],
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
            admin: "",
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
            startedProcesses: {},
            tag: "",
        },

        allUsers: [],
        userToAdd: {
            username: "None",
            id: "",
            state: "None",
        },
    },
    mutations: {
        dummy() {
            return 1;
        },
    },
    actions: {
        async logEvent({ commit, state }, eventLog) {
            if (this.state.process.eventLog == undefined)
                this.state.process["eventLog"] = {};

            let date = new Date()
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/");

            if (this.state.process.eventLog[date] == undefined)
                this.state.process.eventLog[date] = [];

            this.state.process.eventLog[date].unshift(eventLog);

            let updateRef = doc(db, "process/", this.state.process.hash);
            await updateDoc(updateRef, {
                eventLog: this.state.process.eventLog,
            });
        },
        async getUserData({ commit, state }) {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                this.state.allUsers = [];
                querySnapshot.forEach((doc) => {
                    this.state.allUsers.push({
                        username: `${doc.data().username}`,
                        id: `${doc.id}`,
                    });
                    if (this.state.data.email === doc.data().email) {
                        this.state.data.email = doc.data().email;
                        this.state.data.username = doc.data().username;
                        this.state.data.id = doc.id;
                        this.state.data.processes = doc.data().processes;
                        this.state.data.lastProcess = doc.data().lastProcess;
                        this.state.data.lastTask = doc.data().lastTask;
                        this.state.data.lastWindow = doc.data().lastWindow;
                        this.state.data.startedProcesses =
                            doc.data().startedProcesses == null
                                ? {}
                                : doc.data().startedProcesses;
                    }
                });
                const querySnapshot2 = await getDocs(collection(db, "process"));
                let processKeys = [];
                querySnapshot2.forEach(async (doc) => {
                    if (this.state.data.processes.includes(`${doc.id}`)) {
                        let process = {
                            hash: doc.data().hash,
                            active: false,
                            updated: true,
                            name: doc.data().name,
                            details: doc.data().details,
                            tasks: [],
                            eventLog: doc.data().eventLog,
                            visibilityUsers: doc.data().visibilityUsers,
                            editUsers: doc.data().editUsers,
                            completionUsers: doc.data().completionUsers,
                            users: doc.data().users,
                            admin: doc.data().admin,
                        };
                        processKeys.push(doc.data().hash);
                        try {
                            const querySnapshot3 = await getDocs(
                                collection(
                                    db,
                                    "process/" + `${doc.id}` + "/tasks"
                                )
                            );
                            querySnapshot3.forEach(async (doc2) => {
                                let task = {
                                    creationTime: doc2.data().creationTime,
                                    hash: doc2.data().hash,
                                    active: false,
                                    updated: true,
                                    name: doc2.data().name,
                                    details: doc2.data().details,
                                    fields: doc2.data().fields,
                                    started: doc2.data().started,
                                    finished: doc2.data().finished,
                                    inProgress: doc2.data().inProgress,
                                    visibilityUsers:
                                        doc2.data().visibilityUsers,
                                    editUsers: doc2.data().editUsers,
                                    completionUsers:
                                        doc2.data().completionUsers,
                                    next: doc2.data().next,
                                };
                                task.fields.forEach((field) => {
                                    field.active = false;
                                    field.updated = true;
                                });
                                this.state.tasksOriginal.push({
                                    hash: task.hash,
                                    next: task.next,
                                    creationTime: task.creationTime,
                                });
                                process.tasks.push(task);
                            });
                        } catch (error) {
                            console.error(
                                "index.js - getUserData - getDocsTasks:",
                                error
                            );
                        }
                        process.tasks.sort((a, b) => {
                            return a.creationTime - b.creationTime;
                        });
                        this.state.tasksOriginal.sort((a, b) => {
                            return a.creationTime - b.creationTime;
                        });
                        let index = 0;
                        process.tasks.forEach((task) => {
                            task.index = index;
                            index++;
                        });
                        index = 0;
                        this.state.tasksOriginal.forEach((task) => {
                            task.index = index;
                            index++;
                        });
                        this.state.processes.push(process);
                    }
                });
                for (let key of this.state.data.processes) {
                    if (!processKeys.includes(key)) {
                        try {
                            let updateRef = doc(
                                db,
                                "users/",
                                this.state.data.id
                            );
                            await updateDoc(updateRef, {
                                ["startedProcesses." + key]: deleteField(),
                                processes: arrayRemove(key),
                            });
                        } catch (error) {
                            console.error(
                                "index.js - getUserData - updateDoc - deleteField:",
                                error
                            );
                        }
                    }
                }
            } catch (error) {
                console.error("index.js - getUserData:", error);
            }
        },
        checkProcessUpdate({ commit, state }) {
            try {
                this.state.processUpdated = false;
                this.state.processes.forEach((process) => {
                    if (process.active) process.updated = false;
                });
            } catch (error) {
                console.error("index.js - checkProcessUpdate:", error);
            }
        },
        async checkTaskUpdate({ commit, state }) {
            try {
                if (!this.state.creatingTask) {
                    await wait(0.1);
                    this.state.taskUpdated =
                        JSON.stringify(this.state.task).toString() ==
                        this.state.prevTask;

                    this.state.process.tasks.forEach((task) => {
                        if (task.active) task.updated = this.state.taskUpdated;
                    });
                    if (this.state.taskUpdated)
                        this.state.prevTask = this.state.prevTask.replace(
                            '"updated":false',
                            '"updated":true'
                        );
                    else
                        this.state.prevTask = this.state.prevTask.replace(
                            '"updated":true',
                            '"updated":false'
                        );
                }
            } catch (error) {
                console.error("index.js - checkTaskUpdate:", error);
            }
        },
        async updateUserStep({ commit, state }) {
            try {
                let updateRef = doc(db, "users/", this.state.data.id);
                await updateDoc(updateRef, {
                    lastProcess: this.state.process.hash,
                    lastTask: this.state.task.hash,
                    lastWindow: this.state.currentWindow,
                });
            } catch (error) {
                console.error("index.js - updateUserStep:", error);
            }
        },
        resetValues({ commit, state }) {
            this.state.eventLogUser = "";
            this.state.eventLogTask = "None";
            this.state.eventLog = {
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

            this.state.event = "AllLogEvents";

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
            this.state.prevTask = {};
            this.state.tasksOriginal = [];
            this.state.task = {
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

            this.state.creatingProcess = false;
            this.state.processSelected = false;
            this.state.processUpdated = true;

            this.state.process = {
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

            this.state.userToAdd = {
                username: "None",
                id: "",
                state: "None",
            };
        },
        async loadUserStep({ commit, state }) {
            try {
                this.state.currentWindow = this.state.data.lastWindow;
                this.state.processes.forEach((process) => {
                    if (process.hash == this.state.data.lastProcess) {
                        process.active = true;
                        this.state.processUpdated = process.updated;
                        this.state.process = process;
                        this.state.processSelected = true;
                    } else process.active = false;
                });

                let tag = "";
                this.state.process.users.forEach((user) => {
                    if (user.id == this.state.data.id) tag = user.tag;
                });
                this.state.data.tag = tag;

                if (
                    ["EditTask", "TaskUsers"].includes(
                        this.state.data.lastWindow
                    ) &&
                    this.state.data.lastTask != ""
                ) {
                    this.state.process.tasks.forEach((task) => {
                        if (task.hash == this.state.data.lastTask) {
                            task.active = true;
                            this.state.taskUpdated = task.updated;
                            this.state.task = task;
                            this.state.prevTask =
                                JSON.stringify(task).toString();
                            this.state.taskSelected = true;
                        } else task.active = false;
                    });
                }
            } catch (error) {
                console.error("index.js - loadUserStep:", error);
            }
        },
        async wait({ commit }, time) {
            await wait(time);
            commit("dummy");
        },
    },
    getters: {},
});
