<template>
    <div class="flex grow">
        <div class="bg-main_bg flex flex-col pb-3 grow">
            <div class="overflow-x-hidden flex flex-col-reverse px-4 overflow-y-auto h-0 grow">
                <Log v-for="(item, index) in eventLogSorted" v-bind:key="index" :log="item[1]" :index="item[0]" />
            </div>
        </div>

        <LogEventOptions /> 
    </div>
</template>

<script>
import LogEventOptions from "./LogEventOptions.vue";
import DateLog from "./DateLog.vue";
import TextLog from "./TextLog.vue";
import Log from "./Log.vue";

export default {
    name: "ViewEvent", 
    components: {
        LogEventOptions,
        DateLog,
        TextLog,
        Log
    },
    data() {
        return {
            test: [],
        }
    },
    computed: {
        eventLogSorted() {
            let test = this.$store.state.process.eventLog;
            test = Object.keys(test).map(function (key) {return [key, test[key]];});
            test = test.sort(function (a, b) { return new Date(b[0]) - new Date(a[0]) });
            return test
        }
    }
}
</script>