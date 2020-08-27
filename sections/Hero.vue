<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1 class="bigText">
                        {{store.hero_title.split('[]')[0]}}
                        <span class="filling-text">
                            <span class="copy">{{autoTypingSlider[activeIndex].keyword}}</span>
                            {{autoTypingSlider[activeIndex].keyword}}
                        </span>
                        {{store.hero_title.split('[]')[1]}}
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
            <div class="preview-slider">

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

/* Components */
import Phone from '~/components/Phone';

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
        Phone
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

        this.startSlider();
    },
    methods: {
        startSlider() {
            setInterval(() => {
                this.activeIndex += 1;
                if (this.activeIndex === this.autoTypingSlider.length) this.activeIndex = 0;
            }, 3000);
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