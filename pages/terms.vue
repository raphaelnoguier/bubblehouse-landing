<template>
	<main id="simple-page">
		<div class="page-wrapper">
            <div class="header">
                <h1>Terms of Use</h1>
            </div>
            <div class="content">
                <div v-html="content" />
            </div>
		</div>
        <FooterLinks :links="footerLinks" />
	</main>
</template>

<script>
/* Utils */
import { html } from '~/utils/prismic';

/* Components */
import FooterLinks from '~/components/FooterLinks';

export default {
    async asyncData ({ app, params, error, store}) {
        try {
            const data = await store.dispatch('GET_TERMS');
            return {
                page: data.termsPage,
                content: html(data.termsPage.page_content)
            }
        } catch (err) {
            error({ statusCode: 404, message: `The page you are looking for does not exist. `, err: err })
        }
    },
    computed: {
        app() {
			return this.$store.state.homepage
		},
        footerLinks() {
            return this.$store.state.homepage.body5.find(slice => slice.slice_type === 'footer_links').items;
        }
    },
    components: {
        FooterLinks
    },
    head() {
        return {
			title: `${this.app.meta_title} - ${this.page.page_title}`,
			description: this.app.meta_description,
			meta: [
				{ charset: 'utf-8' },
				{ name: 'author', content: this.app.meta_author }
			],
			link: [
				{
                    rel: 'icon',
                    type: 'image/png',
                    href: this.app.favicon.url
				},
			],
		}
    }
}
</script>
