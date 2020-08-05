<template>
    <div :class="`waiting-list-confirmation-component ${$store.getters.waitingConfirmation ? 'visible' : ''}`">
        <div class="waiting-list-confirmation-wrapper">
            <div class="left">
                <span class="confirmation-title">You are on the waiting list</span>
                <p class="bodyRegular">Complete the survey to be on top of the waitlist and <span class="">reserve your username</span>!</p>
            </div>
            <div class="actions">
                <a class="button-component reverse-theme" :href="app.survey_link.url" target="_blank" rel="noopener">
                    <span class="labelUpper">Complete survey</span>
                </a>
                <a class="button-component reverse-theme" href="https://www.facebook.com/sharer/sharer.php?u=https://bubblehouse.com" target="_blank" rel="noopener">
                    <img src="~/assets/images/icons/facebook.svg" alt="facebook-logo" />
                    <span class="labelUpper">Share it</span>
                </a>
                <a class="button-component reverse-theme" href="https://twitter.com/intent/tweet?url=https://bubblehouse.com" target="_blank" rel="noopener">
                    <img src="~/assets/images/icons/twitter.svg" alt="twitter-logo" />
                    <span class="labelUpper">Tweet it</span>
                </a>
                <div class="close" v-on:click="$store.commit('SET_WAITING_CONFIRMATION_VISIBLE', false)">
                    <CloseIcon />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/* Components */
import CloseIcon from '~/components/Svgs/Close';

export default {
    computed: {
        app() {
			return this.$store.state.homepage
		}
    },
    components: {
        CloseIcon
    }
}
</script>