<template>
    <select v-model="item.tag" class="text-main_lighttext text-right bg-main_bg w-fit"
        :class="item.tag == 'ADMIN' ? 'text-main_red' : 'text-main_green'">
        <option
            v-for="(item2, index2) in [...new Set($store.state.process.visibilityUsers
            .concat($store.state.process.completionUsers).concat($store.state.process.editUsers))]"
            :selected="item.tag == item2" v-bind:key="index2" :value="item2" required
            :class="item2 == 'ADMIN' ? 'text-main_red' : 'text-main_green'">
            {{ item2 }}
        </option>
    </select>
</template>

<script>
export default {
    name: "TagSelect",
    props: {
        item: Object,
    },
}
</script>