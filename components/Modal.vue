<template>
    <div :class="`modal-wrapper ${visible ? 'visible' : ''}`">
        <div class="modal-overlay" v-on:click="$store.commit('SET_MODAL_OPEN', false)" />
        <div :class="`modal-component ${currentStep === 2 ? 'small' : ''}`">
            <div class="modal-close" v-on:click="$store.commit('SET_MODAL_OPEN', false)">
                <img src="~/assets/images/icons/close.svg" />
            </div>
            <div class="modal-content">
                <div :class="`step ${currentStep === 1 ? 'visible' : ''}`">
                    <div class="title">
                        <h2>It’s time to get creative</h2>
                    </div>
                    <div class="description">
                        <p>We’re opening up our Private Beta to more users. If you would like to try out Aura, give us your info!</p>
                    </div>
                    <form v-on:submit.prevent="changeStep">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            class="input-component"
                            tabIndex="0"
                            :value="$store.getters.modalInputName"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            class="input-component"
                            tabIndex="0"
                            v-model="nameValue"
                            required
                        />
                        <button class="button-component" type="submit" v-on:click="changeStep">
                            <span>Get early access</span>
                        </button>
                    </form>
                </div>
                <div :class="`step step-2 ${currentStep === 2 ? 'visible' : ''}`">
                    <div class="title">
                        <h2>You are on the waitlist</h2>
                    </div>
                    <div class="description">
                        <p>Want to get in sooner and request your username ?</p>
                    </div>
                    <div class="form">
                        <button class="button-component">
                            <span>Complete survey</span>
                        </button>
                    </div>
                    <div class="socials">
                        <a href="#">
                            <img src="~/assets/images/icons/twitter.svg" />
                        </a>
                        <a href="#">
                            <img src="~/assets/images/icons/facebook.svg" />
                        </a>
                        <a href="#">
                            <img src="~/assets/images/icons/linkedin.svg" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,
            nameValue: ''
        }
    },
    methods: {
        changeStep() {
            if (this.nameValue.length) this.currentStep = 2;
        }
    },
    props: {
        visible: Boolean
    }
}
</script>