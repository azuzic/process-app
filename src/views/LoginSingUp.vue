<template>
    <div class="flex w-full justify-center">
        <div class="flex flex-col mt-64 w-96">
        
            <div class="flex justify-center">
                <a @click="!loading ? mode = true : ''" :class="!loading ? mode ? 'active' : 'inactive' : 'text-main_grey'">
                    SIGN UP
                </a>
                <a class="ml-4 mr-4">|</a>
                <a @click="!loading ? mode = false : ''" :class="!loading ? !mode ? 'active' : 'inactive' : 'text-main_grey'">
                    LOG IN
                </a>
            </div>
        
            <div v-if="mode" class="flex flex-col">
                <!--EMAIL-->
                <div class="m-2 text-lg font-bold">EMAIL</div>
                <input v-model="email" class="vue-input" type="text">
        
                <!--USERNAME-->
                <div class="m-2 text-lg font-bold">USERNAME</div>
                <input v-model="username" class="vue-input" type="text">
                <div v-if="usernameCheck">Username already exists!</div>
        
                <!--PASSWORD-->
                <div class="m-2 text-lg font-bold">PASSWORD</div>
                <input v-model="password" class="vue-input" type="password">
        
                <!--REPEAT PASSWORD-->
                <div class="m-2 text-lg font-bold">REPEAT PASSWORD</div>
                <input v-model="passwordRepeat" class="vue-input" type="password">
        
                <button @click="isFilled() ? signup() : dummy()" class="p-2 my-4 rounded-full text-black font-bold"
                    :class="isFilled() ? 'bg-main_white' : 'bg-main_grey cursor-default'"> SIGN UP </button>
            </div>
        
            <div v-else class="flex flex-col">
                <!--EMAIL-->
                <div class="m-2 text-lg font-bold">EMAIL</div>
                <input v-model="email" class="vue-input" type="text">
        
                <!--PASSWORD-->
                <div class="m-2 text-lg font-bold">PASSWORD</div>
                <input v-model="password" class="vue-input" type="password">
        
                <button @click="isFilled2() && !loading ? login() : dummy()" class="p-2 my-4 rounded-full text-black font-bold"
                    :class="isFilled2() && !loading ? 'bg-main_white' : 'bg-main_grey cursor-default'"> LOG IN </button>        
            </div>
            <font-awesome-icon v-if="loading" icon="fa-spinner" class="fa-spin-pulse" size="2xl" />
            <div v-if="popup" class="text-red-600 font-bold text-center text-xl">User not found!</div>
        
        </div>
    </div>
</template>

<script>
import data from "@/data";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@/firebase";
import { collection, addDoc, getDocs } from "@/firebase";
import { db } from "@/firebase";

const auth = getAuth();

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default {
    name: "LoginSingUp",
    components: {
    },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            passwordRepeat: "",
            usernameCheck: false,
            data,
            mode: true,
            dataUsername: '',
            loading: false,
            popup: false,
            popupmsg: "",
        };
    },
    methods: {
        async signup() {
            if (this.password !== this.passwordRepeat) {
                return;
            } else {
                this.loading = true;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then(async () => {
                        // Signed in
                        this.loading = false;
                        console.log("Uspjesna registracija!");
                        this.registered = true;
                        try {
                            const docRef = await addDoc(collection(db, "users"), {
                                username: this.username,
                                email: this.email,
                            });
                            this.$router.push('/main');
                            console.log("Document written with ID: ", docRef.id);
                        } catch (e) {
                            this.loading = false;
                            console.error("Error adding document: ", e);
                        }
                    })
                    .catch((e) => {
                        this.loading = false;
                        let error = e.message.slice(22, -2).replace(/-/g, " ");
                        error = error.charAt(0).toUpperCase() + error.slice(1) + "!";
                        console.error(error);
                    });
            }
        },
        async login() {
            console.log("login..." + this.email);
            this.loading = true;
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
                .then((result) => {
                    console.log("Uspješna prijava", result);
                    this.loading = false;
                    this.getUserData();
                    this.$router.push('/main');
                })
                .catch((e) => {
                    this.loading = false;
                    this.popAlert("User not found!", 2);
                    let error = e.message.slice(22, -2).replace(/-/g, " ");
                    error = error.charAt(0).toUpperCase() + error.slice(1) + "!";
                    console.error(error);
                });
        },
        logout() {
            signOut(auth)
                .then(() => {
                    console.log("Signed out!");
                    data.username = "";
                    data.email = "";
                    this.dataUsername = "";
                })
                .catch(() => {
                    console.error("Signed out error!");
                });
        },
        async popAlert(msg, time) {
            this.popup = true;
            this.popupmsg = msg;
            await wait(time);
            this.popup = false;
        },
        isFilled() {
            return this.username && this.email && this.password == this.passwordRepeat && this.passwordRepeat && this.password && !this.checkUsername() ? true : false;
        },
        isFilled2() {
            return this.email && this.password;
        },
        checkUsername() {
            this.loadData();
            return this.usernameCheck;
        },
        async loadData() {
            const querySnapshot = await getDocs(collection(db, "users"));
            this.usernameCheck = false;
            querySnapshot.forEach((doc) => {
                if (this.username === `${doc.data().username}`)
                    this.usernameCheck = true;
            });
        },
        async getUserData() {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (data.email === `${doc.data().email}`) {
                    data.email = `${doc.data().email}`;
                    data.username = `${doc.data().username}`;
                    data.id = `${doc.id}`;
                    this.dataUsername = `${doc.data().username}`;
                }
            });
        },
        dummy() { },
    },
    mounted() {
    },
};
</script>

<style lang="scss" scoped>
.active {
    font-weight: bold;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}
.inactive {
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>