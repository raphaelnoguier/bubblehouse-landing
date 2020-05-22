<template>
    <div class="section-header-component">
        <div class="section-header-content">
            <div class="heading">
                <span>{{heading}}</span>
            </div>
            <div class="title">
                <h2 v-if="dynamicColor" :style="`color: ${$store.getters.navCtaBgColor}`">
                    {{title}}
                </h2>
                <h2 v-else>
                    {{title}}
                </h2>
            </div>
            <div class="baseline">
                <p>{{subtitle}}</p>
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
    beforeDestroy() {
        this.reveal.destroy();
    },
    props: {
        heading: String,
        title: String,
        subtitle: String,
        dynamicColor: Boolean
    }
}
</script>