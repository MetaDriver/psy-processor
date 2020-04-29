<template>

    <div class="ppcNode" :class="[{focused},node.type]"
         @click.stop="select({i:index, selected: node})">
        <div class="node-container" v-if="node.type==='randList' || node.type==='loopList'">
            <label class="node-meta">
                <div class="key">Тип:</div>
                <div class="value">{{types.obj[node.type].title}}</div>
                <div class="key">Название:</div>
                <div class="value">{{node.attrs.nodeName.value}}</div>
            </label>
            <div class="node-list">
                <div class="node-item" v-for="(child, idx) in node.list">
                    <ppcNode
                        :class="{selected: selectedChild===idx, unselected: selectedChild!==idx}"
                        :node="child"
                        :owner="node"
                        :createNodeFunc="createNodeFunc"
                        @select="select"
                        :index="idx"
                    />
                </div>
                <div class="node-item">
                    <div class="add-button"
                         @click="addNode">
                        <i class="ico ico-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="quest-container" v-else-if="node.type==='quest'">
            <input class="pay-input" v-if="owner.type==='randList'"
                   type="text"
                   v-model="node.attrs.pay"/>
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
        computed: {},
        methods: {
            addNode(){
                this.node.list.push(this.createNodeFunc());
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
        padding: 2px 2px 2px 2px;
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
            padding-right: 5px;
        }
    .node-meta {
        display: flex;
        align-items: center;
        background-color: hsl(50, 20%, 95%);
        border: 1px solid hsl(50, 20%, 80%);
        padding: 3px 8px;
        border-radius: 5px;
        margin: 0;
    }

    .node-list {
        /*width: 100%;*/
        margin: 0 0 0 15px;
        padding: 0;
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
            margin-right: 1px;
            border-radius: 4px 0 0 4px;
            border: 1px solid hsl(0, 0%, 90%);
        }
        .quest-input {
            display: block;
            flex: 1 1 auto;
            height: 28px;
            min-height: 28px;
            font-size: 16px;
            line-height: 24px;
            border-radius: 0 4px 4px 0;
            border: 1px solid hsl(0, 0%, 90%);
        }
    }
    .add-button {
        width: 25px;
        height: 25px;
        margin: 2px auto 0 0;
        background-color: hsl(120, 10%, 70%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: white;
        border: 1px solid currentColor;
        border-radius: 50%;
        cursor: pointer;
        transform: scale3d(0.9, 0.9, .1);
        transition: all ease 0.8s;

    &:hover {
        background-color: hsl(120, 80%, 50%);
        transform: scale3d(1, 1, .1);
        transition: all ease 0.1s;
    }

    }
    }
    .selected .ppcNode {
        &.selected {
        z-index: 5;
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
