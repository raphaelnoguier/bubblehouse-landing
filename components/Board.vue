<template>
    <div class="board-component">
        <div class="board-component-grid" ref="board">
            <div class="board-placeholder">
                <div class="row">
                    <div class="media square">
                    </div>
                    <div class="media portrait">
                    </div>
                    <div class="media square">
                    </div>
                    <div class="media portrait">
                    </div>
                </div>
                <div class="row">
                    <div class="media portrait">
                    </div>
                    <div class="media square">
                    </div>
                    <div class="media portrait">
                    </div>
                    <div class="media square">
                    </div>
                </div>
            </div>
            <div :class="`board-wrapper ${!boardImagesVisible ? 'hidden' : ''}`" ref="boardWrapper">
                <div class="row">
                    <div class="media square">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/235/300/800" />
                        </div>
                    </div>
                    <div class="media portrait">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/220/300/800" />
                        </div>
                    </div>
                    <div class="media square">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/255/300/800" />
                        </div>
                    </div>
                    <div class="media portrait">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/265/300/800" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="media portrait">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/275/300/800" />
                        </div>
                    </div>
                    <div class="media square">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/276/300/800" />
                        </div>
                    </div>
                    <div class="media portrait" style="z-index: 9">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/295/300/800" />
                        </div>
                    </div>
                    <div class="media square">
                        <div class="media-wrapper">
                            <img src="https://picsum.photos/id/305/300/800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="board-component-slider" ref="boardSlider">
            <div class="board-slider-nav" ref="boardSliderNav">
                <div class="categories">
                    <div
                        :class="`single ${i === activeCategory ? 'active' : ''}`"
                        v-for="(category, i) in categories"
                        :key="i"
                        v-on:click="activeCategory = i"
                    >
                        {{category}}
                    </div>
                </div>
            </div>
            <div class="board-slider">
                <div class="slider-behind">
                    <div class="swiper-container" ref="sliderBehind">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide screen">
                                <img src="https://picsum.photos/id/235/200/300" />
                            </div>
                            <div class="swiper-slide screen">
                                <img src="https://picsum.photos/id/236/200/300" />
                            </div>
                            <div class="swiper-slide screen">
                                <img src="https://picsum.photos/id/237/200/300" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="phone-wrapper">
                    <div class="phone-component">
                        <div class="slider-prev">
                            <img src="~assets/images/icons/arrow.svg" />
                        </div>
                        <div class="slider-next">
                            <img src="~assets/images/icons/arrow.svg" />
                        </div>
                        <div class="slider-front">
                            <div class="swiper-container" ref="sliderInFront">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide screen">
                                        <div class="media">
                                            <img src="https://picsum.photos/id/235/200/300" />
                                        </div>
                                        <div class="content">
                                            <img src="~/assets/images/slider-placeholder.png" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide screen">
                                        <div class="media">
                                            <img src="https://picsum.photos/id/236/200/300" />
                                        </div>
                                        <div class="content">
                                            <img src="~/assets/images/slider-placeholder.png" />
                                        </div>
                                    </div>
                                    <div class="swiper-slide screen">
                                        <div class="media">
                                            <img src="https://picsum.photos/id/237/200/300" />
                                        </div>
                                        <div class="content">
                                            <img src="~/assets/images/slider-placeholder.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import Utils from '~/utils';
import enterView from 'enter-view';
import Swiper from 'swiper';

export default {
    data () {
        return {
            medias: [],
            mediasBounds: [],
            activeCategory: 0,
            boardImagesVisible: true,
            categories: ['photographer', 'brand', 'artist', 'individual']
        }
    },
    mounted() {
        this.medias = this.$el.querySelectorAll('.media-wrapper');
        this.board = this.$refs.board;
        this.boardWrapper = this.$refs.boardWrapper;
        this.boardSliderNav = this.$refs.boardSliderNav;
        this.sliders = [this.$refs.sliderBehind, this.$refs.sliderInFront];

        this.calcBounds();
        this.initSliders(this.sliders);

        window.addEventListener('resize', this.calcBounds, false);

        enterView({
            selector: '.board-component-slider',
            progress: (el, progress) => {
                if (progress === 1) this.boardImagesVisible = false;
                if(this.boardImagesVisible) this.transform(progress);
            }
        });
    },
    methods: {
        initSliders(sliders) {
            sliders.forEach((slider, i) => {
                new Swiper (slider, {
                    spaceBetween: i === 0 ? Utils.vw(1.95) : 0,
                    speed: 500,
                    initialSlide: 1,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev',
                    },
                });
            });
        },
        calcBounds() {
            this.mediasBounds = [];
            this.medias.forEach((media) => {
                const { left, width, top, height } = media.getBoundingClientRect();

                this.mediasBounds.push({
                    x: (window.innerWidth / 2) - (left + (width / 2) )
                });
            });
        },
        transform(progress) {
            const opacityProgress = Utils.map(progress, 0.9, 1, 0, 1);
            this.boardSliderNav.style.opacity = opacityProgress;

            this.mediasBounds.forEach((bounds, i) => {
                const block = this.medias[i];
                const image = this.medias[i].children[0];

                const { x } = bounds;
                const mappedX = Utils.map(progress, 0, 1, 0, x);
                const mappedY = Utils.map(progress, 0, 1, 0, 50);
                const mappedWrapperY = Utils.map(progress, 0, 1, 0, 125);

                image.style.transform = `translate3d(${mappedX}px, 0px, 0)`;
                block.style.transform = `translate3d(0px, ${i >= 4 ? '-' : ''}${mappedY}%, 0)`;
                this.boardWrapper.style.transform = `translate3d(0px, ${mappedWrapperY}%, 0)`;
            })
        }
    }
}
</script>