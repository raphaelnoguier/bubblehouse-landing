<template>
    <div class="hero-component" :style="getHeroStyle()">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1>{{store.hero_title}}</h1>
                    <p>{{store.hero_description}}</p>
                </div>
                <div class="form">
                    <form v-on:submit.prevent="openModal">
                        <input
                            :class="`input-component ${error ? 'error' : ''}`"
                            type="text"
                            name="email"
                            placeholder="Enter your email address"
                            v-model="emailValue"
                        />
                        <button
                            class="button-component"
                            v-on:click="openModal"
                            type="submit"
                        >
                            <span>{{store.global_cta_name}}</span>
                        </button>
                    </form>
                </div>
            </div>
            <div class="columns-slider">
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(slide, i) in slidingColumns.slice(0, 3)" :key="i"
                        >
                            <Phone>
                                <img :src="slide.image.url" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(slide, i) in slidingColumns.slice(3, 6)" :key="i"
                        >
                            <Phone>
                                <img :src="slide.image.url" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(slide, i) in slidingColumns.slice(6, slidingColumns.length)" :key="i"
                        >
                            <Phone>
                                <img :src="slide.image.url" />
                            </Phone>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* Utils */
import Swiper from 'swiper';
import Utils from '~/utils';
import enterView from 'enter-view';

/* Components */
import Phone from '~/components/Phone';

export default {
    data() {
        return {
            emailValue: '',
            error: false
        }
    },
    components: {
        Phone
    },
    computed: {
        store () {
            return this.$store.state.homepage;
        },
        slidingColumns () {
            return this.$store.state.homepage.body6.find(slice => slice.slice_type === 'auto_sliding_columns').items
        }
    },
    mounted() {
        this.columns = this.$el.querySelectorAll('.column');

        this.sliders = [];

        this.columns.forEach((column, i) => {
            this.sliders[i] = new Swiper(column, {
                direction: 'vertical',
                spaceBetween: Utils.vw(2.431),
                loop: true,
                speed: 10000,
                loopAdditionalSlides: 1,
                allowTouchMove: false,
                autoplay: {
                    waitForTransition: false,
                    delay: 0,
                    reverseDirection: i === 1,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    320: {
                        spaceBetween: Utils.vw(4.948),
                    }
                }
            })
        });

        const self = this;
        enterView({
            selector: '.section.feed',
            enter: () => {
                console.log('stop');
                self.sliders[0].autoplay.stop();
            },
            exit: () => {
                console.log('start');
                self.sliders[0].autoplay.start();
            },
        });
    },
    methods: {
        getHeroStyle() {
            const { hero_background_color } = this.store;
            return `background-color: ${hero_background_color}`;
        },
        openModal() {
            const { commit } = this.$store;
            this.error = false;

            if (Utils.isValidEmail(this.emailValue)) commit('SET_MODAL_OPEN', { open: true, inputEmail: this.emailValue });
            else this.error = true
        }
    }
}
</script>