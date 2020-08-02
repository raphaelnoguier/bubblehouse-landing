<template>
    <div class="nav-component" :class="`${$store.getters.navCtaVisible ? 'with-bg' : ''}`">
        <div class="nav-content">
            <div class="left">
                <a href="/">
                    <div class="logo">
                        <img :src="nav.logo.url" />
                    </div>
                    <span>{{nav.site_name}}</span>
                </a>
            </div>
            <div :class="`right ${$store.getters.navCtaVisible || $route.name === 'terms' || $route.name === 'privacy' ? 'visible': ''}`">
                <button
                    class="button-component"
                    :style="`background-color:${$route.name !== 'terms' ? $store.getters.navCtaBgColor : 'var(--brand-color)'}`"
                >
                    <span>{{nav.global_cta_name}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        nav() {
            return this.$store.state.homepage
        }
    }
}
</script>