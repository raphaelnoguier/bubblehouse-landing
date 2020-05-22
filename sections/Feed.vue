<template>
    <div class="section feed">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
            :dynamicColor="true"
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
                    <img :src="slide.thumb_image.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import enterView from 'enter-view';

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

        const self = this;
        enterView({
            selector: '.section.feed',
            offset: 1,
            enter: () => {
                self.$store.commit('SET_NAV_CTA_BG_COLOR', this.verticalSlides[this.activeIndex].cta_background_color);
                this.$store.commit('SET_PREV_NAV_CTA_BG_COLOR', this.verticalSlides[this.activeIndex].cta_background_color);
                self.$store.commit('SET_NAV_CTA_VISIBLE', true);
            },
            exit: () => self.$store.commit('SET_NAV_CTA_VISIBLE', false),
        });
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
            });

            this.phoneSlider.on('slideChange', () => this.onSlideChange());
        },
        slideTo(index) {
            this.phoneSlider.slideToLoop(index);
        },
        onSlideChange() {
            this.activeIndex = this.phoneSlider.realIndex;
            this.$store.commit('SET_NAV_CTA_BG_COLOR', this.verticalSlides[this.activeIndex].cta_background_color);
            this.$store.commit('SET_PREV_NAV_CTA_BG_COLOR', this.verticalSlides[this.activeIndex].cta_background_color);
        }
	}
}
</script>