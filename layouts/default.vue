<template>
	<div :class="`app ${loaded ? 'loaded' : ''}`">
		<Nav />
		<nuxt/>
	</div>
</template>

<script>
/* Components */
import Nav from '~/components/Nav';

export default {
	data() {
		return {
			loaded: false
		}
	},
	mounted() {
		window.addEventListener('load', () => this.loaded = true);
		this.$store.commit('SET_NAV_CTA_BG_COLOR', 'var(--brand-color)');

		const currentRoute = this.$route.name;
		if (currentRoute === 'terms' || currentRoute === 'privacy') document.body.classList.add('white-theme');
	},
	components: {
		Nav
	}
}
</script>