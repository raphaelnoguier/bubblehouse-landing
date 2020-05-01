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
    </div>
</template>

<script>
/* Utils */
import math from '~/utils/math';

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
        transform(direction) {
            this.landscape.style.transform = `translate3d(${direction === -1 ? '-' : ''}50px, 0, 0) scale3d(1.1, 1.1, 1)`;
        },
        reset() {
            this.landscape.style.transform = '';
        }
    }
}
</script>