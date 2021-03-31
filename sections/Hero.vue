<template>
    <div class="hero-component">
        <div class="hero-component-content">
            <div class="left">
                <div class="text">
                    <h1 class="bigText">
                        <span class="line gradient-text">{{store.hero_first_line}}</span>
                        <span class="line">{{store.hero_second_line}}</span>
                    </h1>
                    <p class="bodyRegularLG">{{store.hero_description}}</p>
                </div>
                <div class="download-app">
                    <div class="store-button">
						<a :href="store.app_store_link.url" target="_blank" rel="noopener">
							<img src="~/assets/images/appstore.png" />
						</a>
					</div>
					<div class="store-button">
						<a :href="store.google_play_store_link.url" target="_blank" rel="noopener">
							<img src="~/assets/images/googlestore.png" />
						</a>
					</div>
                </div>
            </div>
            <div class="preview-slider">
				<Phone>
					<img class="iphone-mask" src="~/assets/images/phone.png" />
					<div class="media full">
						<Video autoplay loop :url="store.hero_video.url" :poster="store.hero_video_poster.url" />
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
import Phone from '~/components/Phone';
import Video from '~/components/Video';

export default {
    data() {
        return {
            isLoading: false,
        }
    },
    components: {
        Phone,
        Video
    },
    computed: {
        store () {
            return this.$store.state.homepage;
        },
    },
    mounted() {
        window.addEventListener('resize', this.onResize);

        enterView({
            selector: '.section.interactive-modules',
            offset: 0.65,
            enter: () => {
				this.$store.commit('SET_NAV_CTA_VISIBLE', true);
            },
            exit: () => {
				this.$store.commit('SET_NAV_CTA_VISIBLE', false);
            },
        });
    },
}
</script>
