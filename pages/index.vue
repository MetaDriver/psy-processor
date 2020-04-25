<template>
    <div class="Main">
        <AppHeader />
        <nuxt-child />
        <AppFooter />
    </div>
</template>

<script>
    import AppHeader from '~/components/AppHeader.vue'
    import AppFooter from '~/components/AppFooter.vue'

    export default {
        name: "Main",
        components: {
            AppHeader, AppFooter
        },
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
    .Main {
        width: 100%;
        height: auto;
        padding: 60px 0 50px;
    }
</style>
