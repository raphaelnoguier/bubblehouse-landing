<template>
    <div class="hero-component" :style="getHeroStyle()">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1>{{store.hero_title}}</h1>
                    <p>{{store.hero_description}}</p>
                </div>
                <div class="form">
                    <form v-on:submit.prevent="console.log('hello')" ref="form">
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
                            v-model="emailValue"
                            required
                        />
                        <button
                            class="button-component"
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
                <div class="column swiper-container reverse">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(slide, i) in slidingColumns.slice(3, slidingColumns.length)" :key="i"
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
            autoplaySpeed: 10000
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

        enterView({
            selector: '.section.boards',
            offset: 1,
            enter: () => {
                this.sliders.forEach(slider => {
                    slider.wrapperEl.style.visibility = 'hidden';
                });
                this.$store.commit('SET_NAV_CTA_VISIBLE', true);
            },
            exit: () => {
                this.sliders.forEach(slider => {
                    slider.wrapperEl.style.visibility = 'visible';
                });
                this.$store.commit('SET_NAV_CTA_VISIBLE', false)
            },
        });
    },
    methods: {
        initSlidingColumns() {
            this.columns.forEach((column, i) => {
                this.sliders[i] = new Swiper(column, {
                    speed: this.autoplaySpeed,
                    loop: true,
                    direction: 'vertical',
                    loopAdditionalSlides: window.innerWidth > 768 ? 1 : 0,
                    allowTouchMove: false,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: false
                    },
                    on: { init: () => this.columnsWrapper.style.opacity = 1 },
                    breakpoints: {
                        320: {
                            spaceBetween: Utils.vw(4.948),
                        },
                        780: {
                            spaceBetween: Utils.vw(1.431),
                        }
                    },
                })
            });
        },
        getHeroStyle() {
            const { hero_background_color } = this.store;
            return `background-color: ${hero_background_color}`;
        },
    }
}
</script>