<template>
    <div class="AppHeader">
        <div class="logo">
            PsyProcessor
        </div>
        <div class="top-nav">
            <nuxt-link class="menu-item" :to="{name:'index-home'}">Главная</nuxt-link>
            <nuxt-link class="menu-item" :to="{name:'index-session'}">Сессия</nuxt-link>
            <nuxt-link class="menu-item" :to="{name:'index-procs'}">Процессы</nuxt-link>
            <nuxt-link class="menu-item" :to="{name:'index-constructor'}">Конструктор</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppHeader",
        components: {},
        props: [],
        data() {
            return {}
        },
        computed: {},
        methods: {},
        mounted(){
        },
    }
</script>

<style lang="scss">
    .AppHeader {
        position: fixed;
        left: 0;
        top: 0;
        padding: 0 20px;
        width: 100%;
        height: 50px;
        background-color: hsl(50, 30%, 95%);
        border-bottom: 1px solid hsl(50, 30%, 75%);
        display: flex;
        align-items: center;

        &>* {
            flex: 0 0 auto;
        }

        .logo {
            width: 110px;
            padding: 0 0 0 0px;
            font-family: 'Arial';
            font-size: 40px;
            font-weight: bold;
            color: hsl(50, 99%, 22%);
            transform-origin: left bottom;
            transform: scaleX(.333);
        }

        .top-nav {
            display: flex;
            align-self: stretch;
            align-items: stretch;

            &>* {
                flex: 0 0 auto;
                display: block;
            }
            .menu-item {
                display: flex;
                align-items: center;
                width: auto;
                padding: 3px 15px 0;
                &:hover {
                     background-color: hsl(50, 50%, 98%);
                    &.nuxt-link-active {
                        text-decoration: none;
                     }
                 }
                &.nuxt-link-active {
                    cursor: default;
                    color: black;
                    background-color: white;
                    box-shadow: inset 0 -3px 1px -2px hsl(50, 99%, 22%);
                 }
            }
        }

    }
</style>
