<template>
    <div class="phone-slider-component">
        <div :class="`slider-controls prev ${whiteBorder ? '' : 'dark'}`">
            <img src="~/assets/images/icons/arrow.svg">
        </div>
        <div class="phones-wrapper" ref="slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, index) in items" :key="index">
                    <Phone
                        :whiteBorder="whiteBorder"
                    >
                        <div :class="`media full ${slide.is_big ? 'video' : ''}`">
                            <template v-if="slide.is_big">
                                <div class="video-wrapper">
                                    <img :src="slide.header_overlay.url" alt="profile-header" />
                                    <Video :url="slide.video.url" autoplay />
                                </div>
                            </template>
                            <LazyImg :url="slide.image.url" />
                        </div>
                    </Phone>
                </div>
            </div>
        </div>
        <div :class="`slider-controls next ${whiteBorder ? '' : 'dark'}`">
            <img src="~/assets/images/icons/arrow.svg">
        </div>
    </div>
</template>

<script>
/* Utils */
import Swiper from 'swiper';

/* Components */
import Phone from '~/components/Phone';
import LazyImg from '~/components/LazyImg';
import Video from '~/components/Video';

export default {
    components: {
        Phone,
        LazyImg,
        Video
    },
    mounted() {
        this.checkNeedSlider();
    },
    methods: {
        checkNeedSlider() {
            if (window.innerWidth <= 768) this.initSlider();
        },
        initSlider() {
            this.sliderEl = this.$refs.slider;
            this.slider = new Swiper(this.sliderEl,  {
                spaceBetween: 20,
                navigation: {
                    nextEl: '.slider-controls.next',
                    prevEl: '.slider-controls.prev',
                },
            });
        }
    },
    props: {
        items: Array,
        whiteBorder: Boolean
    }
}
</script>