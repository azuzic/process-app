<template>
    <div v-for="(item, index) in log" v-bind:key="index">
        <TextLog v-if="show(item)" :who="item.who" :did="item.did" :what="item.what" />
    </div>
    <DateLog v-if="show2(log)" :date="index" />
</template>
<script>
import DateLog from "./DateLog.vue";
import TextLog from "./TextLog.vue";

export default {
    name: "Log",
    props: {
        log: Object,
        index: String,
    },
    components: {
        DateLog,
        TextLog
    },
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        show(item) {
            if (item.what != this.$store.state.eventLogTask && 
                this.$store.state.eventLogTask != 'None' && 
                ['AllLogEvents', 'TaskEvents'].includes(this.$store.state.event) ||
                item.who.indexOf(this.$store.state.eventLogUser) == -1 && this.$store.state.eventLogUser!="") return false;
            let array = [];
            for (let key in this.$store.state.eventLog) if (this.$store.state.eventLog[key]) array.push(key);
            let a = array.includes(item.did.trim().split(' ')[0].toLowerCase() + item.did.trim().split(' ')[1].replace(/^\w/, c => c.toUpperCase()));
            return a;
        },
        show2(log) {
            let array = [];
            for (let key in this.$store.state.eventLog) if (this.$store.state.eventLog[key]) array.push(key);
            let t = false;
            log.forEach(a => {
                let b = array.includes(a.did.trim().split(' ')[0].toLowerCase() + a.did.trim().split(' ')[1].replace(/^\w/, c => c.toUpperCase()));
                if (b && !(a.what != this.$store.state.eventLogTask && this.$store.state.eventLogTask != 'None' && ['AllLogEvents', 'TaskEvents'].includes(this.$store.state.event) ||
                a.who.indexOf(this.$store.state.eventLogUser) == -1 && this.$store.state.eventLogUser!="")) t = true;
            });
            return t;
        },
    }
}
</script>