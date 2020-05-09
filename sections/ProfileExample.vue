<template>
    <div class="section profile-example">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
        />
        <div class="profile-example-nav">
            <div class="item" @mouseover="onItemMouseHover(0)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <ImageIcon />
                </div>
                <div class="text">
                    <span>cover photos and videos</span>
                </div>
            </div>
            <div class="item" @mouseover="onItemMouseHover(1)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <BoardIcon />
                </div>
                <div class="text">
                    <span>always accessible boards</span>
                </div>
            </div>
            <div class="item" @mouseover="onItemMouseHover(2)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <GridIcon />
                </div>
                <div class="text">
                    <span>create your own grid</span>
                </div>
            </div>
        </div>
        <div class="profile-phones">
            <template v-for="(row, i) in profileExamples">
                <div class="phones-wrapper" :key="i" v-if="activeExampleIndex === i || activeExampleIndex === -1">
                    <Phone
                        v-for="(profile, index) in row.items"
                        :key="index"
                        whiteBorder
                        :small="!profile.is_big"
                    >
                        <div :class="`media full ${profile.is_big ? 'video' : ''}`">
                            <template v-if="profile.is_big">
                                <div class="video-wrapper">
                                    <video :src="profile.video.url" autoplay loop muted />
                                </div>
                            </template>
                            <div class="layer-wrapper">
                                <div :class="`hero ${activeIndex === 1 || activeIndex === 2 ? 'active' : ''}`" />
                                <div :class="`middle ${activeIndex === 0 || activeIndex === 2 ? 'active' : ''}`" />
                                <div :class="`bottom ${activeIndex === 0 || activeIndex === 1 ? 'active' : ''}`" />
                            </div>
                            <img :src="profile.image.url" />
                        </div>
                    </Phone>
                </div>
            </template>
            <div class="profile-example-nav center">
                <div :class="`item load-more ${hasNoMoreExample ? 'disabled' : ''}`" v-on:click="loadMoreExamples()">
                    <div class="icon">
                        <img src="~/assets/images/icons/refresh.svg" />
                    </div>
                    <div class="text">
                        <span>more examples</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import enterView from 'enter-view';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import Phone from '~/components/Phone';
import ImageIcon from '~/components/Svgs/ImageIcon';
import BoardIcon from '~/components/Svgs/BoardIcon';
import GridIcon from '~/components/Svgs/GridIcon';

export default {
    components: {
        SectionHeader,
        Phone,
        ImageIcon,
        BoardIcon,
        GridIcon
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
            hasNoMoreExample: false
        }
    },
    mounted() {
        this.checkMobile();

        enterView({
            selector: '.section.profile-example',
            offset: 1,
            enter: () => {
                this.$store.commit('SET_NAV_CTA_BG_COLOR',
                    'var(--brand-color)'
                );
            }
        });

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
            this.activeExampleIndex += 1
            if (this.activeExampleIndex === (this.profileExamples.length - 1)) this.hasNoMoreExample = true;
        },
    }
}

</script>