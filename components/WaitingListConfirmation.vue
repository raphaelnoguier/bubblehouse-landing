<template>
    <div :class="`waiting-list-confirmation-component ${visible ? 'visible' : ''}`">
        <div class="waiting-list-confirmation-wrapper">
            <div class="left">
                <span class="confirmation-title">You are on the waiting list</span>
                <p class="bodyRegular">Complete the survey to be on top of the waitlist and <span class="">reserve your username</span>!</p>
            </div>
            <div class="actions">
                <button class="button-component reverse-theme">
                    <span class="labelUpper">Complete survey</span>
                </button>
                <button class="button-component reverse-theme">
                    <span class="labelUpper">Share it</span>
                </button>
                <button class="button-component reverse-theme">
                    <span class="labelUpper">Tweet it</span>
                </button>
                <div class="close" v-on:click="visible = false">
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
    data() {
        return {
            visible: true
        }
    },
    components: {
        CloseIcon
    }
}
</script>