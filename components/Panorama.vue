<template>
    <div class="panorama-wrapper">
        <div class="panorama-component">
            <div class="landscape">
                <div class="left" @mouseover="transform(-1)" @mouseleave="reset()" />
                <img src="https://picsum.photos/id/240/1200/300.jpg" ref="landscape" />
                <div class="right" @mouseover="transform(1)" @mouseleave="reset()" />
            </div>
            <Phone whiteBorder half />
        </div>
        <div class="component-name">
            <span>panorama</span>
        </div>
    </div>
</template>

<script>
/* Utils */
import Utils from '~/utils';

/* Components */
import Phone from '~/components/Phone';

export default {
    components: {
        Phone
    },
    mounted() {
        this.landscape = this.$refs.landscape
    },
    methods: {
        getMaxTranslate() {
            return window.innerWidth > 768 ? '50px' : '30px'
        },
        transform(direction) {
            this.landscape.style.transform = `
                translate3d(${direction === -1 ? '-' : ''}${this.getMaxTranslate()}, 0, 0)
                scale3d(1.1, 1.1, 1)`;
        },
        reset() {
            this.landscape.style.transform = '';
        }
    }
}
</script>