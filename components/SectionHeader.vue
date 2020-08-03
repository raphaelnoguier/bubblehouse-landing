<template>
    <div class="section-header-component" :class="whiteTheme ? 'white-theme' : ''">
        <div class="section-header-content" :class="large ? 'lg' : ''">
            <div class="title">
                <span class="labelUpper" :style="`color: ${dynamicColor ? $store.getters.navCtaBgColor : 'inherit'}`">
                    {{title}}
                </span>
            </div>
            <div class="baseline">
                <h2 class="header2">{{subtitle}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import reveal from '~/utils/reveal';

export default {
    mounted() {
        this.reveal = reveal({ dom: this.$el, ratioIn: 0.5 })
    },
    updated() {
        this.reveal = reveal({ dom: this.$el, ratioIn: 0.5 })
    },
    beforeDestroy() {
        this.reveal.destroy();
    },
    props: {
        title: String,
        subtitle: String,
        whiteTheme: Boolean,
        large: Boolean
    }
}
</script>