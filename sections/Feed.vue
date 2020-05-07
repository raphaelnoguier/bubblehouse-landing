<template>
    <div class="section feed">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
        />
        <div
            ref="sectionBackground"
            v-for="(slide, i) in verticalSlides"
            :class="`section-background ${i === activeIndex ? 'visible' : ''}`"
            :key="i"
            :style="`background-image: url(${slide.blurred_image.url});`"
        >
            <div class="gradient" />
        </div>
        <div class="phone-slider">
            <div class="slider-controls">
                <div class="prev">
                    <img src="~assets/images/icons/arrow.svg" />
                </div>
                <div class="next">
                    <img src="~assets/images/icons/arrow.svg" />
                </div>
            </div>
            <div class="swiper-container phone-component" ref="phoneSlider">
                <div class="swiper-wrapper">
                    <div v-for="(slide, i) in verticalSlides" class="swiper-slide screen" :key="i">
                        <img :src="slide.slide_image.url" />
                    </div>
                </div>
            </div>
            <div class="slider-pagination">
                <div
                    class="thumb"
                    v-for="(slide, i) in verticalSlides"
                    :key="i"
                    v-on:click="slideTo(i)"
                    :class="phoneSlider && phoneSlider.realIndex === i ? 'active' : ''"
                >
                    <img :src="slide.slide_image.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Swiper from 'swiper';

export default {
    data() {
		return {
            activeIndex: 0,
            phoneSlider: null,
            sectionBackground: null,
		}
	},
    components: {
        SectionHeader
    },
    computed: {
        header () {
            return this.$store.state.homepage.body[0].primary;
        },
        verticalSlides () {
            return this.$store.state.homepage.body[1].items;
        }
    },
    mounted() {
        this.initSlider(this.$refs.phoneSlider);
        this.phoneSlider.on('slideChange', () => this.activeIndex = this.phoneSlider.realIndex);
	},
	methods: {
		initSlider (el) {
			this.phoneSlider = new Swiper (el, {
                allowTouchMove: false,
				direction: 'vertical',
                loop: true,
                speed: 500,
				navigation: {
					nextEl: '.slider-controls .next',
					prevEl: '.slider-controls .prev',
				},
            })
        },
        slideTo(index) {
            this.phoneSlider.slideToLoop(index);
        }
	}
}
</script>