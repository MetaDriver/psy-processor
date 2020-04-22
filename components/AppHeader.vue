<template>
    <div class="AppHeader">
        <div class="logo">
            PsyProc
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
        padding: 0 20px;
        width: 100%;
        height: 50px;
        background-color: hsl(50, 20%, 93%);
        border-bottom: 1px solid hsl(50, 10%, 70%);
        display: flex;
        align-items: center;
        .logo {
            font-family: 'Arial';
            font-size: 28px;
            font-weight: bold;
            color: hsl(50, 40%, 22%);
        }

    }
</style>
