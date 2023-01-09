<template>
    <div v-if="debug" class="w-screen h-screen flex justify-center items-center absolute backdrop-blur-sm z-10 py-16 px-64">
        <div class="p-4 flex flex-col bg-black bg-opacity-90 shadow-xl rounded-xl h-full w-full">
            <div class="text-center text-2xl font-bold"> DEBUG INFO </div>
            <hr/>
            <div class="overflow-scroll">
                <vue-json-pretty showIcon :data="$store.state" />
            </div>
        </div>
    </div>
    <div class="absolute bottom-2 right-2 z-50">
        <font-awesome-icon @click="debug = !debug" class="icon2 hover:cursor-pointer mr-2" icon="circle-question" size="2xl" />
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