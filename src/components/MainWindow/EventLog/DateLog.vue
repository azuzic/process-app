<template>
    <div class="w-full flex items-center my-2">
        <div class="grow border-2 rounded-full h-0 border-main_weakcyan relative flex items-center justify-end">
            <i class="fa-solid fa-play text-main_weakcyan rotate-180 absolute -mr-2"></i>
        </div>
        <div class="text-main_weakcyan font-bold mx-4 text-sm">
            {{format(date)}}
        </div> 
        <div class="grow border-2 rounded-full h-0 border-main_weakcyan relative flex items-center">
            <i class="fa-solid fa-play text-main_weakcyan absolute -ml-2"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "DateLog",
    props: {
        date: String
    },
    methods: {
        format(date) {
            let array = date.split("/");
            return array[1] + "/" + array[2] + "/" + array[0];
        }
    }
}
</script>