<template>
    <div class="bg-main_bg flex flex-col">

        <b class="text-lg m-4">Odrađivanje studentske prakse dijagram</b>
        
        <div class="text-sm text-main_lighttext h-full flex flex-col">
            <div v-if="$store.state.process.tasks.length > 0" class="flex p-16 overflow-x-auto w-0 min-w-full grow items-center"> 
                
                <div class="flex items-center h-fit">
                    <div class="flex flex-col justify-center items-center mt-4 -mr-0.5">
                        <div class="border-4 border-main_blackblue bg-main_green rounded-full w-10 h-10 "></div>
                        <div class="font-bold">Start</div>
                    </div>

                    <DiagramArrow />
                    <div class="flex items-center" v-for="(item, index) in $store.state.process.tasks" v-bind:key="index">
                        <ProcessTaskBtnDiagram class="-mr-0.5" :name="item.name" :index="index" :selected="false" />
                        <DiagramArrow />
                    </div>

                    <div class="flex flex-col justify-center items-center mt-4">
                        <div class="border-4 border-main_blackblue bg-main_red rounded-full w-10 h-10 "></div>
                        <div class="font-bold">End</div>
                    </div>
                </div>
                
            </div>
            <div v-else>
                Empty ...
            </div> <!--overflow-x-auto w-0 min-w-full-->
        </div>

    </div>
</template>

<script>
import ProcessTaskBtnDiagram from "./Buttons/ProcessTaskBtnDiagram.vue"
import DiagramArrow from "./Buttons/DiagramArrow.vue"
export default {
    name: "ProcessDiagram",
    components: {
        ProcessTaskBtnDiagram,
        DiagramArrow,
    }
}
</script>

<style lang="scss" scoped>
.process {
    height: 40px;

    &:hover {
        background-color: rgb(217, 217, 217);
        cursor: pointer;
    }
}
</style>