<template>
    <div class="nav-component" :class="`${$store.getters.navCtaVisible ? 'with-bg' : ''}`">
        <div class="nav-content">
            <div class="left">
                <a href="/">
                    <div class="logo">
                        <Logo />
                        <span class="site-name">{{nav.site_name}}</span>
                        <span class="beta-pill">beta</span>
                    </div>
                </a>
            </div>
            <div :class="`right ${$store.getters.navCtaVisible || $route.name === 'terms' || $route.name === 'privacy' ? 'visible': ''}`">
                <button
                    class="button-component"
                    v-on:click="scrollToBottom"
                    :style="`background-color:${$route.name !== 'terms' ? $store.getters.navCtaBgColor : 'var(--brand-color)'}`"
                >
                    <span class="labelUpper">{{nav.global_cta_name}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
/* Components */
import Logo from '~/components/Svgs/Logo';

export default {
    components: {
        Logo
    },
    computed: {
        nav() {
            return this.$store.state.homepage
        }
    },
    methods: {
        scrollToBottom() {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
}
</script>