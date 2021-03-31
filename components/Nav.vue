<template>
    <div class="nav-component">
        <div class="nav-content">
            <div class="left">
                <a href="/">
                    <div class="logo-wrapper">
						<div class="logo">
							<img :src="nav.logo.url" />
						</div>
						<div class="wordmark">
							<img :src="nav.wordmark.url" />
						</div>
                    </div>
                </a>
            </div>
            <div :class="`right ${$store.getters.navCtaVisible || $route.name === 'terms' || $route.name === 'privacy' ? 'visible': ''}`">
                <div class="store-button">
					<a :href="nav.app_store_link.url" target="_blank" rel="noopener">
						<img src="~/assets/images/appstore.png" />
					</a>
				</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        nav() {
            return this.$store.state.homepage
        }
    },
}
</script>
