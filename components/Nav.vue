<template>
    <div class="nav-component">
        <div class="nav-content">
            <div class="left">
                <a href="/">
                    <div class="logo">
                        <img src="~/assets/images/logo.png" />
                    </div>
                </a>
            </div>
            <div class="right">
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
    methods: {
        scrollToBottom() {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
}
</script>
