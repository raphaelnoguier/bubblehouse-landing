<template>
    <div class="section profile-example">
        <div class="large-wrapper">
            <SectionHeader
                :heading="header.heading"
                :title="header.title"
                :subtitle="header.subtitle"
                :whiteTheme="true"
            />
            <PhoneSlider :items="profileExamples" whiteBorder />
        </div>
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import PhoneSlider from '~/components/PhoneSlider';

export default {
    components: {
        SectionHeader,
        PhoneSlider,
    },
    computed: {
        header() {
            return this.$store.state.homepage.body2.find(slice => slice.slice_type === 'header_section').primary
        },
        profileExamples() {
            return this.$store.state.homepage.body2.find(slice => slice.slice_type === 'profiles_examples').items
        }
    }
}

</script>