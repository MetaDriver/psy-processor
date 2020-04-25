<template>
    <div class="Constructor">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <PpConstructor v-model="process"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PpConstructor from "~/components/PpConstructor/PpConstructor.vue"
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
                    rootNode: {
                        type: 'loopList',
                        attrs: {
                            nodeName: {
                                inpType: 'text',
                                inpLabel: 'Имя узла (optional)',
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
        computed: {},
        methods: {},
        mounted(){
        },
    }
</script>

<style lang="scss">
    .Constructor {
        width: 100%;
        height: auto;
    }
</style>
