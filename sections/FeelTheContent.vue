<template>
    <div class="section feel-the-content">
        <SectionHeader
            heading="a new way of consuming"
            title="feel the content"
            :gradient="slides[activeIndex].gradient"
            subtitle="Browse beautiful content one by one to fully express what the content creator is trying to convey."
        />
        <div
            class="section-background"
            ref="sectionBackground"
            :style="`background-image: url(${slides[activeIndex].img});`"
        >
            <div
                class="gradient"
                :style="`background-image: linear-gradient(to bottom, rgba(10, 10, 10, 1) 30%, rgba(${slides[activeIndex].gradient}));`"
            />
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
                    <div v-for="(slide, i) in slides" class="swiper-slide screen" :key="i">
                        <img :src="slide.img" />
                    </div>
                </div>
            </div>
            <div class="slider-pagination">
                <div
                    class="thumb"
                    v-for="(slide, i) in slides"
                    :key="i"
                    :class="phoneSlider && phoneSlider.realIndex === i ? 'active' : ''"
                >
                    <img :src="slide.img" />
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
            activeSlideImg: null,
            activeIndex: 0,
            phoneSlider: null,
            sectionBackground: null,
            slides: [
                {
                    img: "https://picsum.photos/id/235/300/800",
                    gradient: "156, 210, 255, 0.3"
                },
                {
                    img: "https://picsum.photos/id/236/300/800",
                    gradient: "0, 210, 255, 0.3"
                },
                {
                    img: "https://picsum.photos/id/237/300/800",
                    gradient: "200, 150, 36, 0.3"
                }
            ]
		}
	},
    components: {
        SectionHeader
    },
    mounted() {
        this.initSlider(this.$refs.phoneSlider);

        this.phoneSlider.on('slideChange', () => {
            this.activeIndex = this.phoneSlider.realIndex;
            this.handleSlideChanged();
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
            })
        },
        handleSlideChanged() {
            const { sectionBackground } = this.$refs;

            this.activeSlideImg = this.slides[this.activeIndex].img;
        }
	}
}
</script>