<template>
	<main id="home" class="slider-1">
		<div class="hero">
			<div class="slider-controls">
				<div class="prev">A</div>
				<div class="next">V</div>
			</div>
			<div class="swiper-container phone" ref="slider">
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
			<div class="slider-pagination">
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
			slides: [
				{
					color: 'red'
				},
				{
					color: 'green'
				},
				{
					color: 'yellow'
				}
			]
		}
	},
	components: {},
	mounted() {
		this.initSlider(this.$refs.slider);
		document.body.style.backgroundColor = (this.slides[0].color);

		this.mySwiper.on('slideChange', (index) => {
  			document.body.style.backgroundColor = (this.slides[this.mySwiper.realIndex].color);
		});
	},
	methods: {
		initSlider (el) {
			//initialize swiper when document ready
			this.mySwiper = new Swiper (el, {
				// Optional parameters
				direction: 'vertical',
				loop: true,
				navigation: {
					nextEl: '.slider-controls .next',
					prevEl: '.slider-controls .prev',
				},
				pagination: {
					el: '.slider-pagination',
					clickable: true
    			},
			})
		}
	}
}
</script>