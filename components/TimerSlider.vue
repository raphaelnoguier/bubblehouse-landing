<template>
    <div class="timer-slider-wrapper">
        <div class="timer-slider-component swiper-container" ref="slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, i) in items" :key="i">
                    <Phone :key="i">
                        <div class="media full">
                            <template v-if="slide.board_video.url">
                                <Video playing :key="i" :autoplay="true" :url="slide.board_video.url" :poster="slide.image.url" />
                            </template>
                            <template v-else>
                                <img v-lazy="slide.image.url" alt="Timer slider image" />
                            </template>
                        </div>
                    </Phone>
					<img class="iphone-mask" src="~/assets/images/phone.png" />
                </div>
            </div>
        </div>
        <div class="thumb-slider swiper-container" ref="sliderThumb">
			<div class="timer-slider-navigation swiper-wrapper">
				<div
					v-for="(slide, i) in items" :key="i"
					v-on:click="slider.slideTo(i)"
					:class="`swiper-slide slide-infos ${playing && activeIndex === i ? 'active' : ''}`"
					:style="`--slide-active-color: ${slide.slide_main_color}; --slide-bg-color: ${hexToRgbA(slide.slide_main_color)}`"
				>
					<div class="progress-line-wrapper">
						<div class="line"></div>
						<div class="progress-line"></div>
					</div>

					<div class="content">
						<span class="header3">{{slide.slide_title}}</span>
						<span class="bodyRegular">{{slide.slide_description}}</span>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
/* Utils */
import Swiper from 'swiper';

/* Components */
import Phone from '~/components/Phone';
import Video from '~/components/Video';

export default {
    components: {
        Phone,
        Video
    },
    data() {
        return {
            activeIndex: 0,
            progress: 0,
            circleRadius: 32,
            circleOffset: 250
        }
    },
    mounted() {
        this.sliderEl = this.$refs.slider;
		this.sliderThumb = this.$refs.sliderThumb;

        this.initSlider(this.sliderEl);
		this.initThumbSlider(this.sliderThumb);

		this.resize();
		window.addEventListener('resize', this.resize, false);
    },
    methods: {
		resize() {
			if (window.innerWidth <= 810) {
				this.thumbSlider.allowTouchMove = true;
				this.slider.controller.control = this.thumbSlider;
			} else {
				this.thumbSlider.allowTouchMove = false;
				this.slider.controller.control = null;
				this.thumbSlider.setTranslate(0);
			}
		},
		hexToRgbA(hex) {
			var c;
			if (!hex) return;
			if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
				c= hex.substring(1).split('');
				if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
				}
				c= '0x'+c.join('');
				return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.2)';
			}
			throw new Error('Bad Hex');
		},
        initSlider(el) {
            this.slider = new Swiper(el, {
                allowTouchMove: false,
                effect: 'fade',
                autoplay: {
                    delay: 5200,
                    disableOnInteraction: false,
                },
            });

			// First mount block autoplay and video playing
			this.newActiveSlideVideo = this.slider.slides[0].querySelector('video');
			this.stopSlider();

            this.slider.on('slideChange', () => {
                this.activeIndex = this.slider.activeIndex;
                this.newActiveSlideVideo = this.slider.slides[this.slider.activeIndex].querySelector('video');

				if (this.newActiveSlideVideo) {
					this.newActiveSlideVideo.currentTime = 0;
					this.newActiveSlideVideo.play();
				}
            });
        },
		initThumbSlider(el) {
			this.thumbSlider = new Swiper(el, {
				slidesPerView: 'auto',
				centeredSlides: true,
				centeredSlidesBounds: true,
				spaceBetween: 8,
				allowTouchMove: false,
				breakpoints: {
					668: {
						spaceBetween: 32
					},
				}
            });

			this.thumbSlider.controller.control = this.slider;

			this.thumbSlider.on('slideChange', () => {
				this.slider.autoplay.pause();
				this.slider.autoplay.start();
			})
		},
		startSlider() {
			this.slider.autoplay.start();
			this.newActiveSlideVideo && this.newActiveSlideVideo.play();
		},
		stopSlider() {
			this.slider.autoplay.stop();
			this.newActiveSlideVideo && this.newActiveSlideVideo.pause();
		}
    },
    watch: {
        playing() {
            if (this.playing) {
				this.startSlider();
            } else {
				this.stopSlider();
			}
        }
    },
    props: {
        items: Array,
        playing: Boolean
    }
}
</script>
