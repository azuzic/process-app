<template>
    <div class="bg-main_bg flex flex-col">
        <!--PROCESS DIAGRAM NAME-->
        <b class="text-lg m-4">{{ $store.state.process.name }} - Diagram</b>
        
        <!----------------------------------------Process diagram------------------------------------------>
        <div class="text-sm text-main_lighttext h-full flex flex-col">
            <div v-if="$store.state.process.tasks.length > 0" class="flex p-16 overflow-x-auto w-0 min-w-full grow items-center"> 
                
                <div class="flex items-center h-fit">
                    <!--STARTING POINT-->
                    <div class="flex flex-col justify-center items-center mt-4 -mr-0.5">
                        <div class="border-4 border-main_blackblue bg-main_green rounded-full w-10 h-10 "></div>
                        <div class="font-bold">Start</div>
                    </div>

                    <!--DIAGRAM-->
                    <DiagramArrow :type="'Automatic'"/>
                    <div class="flex items-center" v-for="(item, index) in list" v-bind:key="index">
                        <ProcessTaskBtnDiagram v-if="item.visibilityUsers.includes($store.state.data.tag)" class="-mr-0.5" :name="item.name" :index="index" :selected="currentTaskCheck(item)" :id="item.hash" :task="item"/>
                        <DiagramArrow v-if="item.visibilityUsers.includes($store.state.data.tag)" :type="item.next.type" :task="checkNextIf(index)" :array="list" />
                    </div>

                    <!--ENDING POINT-->
                    <div class="flex flex-col justify-center items-center mt-4 z-10">
                        <div v-if="$store.state.data.startedProcesses[$store.state.process.hash]" class="border-4 border-main_blackblue rounded-full w-10 h-10" :class="$store.state.data.startedProcesses[$store.state.process.hash].currentTaskID == 'End' ? 'bg-main_cyan' : 'bg-main_red'" id="End"></div>
                        <div v-else="$store.state.data.startedProcesses[$store.state.process.hash]"
                            class="border-4 bg-main_red border-main_blackblue rounded-full w-10 h-10" id="End"></div>
                        <div class="font-bold">End</div>
                    </div>
                </div>
                
            </div>
            <div class="w-full h-full flex justify-center items-center text-lg font-bold text-main_red" v-else>
                Empty ...
            </div>
        </div>
        <!--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-Process diagram-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-->

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
    },
    data() {
        return {
            iterations: 0,
            list: [],
        }
    },
    mounted() {
        if (this.$store.state.process.tasks.length > 0)
            this.list = this.array('', 0);
    },  
    methods: {
        //CHECK IF TASK IS VISIBLE TO USER
        currentTaskCheck(task){            
            try {
                if (this.$store.state.data.startedProcesses[this.$store.state.process.hash]) {
                    let task2 = this.$store.state.tasksOriginal.filter(a => a.hash == task.hash)[0];
                    if (!this.$store.state.task.visibilityUsers.includes(this.$store.state.data.tag)) {
                        switch (task2.next.type) {
                            case "Automatic":
                                if (this.$store.state.tasksOriginal[task2.index + 1] != undefined) {
                                    return this.$store.state.tasksOriginal[task2.index + 1].hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID;
                                } break;
                            default: break;
                        }
                    }
                    return task.hash == this.$store.state.data.startedProcesses[this.$store.state.process.hash].currentTaskID;
                }
                return false;
            } catch (error) { console.error("ProcessDiagram.vue - currentTaskCheck:", error); }
        },
        //CHECK NEXT TASK AND CONNECT ARROW TO IT
        checkNextIf(index) {
            try {
                if (this.list[index + 1] != undefined) {
                    if (!this.list[index + 1].visibilityUsers.includes(this.$store.state.data.tag)) {
                        for (let i = index; i < this.list.length; i++) {
                            let e = this.list[i];
                            if (e.next.type == 'If' && !e.visibilityUsers.includes(this.$store.state.data.tag)) {
                                this.list[index].next = e.next;
                                return this.list[index];
                            }
                        }
                    }
                }
                return this.list[index];
            } catch (error) { console.error("ProcessDiagram.vue - checkNextIf:", error); }
        },
        //SORT TASKS AND GENERATE DIAGRAM
        array(taskProceed, iterationEnter) {
            try {
                if (iterationEnter > 1) return 100;
                let tasks = [];
                let hashes = [];
                let overflowStop = 0;

                let task = "";
                if (taskProceed != '') task = taskProceed;
                else {
                    task = this.$store.state.process.tasks[0];
                    tasks.push(task);
                    hashes.push(task.hash);
                }

                let endReached = false;
                while (overflowStop < 10 && !endReached) {
                    switch (task.next.type) {
                        case "Automatic":
                            task = this.$store.state.process.tasks[task.index + 1] != undefined ?
                                this.$store.state.process.tasks[task.index + 1] :
                                "End";
                            if (task != "End") {
                                if (!hashes.includes(task.hash)) {
                                    tasks.push(task); hashes.push(task.hash);
                                }
                                else {
                                    tasks = tasks.filter(t => t.hash !== task.hash);
                                    tasks.push(task); hashes.push(task.hash);
                                }
                            }
                            else endReached = true;
                            break;
                        case "Task":
                            task = this.$store.state.process.tasks.filter(a => a.hash === task.next.data.id)[0];
                            if (task != undefined) {
                                if (!hashes.includes(task.hash)) {
                                    tasks.push(task); hashes.push(task.hash);
                                }
                                else {
                                    tasks = tasks.filter(t => t.hash !== task.hash);
                                    tasks.push(task); hashes.push(task.hash);
                                }
                            }
                            else endReached = true;
                            break;
                        case "If":
                            let taskAccepted = {};
                            let taskDeclined = {};
                            let enteredAccepted = false;
                            let enteredDeclined = false;
                            if (!hashes.includes(task.next.data.accepted.id) && task.next.data.accepted.id != '') {
                                taskAccepted = this.$store.state.process.tasks.filter(a => a.hash === task.next.data.accepted.id)[0];
                                enteredAccepted = true;
                                if (taskAccepted != undefined) { tasks.push(taskAccepted); hashes.push(taskAccepted.hash); }
                            }
                            if (!hashes.includes(task.next.data.declined.id) && task.next.data.declined.id != '' && iterationEnter < 2) {
                                taskDeclined = this.$store.state.process.tasks.filter(a => a.hash === task.next.data.declined.id)[0];
                                enteredDeclined = true;
                                if (taskDeclined != undefined) { tasks.push(taskDeclined); hashes.push(taskDeclined.hash); }
                            }
                            if (enteredAccepted && enteredDeclined) {
                                if (this.array(taskAccepted, iterationEnter + 1).length - this.array(taskDeclined, iterationEnter + 1).length >= 0)
                                    task = taskAccepted;
                                else task = taskDeclined;
                            }
                            else if (enteredAccepted) task = taskAccepted;
                            else if (enteredDeclined) task = taskDeclined;
                            else endReached = true;
                            break;
                        default: break;
                    }
                    overflowStop++;
                }
                return tasks;
            } catch (error) { console.error("ProcessDiagram.vue - array:", error); }
        }
    }
}
</script>