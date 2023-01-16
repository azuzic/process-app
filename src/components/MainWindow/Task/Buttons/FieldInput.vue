<template>
    <div class="relative my-2">

        <div v-if="type!='Checkbox'" class="flex text-sm mb-1 justify-between">
            <div class="flex">
                <div>{{ data.fieldLabel }}</div>
                <div v-if="data.required" class="text-main_red">*</div>
            </div>
            <div class="text-main_white text-opacity-50">
                {{ data.fieldDescription }}
            </div> 
        </div>

        <input v-if="type == 'Text Field'" class="vue-input2 w-full" :placeholder="data.defaultValue" type="text" v-model="data.value">
        
        <textarea v-if="type == 'Text Area'" class="vue-input2 resize-none w-full" :placeholder="data.defaultValue" type="text" rows="4" v-model="data.value"></textarea>

        <select v-if="type == 'Dropdown'" class="vue-select w-full mt-2" v-model="data.value"> 
            <option v-for="(item, index) in (data.dropdownValues != undefined ? data.dropdownValues.split(',') : '')" v-bind:key="index" :value="item" >{{item}}</option>
        </select>

        <div class="flex" v-if="type == 'Checkbox'">
            <label class="relative inline-flex items-center mt-1 mb-2">
                <input type="checkbox" class="sr-only peer" v-model="data.value">
                <div
                    class="w-9 h-5 rounded-full bg-main_red peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-main_blackblue after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_green">
                </div>
            </label>
            <div class="ml-2 mt-0.5">{{ data.fieldLabel }}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "FieldInput",
    props: {
        isActive: Boolean,
        type: String,
        hash: String,
        data: Object,
    },  
    data() {
        return {

            fieldName: 'Field Name',
            fieldDescription: 'Field Description',
            defaultValue: 'Enter text ...',
            required: true,
        }
    },
}
</script>