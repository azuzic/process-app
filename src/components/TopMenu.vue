<template>
    <div class="menu bg-main_blackblue flex px-4 items-center">
        <menu-item :selected="true">Edit <br> Process</menu-item>
        <menu-item :selected="false">Process <br> Diagram</menu-item>
        <menu-item :selected="false">Process <br> Analytics</menu-item>
        <menu-item :selected="false">Process <br> Users</menu-item>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
    name: "TopMenu",
    components: {
        MenuItem
    }
}
</script>

<style lang="scss" scoped>
.menu {
    height: 90px;
}
</style>