<template>
    <div v-if="debug" class="w-screen h-screen flex justify-center items-center absolute backdrop-blur-sm z-40 py-16 px-64">
        <div class="p-4 flex flex-col bg-black bg-opacity-90 shadow-xl rounded-xl h-full w-full">
            <div class="text-center text-2xl font-bold"> DEBUG INFO </div>
            <hr/>
            <div class="overflow-scroll">
                <vue-json-pretty showIcon :deep="2" :data="$store.state" />
            </div>
        </div>
    </div>
    <div class="absolute bottom-2 right-2 z-50">
        <i @click="debug = !debug" class="fa-solid fa-circle-question text-main_lighttext hover:text-main_cyan text-4xl hover:cursor-pointer mr-2 opacity-50"></i>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    name: "debug",
    components: {
        VueJsonPretty,
    },
    data() {
        return {
            debug: false,
        }
    }
}
</script>