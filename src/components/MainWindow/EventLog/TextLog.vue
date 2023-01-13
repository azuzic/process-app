<template>
    <div>
        <span class="text-main_cyan font-normal text-sm">
            {{who}}
        </span>
        <span class="text-main_white font-normal text-sm">
            {{did}}
        </span>
        <span class="text-main_red font-normal text-sm">
            {{what}}
        </span>
    </div>
</template>

<script>
export default {
    name: "TextLog",
    props: {
        who: String,
        did: String,
        what: String,
    },
}
</script>
<style lang="scss" scoped>
.arrow {
    filter: sepia(20%) saturate(745%) hue-rotate(126deg) brightness(86%) contrast(87%);
}
</style>