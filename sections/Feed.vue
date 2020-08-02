<template>
    <div class="section feed">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
            :dynamicColor="true"
        />
        <div class="profile-phones">
            <div class="phones-wrapper">
                <Phone
                    v-for="(profile, index) in feeds"
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
                        <LazyImg :url="profile.image.url" />
                    </div>
                </Phone>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import enterView from 'enter-view';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import Swiper from 'swiper';
import Phone from '~/components/Phone';
import LazyImg from '~/components/LazyImg';

export default {
    data() {
		return {
            activeIndex: 0,
            phoneSlider: null,
            sectionBackground: null,
		}
	},
    components: {
        SectionHeader,
        Phone,
        LazyImg
    },
    computed: {
        header () {
            return this.$store.state.homepage.body[0].primary;
        },
        feeds () {
            return this.$store.state.homepage.body.find(slice => slice.slice_type === 'profiles_examples').items;
        }
    },
}
</script>