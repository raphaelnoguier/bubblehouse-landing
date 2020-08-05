<template>
    <div class="section footer">
        <footer>
            <div class="large-wrapper">
                <div class="texts" ref="texts">
                    <AppIcon />
                    <SectionHeader
                        :title="footer.footer_baseline"
                        :subtitle="footer.footer_subtitle"
                        :whiteTheme="true"
                    />
                </div>
                <div class="form-wrapper">
                    <form v-on:submit.prevent="submitForm">
                        <input
                            class="input-component"
                            type="email"
                            name="email"
                            placeholder="Mail adress"
                            v-model="emailValue"
                            required
                        />
                        <input
                            class="input-component"
                            type="text"
                            name="name"
                            placeholder="Name"
                            v-model="nameValue"
                            required
                        />
                        <button :class="`button-component ${isLoading ? 'loading' : ''} reverse-theme`" type="submit">
                            <span class="labelUpper">{{footer.global_cta_name}}</span>
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
import reveal from '~/utils/reveal';
import axios from 'axios';
import qs from 'querystring';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import FooterLinks from '~/components/FooterLinks';
import AppIcon from '~/components/Svgs/AppIcon';

export default {
    computed: {
        footer() {
            return this.$store.state.homepage;
        },
        footerLinks() {
            return this.$store.state.homepage.body5.find(slice => slice.slice_type === 'footer_links').items;
        }
    },
    data() {
        return {
            emailValue: '',
            nameValue: '',
            isLoading: false,
            error: false
        }
    },
    mounted() {
        this.reveal = reveal({ dom: this.$refs.texts, ratioIn: 0.5 });
    },
    beforeDestroy() {
        this.reveal.destroy();
    },
    methods: {
        submitForm() {
            const { commit } = this.$store;
            const self = this;

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
                axios.post('https://blurr-staging.herokuapp.com/v1/leads/', qs.stringify(body), config)
                .then(function (response) {
                    self.$store.commit('SET_WAITING_CONFIRMATION_VISIBLE', true);
                })
                .catch(function (error) {
                    self.$store.commit('SET_WAITING_CONFIRMATION_VISIBLE', true);
                    self.isLoading = false;
                });
            }
        }
    },
    components: {
        AppIcon,
        SectionHeader,
        FooterLinks
    }
}
</script>