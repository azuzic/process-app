<template>
    <div class="fieldOptions w-60 bg-main_darkblue px-3 py-1 flex flex-col text-sm ">
        <div>Field type</div>

        <select v-model="fieldType" class="vue-select mt-2">
            <option value="Text Field">Text Field</option>
            <option value="Dropdown">Dropdown</option>
            <option value="Checkbox">Checkbox</option>
        </select>

        <hr class="border-2 rounded-full my-2">

        <div v-if="fieldType=='Text Field'" class="flex flex-col">
            <div>Field Label</div>
            <input class="vue-input2 mt-1 mb-2" placeholder="Enter field name ..." type="text">

            <div>Field Description</div>
            <input class="vue-input2 mt-1 mb-2" placeholder="Enter field description ..." type="text">

            <div>Default Value</div>
            <input class="vue-input2 mt-1 mb-2" placeholder="Enter default value ..." type="text">

            <div>Required</div>
            <label class="relative inline-flex items-center cursor-pointer mt-1 mb-2">
                <input type="checkbox" v-model="required" class="sr-only peer">
                <div class="w-9 h-5 rounded-full bg-main_red peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-main_blackblue after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_green">
                </div>
            </label>
        </div>

    </div>
</template>

<script>

export default {
    name: "FieldOptions",
    data() {
        return {
            fieldType: "Text Field",
            required: false,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>