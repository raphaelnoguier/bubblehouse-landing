<template>
    <div class="timer-slider-wrapper">
        <div class="timer-slider-component swiper-container" ref="slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, i) in items" :key="i">
                    <Phone :key="i">
                        <div class="media full">
                            <template v-if="slide.board_video.url">
                                <Video :key="i" :autoplay="true" :url="slide.board_video.url" :loop="true" :poster="slide.image.url" />
                            </template>
                            <template v-else>
                                <img :src="slide.image.url" />
                            </template>
                        </div>
                    </Phone>
                </div>
            </div>
        </div>
        <div class="timer-slider-navigation">
            <div class="slide-infos" v-for="(slide, i) in items" :key="i" v-on:click="slider.slideTo(i)" :class="activeIndex === i ? 'active' : ''">
               <div class="icon">
                    <svg class="progress-ring" :stroke-dasharray="circleOffset">
                        <circle
                            class="progress-ring__circle"
                            stroke="transparent"
                            stroke-width="4"
                            :r="circleRadius"
                            preserveAspectRatio="xMinYMin meet"
                            cx="50%"
                            cy="50%"
                        />
                        <defs>
                            <linearGradient spreadMethod="pad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" />
                                <stop offset="100%" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div class="icon-wrapper">
                        <SVGIcon :name="slide.icon" />
                    </div>
                </div>
                <div class="content">
                    <span class="header3">{{slide.slide_title}}</span>
                    <span class="bodyRegular">{{slide.slide_description}}</span>
                </div>
            </div>
        </div>
        <div class="mobile-active-infos">
            <span class="header3">{{activeSlideTitle}}</span>
            <span class="bodyRegular">{{activeSlideDescription}}</span>
        </div>
    </div>
</template>

<script>
/* Utils */
import Utils from '~/utils';
import enterView from 'enter-view';
import Swiper from 'swiper';

/* Components */
import Phone from '~/components/Phone';
import Video from '~/components/Video';
import SVGIcon from '~/components/SVGIcon';

export default {
    components: {
        Phone,
        SVGIcon,
        Video
    },
    data() {
        return {
            activeIndex: 0,
            activeSlideTitle: '',
            activeSlideDescription: '',
            progress: 0,
            circleRadius: 32,
            circleOffset: 250
        }
    },
    mounted() {
        this.sliderEl = this.$refs.slider;

        this.slideInfos = this.$el.querySelectorAll('.slide-infos');
        this.activeInfos = this.slideInfos[0];
        this.activeCircle = this.activeInfos.querySelector('.progress-ring');

        this.initSlider(this.sliderEl);
        this.setMobileInfos();
        this.resizeSvg();

        window.addEventListener('resize', this.resizeSvg);
    },
    methods: {
        resizeSvg() {
            window.innerWidth >= 1824 ? this.circleRadius = 40 : this.circleRadius = 32;
        },
        initSlider(el) {
            this.slider = new Swiper(el, {
                allowTouchMove: false,
                effect: 'fade',
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                }
            });

            this.slider.autoplay.stop();

            this.slider.on('slideChange', () => {
                this.activeIndex = this.slider.activeIndex;

                const newSlideInfos = this.slideInfos[this.slider.activeIndex];
                const newActiveSlideVideo = this.slider.slides[this.slider.activeIndex].querySelector('video');

                if (newActiveSlideVideo) newActiveSlideVideo.currentTime = 0;
                this.activeInfos = newSlideInfos;

                this.activeInfos.querySelector('svg').style.strokeDashoffset = this.circleOffset;
                this.activeCircle.classList.remove('animate');
                this.activeCircle = this.activeInfos.querySelector('.progress-ring');

                this.setMobileInfos();
                this.toggleCircleAnimation(false);
            });
        },
        setMobileInfos() {
            this.activeSlideTitle = this.items[this.slider.activeIndex].slide_title;
            this.activeSlideDescription = this.items[this.slider.activeIndex].slide_description;
        },
        toggleCircleAnimation(paused) {
            if (paused) this.activeCircle.classList.remove('animate');
            else this.activeCircle.classList.add('animate');
        }
    },
    watch: {
        playing() {
            if (this.playing) {
                this.toggleCircleAnimation(false)
                setTimeout(() => this.slider.autoplay.start(), 300);
            }
        },
        pauseSlider() {
            if (this.pauseSlider) {// Pause
                this.toggleCircleAnimation(true);
                this.slider.autoplay.stop();
            } else {// Play
                this.toggleCircleAnimation(false)
                setTimeout(() => this.slider.autoplay.start(), 300);
            }
        },
    },
    props: {
        items: Array,
        playing: Boolean,
        pauseSlider: Boolean
    }
}
</script>