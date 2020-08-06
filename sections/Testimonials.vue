<template>
    <div class="section testimonials">
        <div class="large-wrapper">
            <SectionHeader
                :title="header.title"
                :subtitle="header.subtitle"
                :whiteTheme="true"
            />
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
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import Swiper from 'swiper';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import Testimonial from '~/components/Testimonial';

export default {
    computed: {
        header () {
            return this.$store.state.homepage.body4[0].primary;
        },
        testimonials() {
            return this.$store.state.homepage.body4.filter(slice => slice.slice_type === 'testimonial');
        }
    },
    components: {
        Testimonial,
        SectionHeader
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
            breakpoints: {
                350: {
                    slidesPerView: 1.1,
                    spaceBetween: 8,
                    centeredSlides: true,
                    centeredSlidesBounds: true
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32
                }
            }
        })
    }
}
</script>