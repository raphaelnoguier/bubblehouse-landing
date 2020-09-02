<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1 class="bigText">
                        <span class="line">
                            {{store.hero_first_line.split('[]')[0]}}
                            <span class="filling-text"></span>
                            {{store.hero_first_line.split('[]')[1]}}
                        </span>
                        <span class="line">{{store.hero_second_line}}</span>
                    </h1>
                    <p class="bodyRegularLG">{{store.hero_description}}</p>
                </div>
                <div class="form">
                    <form v-on:submit.prevent="submitForm" ref="form">
                        <input
                            class="input-component"
                            type="email"
                            name="email"
                            placeholder="Mail address"
                            v-model="emailValue"
                            required
                        />
                        <input
                            class="input-component"
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
                            <span class="labelUpper">{{store.global_cta_name}}</span>
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
            activeIndex: 0
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
        enterView({
            selector: '.section.interactive-modules',
            offset: 0.8,
            enter: () => {
                this.$store.commit('SET_NAV_CTA_VISIBLE', true);
            },
            exit: () => {
                this.$store.commit('SET_NAV_CTA_VISIBLE', false)
            },
        });

        this.sliderEl = this.$refs.slider;
        this.initSlider(this.sliderEl);

        const typed = new Typed('.filling-text', {
            strings: this.getKeywords(),
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            smartBackspace: false,
            backDelay: 2200,
            cursorChar: '',
            onStringTyped: () => {
                const timeout = setTimeout(() => {
                    this.slider.slideNext();
                    clearTimeout(timeout);
                }, 2500);
            }
        });
    },
    methods: {
        getKeywords() {
            const output = [];
            this.autoTypingSlider.forEach(slide => {
                output.push(slide.keyword);
            });

            return output;
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