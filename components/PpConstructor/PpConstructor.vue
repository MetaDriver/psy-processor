<template>
    <div class="PpConstructor">

        <div class="pp-panel mt-4" v-if="!!currentNode">
            <div class="attr-panel">
                <div class="head">{{'Редактор атрибутов'}}</div>
                <div class="body">
                    <div class="ppcEditorInput mt-1">
                    <!--<div class="type-select">-->
                        <label for="type">Тип узла</label>
                        <select name="type" id="type"
                                v-model="currentNode.type"
                                @change="changeNodeType">
                            <option :value="item.value"
                                    v-for="item in types"
                                    :disabled="currentNode.attrs.nodeName.value==='root' && item.value==='quest'"
                            >{{item.title}}</option>
                        </select>
                    </div>
                    <div  v-for="(attr, i) in attrs">
                        <ppcEditorInput
                            v-model="attr.val"
                        />
                    </div>
                </div>
            </div>
            <div class="struct-panel">
                <div class="head">{{'Процесс:'}} {{value.processTitle}}</div>
                <div class="body pt-3 selected">
                    <ppcNode  class="selected"
                        :node="value.rootNode"
                        :owner="value"
                        :createNodeFunc="createNewNode"
                        @select="selectNode"
                        :index="0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ppcEditorInput from "~/components/PpConstructor/ppcEditorInput.vue";
    import ppcNode from "~/components/PpConstructor/ppcNode.vue"
    import {nodeTypes} from "~/assets/js/const.js"
    export default {
        name: "PpConstructor",
        components: {ppcEditorInput, ppcNode},
        props: ['value'],
        data() {
            return {
                currentNode: null,
                currentNodeLastType: 'loopList',
                types: nodeTypes.arr,
//                    [
//                    {value:'quest', title:'Вопрос'},
//                    {value:'loopList', title:'Циклический список',},
//                    {value:'randList', title:'Вероятностный список'},
////                    {value:'linearList', title:'Простой список'},
//                ],
            }
        },
        computed: {
            attrs(){
                return Object.keys(this.currentNode.attrs).map(key=>{
                        return { key: key, val: this.currentNode.attrs[key] };
                    });
            },
        },
        methods: {
            createNewNode(){
                return {
                    type: 'loopList',
                    attrs: this.createAttrs('loopList'),
                    list: [],
                };
            },
            changeNodeType(){
                console.log("! changeNodeType");
            },
            changeAttrs(type) {
                this.currentNode.attrs = {
                    ...createAttrs(this.currentNode.type),
                    ...this.currentNode.attrs,
                };
            },
            /**
             *
             * @param type String
             */
            createAttrs(type){
                let a = {
                    nodeName: {
                        inpType: 'text',
                        inpLabel: 'Название узла (optional)',
                        value: 'new node',
                    },
                };
                switch(type) {
                    case 'quest': {
                        this.$set(a, 'quest', {
                            inpType: 'text',
                            inpLabel: 'Вопрос',
                            value: '',
                        });
                        break;
                    }
                    case 'loopList': {
                        this.$set(a, 'loopCount', {
                            inpType: 'number',
                            inpLabel: 'Количество циклов',
                            value: 0, // ноль означает бесконечный цикл
                        });
                        break;
                    }
                    case 'randList': {
                        this.$set(a, 'loopCount', {
                            inpType: 'number',
                            inpLabel: 'Количество циклов',
                            value: 1,  // ноль означает бесконечный цикл
                        });
                        break;
                    }
                    default: {
                        alert(`PpConstructor::createAttrs::  Неизвестный тип ("${type})"`);
                    }
                }
                return a;
            },
            selectNode({i,selected}){
                this.currentNode = selected;
            },
        },
        mounted(){
            this.currentNode = this.value.rootNode;
        },
    }
</script>

<style lang="scss">
    .PpConstructor {
        width: 100%;
        height: auto;

        .pp-panel {
            padding: 1px;
            display: flex;
            height: auto;
            min-height: 50vh;
            font-size: 13px;
            background-color: hsl(50, 30%, 98%);

            &  >  * {
                min-height: 100%;
                height: auto;
                padding: 0px 0px 20px;
                box-shadow: inset 0 0 2px 0 hsl(0, 0%, 80%);
                border: 1px solid hsl(50, 30%, 80%);
            }
            .head {
                width: 100%;
                height: 35px;
                display: flex;
                align-items: center;
                /*border-bottom: 1px solid grey;*/
                background-color: hsl(50, 30%, 95%);
                padding: 0 15px;
                border-bottom: 1px solid hsl(50, 30%, 75%);
                color:  hsl(50, 30%, 45%);
                font-weight: bold;
            }

            .body {
                width: 100%;
                height: auto;
                display: flex;
                flex-flow: column nowrap;
                /*border-bottom: 1px solid grey;*/
                padding: 0 15px;
            }

        }
        .attr-panel {
            flex: 0 0 auto;
            width: 190px;
            border-radius: 10px 0 0 10px;
            margin-right: 1px;
            .head {
                border-radius: 10px 0 0 0;
            }
            .body {
                padding: 0;
                .type-select {
                    height: 28px;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;

                    label {
                        display: block;
                        height: 100%;
                        width: 30px;
                        padding-left: 8px;
                        color: black;
                        line-height: 28px;
                        white-space: nowrap;
                        margin-bottom: 0;
                    }
                    select {
                        height: 28px;
                        width: calc(100% - 30px);
                        margin: 2px 0 3px 10px;
                        padding: 0 0 0 2px;
                        line-height: 28px;
                        border: 1px solid hsl(0, 0%, 90%);
                    }
                }
            }
        }

        .struct-panel {
            flex: 1 1 auto;
            border-radius: 0 10px 10px 0;
            .head {
                border-radius: 0 10px 0 0;
            }
        }

    }
</style>
