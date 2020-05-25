<template>
    <div class="hero-component" :style="getHeroStyle()">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1>{{store.hero_title}}</h1>
                    <p>{{store.hero_description}}</p>
                </div>
                <div class="form">
                    <form v-on:submit.prevent="openModal" ref="form">
                        <input
                            class="input-component"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            v-model="emailValue"
                            required
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
            <div class="columns-slider" @mouseover="toggleSpeed" @mouseleave="toggleSpeed(true)">
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
                <div class="column swiper-container reverse">
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
            emailValue: ''
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
        this.columnsWrapper = this.$el.querySelector('.columns-slider');
        this.columns = this.$el.querySelectorAll('.column');

        this.sliders = [];
        this.initSlidingColumns();

        const self = this;
        enterView({
            selector: '.feed .section-header-component',
            offset: 1,
            enter: () => {
                console.log('stop autolay on hero');
                this.sliders.forEach(slider => slider.autoplay.stop());
            },
            exit: () => {
                console.log('restart autoplay on hero');
                this.sliders.forEach(slider => slider.autoplay.start());
            },
        });
    },
    methods: {
        toggleSpeed(isOut = false) {
            console.log('reduce speed');
            // this.sliders.forEach(slider => {
            //     console.log(slider);
            //     slider.speed = isOut ? 10000 : 500;
            // });
        },
        initSlidingColumns() {
            this.columns.forEach((column, i) => {
                this.sliders[i] = new Swiper(column, {
                    speed: 10000,
                    direction: 'vertical',
                    loop: true,
                    loopAdditionalSlides: window.innerWidth > 768 ? 1 : 0,
                    allowTouchMove: false,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: false,
                    },
                    on: { init: () => this.columnsWrapper.style.opacity = 1 },
                    breakpoints: {
                        320: {
                            spaceBetween: Utils.vw(4.948),
                        },
                        780: {
                            spaceBetween: Utils.vw(2.431),
                        }
                    },
                })
            });
        },
        getHeroStyle() {
            const { hero_background_color } = this.store;
            return `background-color: ${hero_background_color}`;
        },
        openModal() {
            const { commit } = this.$store;

            if (this.$refs.form.checkValidity() || window.innerWidth < 768) {
                commit('SET_MODAL_INPUT_EMAIL', this.emailValue);
                commit('SET_MODAL_OPEN', true);
            }
        }
    }
}
</script>