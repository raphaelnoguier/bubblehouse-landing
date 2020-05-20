<template>
	<div :class="`app ${loaded ? 'loaded' : ''}`">
		<Nav />
		<Modal :visible="$store.getters.modalOpen" />
		<nuxt/>
	</div>
</template>

<script>
/* Components */
import Nav from '~/components/Nav';
import Modal from '~/components/Modal';

export default {
	data() {
		return {
			loaded: false
		}
	},
	mounted() {
		window.addEventListener('load', () => this.loaded = true);
	},
	components: {
		Nav,
		Modal
	}
}
</script>