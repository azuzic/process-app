<template>
    <div :class="isActive ? 'border-main_cyan bg-main_cyan bg-opacity-10 border-2 py-2 px-4 my-2 rounded-lg' : 
    'hover:bg-main_cyan hover:bg-opacity-10 hover:p-2 hover:-mx-2 hover:-my-0 hover:rounded-lg'" class="relative my-2">

        <div v-if="type!='Checkbox'" class="flex text-sm mb-1 justify-between">
            <div class="flex">
                <div>{{ data.fieldLabel }}</div>
                <div v-if="data.required" class="text-main_red">*</div>
            </div>
            <div class="text-main_white text-opacity-50">
                {{ data.fieldDescription }}
            </div> 
        </div>

        <input v-if="type == 'Text Field'" class="input w-full" disabled :placeholder="data.defaultValue" type="text">
        
        <textarea v-if="type == 'Text Area'" class="input resize-none w-full" disabled :placeholder="data.defaultValue" type="text" rows="4"></textarea>

        <select v-if="type == 'Dropdown'" disabled class="vue-select w-full"> 
            <option v-for="(item, index) in (data.dropdownValues != undefined ? data.dropdownValues.split(',') : '')" v-bind:key="index" :value="item" >{{item}}</option>
        </select>

        <div class="flex" v-if="type == 'Checkbox'">
            <label class="relative inline-flex items-center mt-1 mb-2">
                <input type="checkbox" disabled class="sr-only peer">
                <div
                    class="w-9 h-5 rounded-full bg-main_red peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-main_blackblue after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_green">
                </div>
            </label>
            <div class="ml-2 mt-0.5">{{ data.fieldLabel }}</div>
        </div>

        <div v-if="isActive" @click="deleteField()" class="absolute right-2.5 top-1/2 -mt-2.5">
            <i class="fa-solid fa-circle text-main_blackblue text-2xl absolute rounded-full"></i>
            <i class="fa-solid fa-circle-xmark text-main_red text-2xl absolute rounded-full hover:text-main_white hover:cursor-pointer"></i>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "Field",
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
    methods: {
        deleteField() {
            try {
                var index = this.$store.state.task.fields.map(e => e.active).indexOf(true);
                if (index > -1) {
                    this.$store.state.task.fields.splice(index, 1);
                    this.$store.state.creatingField = false;
                    this.$store.state.fieldSelected = false;
                }
                this.$store.dispatch('checkTaskUpdate');
            } catch (error) { console.error("Field.vue - deleteField:", error); }
        },
    }
}
</script>

<style lang="scss" scoped>
.input {
    padding: 8px 16px 8px 16px;
    border-radius: 8px;
    background: rgba(4, 38, 48, 0.5);
    outline-width: 0;
    border: solid #010910 2px;
}
</style>