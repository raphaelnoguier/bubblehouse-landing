<template>
    <div class="section testimonials">
        <div class="testimonials-wrapper swiper-container" ref="testimonialSlider">
            <div class="swiper-wrapper">
                <Testimonial
                    v-for="(testimonial, i) in testimonials"
                    :key="i"
                    :content="testimonial.primary.content"
                    :author="testimonial.primary.author"
                    :role="testimonial.primary.role"
                    :avatar="testimonial.primary.avatar.url"
                />
            </div>
            <div class="slider-controls-testimonial">
                <div class="prev">
                    <img src="~assets/images/icons/arrow.svg" />
                </div>
                <div class="next">
                    <img src="~assets/images/icons/arrow.svg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import Swiper from 'swiper';

/* Components */
import Testimonial from '~/components/Testimonial';

export default {
    computed: {
        testimonials() {
            return this.$store.state.homepage.body4.filter(slice => slice.slice_type === 'testimonial');
        }
    },
    components: {
        Testimonial
    },
    mounted() {
        this.testimonialSlider = new Swiper(this.$refs.testimonialSlider, {
            speed: 500,
            slidesPerView: 2,
            allowTouchMove: true,
            navigation: {
                nextEl: '.slider-controls-testimonial .next',
                prevEl: '.slider-controls-testimonial .prev',
            },
            // breakpoints: {
            //     375: {
            //         slidesPerView: 1.1,
            //         spaceBetween: 20
            //     }
            // }
        })
    }
}
</script>