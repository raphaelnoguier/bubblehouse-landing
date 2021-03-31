<template>
    <div class="section testimonials">
        <div class="xl-wrapper">
			<div class="swiper-container" ref="testimonialSlider">
            	<div class="swiper-wrapper">
                	<div
						class="swiper-slide single-testimonial"
						v-for="(testimonial, i) in testimonials"
						:key="i"
						:style="`--testimonial-bg-color: ${hexToRgbA(testimonial.dominant_color, '0.2')}; --testimonial-bg-color-hover: ${hexToRgbA(testimonial.dominant_color, '0.4')}`"
					>
						<div class="quote-icon">
							<img src="~assets/images/icons/quote.png" />
						</div>
						<div class="testimonial-content">
							<p class="quoteText">{{testimonial.content}}</p>
						</div>
						<div class="testimonial-footer">
							<div class="testimonial-user-pic">
								<img :src="testimonial.avatar.url" :alt="testimonial.avatar.alt" />
							</div>
							<div class="testimonial-user-infos">
								<span class="header4">{{testimonial.author}}</span>
								<span class="labelUpper">{{testimonial.role}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="testimonial-navigation">
				<div class="prev">
					<Arrow />
				</div>
				<div class="next">
					<Arrow />
				</div>
			</div>
        </div>
    </div>
</template>


<script>
/* Utils */
import Swiper from 'swiper';

/* Components */
import Arrow from '~/components/Svgs/Arrow';

export default {
	computed: {
		testimonials() {
			return this.$store.state.homepage.body2.find(slice => slice.slice_type === 'testimonial').items;
		}
	},
	mounted() {
		this.testimonialSliderEl = this.$refs.testimonialSlider;

		this.testimonialSlider = new Swiper(this.testimonialSliderEl, {
			centeredSlides: true,
			centeredSlidesBounds: true,
			navigation: {
				prevEl: '.testimonial-navigation .prev',
				nextEl: '.testimonial-navigation .next'
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 24
				},
				450: {
					slidesPerView: 1.1,
					spaceBetween: 32
				},
				769: {
					spaceBetween: 32,
					slidesPerView: 1.75,
				}
			}
		})
	},
	methods: {
		hexToRgbA(hex, opacity) {
			var c;
			if (!hex) return;
			if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
				c= hex.substring(1).split('');
				if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
				}
				c= '0x'+c.join('');
				return `rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')}, ${opacity})`;
			}
			throw new Error('Bad Hex');
		}
	},
	components: {
		Arrow
	}
}

</script>
