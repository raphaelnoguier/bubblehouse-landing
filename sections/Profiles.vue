<template>
    <div class="section profiles">
        <div class="large-wrapper">
            <SectionHeader
                :heading="header.heading"
                :title="header.title"
                :subtitle="header.subtitle"
            />
            <TimerSlider :items="timerSlider.items" :playing="enteredSection" />
        </div>
    </div>
</template>

<script>
/* Utils */
import enterView from 'enter-view';

/* Components */
import SectionHeader from '~/components/SectionHeader';
import TimerSlider from '~/components/TimerSlider';

export default {
    data() {
        return {
            enteredSection: false,
            stopSlider: false,
        }
    },
    mounted() {
        enterView({
            selector: '.profiles .large-wrapper',
            offset: 0.9,
            enter: () => this.enteredSection = true
        });
    },
    computed: {
        header() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'header_section').primary;
        },
        timerSlider() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'timer_slider');
        },
    },
    components: {
        SectionHeader,
        TimerSlider
    }
}
</script>