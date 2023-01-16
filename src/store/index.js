import { createStore } from "vuex";

import { collection, getDocs, db, updateDoc, doc } from "@/firebase";

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

            next: {
                type: "",
                data: {},
            },
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
            startedProcesses: "",
        },

        /*processID: {
            currentTaskID,
            tasks: {
                taskID: {
                    state: "Waiting, Started, Finished"
                    taskData: {}               
                }            
            } 
        }*/

        allUsers: [],
        userToAdd: {
            username: "None",
            id: "",
            state: "None",
        },
    },
    mutations: {},
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
                    this.state.data.startedProcesses =
                        `${doc.data().startedProcesses}` != "undefined"
                            ? doc.data().startedProcesses
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
                        admin: `${doc.data().admin}`,
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

                            next:
                                `${doc2.data().next}` != "undefined"
                                    ? doc2.data().next
                                    : { type: "Automatic", data: {} },
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
                    let index = 0;
                    process.tasks.forEach((task) => {
                        task.index = index;
                        index++;
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
        async checkUpdate2({ commit, state }) {
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
                        this.state.prevTask = JSON.stringify(task).toString();
                        this.state.taskSelected = true;
                    } else task.active = false;
                });
            }
        },
    },
    getters: {},
});

//this.$store.state.
