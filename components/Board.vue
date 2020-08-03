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
        <div class="board-component-slider" ref="boardSlider">
            <TimerSlider :items="timerSlider.items" :playing="!boardImagesVisible" />
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
import TimerSlider from '~/components/TimerSlider';

export default {
    components: {
        LazyImg,
        TimerSlider
    },
    data () {
        return {
            nbItemsInRows: 4,
            medias: [],
            mediasBounds: [],
            slidersInstance: [],
            boardImagesVisible: true
        }
    },
    mounted() {
        this.medias = this.$el.querySelectorAll('.media-wrapper');
        this.board = this.$refs.board;
        this.boardWrapper = this.$refs.boardWrapper;
        this.calcBounds();
        this.resolveDistanceY();

        window.addEventListener('resize', this.calcBounds, false);
        window.addEventListener('resize', this.resolveDistanceY, false);

        enterView({
            selector: '.board-component-slider',
            progress: (el, progress) => {
                if (progress === 1) this.boardImagesVisible = false;
                if (this.boardImagesVisible) this.transform(progress);
            }
        });
    },
    methods: {
        calcBounds() {
            this.mediasBounds = [];
            const sectionLeft = this.$el.querySelector('.timer-slider-wrapper').getBoundingClientRect();
            this.medias.forEach((media) => {
                const { left, width, top, height } = media.getBoundingClientRect();

                this.mediasBounds.push({
                    x: sectionLeft.left - left
                });
            });
        },
        getCurrentVideo() {
            const videos = this.$refs.sliderInFront.querySelectorAll('video');
            return videos[this.slidersInstance[1].activeIndex];
        },
        playFirstVideo(needReset = false) {
            if (!this.slidersInstance[1]) return;
            const currentVideo = this.getCurrentVideo();

            if (needReset) currentVideo.currentTime = 0;

            currentVideo.play();
        },
        resolveDistanceY() {
            if (window.innerWidth <= 768) return this.distanceY = 200;
            if (window.innerWidth >= 1824) return this.distanceY = 120;

            return this.distanceY = 140;
        },
        transform(progress) {
            this.mediasBounds.forEach((bounds, i) => {
                const block = this.medias[i];
                const image = this.medias[i].children[0];

                const { x } = bounds;
                const mappedX = Utils.map(progress, 0, 1, 0, x);
                const mappedY = Utils.map(progress, 0, 1, 0, 50);
                const mappedWrapperY = Utils.map(progress, 0, 1, 0, this.distanceY);
                const degree = i === 0 || i === 4 ? 0 : -3;
                const rotate = Utils.map(progress, 0, 1, 0, degree);

                image.style.transform = `translate3d(${mappedX}px, 0px, 0)`;
                block.style.transform = `translate3d(0px, ${i >= 4 ? '-' : ''}${mappedY}%, 0) rotate3d(0, 0, 1, ${rotate}deg)`;
                this.boardWrapper.style.transform = `translate3d(0px, ${mappedWrapperY}%, 0)`;
            })
        }
    },
    props: {
        boardItems: Array,
        timerSlider: Object
    }
}
</script>