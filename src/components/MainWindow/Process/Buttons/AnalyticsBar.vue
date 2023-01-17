<template>
    <div class="w-fit">
        <div class="flex justify-between items-end w-[230px]">
            <b class="text-sm mb-1">
                {{ what }}
                <b class="text-main_cyan">{{ name }}</b>
                {{ did }}:
            </b>
            <b class="text-sm mb-1 ml-4 flex">
                <b :class="(value / total) >= 0.8 ? 'text-main_green' : (value / total) > 0.34 ? 'text-main_yellow' : 'text-main_red'">
                    {{ value }}
                </b>
                /{{ total }}
            </b>
        </div>
        <div class="w-[230px] h-2 bg-main_darkblue rounded-full overflow-hidden">
            <div :class="(value / total) >= 0.8 ? 'bg-main_green' : (value / total) > 0.34 ? 'bg-main_yellow' : 'bg-main_red'"
            class="h-full" :style="'width: calc(' + (value / total) +'*230px);'"></div>
        </div>
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
    }
}
</script>