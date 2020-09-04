<template>
    <div :class="`waiting-list-confirmation-component ${$store.getters.waitingConfirmation ? 'visible' : ''}`">
        <div class="waiting-list-confirmation-wrapper">
            <div class="content">
                <span class="header2">{{app.waiting_list_confirmation_title}}</span>
                <p class="bodyRegular">{{app.waiting_list_confirmation_content}}</p>
            </div>
            <div class="action">
                <a class="button-component" :href="app.survey_link.url" target="_blank" rel="noopener">
                    <span class="labelUpper">{{app.survey_button_text}}</span>
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