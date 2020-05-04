<template>
	<div>
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
	components: {
		Nav,
		Modal
	}
}
</script>