<template>
    <div class="section footer">
        <footer>
            <div class="texts">
                <h3>Ready to dive-in the creative world?</h3>
                <p>We’re opening up our Private Beta to more users. If you would like to try out Aura, give us your info!</p>
            </div>
            <div class="form-wrapper">
                <form>
                    <input class="input-component" type="email" name="email" placeholder="Mail adress" />
                    <input class="input-component" type="text" name="name" placeholder="Name" />
                    <button class="button-component">
                        <span>Get early access</span>
                    </button>
                </form>
            </div>
            <FooterLinks />
        </footer>
    </div>
</template>

<script>
/* Components */
import FooterLinks from '~/components/FooterLinks';

export default {
    components: {
        FooterLinks
    }
}
</script>