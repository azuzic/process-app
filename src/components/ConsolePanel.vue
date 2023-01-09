<template>
    <div class="processesPanel bg-black flex flex-col p-2 justify-between">

        <div>
            <!--TITLE-->
            <div class="font-bold py-3 h-16 text relative"> 
                <div class="absolute bottom-1 text">
                    {{$store.state.process.name}}
                </div>
            </div>
            <hr class="border-main_white border-2 rounded-full">

            <!--PROCESS LIST-->
            <div>
                <block-button :name="'Process'" icon="book" :selected="true"/>
                <block-button :name="'Tasks'" icon="list-check" :selected="false" />
                <block-button :name="'Conversation Session'" icon="comments" :selected="false" />
                <block-button :name="'Event Log'" icon="bell" :selected="false" />
            </div>
        </div>
    </div>
</template>

<script>
import BlockButton from './ConsolePanel/BlockButton.vue';

export default {
    components: {},
    name: 'ConsolePanel',
    components: {
        BlockButton
    },
}
</script>

<style lang="scss" scoped>
.processesPanel {
    width: 360px;
    padding: 8px 38px 8px 38px;
}
</style>