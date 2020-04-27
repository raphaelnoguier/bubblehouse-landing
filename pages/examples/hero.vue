<template>
	<main id="home" class="hero-page">
		<div class="hero">
            <div class="text">
                <h1>Hello</h1>
            </div>
			<div class="sliders">
				<div class="swiper-container columns">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
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
				<div class="swiper-container columns middle">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
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
				<div class="swiper-container columns">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
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
		</div>
	</main>
</template>

<script>
import Swiper from 'swiper';
export default {
	data() {
		return {
			loaded: false,
			mySwiper: []
		}
	},
	components: {},
	mounted() {
		const columns = document.querySelectorAll('.columns');
		this.initSlider(columns);
	},
	methods: {
		initSlider (columns) {
			//initialize swiper when document ready
			columns.forEach((column, i) => {
				this.mySwiper[i] = new Swiper (column, {
					// Optional parameters
					direction: 'vertical',
					loop: true,
					loopedSlides: 3,
					// slidesPerGroup: 3,
					allowTouchMove: false,
					speed: 500,
					autoplay: {
						delay: -1000
					},
				})
			});
		}
	}
}
</script>