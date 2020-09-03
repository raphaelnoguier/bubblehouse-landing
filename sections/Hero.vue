<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1 class="bigText">
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
                <div class="form">
                    <form v-on:submit.prevent="submitForm" ref="form" :class="$store.getters.hasFilledForm ? 'disabled' : ''">
                        <input
                            :class="`input-component bodyRegular ${(emailValue.length || $store.getters.globalEmailValue.length)  ? 'filled' : ''}`"
                            type="email"
                            name="email"
                            placeholder="Mail address"
                            v-model="emailValue"
                            required
                        />
                        <input
                            :class="`input-component bodyRegular ${(nameValue.length || $store.getters.globalNameValue.length)  ? 'filled' : ''}`"
                            type="text"
                            name="name"
                            placeholder="Name"
                            v-model="nameValue"
                            required
                        />
                        <button
                            :class="`button-component ${isLoading ? 'loading' : ''} reverse-theme`"
                            type="submit"
                        >
                            <span :class="`labelUpper ${$store.getters.hasFilledForm ? 'hide' : ''}`">
                                {{store.global_cta_name}}
                            </span>
                            <img :class="`${$store.getters.hasFilledForm ? 'visible' : ''}`" src="~/assets/images/icons/done.svg" />
                        </button>
                    </form>
                </div>
            </div>
            <div class="preview-slider swiper-container" ref="slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(slide, i) in autoTypingSlider" :key="i">
                        <Phone>
                            <div class="media full">
                                <template v-if="slide.image.url">
                                    <img :src="slide.image.url" />
                                </template>
                                <template v-else>
                                    <Video autoplay :url="slide.video.url" loop />
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
import axios from 'axios';
import qs from 'querystring';
import Swiper from 'swiper';
import Utils from '~/utils';
import enterView from 'enter-view';
import Typed from 'typed.js';

/* Components */
import Phone from '~/components/Phone';
import Video from '~/components/Video';

export default {
    data() {
        return {
            emailValue: '',
            nameValue: '',
            isLoading: false,
            activeIndex: 0,
            firstKeyWord: '',
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
            this.initTyped();
        }

        window.addEventListener('resize', this.onResize);

        enterView({
            selector: '.section.interactive-modules',
            offset: 0.8,
            enter: () => {
                this.$store.commit('SET_NAV_CTA_VISIBLE', true);
                if (this.typed) {
                    this.typed && this.typed.stop();
                    this.typedStopped = true;
                }
            },
            exit: () => {
                this.$store.commit('SET_NAV_CTA_VISIBLE', false)
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
                typeSpeed: 100,
                backSpeed: 50,
                loop: true,
                smartBackspace: false,
                backDelay: 2200,
                cursorChar: '',
                onStringTyped: () => {
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
            });
        },
        submitForm() {
            const { commit } = this.$store;
            const self = this;

            if (self.$store.getters.hasFilledForm) return;

            self.isLoading = true;

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const body = {
                email: self.emailValue,
                name: self.nameValue
            };

            if (self.emailValue.length > 0 && self.nameValue.length > 0) {
                axios.post('https://bubblehouse.com/v1/leads/', qs.stringify(body), config)
                .then(function (response) {
                    self.$store.commit('SET_WAITING_CONFIRMATION_VISIBLE', true);
                    self.$store.commit('SET_HAS_FILLED_FORM', true);
                    self.$store.commit('SET_GLOBAL_NAME_VALUE', self.nameValue);
                    self.$store.commit('SET_GLOBAL_EMAIL_VALUE', self.emailValue);
                    self.isLoading = false;
                })
                .catch(function (error) {
                    console.error(error);
                });
            }
        }
    }
}
</script>