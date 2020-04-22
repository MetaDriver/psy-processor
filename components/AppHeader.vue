<template>
    <div class="AppHeader">
        <div class="logo">
            PsyProc
        </div>
        <div class="top-nav">
            <nuxt-link class="menu-item" :to="{name:'index-home'}">Home</nuxt-link>
            <nuxt-link class="menu-item" :to="{name:'index-session'}">Session</nuxt-link>
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
        padding: 5px 0 0;
        width: 100%;
        height: 50px;
        background-color: hsl(50, 30%, 95%);
        border-bottom: 1px solid hsl(50, 10%, 80%);
        display: flex;
        align-items: center;

        &>* {
            flex: 0 0 auto;
        }

        .logo {
            padding: 0 20px;
            font-family: 'Arial';
            font-size: 28px;
            font-weight: bold;
            color: hsl(50, 40%, 22%);
        }

        .top-menu {
            display: flex;
            align-items: center;

            &>* {
                flex: 0 0 auto;
            }
            .menu-item {
                padding: 15px 15px;
            }
        }

    }
</style>
