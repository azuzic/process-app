<template>
    <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow overflow-hidden ">
        <div class="flex flex-col h-full">
            <!----------------------------------------PROCESS VISIBILITY------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Process visibility</b>
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in $store.state.process.visibilityUsers" v-bind:key="index" :name="item" class="mr-2" 
                    :array="$store.state.process.visibilityUsers" :index="index" :type="'ProcessVisibility'"/>
                </div>
                <input list="visibilityChip" @input="updateVisibilityChips()" v-model="visibilityChip" class="chipInput py-2 bg-transparent outline-none" type="text"> 
                <datalist id="visibilityChip">
                    <option v-for="(item, index) in array(1)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-PROCESS VISIBILITY-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            <!----------------------------------------PROCESS EDIT------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Process edit</b>            
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in $store.state.process.editUsers" v-bind:key="index" :name="item" class="mr-2"
                        :array="$store.state.process.editUsers" :index="index" :type="'ProcessEdit'"/>
                </div>
                <input list="editChip" @input="updateEditChips()" v-model="editChip" class="chipInput py-2 bg-transparent outline-none" type="text">
                <datalist id="editChip">
                    <option v-for="(item, index) in array(2)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-PROCESS EDIT-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            <!----------------------------------------PROCESS COMPLETION------------------------------------------>
            <b class="text-lg pl-1 mt-3 mb-1">Process completion</b>
            <div class="vue-labelInput flex items-center overflow-x-auto w-0 min-w-full px-4">
                <div class="flex items-center">
                    <Chip v-for="(item, index) in $store.state.process.completionUsers" v-bind:key="index" :name="item" class="mr-2"
                        :array="$store.state.process.completionUsers" :index="index" :type="'ProcessCompletion'"/>
                </div>
                <input list="completionChip" @input="updateCompletionChips()" v-model="completionChip" class="chipInput py-2 bg-transparent outline-none" type="text">
                <datalist id="completionChip">
                    <option v-for="(item, index) in array(3)" v-bind:key="index" :value="item"/>
                </datalist>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-PROCESS COMPLETION-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

            <div class="flex grow">
                <!----------------------------------------USER TAGS------------------------------------------>
                <div class="pl-4 text-main_lighttext grow mt-12 flex flex-col">
                    <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow">
                        <div class="flex grow">
                            <div class="flex-col ">
                                <div class="text-xl absolute -mt-10 font-bold">Users</div>
                                <div v-for="(item, index) in $store.state.process.users" v-bind:key="index" class="text-sm flex">
                                    <b @click="removeUser(item)" v-if="item.name != $store.state.process.admin" class="mr-1 text-main_red hover:text-main_white hover:cursor-pointer">x</b>
                                    <b :class="item.name != $store.state.process.admin ? 'text-main_cyan' : 'text-orange-500 underline'">{{item.name}}</b>
                                </div>
                            </div>
                            <div class="flex flex-col items-end ml-12">
                                <div class="text-xl absolute text-right -mt-10 font-bold">Tags</div>
                                <div v-for="(item, index) in $store.state.process.users" v-bind:key="index"
                                    class="text-sm flex justify-end">
                                    <TagSelect class="hover:brightness-125 rounded-md" v-if="item.name != $store.state.process.admin" :item="item"/>
                                    <b v-else class="text-main_red">{{item.tag}}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-USER TAGS-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

                <div class="w-full ml-8 flex h-fit mt-8 items-center">
                    <!----------------------------------------ADD USER BUTTON------------------------------------------>
                    <div class="flex flex-col">
                        <div><br></div>
                        <div @click="$store.state.userToAdd.username != 'None' && !$store.state.loading ? addUser() : ''"
                            class="justify-around bg-main_green px-4 mr-4 h-10 rounded flex items-center"
                            :class="$store.state.userToAdd.username != 'None' ? 'hover:bg-main_white hover:cursor-pointer' : 'opacity-50 brightness-75'">
                            <b class="text-lg text-main_darktext"
                            :class="$store.state.userToAdd.username != 'None' && !$store.state.loading ? '' : 'opacity-60'">
                            Add user</b>
                        </div>
                    </div>
                    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-ADD USER BUTTON-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
                    <!----------------------------------------USER TO ADD------------------------------------------>
                    <div class="flex flex-col">
                        <div>User to add:</div>
                        <select v-model="$store.state.userToAdd"
                            class="vue-select w-48 mr-4 text-main_lighttext">
                            <option :value="{ username: 'None', id: ''}" selected>
                                None
                            </option>
                            <option v-for="(item, index) in array(4)" v-bind:key="index" :value="item">
                                {{item.username}}
                            </option>
                        </select>
                    </div>
                    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-USER TO ADD-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
                    <!----------------------------------------AUTOMATIC TAG------------------------------------------>
                    <div class="flex flex-col">
                        <div>Automatic tag:</div>
                        <select  v-model="tag"
                            class="vue-select w-48 mr-4 text-main_lighttext">
                            <option v-for="(item, index) in [...new Set($store.state.process.visibilityUsers
                            .concat($store.state.process.completionUsers).concat($store.state.process.editUsers))]" 
                            v-bind:key="index" :value="item">
                                {{item}}
                            </option>
                        </select>
                    </div>
                    <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-AUTOMATIC TAG-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
                </div>

            </div>
            <br>
        </div>

        <!--PROCESS UPDATE DELETE-->
        <ProcessFuncButtons />
    </div>
