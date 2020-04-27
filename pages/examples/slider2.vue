<template>
	<main id="home" class="slider-2">
		<div class="hero">
            <div class="slider-behind">
                <div class="swiper-container" ref="sliderBehind">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/235/200/300" />
                        </div>
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/236/200/300" />
                        </div>
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/237/200/300" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="phone">
                <div class="slider-controls prev">
                    <div />
                </div>
                <div class="swiper-container" ref="slider">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/235/200/300" />
                        </div>
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/236/200/300" />
                        </div>
                        <div class="swiper-slide screen">
                            <img src="https://picsum.photos/id/237/200/300" />
                        </div>
                    </div>
                </div>
                <div class="slider-controls next">
                    <div />
                </div>
            </div>
		</div>
	</main>
</template>

<script>
import Swiper from 'swiper';
export default {
	data() {
		return {
			loaded: false,
		}
	},
	components: {},
	mounted() {
		this.initSliders(this.$refs.slider, this.$refs.sliderBehind);
	},
	methods: {
		initSliders (el1, el2) {
			//initialize swiper when document ready
            this.boardSlider = new Swiper (el1, {
                navigation: {
					nextEl: '.slider-controls.next',
					prevEl: '.slider-controls.prev',
                },
                initialSlide: 1,
            });
            this.sliderBehind = new Swiper (el2, {
                initialSlide: 1,
                spaceBetween: 30
            });

            this.boardSlider.controller.control = this.sliderBehind;
		    this.sliderBehind.controller.control = this.boardSlider;
		}
	}
}
</script>