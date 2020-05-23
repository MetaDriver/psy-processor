<template>

    <div class="ppcNode" :class="[{focused},node.type]"
         @click.stop="select({i:index, selected: node})">
        <div class="node-container" v-if="node.type==='randList' || node.type==='loopList'">
            <label class="node-meta">
                <div class="key">Тип:</div>
                <div class="value">
                    <!--{{types.obj[node.type].title}}-->
                    <select class="head-select"
                            name="type"
                            id="ntype"
                            v-model="node.type"
                    >
                            <!--@change="changeNodeType"-->
                        <option :value="item.value"
                                v-for="item in types.arr"
                                :disabled="owner.type==='process' && item.value==='quest'"
                        >{{item.title}}
                        </option>
                    </select>
                </div>
                <div class="key">Название:</div>
                <div class="value">{{node.attrs.nodeName.value}}</div>
            </label>
            <div class="node-list" :class="node.type">
                <div class="node-item" v-for="(child, idx) in node.list">
                    <div class="pay-field" v-if="node.type==='randList'">
                        <input class="pay-input"
                               type="text"
                               v-model="child.attrs.pay.value"
                               v-number-only
                        />
                        <div class="pay-percent">
                            {{(child.attrs.pay.value/paySum*100).toFixed(2)}}%
                        </div>
                    </div>
                    <div class="delete-button" @click="removeNode(idx)">
                        <i class="ico ico-cancel-circle"></i>
                    </div>
                    <ppcNode
                        :class="{selected: selectedChild===idx, unselected: selectedChild!==idx}"
                        :node="child"
                        :owner="node"
                        :createNodeFunc="createNodeFunc"
                        @select="select"
                        @changed="processChanged"
                        :index="idx"
                    />

                </div>
                <div class="node-item pos-rel">
                    <div class="add-button">
                        <i class="ico ico-plus"></i>
                    </div>
                    <div class="add-list">
                        <div class="add-item" v-for="mi in types.arr"
                             @click="addNode(mi.value)">
                            {{mi.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="quest-container" v-else-if="node.type==='quest'">
            <!--<input class="pay-input" v-if="owner.type==='randList'"-->
                   <!--type="text"-->
                   <!--v-model="node.attrs.pay"/>-->
            <textarea class="quest-input" type="text"
                   v-model="node.quest"/>
        </div>
        <div class="node-container" v-else>
            <div class="type-error-node">
                Неизвестный тип узла
            </div>
        </div>
    </div>
</template>

<script>
    import {nodeTypes} from "~/assets/js/const.js"

    export default {
        name: "ppcNode",
        components: {},
        props: ['node', 'owner', 'createNodeFunc', 'index'],
        data() {
            return {
                types: nodeTypes,
                focused: false,
                selectedChild: -1,
            }
        },
        computed: {
            paySum(){
                return this.node.list.reduce((s,v)=>{
                    return s + (v.attrs.pay.value * 1);
                },0);
            }
        },
        methods: {
            processChanged(){
                this.$emit('changed');
            },
            addNode(type){
                this.node.list.push(this.createNodeFunc(type));
                this.$emit('changed');
            },
            removeNode(idx){
                this.node.list.splice(idx, 1);
                this.$emit('changed');
            },
            select({i, selected}){
                console.log(arguments);
                console.log(selected);
                this.$emit('select', {i:this.index, selected});
                if (selected !== this.node) {
                    this.selectedChild = i;
                    this.focused = false;
                } else {
                    this.selectedChild = -1;
                    this.focused = true;
                }

            },
        },
        watch: {
            "owner.selectedChild"(v){
                if (v !== this.index) {
                    this.selectedChild = -1;
                    this.focused = false;
                }
            },
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
    .ppcNode {
        position: relative;
        width: 100%;
        height: auto;
        /*padding: 2px 2px 2px 2px;*/
        margin: 4px 4px;
        background-color: hsl(50, 30%, 90%);
        border: 1px solid hsl(50, 20%, 70%);
        border-radius: 4px;
        box-shadow: 0 0 5px 0 hsla(50, 20%, 20%, 0.1);
        color: hsl(50, 20%, 20%);
        &.quest {
             /*padding: 2px 2px 2px 2px;*/
            padding: 0;
            /*background-color:hsl(50, 20%, 50%);*/
        }
        .node-container {
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            /*padding-right: 5px;*/
        }
        .node-meta {
            display: flex;
            align-items: center;
            background-color: hsl(50, 20%, 95%);
            border-bottom: 1px solid hsl(50, 20%, 80%);
            padding: 0px 3px 0px 8px;
            border-radius: 5px 5px 0 0;
            margin: 0;
            .head-select {
                flex: 1 1 auto;
                height: 28px;
                margin-left: 1px;
                padding-left: 1px;
                background-color: transparent;
                border: none;

            &:focus {
                 background-color: white;
                 border-color: hsl(50, 30%, 75%);
             }
            }
        }

        .node-list {
            /*width: 100%;*/
            margin: 0 0 0 5px;
            padding: 0 2px 2px 0;
            .node-item {
                display: flex;
                .ppcNode {
                    flex: 1 1 auto;
                }
                .pay-field {
                    flex: 0 0 auto;
                    width: 70px;
                    height: 30px;
                    border-radius: 4px;
                    background-color: hsl(50, 20%, 95%);
                    border: 1px solid hsl(50, 20%, 70%);
                    /*border: 1px solid hsl(0, 0%, 90%);*/
                    display: flex;
                    align-items: center;
                    margin: 4px 0px 4px 4px;
                    padding: 0px;
                    /*bc*/
                    input.pay-input {
                        flex: 0 0 auto;
                        height: 28px;
                        width: 22px;
                        min-width: 22px;
                        line-height: 28px;
                        text-align: center;
                        font-size: 15px;
                        /*font-weight: bold;*/
                        background-color: transparent;
                        border-radius: 5px;
                        border: none;
                        &:focus {
                             width: 26px;
                             background-color: white;
                             border-color: hsl(50, 30%, 75%);
                         }
                    }
                    .pay-percent {
                        flex: 1 1 auto;
                        font-size: 12px;
                        /*font-weight: bold;*/
                        color: hsl(50, 30%, 55%);
                        text-align: right;
                        padding-right: 2px;
                    }
                }
            }
        }

        .key {
            font-size: 11px;
            font-weight: bold;
            margin-right: 6px;
        }

        .value {
            font-size: 13px;
            margin-right: 12px;
        }

        .quest-container {
            display: flex;
            height: auto;
            align-items: flex-start;
            padding: 2px;
            input, textarea {
                padding: 0px 5px 0px 5px;
                line-height: 20px;
            }
            .pay-input {
                display: block;
                flex: 0 0 auto;
                width: 35px;
                height: 28px;
                font-size: 14px;
                line-height: 28px;
                text-align: right;
                margin-right: 3px;
                border-radius: 4px;
                border: 1px solid hsl(0, 0%, 90%);
            }
            .quest-input {
                display: block;
                flex: 1 1 auto;
                height: 28px;
                min-height: 28px;
                font-size: 16px;
                line-height: 24px;
                /*border-radius: 0 4px 4px 0;*/
                border-radius: 4px;
                border: 1px solid hsl(0, 0%, 90%);
            }
        }
        .add-list {
            display: none;
            position: absolute;
            z-index: 5;
            top: 0;
            left: 0;
            width: auto;
            height: auto;
            padding: 5px 0;
            flex-flow: column nowrap;
            background-color: white;
            border: 1px solid hsl(50, 20%, 80%);
            .add-item {
                padding: 2px 10px;
                background-color: white;
                cursor: pointer;
                &:hover {
                    background-color: hsl(150, 50%, 80%);
                    color: black;

                 }
            }
            &:hover {
                display: flex;
             }
        }

    }
    .selected .ppcNode {
        &.selected {
        /*z-index: 5;*/
            box-shadow: 0 0 0 1px hsl(50, 30%, 80%), 0 0 0 2px hsl(50, 20%, 50%);
            &.focused {
                 background-color: hsl(150, 30%, 90%);
                 border: 1px solid hsl(150, 20%, 50%);
                 box-shadow: 0 0 0 1px hsl(150, 30%, 80%), 0 0 0 3px hsl(150, 20%, 50%);
            }
        }
    }
    .unselected .ppcNode {
        &.selected {
            box-shadow: none;
        &.focused {
             background-color: hsl(50, 30%, 90%);
             border: 1px solid hsl(50, 20%, 50%);
             box-shadow: none;
             /*box-shadow: inset 0 0 0 1px hsl(50, 30%, 90%), inset 0 0 0 3px hsl(50, 20%, 50%);*/
         }
        }
    }

</style>
