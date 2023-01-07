<template>
    <div class="bg-main_bg w-screen h-screen flex">
        <RouterView />
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
    transition: 0.2s all ease-in-out;
    caret-color: rgba(217, 217, 217);
    color:rgb(217, 217, 217);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.5px;
}
.icon {
    filter: invert(85%) sepia(37%) saturate(962%) hue-rotate(148deg) brightness(95%) contrast(97%);
}
</style>