<template>
    <div :class="selected ? 'border-main_green border-3' : 'hover:bg-main_blackblue border-4 hover:cursor-pointer border-main_blackblue'"
    class="bg-main_darkblue rounded px-3 py-4 flex font-bold items-center text-sm w-36 h-24 relative z-10">
        <div class="mr-2 text-main_cyan h-full">
            {{ index+1 }}.
        </div>
        <div class="h-full text3 overflow-hidden w-48">
            {{ name }}
        </div>

        <div class="absolute h-6 -top-3 w-full right-0 flex justify-evenly">
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue  border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs">1</div>
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs">12</div>
            <div :class="selected ? 'border-main_green border-3' : 'border-main_blackblue border-4'" class="h-5 bg-main_darkblue w-9 rounded-full flex justify-center items-center text-3xs">3</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ProcessTaskBtnDiagram",
    props: {
        index: Number,
        name: String,
        selected: Boolean,
    }
}
</script>