<template>
    <div class="section feel-the-content">
        <SectionHeader
            heading="a new way of consuming"
            title="feel the content"
            subtitle="Browse beautiful content one by one to fully express what the content creator is trying to convey."
        />
        <div class="phone-slider">
            <div class="slider-controls">
                <div class="prev">A</div>
                <div class="next">V</div>
            </div>
            <div class="swiper-container phone" ref="phoneSlider">
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
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Swiper from 'swiper';

export default {
    components: {
        SectionHeader
    },
    mounted() {
		this.initSlider(this.$refs.phoneSlider);
	},
	methods: {
		initSlider (el) {
			//initialize swiper when document ready
			this.phoneSlider = new Swiper (el, {
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