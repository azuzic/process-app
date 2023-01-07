import { createRouter, createWebHistory } from "vue-router";
import LoginSingUp from "../views/LoginSingUp.vue";
import MainPage from "../views/MainPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "LoginSingUp",
            component: LoginSingUp,
        },
        {
            path: "/main",
            name: "MainPage",
            component: MainPage,
        },
    ],
});

export default router;
