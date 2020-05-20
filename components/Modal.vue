<template>
    <div :class="`modal-wrapper ${visible ? 'visible' : ''}`">
        <div class="modal-overlay" v-on:click="closeModal()" />
        <div :class="`modal-component ${state.currentStep === 2 ? 'small' : ''}`">
            <div class="modal-close" v-on:click="closeModal()">
                <img src="~/assets/images/icons/close.svg" />
            </div>
            <div class="modal-content">
                <div :class="`step ${state.currentStep === 1 ? 'visible' : ''}`">
                    <div class="title">
                        <h2>{{modal.modal_title}}</h2>
                    </div>
                    <div class="description">
                        <p>{{modal.modal_subtitle}}</p>
                    </div>
                    <form v-on:submit.prevent="changeStep" ref="form">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            class="input-component"
                            tabIndex="0"
                            required
                            v-model="$store.state.modalInputEmail"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            class="input-component"
                            tabIndex="0"
                            v-model="$store.state.modalInputName"
                            required
                        />
                        <button :class="`button-component ${isLoading ? 'loading' : ''}`" type="submit">
                            <span>{{modal.global_cta_name}}</span>
                        </button>
                    </form>
                </div>
                <div :class="`step step-2 ${state.currentStep === 2 ? 'visible' : ''}`">
                    <div class="title">
                        <h2>{{modal.modal_form_complete_title}}</h2>
                    </div>
                    <div class="description">
                        <p>{{modal.modal_form_complete_subtitle}}</p>
                    </div>
                    <div class="form">
                        <a :href="modal.complete_survey_link.url" target="_blank" rel="noopener">
                            <button class="button-component">
                                <span>{{modal.complete_survey_text}}</span>
                            </button>
                        </a>
                    </div>
                    <div class="socials">
                        <a :href="modal.twitter_share_url.url" target="_blank" rel="noopener">
                            <img src="~/assets/images/icons/twitter.svg" />
                        </a>
                        <a :href="modal.facebook_share_url.url" target="_blank" rel="noopener">
                            <img src="~/assets/images/icons/facebook.svg" />
                        </a>
                        <a :href="modal.linkedin_share_url.url" target="_blank" rel="noopener">
                            <img src="~/assets/images/icons/linkedin.svg" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Utils */
import axios from 'axios';
import qs from 'querystring';

export default {
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        modal() {
            return this.$store.state.homepage
        },
        state() {
            return {
                currentStep: this.$store.state.modalByPass ? 2 : 1,
                isLoading: false
            }
        }
    },
    methods: {
        changeStep() {
            if (this.$refs.form.checkValidity()) {
                const self = this;
                self.isLoading = true;

                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                const body = {
                    email: this.$store.state.modalInputEmail,
                    name: this.$store.state.modalInputName
                };

                axios.post('https://blurr-staging.herokuapp.com/v1/leads/', qs.stringify(body), config)
                .then(function (response) {
                    self.currentStep = 2;
                    self.isLoading = false;
                })
                .catch(function (error) {
                    self.isLoading = false;
                });
            }
        },
        closeModal() {
            this.$store.commit('SET_MODAL_OPEN', false);
            this.$store.commit('SET_MODAL_INPUT_EMAIL', '');
            this.$store.commit('SET_MODAL_INPUT_NAME', '');

            setTimeout(() => {
                this.currentStep = 1;
            }, 500);
        }
    },
    props: {
        visible: Boolean
    }
}
</script>