<template>
	<div :class="`app ${loaded ? 'loaded' : ''} ${this.$route.name === 'terms' || this.$route.name === 'privacy' ? 'no-cta' : ''}`">
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
        this.preloadImages(this.$el.querySelectorAll('img'));
    },
	updated() {
        this.initApp();
    },
    methods: {
        initApp() {
            const currentRoute = this.$route.name;
            smoothscroll.polyfill();
            if (currentRoute === 'terms' || currentRoute === 'privacy') {
                this.loaded = true;
                document.body.classList.add('white-theme');
            } else {
                window.addEventListener('load', () => this.loaded = true);
            }
        },
        preloadImages(collection) {
            const list = [];

            for (var i = 0; i < collection.length; i++) {
                const img = new Image();

                img.onload = () => {
                    const index = list.indexOf(this);
                    if (index !== -1) {
                        list.splice(index, 1);
                    }
                }

                list.push(img);
                img.src = collection[i].src;
            }
        }
    },
	components: {
		Nav
	}
}
</script>