<template>
    <div class="flex grow">
        <div class="bg-main_bg px-4 flex flex-col justify-between pb-3 grow">
            HELLO
        </div>

        <LogEventOptions /> 
    </div>
</template>

<script>
import LogEventOptions from "./LogEventOptions.vue";

export default {
    name: "ViewEvent", 
    components: {
        LogEventOptions
    },
    methods: {
    }
}
</script>