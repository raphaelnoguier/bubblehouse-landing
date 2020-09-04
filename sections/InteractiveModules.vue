<template>
    <div class="section interactive-modules">
        <div class="large-wrapper">
            <SectionHeader
                :heading="header.heading"
                :title="header.title"
                :subtitle="header.subtitle"
            />
            <TimerSlider :items="timerSlider.items" :playing="enteredSection" :key="1" :pauseSlider="pauseSlider" />
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
            pauseSlider: false
        }
    },
    mounted() {
        enterView({
            selector: '.interactive-modules .large-wrapper',
            offset: 0.9,
            enter: () => this.enteredSection = true,
        });

        enterView({
            selector: '.boards .section-header-component',
            offset: 1,
            enter: () => this.pauseSlider = true,
            exit: () => this.pauseSlider = false
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