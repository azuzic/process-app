<template>
    <div class="w-full flex items-center my-2">
        <div class="grow border-2 rounded-full h-0 border-main_weakcyan relative flex items-center justify-end">
            <font-awesome-icon icon="play" class="rounded-full rotate-180 arrow absolute -mr-2" />
        </div>
        <div class="text-main_weakcyan font-bold mx-4 text-sm">
            {{format(date)}}
        </div> 
        <div class="grow border-2 rounded-full h-0 border-main_weakcyan relative flex items-center">
            <font-awesome-icon icon="play" class="rounded-full arrow absolute -ml-2" />
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
<style lang="scss" scoped>
.arrow {
    filter: sepia(20%) saturate(745%) hue-rotate(126deg) brightness(86%) contrast(87%);
}
</style>