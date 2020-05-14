<template>
    <div class="nav-component">
        <div class="nav-content">
            <div class="left">
                <div class="logo">
                    <img :src="nav.logo.url" />
                </div>
                <span>{{nav.site_name}}</span>
            </div>
            <div :class="`right ${$store.getters.navCtaVisible ? 'visible': ''}`">
                <button
                    v-on:click="$store.commit('SET_MODAL_OPEN', true);"
                    class="button-component"
                    :style="`background-color:${$store.getters.navCtaBgColor}`"
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