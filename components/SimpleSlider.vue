<template>
    <div class="simple-slider-wrapper">
        <div class="simple-slider-component swiper-container" ref="slider">
            <div
                v-for="(slide, i) in items"
                :class="`background ${i === activeIndex ? 'visible': ''}`"
                :style="`background-image: url('${items[i].slide_image.url}')`"
                :key="i"
            />
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, i) in items" :key="i">
                    <img :src="slide.slide_image.url" />
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
import Utils from '~/utils';
import Swiper from 'swiper';

export default {
    data() {
        return {
            activeIndex: 0
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
                centeredSlides: true,
                centeredSlidesBounds: true,
                breakpoints: {
                    320: {
                        spaceBetween: Utils.vw(4.267)
                    },
                    767: {
                        spaceBetween: Utils.vw(1.111)
                    }
                },
                on: {
                    slideChange: () => this.activeIndex = this.slider.realIndex,
                    progress: (p) => {
                        if (this.slider) {
                            const newIndex = Math.round(Utils.map(p, 0, 1, 0, this.items.length - 1));
                            this.activeIndex = newIndex;
                        }
                    }
                }
            });
        }
    },
    props: {
        items: Array
    }
}
</script>