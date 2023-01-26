<template>
    <div class="w-fit">
        <!----------------------------------------Analytics Bar------------------------------------------>
        <div class="flex justify-between items-end w-[230px]">
            <!--NAME-->
            <b class="text-sm mb-1">
                {{ what }} <b class="text-main_cyan">{{ name!="" ? index+1+ ". " + name : name }}</b> {{ did }}:
            </b>

            <!--VALUE-->
            <b class="text-sm mb-1 ml-4 flex">
                <b :class="(value / total) >= 0.8 ? 'text-main_green' : (value / total) > 0.34 ? 'text-main_yellow' : 'text-main_red'"> {{ value }} </b> 
                /{{ total }}
            </b>
        </div>
        <!--BAR-->
        <div class="w-[230px] h-2 bg-main_darkblue rounded-full overflow-hidden">
            <div :class="(value / total) >= 0.8 ? 'bg-main_green' : (value / total) > 0.34 ? 'bg-main_yellow' : 'bg-main_red'"
            class="h-full" :style="'width: calc(' + (value / total) +'*230px);'"></div>
        </div>

        <div v-if="name==''" class="flex flex-col grow mt-2">
            <b v-for="(item, index) in list(users)" v-bind:key="index" class="text-main_cyan flex justify-between text-sm items-end">
                <b class="truncate w-[140px] text-main_cyan">{{item.name}}</b>
                <b v-if="item.startTime">{{format(item.startTime)}}</b>
                <b v-else-if="item.timePassed">{{ parseInt(item.timePassed/(1000*60*60*24)) + " days "}}</b>
                <b v-else>{{format(item.endTime)}}</b>
            </b>
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Analytics Bar-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->
    </div>
</template>

<script>
export default {
    name: "AnalyticsBar",
    props: {
        total: Number,
        value: Number,
        what: String,
        name: String,
        did: String, 
        users: Array,
        index: Number,
        started: Array,
    },
    methods: {
        list(users) {
            try {
                if (this.users != undefined) {
                    let array = [];
                    this.$store.state.process.users.forEach(u => {
                        let found = this.users.filter( e => e.userID == u.id)[0];
                        if (this.started){ 
                            let timeStarted = this.started.filter( e => e.userID == u.id)[0];
                            if (timeStarted){
                                array.push({name: u.name, timePassed: new Date().getTime() - timeStarted.startTime})
                            }
                        }
                        else if (found) {
                            if (found.startTime) array.push({name: u.name, startTime: found.startTime})
                            else array.push({name: u.name, endTime: found.endTime})
                        }
                    });
                    return array;
                }
                return [];
            } catch (error) { console.error("AnalyticsBar.js - list:", error); }
        },
        format(d) {
            let date = new Date(d)
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/");
            let array = date.split("/");
            return array[2] + "/" + array[1] + "/" + array[0];
        } 
    }
}
</script>