<template>
    <div class="flex flex-col">
        <div>Field Label</div>
        <input v-model="$store.state.field.data.fieldLabel" class="vue-input2 mt-1 mb-2" placeholder="Enter field name ..."
            type="text">
    
        <div>Field Description</div>
        <input v-model="$store.state.field.data.fieldDescription" class="vue-input2 mt-1 mb-2"
            placeholder="Enter field description ..." type="text">

        <div>Dropdown Values</div>
        <textarea v-model="$store.state.field.data.dropdownValues" class="vue-input2 mt-1 mb-2" placeholder="Enter dropdown values seperated by comma"
            type="text" rows="4"></textarea>
    
        <div>Required</div>
        <label class="relative inline-flex items-center cursor-pointer mt-1 mb-2">
            <input type="checkbox" v-model="$store.state.field.data.required" class="sr-only peer">
            <div
                class="w-9 h-5 rounded-full bg-main_red peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] hover:after:bg-main_bg after:bg-main_blackblue after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_green">
            </div>
        </label>
    </div>
</template>

<script>
    export default {
        name: "DropdownField"
    }
</script>