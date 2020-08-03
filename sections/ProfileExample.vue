<template>
    <div class="section profile-example">
        <div class="large-wrapper">
            <SectionHeader
                :heading="header.heading"
                :title="header.title"
                :subtitle="header.subtitle"
                :whiteTheme="true"
            />
            <div class="profile-phones">
                <template v-for="(row, i) in profileExamples">
                    <div class="phones-wrapper" :key="i" v-if="activeExampleIndex === i || activeExampleIndex === -1">
                        <Phone
                            v-for="(profile, index) in row.items"
                            :key="index"
                            whiteBorder
                        >
                            <div :class="`media full ${profile.is_big ? 'video' : ''}`">
                                <template v-if="profile.is_big">
                                    <div class="video-wrapper">
                                        <img :src="profile.header_overlay.url" alt="profile-header" />
                                        <Video :url="profile.video.url" autoplay />
                                    </div>
                                </template>
                                <LazyImg :url="profile.image.url" :loading="fetchingImages" />
                            </div>
                        </Phone>
                    </div>
                </template>
                <!-- <div class="profile-example-nav center">
                    <div class="item load-more" v-on:click="loadMoreExamples()">
                        <div class="icon" :style="`transform: rotate(${this.rotate}deg)`">
                            <RefreshIcon />
                        </div>
                        <div class="text">
                            <span>more examples</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Phone from '~/components/Phone';
import LazyImg from '~/components/LazyImg';
import Video from '~/components/Video';

export default {
    components: {
        SectionHeader,
        Phone,
        LazyImg,
        Video
    },
    computed: {
        header() {
            return this.$store.state.homepage.body2.find(slice => slice.slice_type === 'header_section').primary
        },
        profileExamples() {
            return this.$store.state.homepage.body2.filter(slice => slice.slice_type === 'profiles_examples')
        }
    },
    data() {
        return {
            activeIndex: null,
            activeExampleIndex: 0,
            rotate: 0,
            fetchingImages: false
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile, false);
    },
    methods: {
        checkMobile() {
            if (window.innerWidth <= 768) this.activeExampleIndex = -1
            else this.activeExampleIndex = 0;
        },
        onItemMouseHover(id) {
            this.activeIndex = id;
        },
        loadMoreExamples() {
            this.fetchingImages = true;
            this.rotate += 360;

            if (this.activeExampleIndex === this.profileExamples.length - 1) this.rotate = 0;

            setTimeout(() => {
                this.activeExampleIndex += 1;
                if (this.activeExampleIndex === this.profileExamples.length) {
                    this.activeExampleIndex = 0;
                }
            }, 500);

            this.$Lazyload.$on('loaded', () => this.fetchingImages = false );
        },
    }
}

</script>