<template>
    <div class="panorama-wrapper">
        <div class="panorama-component">
            <div class="landscape">
                <div class="left" @mouseover="transform(-1)" @mouseleave="reset()" />
                <img :src="data.image.url" ref="landscape" />
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
            const ww = window.innerWidth;
            if (ww >= 768) return '30px';
            else if(ww >= 375) return '15px';

            return '50px';
        },
        transform(direction) {
            this.landscape.style.transform = `
                translate3d(${direction === -1 ? '-' : ''}${this.getMaxTranslate()}, 0, 0)
                scale3d(1.1, 1.1, 1)`;
        },
        reset() {
            this.landscape.style.transform = '';
        }
    },
    props: {
        data: Object
    }
}
</script>