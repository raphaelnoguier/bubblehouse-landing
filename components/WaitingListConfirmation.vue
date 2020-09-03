<template>
    <div :class="`waiting-list-confirmation-component ${$store.getters.waitingConfirmation ? 'visible' : ''}`">
        <div class="waiting-list-confirmation-wrapper">
            <div class="left">
                <span class="header2">{{app.waiting_list_confirmation_title}}</span>
                <p class="bodyRegular">{{app.waiting_list_confirmation_content}}</p>
            </div>
            <div class="actions">
                <a class="button-component reverse-theme" :href="app.survey_link.url" target="_blank" rel="noopener">
                    <span class="labelUpper">{{app.survey_button_text}}</span>
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