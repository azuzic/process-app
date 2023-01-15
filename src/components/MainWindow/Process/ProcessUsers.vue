<template>
    <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow overflow-hidden ">
        <div class="flex flex-col h-full">

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
            <div class="flex grow">
                <div class="pl-4 text-main_lighttext grow mt-12 flex flex-col">
                    <div class="flex flex-col overflow-y-auto overflow-x-hidden h-0 grow">
                        <div class="flex grow">
                            <div class="flex-col ">
                                <div class="text-xl absolute -mt-10 font-bold">Users</div>
                                <div v-for="(item, index) in $store.state.process.users" v-bind:key="index" class="text-sm flex">
                                    <b @click="removeUser(item.id)" v-if="item.name != $store.state.process.admin" class="mr-1 text-main_red hover:text-main_white hover:cursor-pointer">x</b>
                                    <b :class="item.name != $store.state.process.admin ? 'text-main_cyan' : 'text-orange-500 underline'">{{item.name}}</b>
                                </div>
                            </div>
                            <div class="flex flex-col items-end ml-12">
                                <div class="text-xl absolute text-right -mt-10 font-bold">Tags</div>
                                <div v-for="(item, index) in $store.state.process.users" v-bind:key="index"
                                    class="text-sm flex justify-end">
                                    <TagSelect v-if="item.name != $store.state.process.admin" :item="item"/>
                                    <b v-else class="text-main_red">{{item.tag}}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full ml-8 flex h-fit mt-8 items-center">
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
                </div>
            </div>
            <br>
        </div>
        
        <ProcessFuncButtons />
    </div>
</template>

<script>
import Chip from '../../Other/Chip.vue';
import ProcessFuncButtons from "./Buttons/ProcessFuncButtons.vue";
import TagSelect from "./Buttons/TagSelect.vue";
import { collection, getDocs, getDoc, db, updateDoc, doc } from "@/firebase";
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
            if (this.visibilityChip.includes(",")) {
                let newChip = this.visibilityChip.split(",")[0].trim();

                if (this.$store.state.process.visibilityUsers == undefined)
                    this.$store.state.process.visibilityUsers = [];

                if (!this.$store.state.process.visibilityUsers.includes(newChip)) {

                    this.$store.dispatch('checkUpdate');

                    if (newChip != "") this.$store.state.process.visibilityUsers.push(newChip);
                    this.visibilityChip = this.visibilityChip.split(",").slice(1).join(",").trim();
                }
                else this.visibilityChip = newChip;
            }
        },
        updateEditChips() {
            if (this.editChip.includes(",")) {
                let newChip = this.editChip.split(",")[0].trim();

                if (this.$store.state.process.editUsers == undefined)
                    this.$store.state.process.editUsers = [];

                if (!this.$store.state.process.editUsers.includes(newChip)) {

                    this.$store.dispatch('checkUpdate');

                    if (newChip != "") this.$store.state.process.editUsers.push(newChip);
                    this.editChip = this.editChip.split(",").slice(1).join(",").trim();
                }
                else this.editChip = newChip;
            }
        },
        updateCompletionChips() {
            if (this.completionChip.includes(",")) {
                let newChip = this.completionChip.split(",")[0].trim();

                if (this.$store.state.process.completionChip == undefined)
                    this.$store.state.process.completionChip = [];

                if (!this.$store.state.process.completionChip.includes(newChip)) {

                    this.$store.dispatch('checkUpdate');

                    if (newChip != "") this.$store.state.process.completionUsers.push(newChip);
                    this.completionChip = this.completionChip.split(",").slice(1).join(",").trim();
                }
                else this.completionChip = newChip;
            }
        },
        array(a) {
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
        },
        async addUser() {
            this.$store.state.loading = true;
            const docRef = doc(db, "users/", this.$store.state.userToAdd.id );
            let querySnapshot = await getDoc(docRef);
            let p = querySnapshot.data().processes;
            p.push(this.$store.state.process.hash);
            await updateDoc(docRef, {
                processes: p,
            });
            this.$store.state.process.users.push({ name: this.$store.state.userToAdd.username, tag: this.tag, id: this.$store.state.userToAdd.id });
            const docRef2 = doc(db, "process/", this.$store.state.process.hash);
            await updateDoc(docRef2, {
                users: this.$store.state.process.users,
            }); 
            this.$store.state.userToAdd = {
                username: "None",
                id: "",
            }
            this.$store.state.loading = false;
        },
        async removeUser(id) {
            this.$store.state.loading = true;
            const docRef = doc(db, "users/", id);
            let querySnapshot = await getDoc(docRef);
            let p = querySnapshot.data().processes;
            
            let index = p.indexOf(this.$store.state.process.hash);
            p.splice(index,1);
            
            await updateDoc(docRef, {
                processes: p,
            });
            this.$store.state.process.users=this.$store.state.process.users.filter(u => u.id !== id);
            const docRef2 = doc(db, "process/", this.$store.state.process.hash);
            await updateDoc(docRef2, {
                users: this.$store.state.process.users,
            });
            this.$store.state.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.fields {
    height: 500px;
}
.vue-labelInput {
    border-radius: 8px;
    background: #042630;
    border: solid #010910 2px;

    &:hover {
        background: rgb(4, 30, 40);
    }

    &:focus {
        background: rgb(4, 20, 30);
        border-color: #50A45E;
    }
}
.chipInput {
    width: calc(100% + 100px);
}
</style>