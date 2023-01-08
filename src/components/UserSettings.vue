<template>
    <div class="userSettings bg-main_blackblue -m-2 flex items-center justify-between p-2">
        <!--USER SETTINGS-->
        <div class="flex">
            <img src="https://picsum.photos/200" width="43" height="43" class="rounded-full">
            <div class="flex flex-col-reverse ml-2">
                <Label :name="'Admin'" />
                <div class="text-main_lighttext font-bold mb-1">
                    {{ userData.username }}
                </div>
            </div>
        </div>
        <div class="relative">
            <div v-if="cog" @click="logout()" class="flex items-center justify-between absolute bottom-8 bg-main_white text-main_darktext font-bold flex w-32 p-2 rounded hover:cursor-pointer hover:underline">
                Log Out <font-awesome-icon class="icon mr-2" icon="right-from-bracket" />
            </div>
            <font-awesome-icon @click="cog = !cog" class="cog" icon="cog" size="xl" />
        </div>
    </div>
</template>

<script>
import Label from './Label.vue';
import { signOut, getAuth } from "@/firebase";

const auth = getAuth();

export default {
    name: "UserSettings",
    components: { Label },
    props: {
        userData: Object,
    },
    data() {
        return {
            cog: false,
        };
    },
    methods: {
        logout() {
            signOut(auth)
                .then(() => {
                    console.log("Signed out!");
                    data.username = "";
                    data.email = "";
                    this.dataUsername = "";
                    this.$router.push('/');
                })
                .catch(() => {
                    console.error("Signed out error!");
                });
        },
    }
}
</script>

<style lang="scss" scoped>
.userSettings {
    height: 58px;
}
.cog {
    &:hover {
        cursor: pointer;
        filter: invert(85%) sepia(37%) saturate(962%) hue-rotate(148deg) brightness(95%) contrast(97%);
    }
}
</style>