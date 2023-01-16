<template>
    <div class="relative" v-if="['Automatic', 'Task'].includes(type)">
        <div v-if="accepted >= 0 && accepted < 190" class="w-8 border-2 rounded-full border-main_blackblue relative flex items-center justify-end mr-1.5">
            <font-awesome-icon icon="play" class="rounded-full darkIcon absolute -mr-2" />
        </div>
        <div v-else>
            <div class="mr-[38px]">
            </div>
            <div class="h-14 border-2 rounded-full border-main_blackblue absolute flex items-center justify-end -ml-[72px] bottom-14 z-0"></div>
            <div class="border-2 rounded-full border-main_blackblue absolute flex items-center justify-end bottom-[108px] z-0"
            :style="'width: ' + (calc(true)) + 'px; margin-left: ' + (calc3(true))+'px;'"></div>
            <div class="border-2 rounded-full border-main_blackblue absolute flex items-center justify-end -ml-[72px] z-0"
            :class="this.task.next.data.id == '' ? 'h-20 bottom-8' : 'h-12 bottom-16'"
            :style="'margin-left: ' + (calc2(true))+'px;'">
                <font-awesome-icon icon="play" class="rounded-full darkIcon absolute -mr-[5px] rotate-90 -bottom-2.5" /></div>
        </div>
    </div>
    <div class="relative" v-if="type=='If'">
    
        <div v-if="accepted > 0 && accepted < 190" class="w-8 border-2 rounded-full border-main_green relative flex items-center justify-end mr-1.5">
            <font-awesome-icon icon="play" class="rounded-full greenIcon absolute -mr-2" />
        </div>
        <div v-else>
            <div class="h-14 border-2 rounded-full border-main_green absolute flex items-center justify-end -ml-[72px] bottom-14 z-0"></div>
            <div class="border-2 rounded-full border-main_green absolute flex items-center justify-end bottom-[108px] z-0"
            :style="'width: ' + (calc(true)) + 'px; margin-left: ' + (calc3(true))+'px;'"></div>
            <div class="border-2 rounded-full border-main_green absolute flex items-center justify-end -ml-[72px] z-0"
            :class="this.task.next.data.accepted.id == '' ? 'h-20 bottom-8' : 'h-12 bottom-16'"
            :style="'margin-left: ' + (calc2(true))+'px;'">
                <font-awesome-icon icon="play" class="rounded-full greenIcon absolute -mr-[5px] rotate-90 -bottom-2.5" /></div>
        </div>

        <div v-if="declined > 0 && declined < 190"
            class="w-8 border-2 rounded-full border-main_red relative flex items-center justify-end mr-1.5">
            <font-awesome-icon icon="play" class="rounded-full redIcon absolute -mr-2" />
        </div>
        
        <div v-else>
            
            <div class="h-14 border-2 rounded-full border-main_red absolute flex items-center justify-end -ml-[72px] bottom-14 z-0"
            :style="'bottom: ' + ((calc5(false)) -10) + 'px; height: ' + (10+ (calc6(false))) + 'px'"></div>

            <div class="border-2 rounded-full border-main_red absolute flex items-center justify-end z-0"
            :style="'width: ' + (calc(false)) + 'px; margin-left: ' + (calc3(false)) + 'px; bottom: ' + (calc4(false)) + 'px;'"></div>

            <div class="border-2 rounded-full border-main_red absolute flex items-center justify-end -ml-[72px] z-0"
            :style="'margin-left: ' + (calc2(false)) + 'px;  bottom: ' + (calc5(false)) + 'px; height: ' + (calc6(false)) + 'px'">
                <font-awesome-icon icon="play" class="rounded-full redIcon absolute -mr-[5px] rotate-90 -bottom-2.5" />
            </div>

        </div>

        <div v-if="!(declined > 0 && declined < 190) && !(accepted > 0 && accepted < 190)" class="mr-[38px]">
        </div>
    </div>
</template>

<script>

