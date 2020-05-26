<template>
    <div class="board-component">
        <div class="board-component-grid" ref="board">
            <div class="board-placeholder">
                <div class="row">
                    <div
                        v-for="(media, i) in boardItems.slice(0, nbItemsInRows)"
                        :class="`media ${media.image_ratio.toLowerCase()}`"
                        :key="i"
                    >
                    </div>
                </div>
                <div class="row">
                    <div
                        v-for="(media, i) in boardItems.slice(nbItemsInRows, boardItems.length)"
                        :class="`media ${media.image_ratio.toLowerCase()}`"
                        :key="i"
                    >
                    </div>
                </div>
            </div>
            <div :class="`board-wrapper ${!boardImagesVisible ? 'hidden' : ''}`" ref="boardWrapper">
                <div class="row">
                    <div
                        v-for="(media, i) in boardItems.slice(0, nbItemsInRows)"
                        :class="`media ${media.image_ratio.toLowerCase()}`"
                        :key="i"
                    >
                        <div class="media-wrapper">
                            <img :src="media.image.url" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div
                        v-for="(media, i) in boardItems.slice(nbItemsInRows, boardItems.length)"
                        :class="`media ${media.image_ratio.toLowerCase()}`"
                        :key="i"
                    >
                        <div class="media-wrapper">
                            <img :src="media.image.url" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="board-slider-nav">
            <div class="categories">
                <div
                    :class="`single ${i === activeCategory ? 'active' : ''}`"
                    v-for="(category, i) in categories"
                    :key="i"
                    v-on:click="changeCategories(i)"
                >
                    {{category}}
                </div>
            </div>
        </div>
        <div :class="`board-component-slider ${fetchingImages ? 'no-events' : ''}`" ref="boardSlider">
            <div class="board-slider">
                <div class="slider-behind">
                    <div class="swiper-container" ref="sliderBehind">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide screen"
                                v-for="(slide, index) in horizontalSliders[activeCategory].items"
                                :key="index"
                            >
                                <LazyImg :url="slide.image.url" :loading="fetchingImages" />
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
                                    <div
                                        :class="`swiper-slide screen`"
                                        v-for="(slide, index) in horizontalSliders[activeCategory].items"
                                        :key="index"
                                    >
                                        <div :class="`lazy-placeholder ${fetchingImages ? 'active' : ''}`" />
                                        <Video :url="slide.board_video.url" :autoplay="false" />
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

/* Components */
import LazyImg from '~/components/LazyImg';
import Video from '~/components/Video';

export default {
    components: {
        LazyImg,
        Video
    },
    data () {
        return {
            nbItemsInRows: 4,
            medias: [],
            mediasBounds: [],
            categories: [],
            activeCategory: 0,
            slidersInstance: [],
            boardImagesVisible: true,
            fetchingImages: false
        }
    },
    mounted() {
        this.medias = this.$el.querySelectorAll('.media-wrapper');
        this.board = this.$refs.board;
        this.boardWrapper = this.$refs.boardWrapper;
        this.slidersEls = [this.$refs.sliderBehind, this.$refs.sliderInFront];
        this.calcBounds();
        this.buildCategories();
        this.initSliders(this.slidersEls);

        this.setSectionBgColor();

        window.addEventListener('resize', this.calcBounds, false);

        enterView({
            selector: '.section.boards',
            offset: 1,
            enter: () => this.$store.commit('SET_NAV_CTA_BG_COLOR', 'rgba(10, 10, 10, 0.5)'),
            exit: () => this.$store.commit('SET_NAV_CTA_BG_COLOR', this.$store.state.prevNavCtaBgColor),
        });

        enterView({
            selector: '.board-component-slider',
            progress: (el, progress) => {
                if (progress === 1) {
                    this.boardImagesVisible = false;
                    this.playFirstVideo();
                }
                if(this.boardImagesVisible) this.transform(progress);
            }
        });
    },
    methods: {
        calcBounds() {
            this.mediasBounds = [];
            this.medias.forEach((media) => {
                const { left, width, top, height } = media.getBoundingClientRect();

                this.mediasBounds.push({
                    x: (window.innerWidth / 2) - (left + (width / 2) )
                });
            });
        },
        buildCategories() {
            this.horizontalSliders.forEach((slider, i) => {
                if (!this.categories.includes(slider.primary.category)) {
                    this.categories.push(slider.primary.category);
                }
            });
        },
        initSliders(slidersEls) {
            slidersEls.forEach((slider, i) => {
                this.slidersInstance.push(new Swiper (slider, {
                    spaceBetween: i === 0 ? Utils.vw(3.611) : 0,
                    slideToClickedSlide: i === 0,
                    speed: 500,
                    initialSlide: 1,
                    allowTouchMove: false,
                    on: {
                        slideChange: () => {
                            this.setSectionBgColor();
                            this.playFirstVideo();
                        }
                    },
                    breakpoints: {
                        1824: {
                            spaceBetween: 50
                        }
                    },
                    navigation: {
                        nextEl: i === 0 && '.slider-next',
                        prevEl: i === 0 && '.slider-prev',
                    },
                }));
            });

            // Assign each other controls
            this.slidersInstance[0].controller.control = this.slidersInstance[1];
            this.slidersInstance[1].controller.control = this.slidersInstance[0];
        },
        playFirstVideo() {
            if (!this.slidersInstance[1]) return;
            const videos = this.$refs.sliderInFront.querySelectorAll('video');
            const currentVideo = videos[this.slidersInstance[1].activeIndex];

            currentVideo.currentTime = 0;
            currentVideo.play();
        },
        setSectionBgColor() {
            const currentSlider = this.horizontalSliders[this.activeCategory];
            const currentSliderInstance = this.slidersInstance[1];
            if (currentSliderInstance) {
                this.$store.commit('SET_BOARD_SECTION_BG_COLOR',
                    currentSlider.items[currentSliderInstance.activeIndex].background_color
                );
            }
        },
        changeCategories(index) {
            if (index === this.activeCategory) return;
            this.fetchingImages = true;

            setTimeout(() => this.activeCategory = index, 500);

            this.$Lazyload.$on('loaded', () => {
                this.activeCategory = index;
                const videos = this.$refs.sliderInFront.querySelectorAll('video');
                videos[this.slidersInstance[1].activeIndex].oncanplaythrough = (e) => {
                    this.playFirstVideo();
                    this.setSectionBgColor();
                    this.fetchingImages = false;
                };
            });
        },
        transform(progress) {
            this.mediasBounds.forEach((bounds, i) => {
                const block = this.medias[i];
                const image = this.medias[i].children[0];

                const { x } = bounds;
                const mappedX = Utils.map(progress, 0, 1, 0, x);
                const mappedY = Utils.map(progress, 0, 1, 0, 50);
                const mappedWrapperY = Utils.map(progress, 0, 1, 0, window.innerWidth <= 768 ? 200 : 125);
                const rotate = Utils.map(progress, 0, 1, 0, i % 2 ? 5 : -5);

                image.style.transform = `translate3d(${mappedX}px, 0px, 0)`;
                block.style.transform = `translate3d(0px, ${i >= 4 ? '-' : ''}${mappedY}%, 0) rotate3d(0, 0, 1, ${rotate}deg)`;
                this.boardWrapper.style.transform = `translate3d(0px, ${mappedWrapperY}%, 0)`;
            })
        }
    },
    props: {
        boardItems: Array,
        horizontalSliders: Array
    }
}
</script>