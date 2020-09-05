<template>
	<div :class="`app ${loaded ? 'loaded' : ''}`">
		<Nav />
		<nuxt />
	</div>
</template>

<script>
/* Utils */
import smoothscroll from 'smoothscroll-polyfill';

/* Components */
import Nav from '~/components/Nav';

export default {
	data() {
		return {
			loaded: false
		}
    },
    mounted() {
        this.initApp();
    },
	updated() {
        this.initApp();
    },
    methods: {
        initApp() {
            const currentRoute = this.$route.name;
            if (currentRoute === 'terms' || currentRoute === 'privacy') {
                this.loaded = true;
                document.body.classList.add('white-theme');
                smoothscroll.polyfill();
            } else {
                window.addEventListener('load', () => this.loaded = true);
            }
        }
    },
	components: {
		Nav
	}
}
</script>