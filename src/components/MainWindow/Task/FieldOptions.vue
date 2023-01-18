<template>
    <div class="vue-list w-60 bg-main_darkblue px-3 py-1 flex flex-col text-sm">
        <div class="flex flex-col" v-if="$store.state.fieldSelected">
            <div>Field type</div>
            
            <select v-model="$store.state.field.type" class="vue-select mt-2">
                <option value="Text Field">Text Field</option>
                <option value="Text Area">Text Area</option>
                <option value="Dropdown">Dropdown</option>
                <option value="Checkbox">Checkbox</option>
            </select>
            
            <hr class="border-2 rounded-full my-2">
            
            <TextField v-if="$store.state.field.type == 'Text Field' || $store.state.field.type == 'Text Area'" />
            <DropdownField v-if="$store.state.field.type == 'Dropdown'" />
            <Checkbox v-if="$store.state.field.type == 'Checkbox'" />
        </div>
    </div>
</template>

<script>
import TextField from "./FieldTypes/TextField.vue";
import DropdownField from "./FieldTypes/DropdownField.vue";
import Checkbox from "./FieldTypes/Checkbox.vue";
export default {
    name: "FieldOptions",
    components: {
        TextField,
        DropdownField,
        Checkbox,
    },  
}
</script>