</template>

<script>
import Chip from '../../Other/Chip.vue';
import ProcessFuncButtons from "./Buttons/ProcessFuncButtons.vue";
import TagSelect from "./Buttons/TagSelect.vue";
import { db, updateDoc, deleteField, doc, arrayRemove, arrayUnion } from "@/firebase";
export default {
    name: "ProcessUsers",
    components: {
        Chip,
        ProcessFuncButtons,
        TagSelect
    },
    data() {
        return {
            visibilityChip: "",
            editChip: "",
            completionChip: "",
            tag: "USER",
        }
    },
    methods: {
        updateVisibilityChips() {
            try {
                if (this.visibilityChip.includes(",")) {
                    let newChip = this.visibilityChip.split(",")[0].trim();

                    if (this.$store.state.process.visibilityUsers == undefined)
                        this.$store.state.process.visibilityUsers = [];

                    if (!this.$store.state.process.visibilityUsers.includes(newChip)) {

                        this.$store.dispatch('checkProcessUpdate');

                        if (newChip != "") this.$store.state.process.visibilityUsers.push(newChip);
                        this.visibilityChip = this.visibilityChip.split(",").slice(1).join(",").trim();
                    }
                    else this.visibilityChip = newChip;
                }
            } catch (error) { console.error("ProcessUsers.vue - updateVisibilityChips:", error); }
        },
        updateEditChips() {
            try {
                if (this.editChip.includes(",")) {
                    let newChip = this.editChip.split(",")[0].trim();

                    if (this.$store.state.process.editUsers == undefined)
                        this.$store.state.process.editUsers = [];

                    if (!this.$store.state.process.editUsers.includes(newChip)) {

                        this.$store.dispatch('checkProcessUpdate');

                        if (newChip != "") this.$store.state.process.editUsers.push(newChip);
                        this.editChip = this.editChip.split(",").slice(1).join(",").trim();
                    }
                    else this.editChip = newChip;
                }
            } catch (error) { console.error("ProcessUsers.vue - updateEditChips:", error); }
        },
        updateCompletionChips() {
            try {
                if (this.completionChip.includes(",")) {
                    let newChip = this.completionChip.split(",")[0].trim();

                    if (this.$store.state.process.completionChip == undefined)
                        this.$store.state.process.completionChip = [];

                    if (!this.$store.state.process.completionChip.includes(newChip)) {

                        this.$store.dispatch('checkProcessUpdate');

                        if (newChip != "") this.$store.state.process.completionUsers.push(newChip);
                        this.completionChip = this.completionChip.split(",").slice(1).join(",").trim();
                    }
                    else this.completionChip = newChip;
                }
            } catch (error) { console.error("ProcessUsers.vue - updateCompletionChips:", error); }
        },
        array(a) {
            try {
                switch (a) {
                    case 1:
                        return [...new Set(this.$store.state.process.editUsers
                            .concat(this.$store.state.process.completionUsers)
                            .filter(n => !this.$store.state.process.visibilityUsers.includes(n))
                            .map(val => val + ","))];
                    case 2:
                        return [...new Set(this.$store.state.process.visibilityUsers
                            .concat(this.$store.state.process.completionUsers)
                            .filter(n => !this.$store.state.process.editUsers.includes(n))
                            .map(val => val + ","))];
                    case 3:
                        return [...new Set(this.$store.state.process.editUsers
                            .concat(this.$store.state.process.visibilityUsers)
                            .filter(n => !this.$store.state.process.completionUsers.includes(n))
                            .map(val => val + ","))];
                    case 4:
                        let processUsers = [];
                        this.$store.state.process.users.forEach(user => {
                            processUsers.push(user.name);
                        });
                        return this.$store.state.allUsers.filter(n => !processUsers.includes(n.username));
                    default:
                        break;
                }
            } catch (error) { console.error("ProcessUsers.vue - array:", error); }            
        },
        async addUser() {
            try {
                this.$store.state.loading = true;
                try { //add process to user processes in database
                    const docRef = doc(db, "users/", this.$store.state.userToAdd.id);
                    await updateDoc(docRef, {
                        processes: arrayUnion(this.$store.state.process.hash),
                    });
                } catch (error) { console.error("ProcessUsers.vue - addUser - updateDoc - arrayUnion:", error); }   

                this.$store.state.process.users.push({ name: this.$store.state.userToAdd.username, tag: this.tag, id: this.$store.state.userToAdd.id, state: 'None', started: 0, finished: 0 });

                try { //add user to process users in database
                    const docRef2 = doc(db, "process/", this.$store.state.process.hash);
                    await updateDoc(docRef2, {
                        users: this.$store.state.process.users,
                    });
                } catch (error) { console.error("ProcessUsers.vue - addUser - updateDoc2:", error); }   

                await this.$store.dispatch('logEvent', {
                    who: this.$store.state.userToAdd.username,
                    did: " joined process ",
                    what: this.$store.state.process.name,
                });
                this.$store.state.userToAdd = {
                    username: "None",
                    id: "",
                    state: "None",
                }
                this.$store.state.loading = false;
            } catch (error) { console.error("ProcessUsers.vue - addUser:", error); }   
        },
        async removeUser(user) {
            try {
                this.$store.state.loading = true;

                try {
                    const docRef = doc(db, "users/", user.id);
                    await updateDoc(docRef, {
                        processes: arrayRemove(this.$store.state.process.hash),
                    });
                } catch (error) { console.error("ProcessUsers.vue - removeUser - updateDoc - arrayRemove:", error); }   
                

                this.$store.state.process.users = this.$store.state.process.users.filter(u => u.id !== user.id);

                try {
                    const docRef = doc(db, "users/", user.id);
                    await updateDoc(docRef, {
                        processes: arrayRemove(this.$store.state.process.hash),
                    });
                    let startedProcess = "startedProcesses." + this.$store.state.process.hash;
                    await updateDoc(docRef, {
                        [startedProcess]: deleteField(),
                    });
                } catch (error) { console.error("ProcessUsers.vue - deleteProcess - updateDoc:", error); }

                try {
                    const docRef = doc(db, "process/", this.$store.state.process.hash);
                    await updateDoc(docRef, {
                        users: this.$store.state.process.users,
                    });
                } catch (error) { console.error("ProcessUsers.vue - removeUser - updateDoc2:", error); }   

                await this.$store.dispatch('logEvent', {
                    who: user.name,
                    did: " left process ",
                    what: this.$store.state.process.name,
                });
                this.$store.state.loading = false;
            } catch (error) { console.error("ProcessUsers.vue - removeUser:", error); }  
        }
    }
}
</script>