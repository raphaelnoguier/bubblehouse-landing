<template>
    <div class="section testimonials">
        <BigQuote
            content="Aura changed the way I post content online"
            author="angela mayer"
            role="photographer"
        />
        <div class="testimonials-wrapper swiper-container" ref="testimonialSlider">
            <div class="swiper-wrapper">
                <Testimonial
                    content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                    author="lindsey adler"
                    role="photographer"
                    avatar="https://picsum.photos/id/230/500/300"
                />
                <Testimonial
                    content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                    author="lindsey adler"
                    role="photographer"
                    avatar="https://picsum.photos/id/230/500/300"
                />
                <Testimonial
                    content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                    author="lindsey adler"
                    role="photographer"
                    avatar="https://picsum.photos/id/230/500/300"
                />
                <Testimonial
                    content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                    author="lindsey adler"
                    role="photographer"
                    avatar="https://picsum.photos/id/230/500/300"
                />
            </div>
            <div class="slider-controls">
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
import BigQuote from '~/components/BigQuote';
import Testimonial from '~/components/Testimonial';

export default {
    mounted() {
        this.testimonialSlider = new Swiper(this.$refs.testimonialSlider, {
            speed: 500,
            navigation: {
                nextEl: '.slider-controls .next',
                prevEl: '.slider-controls .prev',
            },
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    allowTouchMove: true
                },
                768: {
                    allowTouchMove: false,
                }
            }
        })
    },
    components: {
        BigQuote,
        Testimonial
    }
}
</script>