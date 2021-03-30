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
                            <img v-lazy="media.image.url" alt="Board image" />
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
                            <img v-lazy="media.image.url" alt="Board image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="board-component-phone-video">
            <Phone>
                <div class="media full">
                    <Video :autoplay="false" :url="phoneVideo.url" :playing="startBoardVideo" :poster="phonePoster.url" />
                </div>
				<img class="iphone-mask" src="~/assets/images/phone.png" />
            </Phone>
        </div>
    </div>
</template>

<script>
/* Utils */
import Utils from '~/utils';
import enterView from 'enter-view';

/* Components */
import Phone from '~/components/Phone';
import Video from '~/components/Video';

export default {
    components: {
        Phone,
        Video
    },
    data () {
        return {
            nbItemsInRows: 4,
            medias: [],
            mediasBounds: [],
            slidersInstance: [],
            startBoardVideo: false,
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
            selector: '.board-component-phone-video',
            progress: (el, progress) => {
                if (progress === 1) {
                    this.startBoardVideo = true;
                    this.boardImagesVisible = false;
                }
                else {
                    this.boardImagesVisible = true;
                    this.transform(progress);
                }
            }
        });
    },
    methods: {
        calcBounds() {
            this.mediasBounds = [];
            const isMobile = window.innerWidth <= 768;
            this.medias.forEach((media) => {
                const { left, width, top, height } = media.getBoundingClientRect();

                this.mediasBounds.push({
                    x: (window.innerWidth / 2) - (left + (width / 2) )
                });
            });
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
        phoneVideo: Object,
        phonePoster: Object
    }
}
</script>
