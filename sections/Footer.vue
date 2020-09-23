<template>
    <div class="section footer">
        <footer>
            <div class="large-wrapper">
                <div class="texts" ref="texts">
                    <SectionHeader
                        :title="footer.footer_baseline"
                        :subtitle="footer.footer_subtitle"
                        :whiteTheme="true"
                    />
                </div>
                <div class="form-wrapper">
                    <form v-on:submit.prevent="submitForm" :class="`form ${$store.getters.hasFilledForm ? 'disabled' : ''}`">
                        <input
                            :class="`input-component bodyRegular ${(emailValue.length > 1 || $store.getters.globalEmailValue.length)  ? 'filled' : ''}`"
                            type="email"
                            name="email"
                            placeholder="Mail address"
                            v-model="emailValue"
                            required
                        />
                        <input
                            :class="`input-component bodyRegular ${(nameValue.length > 1 || $store.getters.globalNameValue.length)  ? 'filled' : ''}`"
                            type="text"
                            name="name"
                            placeholder="Name"
                            v-model="nameValue"
                            required
                        />

                        <button
                            :class="`button-component ${isLoading ? 'loading' : ''} reverse-theme`"
                            type="submit"
                        >
                            <span :class="`labelUpper ${$store.getters.hasFilledForm ? 'hide' : ''}`">
                                {{footer.global_cta_name}}
                            </span>
                            <img :class="`${$store.getters.hasFilledForm ? 'visible' : ''}`" src="~/assets/images/icons/done.svg" alt="Done icon" />
                        </button>
                    </form>
                </div>
                <FooterLinks :links="footerLinks" />
            </div>
        </footer>
    </div>
</template>

<script>
/* Utils */
import axios from 'axios';
import qs from 'querystring';
import enterView from 'enter-view';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import FooterLinks from '~/components/FooterLinks';

export default {
    computed: {
        emailValue: {
            get() {
                return this.$store.getters.globalEmailValue || '';
            },
            set(value) {
                return this.$store.commit('SET_GLOBAL_EMAIL_VALUE', value);
            }
        },
        nameValue: {
            get() {
                return this.$store.getters.globalNameValue || '';
            },
            set(value) {
                return this.$store.commit('SET_GLOBAL_NAME_VALUE', value);
            }
        },
        footer() {
            return this.$store.state.homepage;
        },
        footerLinks() {
            return this.$store.state.homepage.body5.find(slice => slice.slice_type === 'footer_links').items;
        }
    },
    data() {
        return {
            isLoading: false,
            error: false
        }
    },
    mounted() {
        enterView({
            selector: '.section.footer',
            offset: 0.95,
            enter: () => this.$store.commit('SET_NAV_CTA_VISIBLE', false),
            exit: () => this.$store.commit('SET_NAV_CTA_VISIBLE', true),
        });
    },
    methods: {
        submitForm() {
            const { commit } = this.$store;
            const self = this;

            if (self.$store.getters.hasFilledForm) return;

            self.isLoading = true;

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const body = {
                email: self.emailValue,
                name: self.nameValue
            };

            if (self.emailValue.length > 0 && self.nameValue.length > 0) {
                axios.post('https://bubblehouse.com/v1/leads/', qs.stringify(body), config)
                .then(function (response) {
                    self.$store.commit('SET_HAS_FILLED_FORM', true);
                    self.isLoading = false;

                    setTimeout(() => {
                        self.$store.commit('SET_WAITING_CONFIRMATION_VISIBLE', true);
                    }, 500);
                })
                .catch(function (error) {
                    console.error(error);
                });
            }
        }
    },
    components: {
        SectionHeader,
        FooterLinks
    }
}
</script>