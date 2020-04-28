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
            <div class="board-wrapper" ref="boardWrapper">
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
            <div class="board-slider-nav">
                <div class="categories">
                    <div :class="`single ${i === 0 ? 'active' : ''}`" v-for="(category, i) in categories" :key="i">
                        {{category}}
                    </div>
                </div>
            </div>
            <div class="board-slider">
                <div class="phone-component" />
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import math from '~/utils/math';
import enterView from 'enter-view';

export default {
    data () {
        return {
            medias: [],
            mediasBounds: [],
            categories: ['photographer', 'brand', 'artist', 'individual']
        }
    },
    mounted() {
        this.medias = this.$el.querySelectorAll('.media-wrapper');
        this.board = this.$refs.board;
        this.boardWrapper = this.$refs.boardWrapper;
        this.calcBounds();

        window.addEventListener('resize', this.calcBounds, false);

        enterView({
            selector: '.board-component-slider',
            offset: -0.5,
            progress: (el, progress) => this.transform(progress)
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
        transform(progress) {
            this.mediasBounds.forEach((bounds, i) => {
                const block = this.medias[i];
                const image = this.medias[i].children[0];

                const { x } = bounds;
                const mappedX = math.map(progress, 0, 1, 0, x);
                const mappedY = math.map(progress, 0, 1, 0, 50);
                const mappedWrapperY = math.map(progress, 0, 1, 0, 125);

                image.style.transform = `translate3d(${mappedX}px, 0px, 0)`;
                block.style.transform = `translate3d(0px, ${i >= 4 ? '-' : ''}${mappedY}%, 0)`;
                this.boardWrapper.style.transform = `translate3d(0px, ${mappedWrapperY}%, 0)`;
            })
        }
    }
}
</script>