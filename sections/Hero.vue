<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1>It's time to get creative</h1>
                    <p>Siena gives you the tools you need to proudly show your crafted content to your audience</p>
                </div>
                <div class="form">
                    <input class="input-component" type="text" name="email" placeholder="Enter your email address" />
                    <button class="button-component">
                        <span>Get early access</span>
                    </button>
                </div>
            </div>
            <div class="columns-slider">
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                    </div>
                </div>
                <div class="column swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
                            </Phone>
                        </div>
                        <div class="swiper-slide">
                            <Phone>
                                <img src="~/assets/images/feed.jpg" />
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
import math from '~/utils/math';

/* Components */
import Phone from '~/components/Phone';

export default {
    components: {
        Phone
    },
    mounted() {
        this.columns = this.$el.querySelectorAll('.column');
        this.columns.forEach((column, i) => {
            new Swiper(column, {
                direction: 'vertical',
                spaceBetween: math.vw(2.431),
                speed: i === 1 ? 6000 : 3000,
                loop: true,
                autoplay: {
                    delay: 0,
                    reverseDirection: i === 1,
                    disableOnInteraction: false,
                }
            })
        });
    }
}
</script>