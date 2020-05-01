<template>
    <div class="simple-slider-wrapper">
        <div class="simple-slider-component swiper-container" ref="slider">
            <div class="background" :style="`background-image: url('${slides[activeIndex]}')`" />
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, i) in slides" :key="i">
                    <img :src="slide" />
                </div>
            </div>
        </div>
        <div class="component-name">
            <span>slider</span>
        </div>
    </div>
</template>

<script>
/* Utils */
import math from '~/utils/math';
import Swiper from 'swiper';

export default {
    data() {
        return {
            activeIndex: 0,
            slides: [
                "https://picsum.photos/id/237/500/300",
                "https://picsum.photos/id/238/500/300",
                "https://picsum.photos/id/299/500/300"
            ]
        }
    },
    mounted() {
        this.sliderEl = this.$refs.slider;
        this.initSlider(this.sliderEl);
    },
    methods: {
        initSlider(el) {
            this.slider = new Swiper(el, {
                slidesPerView: 1.1,
                spaceBetween: math.vw(1.111),
                centeredSlides: true,
                centeredSlidesBounds: true,
                on: {
                    slideChange: () => this.activeIndex = this.slider.realIndex,
                    progress: (p) => {
                        if (this.slider) {
                            const newIndex = Math.round(math.map(p, 0, 1, 0, this.slides.length - 1));
                            this.activeIndex = newIndex;
                        }
                    }
                }
            });
        }
    }
}
</script>