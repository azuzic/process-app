<template>
    <div class="flex flex-col">
        <div>Field Label</div>
        <input v-model="$store.state.field.data.fieldLabel" class="vue-input2 mt-1 mb-2" placeholder="Enter field name ..."
            type="text">
    </div>
</template>

<script>
    export default {
        name: "Checkbox"
    }
</script>