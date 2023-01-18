<template>
    <div class="flex w-full justify-center">
        <div class="flex flex-col mt-64 w-96">
        
            <!----------------------------------------Sign Up, Log In Buttons------------------------------------------>
            <div class="flex justify-center">
                <a @click="!loading ? mode = true : ''" :class="!loading ? mode ? 'font-bold' : 'hover:underline hover:cursor-pointer' : 'text-main_grey'">
                    SIGN UP
                </a>
                <a class="ml-4 mr-4">|</a>
                <a @click="!loading ? mode = false : ''" :class="!loading ? !mode ? 'font-bold' : 'hover:underline hover:cursor-pointer' : 'text-main_grey'">
                    LOG IN
                </a>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Sign Up, Log In Buttons-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
            
            <!----------------------------------------Sign Up------------------------------------------>
            <div v-if="mode" class="flex flex-col">
                <!--EMAIL-->
                <div class="m-2 text-lg font-bold">EMAIL</div>
                <input list="email" v-model="email" class="vue-input" type="text">
                <datalist id="email">
                    <option value="admin@gmail.com" />
                    <option value="user_1@gmail.com" />
                    <option value="user_2@gmail.com" />
                    <option value="user_3@gmail.com" />
                    <option value="user_4@gmail.com" />
                </datalist>
        
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
        
                <!--SIGN UP-->
                <button @click="isEmailPasswordAndUsernameFilled() ? signup() : ''" class="p-2 my-4 rounded-full text-black font-bold"
                    :class="isEmailPasswordAndUsernameFilled() ? 'bg-main_white' : 'bg-main_grey cursor-default'"> SIGN UP </button>
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Sign Up-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
        
            <!----------------------------------------Log in------------------------------------------>
            <div v-else class="flex flex-col">
                <!--EMAIL-->
                <div class="m-2 text-lg font-bold">EMAIL</div>
                <input list="email2" v-model="email" class="vue-input" type="text">
                <datalist id="email2">
                    <option value="admin@gmail.com" />
                    <option value="user_1@gmail.com" />
                    <option value="user_2@gmail.com" />
                    <option value="user_3@gmail.com" />
                    <option value="user_4@gmail.com" />
                </datalist>
        
                <!--PASSWORD-->
                <div class="m-2 text-lg font-bold">PASSWORD</div>
                <input v-model="password" class="vue-input" type="password">
        
                <!--LOG UP-->
                <button @click="isEmailAndPasswordFilled() && !loading ? login() : ''" class="p-2 my-4 rounded-full text-black font-bold"
                    :class="isEmailAndPasswordFilled() && !loading ? 'bg-main_white' : 'bg-main_grey cursor-default'"> LOG IN </button>        
            </div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Log in-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

            <!----------------------------------------Popup------------------------------------------>
            <div class="flex items-center">
                <i v-if="$store.state.loading" class="fa-solid fa-spinner fa-spin-pulse text-main_white text-2xl"></i>
            </div>
            <div v-if="popup" class="text-red-600 font-bold text-center text-xl">User not found!</div>
            <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Popup-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
        
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@/firebase";
import { collection, addDoc } from "@/firebase";
import { db } from "@/firebase";

const auth = getAuth();

export default {
    name: "LoginSingUp",
    data() {
        return {
            username: "",
            email: "",
            password: "lozinka123",
            passwordRepeat: "",
            usernameCheck: false,
            mode: true,
            loading: false,
            popup: false,
        };
    },
    methods: {
        async signup() {
            this.loading = true;
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then(async () => {
                    this.loading = false;
                    console.log("Uspjesna registracija!");
                    this.registered = true;
                    try {
                        const docRef = await addDoc(collection(db, "users"), {
                            username: this.username,
                            email: this.email,
                            processes: [],
                            lastProcess: "",
                            lastTask: "",
                            lastWindow: "",
                            startedProcesses: {},
                        });
                        this.$router.push('/main');
                    } catch (e) {
                        this.loading = false;
                        console.error("LoginSingUp.vue - createUserWithEmailAndPassword - addDoc:", error);
                    }
                })
                .catch((e) => {
                    this.loading = false;
                    let error = e.message.slice(22, -2).replace(/-/g, " ");
                    error = error.charAt(0).toUpperCase() + error.slice(1) + "!";
                    console.error("LoginSingUp.vue - createUserWithEmailAndPassword:", error);
                });
        },
        async login() {
            this.loading = true;
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
                .then( async () => {
                    this.loading = false;
                    this.$router.push('/main');
                })
                .catch((e) => {
                    this.loading = false;
                    this.popAlert(2);
                    let error = e.message.slice(22, -2).replace(/-/g, " ");
                    error = error.charAt(0).toUpperCase() + error.slice(1) + "!";
                    console.error("LoginSingUp.vue - signInWithEmailAndPassword:", error);
                });
        },
        async popAlert(time) {
            this.popup = true;
            await this.$store.dispatch('wait',time);
            this.popup = false;
        },
        isEmailPasswordAndUsernameFilled() {
            return this.username && this.email && this.password == this.passwordRepeat && this.passwordRepeat && this.password ? true : false;
        },
        isEmailAndPasswordFilled() {
            return this.email && this.password;
        },
    },
};
</script>