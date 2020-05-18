<template>
    <div class="section footer">
        <footer>
            <div class="texts" ref="texts">
                <h3>{{footer.footer_baseline}}</h3>
                <p>{{footer.footer_subtitle}}</p>
            </div>
            <div class="form-wrapper">
                <form v-on:submit.prevent="openModal">
                    <input
                        :class="`input-component ${error ? 'error' : ''}`"
                        type="email"
                        name="email"
                        placeholder="Mail adress"
                        v-model="emailValue"
                    />
                    <input
                        class="input-component"
                        type="text"
                        name="name"
                        placeholder="Name"
                        v-model="nameValue"
                    />
                    <button :class="`button-component ${isLoading ? 'loading' : ''}`" type="submit">
                        <span>{{footer.global_cta_name}}</span>
                    </button>
                </form>
            </div>
            <FooterLinks :links="footerLinks" />
        </footer>
    </div>
</template>

<script>
/* Utils */
import reveal from '~/utils/reveal';
import Utils from '~/utils';
import axios from 'axios';
import qs from 'querystring';

/* Components */
import FooterLinks from '~/components/FooterLinks';

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
        openModal() {
            const { commit } = this.$store;
            const self = this;
            this.error = false;
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const body = {
                email: self.emailValue,
                name: self.nameValue
            };

            if (Utils.isValidEmail(this.emailValue) && this.nameValue.length > 0) {
                axios.post('https://blurr-staging.herokuapp.com/v1/leads/', qs.stringify(body), config)
                .then(function (response) {
                    self.$store.commit('SET_MODAL_BYPASS', true);
                    self.isLoading = false;
                })
                .catch(function (error) {
                    self.isLoading = false;
                    console.log(error);
                });
                commit('SET_MODAL_OPEN', true);
            }
            else this.error = true
        }
    },
    components: {
        FooterLinks
    }
}
</script>