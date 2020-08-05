<template>
    <div class="section feed">
        <div class="large-wrapper">
            <SectionHeader
                :heading="header.heading"
                :title="header.title"
                :subtitle="header.subtitle"
                :large="true"
            />
            <PhoneSlider :items="feeds" :whiteBorder="false" />
        </div>
    </div>
</template>

<script>
/* Utils */
import enterView from 'enter-view';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import PhoneSlider from '~/components/PhoneSlider';

export default {
    components: {
        SectionHeader,
        PhoneSlider
    },
    computed: {
        header () {
            return this.$store.state.homepage.body[0].primary;
        },
        feeds () {
            return this.$store.state.homepage.body.find(slice => slice.slice_type === 'profiles_examples').items;
        }
    },
}
</script>