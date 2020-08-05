<template>
    <div class="timer-slider-wrapper">
        <div class="timer-slider-component swiper-container" ref="slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, i) in items" :key="i">
                    <Phone :key="i">
                        <div class="media full">
                            <Video :key="i" :url="slide.board_video.url" :loop="false" />
                        </div>
                    </Phone>
                </div>
            </div>
        </div>
        <div class="timer-slider-navigation">
            <div class="slide-infos" v-for="(slide, i) in items" :key="i" @click="slider.slideTo(i)" :class="activeIndex === i ? 'active' : ''">
               <div class="icon">
                    <svg class="progress-ring" stroke-dashoffset="250" :stroke-dasharray="circleOffset">
                        <circle
                            class="progress-ring__circle"
                            stroke="black"
                            stroke-width="4"
                            r="32"
                            cx="32"
                            cy="32"
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
            activeVideo: null,
            activeSlideTitle: '',
            activeSlideDescription: '',
            progress: 0,
            circleOffset: 250
        }
    },
    mounted() {
        this.sliderEl = this.$refs.slider;
        this.activeVideo = this.sliderEl.querySelector('.swiper-slide video'); // First video is active at the beginning

        this.slideInfos = this.$el.querySelectorAll('.slide-infos');
        this.activeInfos = this.slideInfos[0];

        this.initSlider(this.sliderEl);
        this.setMobileInfos();

        enterView({
            selector: '.section.profile-example',
            offset: 1,
            enter: () => this.activeVideo && this.activeVideo.pause(),
            exit: () => this.activeVideo && this.activeVideo.play(),
        });

        enterView({
            selector: '.section.feed',
            offset: 1,
            enter: () => this.activeVideo && this.activeVideo.pause(),
            exit: () => this.activeVideo && this.activeVideo.play(),
        });
    },
    methods: {
        initSlider(el) {
            this.slider = new Swiper(el, {
                allowTouchMove: false,
                effect: 'fade'
            });

            this.slider.on('slideChange', () => {
                this.activeIndex = this.slider.activeIndex;

                const newSlide = this.slider.slides[this.slider.activeIndex];
                const newSlideVideo = newSlide.querySelector('video');
                const newSlideInfos = this.slideInfos[this.slider.activeIndex];

                this.activeInfos.querySelector('svg').style.strokeDashoffset = this.circleOffset;
                this.activeVideo.removeEventListener('ended', this.resetVideo); // remove old video listener
                this.activeVideo.removeEventListener('timeupdate', this.updateProgress); // remove old video listener

                this.activeVideo = newSlideVideo;
                this.activeInfos = newSlideInfos;
                
                this.setMobileInfos();
            });
        },
        setMobileInfos() {
            this.activeSlideTitle = this.items[this.slider.activeIndex].slide_title;
            this.activeSlideDescription = this.items[this.slider.activeIndex].slide_description;
        },
        startSlider() {
            this.activeVideo.play();
            this.activeVideo.addEventListener('timeupdate', () => this.updateProgress());
            this.activeVideo.addEventListener('ended', this.resetVideo);
        },
        resetVideo() {
            if (this.slider.activeIndex === this.slider.slides.length - 1) this.slider.slideTo(0);
            else this.slider.slideNext();
        },
        updateProgress() {
            const { currentTime, duration } = this.activeVideo;
            const progress = Utils.map(currentTime, 0, duration, this.circleOffset, 45);

            if (!this.activeInfos) return;

            const circle = this.activeInfos.querySelector('.progress-ring');
            circle.style.strokeDashoffset = progress;
        },
    },
    watch: {
        playing() {
            if (this.playing) this.startSlider();
        },
        activeVideo() { // Every time active video change
            if (!this.playing) return;
            this.activeVideo.currentTime = 0;
            this.activeInfos.querySelector('svg').style.strokeDashoffset = 0;
            this.activeVideo.play();
            this.activeVideo.addEventListener('ended', this.resetVideo);
            this.activeVideo.addEventListener('timeupdate', () => this.updateProgress());
        }
    },
    props: {
        items: Array,
        playing: Boolean
    }
}
</script>