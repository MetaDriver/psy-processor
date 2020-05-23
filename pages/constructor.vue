<template>
    <div class="Constructor">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <PpConstructor v-model="process" @changed="processChanged"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PpConstructor from "~/components/PpConstructor/PpConstructor.vue";
    import {mapState} from "vuex";

    export default {
        head: {
            title: 'PsyProcessor : Конструктор процессов'
        },
        name: "Constructor",
        components: {PpConstructor},
        props: [],
        data() {
            return {
                process: {
                    processTitle: "Новый процесс",
                    processCategory: "common",
                    type: 'process',
                    toSave: false,
                    toAdd: false,
                    vars: [
                        {name: '$topic', value: '', },
                        {name: '$last', value: [null], },
                    ],
                    rootNode: {
                        type: 'loopList',
                        attrs: {
                            nodeName: {
                                inpType: 'text',
                                inpLabel: 'Название узла (optional)',
                                value: 'root',
                            },
                            loopCount: {
                                inpType: 'number',
                                inpLabel: 'Количество циклов',
                                value: 0, // ноль означает бесконечный цикл
                            },
                        },
                        list: [],
                    }
                }
            }
        },
        computed: {
            ...mapState(['currentEditableProcess']),
        },
        methods: {
            processChanged(){
                this.$store.commit('currentEditableProcess', this.process);
            },
        },
        mounted(){
            if(!!this.currentEditableProcess) {
                this.process = this.currentEditableProcess;
            }
        },
    }
</script>

<style lang="scss">
    .Constructor {
        width: 100%;
        height: auto;
    }
</style>
