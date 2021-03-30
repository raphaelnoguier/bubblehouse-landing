<template>
    <div class="section footer">
        <footer>
			<h2 class="mediumText">{{footer.footer_subtitle}}</h2>
			<div class="download-app">
				<div class="store-button">
					<a :href="footer.app_store_link.url" target="_blank" rel="noopener">
						<img src="~/assets/images/appstore-white.png" />
					</a>
				</div>
				<div class="store-button">
					<a :href="footer.google_play_store_link.url" target="_blank" rel="noopener">
						<img src="~/assets/images/googlestore.png" />
					</a>
				</div>
			</div>
			<FooterLinks :links="footerLinks" />
        </footer>
    </div>
</template>

<script>
/* Components */
import FooterLinks from '~/components/FooterLinks';

export default {
    computed: {
        footer() {
            return this.$store.state.homepage;
        },
        footerLinks() {
            return this.$store.state.homepage.body5.find(slice => slice.slice_type === 'footer_links').items;
        }
    },
    data() {
        return {
            isLoading: false,
            error: false
        }
    },
    components: {
        FooterLinks
    }
}
</script>
