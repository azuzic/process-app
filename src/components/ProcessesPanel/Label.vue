<template>
    <div class="bg-yellow-300 text-main_darktext font-bold text-center rounded-full text-xs">
        {{ name }}
    </div>
</template>

<script>

export default {
    name: 'Label',
    props: {
        name: String,
    }
}
</script>