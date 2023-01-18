<template>
    <div class="w-fit">
        <!----------------------------------------Analytics Bar------------------------------------------>
        <div class="flex justify-between items-end w-[230px]">
            <!--NAME-->
            <b class="text-sm mb-1">
                {{ what }} <b class="text-main_cyan">{{ name }}</b> {{ did }}:
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
            <b v-for="(item, index) in list(users)" v-bind:key="index" class="text-main_cyan">{{ item }}</b>
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
    },
    methods: {
        list(users) {
            try {
                if (this.users != undefined) {
                    let array = [];
                    this.$store.state.process.users.forEach(u => {
                        if (users.includes(u.id)) {
                            array.push(u.name);
                        }
                    });
                    return array;
                }
                return [];
            } catch (error) { console.error("AnalyticsBar.js - list:", error); }
        } 
    }
}
</script>