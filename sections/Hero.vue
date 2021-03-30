<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1 class="bigText gradient-text">
                        <span class="line">
                            {{store.hero_first_line.split('[]')[0]}}
                            <span class="filling-text"></span>
                            <span class="md">{{firstKeyWord}}</span>
                            {{store.hero_first_line.split('[]')[1]}}
                        </span>
                        <span class="line">{{store.hero_second_line}}</span>
                    </h1>
                    <p class="bodyRegularLG">{{store.hero_description}}</p>
                </div>
                <div class="download-app">
                    <div class="store-button">
						<a :href="store.app_store_link.url" target="_blank" rel="noopener">
							<img src="~/assets/images/appstore.png" />
						</a>
					</div>
					<div class="store-button">
						<a :href="store.google_play_store_link.url" target="_blank" rel="noopener">
							<img src="~/assets/images/googlestore.png" />
						</a>
					</div>
                </div>
            </div>
            <div class="preview-slider swiper-container" ref="slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(slide, i) in autoTypingSlider" :key="i">
                        <Phone>
							<img class="iphone-mask" src="~/assets/images/phone.png" />
                            <div class="media full">
                                <template v-if="slide.is_video">
                                    <Video autoplay :url="slide.video.url" :poster="slide.image.url"/>
                                </template>
                                <template v-else>
                                    <img v-lazy="slide.image.url" alt="Hero slide image" />
                                </template>
                            </div>
                        </Phone>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* Utils */
import Swiper from 'swiper';
import enterView from 'enter-view';
import Typed from 'typed.js';

/* Components */
import Phone from '~/components/Phone';
import Video from '~/components/Video';

export default {
    data() {
        return {
            isLoading: false,
            activeIndex: 0,
            firstKeyWord: '',
            typed: null,
            typedStopped: false
        }
    },
    components: {
        Phone,
        Video
    },
    computed: {
        store () {
            return this.$store.state.homepage;
        },
        autoTypingSlider () {
            return this.$store.state.homepage.body6.find(slice => slice.slice_type === 'word_phone_slider').items
        }
    },
    mounted() {
        this.sliderEl = this.$refs.slider;
        this.firstKeyWord = this.autoTypingSlider[0].keyword;

        if (window.innerWidth > 810) {
            this.initSlider(this.sliderEl);
            window.addEventListener('load', () => this.initTyped());
        }

        window.addEventListener('resize', this.onResize);

        enterView({
            selector: '.section.interactive-modules',
            offset: 0.75,
            enter: () => {
                if (this.typed) {
                    this.typed && this.typed.stop();
                    this.typedStopped = true;
                }
            },
            exit: () => {
                if (this.typed) {
                    this.typed.start();
                    this.typedStopped = false;
                }
            },
        });
    },
    methods: {
        onResize() {
            if (window.innerWidth > 810) {
                if (!this.slider) {
                    this.initSlider(this.sliderEl);
                }
                if (!this.typed) {
                    this.initTyped();
                    this.typedStopped = false;
                }
            } else {
                if(this.typed) {
                    this.typedStopped = true;
                    this.typed.destroy();
                    this.typed = null;
                }

                if (this.slider) {
                    this.slider.destroy();
                    this.slider = null;
                }
            }
        },
        getKeywords() {
            const output = [];

            this.autoTypingSlider.forEach(slide => {
                output.push(slide.keyword);
            });

            return output;
        },
        initTyped() {
            this.typed = new Typed('.filling-text', {
                strings: this.getKeywords(),
                typeSpeed: 0,
                backSpeed: 50,
                loop: true,
                smartBackspace: false,
                backDelay: 2000,
                cursorChar: '',
                onStringTyped: () => {
                    if (this.typed.typeSpeed === 0) this.typed.typeSpeed = 100;
                    const timeout = setTimeout(() => {
                        if (this.typedStopped) return;
                        this.slider.slideNext();
                        clearTimeout(timeout);
                    }, 2500);
                }
            });
        },
        initSlider(el) {
            this.slider = new Swiper(el, {
                allowTouchMove: false,
                effect: 'fade',
                loop: true
            });

            this.slider.on('slideChange', () => {
                this.activeIndex = this.slider.realIndex;
                const newActiveSlideVideo = this.slider.slides[this.slider.activeIndex].querySelector('video');

                if (newActiveSlideVideo) newActiveSlideVideo.currentTime = 0;
            });
        }
    }
}
</script>
