<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1>It's time to get creative</h1>
                    <p>Siena gives you the tools you need to proudly show your crafted content to your audience</p>
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
                            <span>Get early access</span>
                        </button>
                    </form>
                </div>
            </div>
            <div class="columns-slider">
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="https://picsum.photos/id/225/500/300" />
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
                    delay: 0,
                    reverseDirection: i === 1,
                    disableOnInteraction: false,
                }
            })
        });
    },
    methods: {
        openModal() {
            const { commit } = this.$store;
            this.error = false;

            if (Utils.isValidEmail(this.emailValue)) commit('SET_MODAL_OPEN', { open: true, inputName: this.emailValue });
            else this.error = true
        }
    }
}
</script>