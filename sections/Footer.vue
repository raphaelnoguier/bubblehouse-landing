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
                    <button class="button-component" type="submit">
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
            this.error = false;

            if (Utils.isValidEmail(this.emailValue)) commit('SET_MODAL_OPEN', {
                open: true,
                inputEmail: this.emailValue,
                inputName: this.nameValue
            });
            else this.error = true
        }
    },
    components: {
        FooterLinks
    }
}
</script>