let wait = function (seconds) {
    return new Promise((resolveFn) => {
        setTimeout(resolveFn, seconds * 1000);
    });
};

export default {
    name: "DiagramArrow",
    props: {
        type: String,
        task: Object,
        array: Array,
    },
    data() {
        return {
            accepted: 0,
            declined: 0,
            n1: 0,
            n2: 0,
        }        
    },  
    methods: {
        //LINE LENGTH X
        calc(a) {
            let n = a ? this.n1 : this.n2;
            if (this.task.next.type == 'Task')
                return -62 + (185 * (n + 1) - ((n - 1) * 5));
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return -62 + (185 * (n + 1) - ((n - 1) * 5));
                else return -52 + (185 * (n + 1) - ((n - 1) * 5));
            }
            return n == 0 ? 47 : -45 + 185 * n - ((n - 1) * 5);
        },
        //MOVE LINE X
        calc3(a) {
            let n = a ? this.n1 : this.n2;
            if (this.task.next.type == 'Task')
                return -70;
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return -70;
                return -70;
            }
            return -25 - (n == 0 ? 91 : 185 * n - ((n - 1) * 5));
        },
        //MOVE LINE Y
        calc4(a) {
            let n = a ? this.n1 : this.n2;
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return 69 + n * 25;
                return 100 + n * 25;
            }
            return 100 + n * 25;
        },
        //ARROW HEIGHT
        calc6(a) {
            let n = a ? this.n1 : this.n2;
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return 40 + n * 25;
                return 39 + n * 25;
            }
            return 39 + n*25;
        },
        //MOVE ARROW X
        calc2(a) {
            let n = a ? this.n1 : this.n2;
            if (this.task.next.type == 'Task')
                return 50 + (185 * n - ((n - 1) * 5));
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return 50 + (185 * n - ((n - 1) * 5));
                return 59 + (185 * n - ((n - 1) * 5));
            }
            return -25 - (n == 0 ? 91 : 185 * n - ((n - 1) * 5));
        },
        //MOVE ARROW Y
        calc5(a) {
            let n = a ? this.n1 : this.n2;
            if ((this.accepted > 0 && a) || (this.declined > 0 && !a)) {
                if (this.task.next.data.accepted.id == '' && a || this.task.next.data.declined.id == '' && !a)
                    return 33;
                else return 65;
            }
            else return 65;
        },
        async acceptedFunc(id, a) {
            let div1 = document.getElementById(id != '' ? id : 'End').getBoundingClientRect().x;
            let div2 = document.getElementById(this.task.hash).getBoundingClientRect().x;
            if (a) this.n1 = parseInt(Math.abs((div1 - div2) / ((div1 - div2) < 0 ? 179 : 181)));
            else this.n2 = parseInt(Math.abs((div1 - div2) / ((div1 - div2) < 0 ? 179 : 181)));
            return div1 - div2;
        }
    },
    async mounted() {
        await wait(0.1);
        if (this.task != undefined) {
            if (this.task.next.type == 'If') {
                this.accepted = await this.acceptedFunc(this.task.next.data.accepted.id, true);
                //console.log("accepted", this.accepted);
                this.declined = await this.acceptedFunc(this.task.next.data.declined.id, false);
                //console.log("declined", this.declined);
            }
            if (this.task.next.type == 'Task')
                if (this.task.next.data.name == 'End')
                    this.accepted = await this.acceptedFunc('End', true);
        }
    }
}
</script>

<style lang="scss" scoped>
.darkIcon {
    filter: sepia(7%) saturate(7496%) hue-rotate(163deg) brightness(24%) contrast(160%);
}
.redIcon {
    filter: invert(88%) sepia(97%) saturate(3693%) hue-rotate(352deg) brightness(96%) contrast(77%);
}
.greenIcon {
    filter: invert(57%) sepia(22%) saturate(989%) hue-rotate(78deg) brightness(94%) contrast(83%);
}
//<font-awesome-icon icon="play" class="rounded-full icon2 absolute -mr-2" />
</style>

