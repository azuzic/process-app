<template>
    <div class="flex">
        <label class="relative inline-flex items-center mb-2">
            <input :disabled="disabled" type="checkbox" @input="change(value = !value)" :checked="disabled ? false : value"  class="sr-only peer">  
            <div class="w-9 h-5 rounded-full bg-main_red peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-main_blackblue after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_green"
            :class="disabled ? 'brightness-50 opacity-50' : 'hover:after:bg-main_bg'">
            </div>
        </label>
        <div class="ml-2 mt-0.5" :class="disabled ? 'brightness-50 opacity-50' : ''">{{ label }}</div>
    </div>
</template>

<script>
export default {
    name: "LogCheckBox",
    props: {
        label: String,
        value: Boolean,
        disabled: Boolean,
    },
    data() {
        return {
        }
    },
    methods: {
        change() {
            let a = this.label.split(' ')[0].toLowerCase() + this.label.split(' ')[1].replace(/^\w/, c => c.toUpperCase());
            this.$store.state.eventLog[a] = this.value;
        }
    }
}
</script>