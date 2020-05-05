<template>
    <div class="section footer">
        <footer>
            <div class="texts" ref="texts">
                <h3>Ready to dive-in the creative world?</h3>
                <p>We’re opening up our Private Beta to more users. If you would like to try out Aura, give us your info!</p>
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
                        <span>Get early access</span>
                    </button>
                </form>
            </div>
            <FooterLinks />
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
    data() {
        return {
            emailValue: '',
            nameValue: '',
            error: false
        }
    },
    mounted() {
        this.reveal = reveal({ dom: this.$refs.texts, ratioIn: 0.5 })
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