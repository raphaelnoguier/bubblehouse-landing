<template>
    <div class="section boards" :style="`background-color: ${this.$store.getters.boardSectionBgColor}`">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
        />
        <Board :boardItems="board" :timerSlider="timerSlider" />
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Board from '~/components/Board';

export default {
    computed: {
        header () {
            return this.$store.state.homepage.body1[0].primary;
        },
        board () {
            return this.$store.state.homepage.body1[1].items;
        },
        timerSlider () {
            return this.$store.state.homepage.body1.find(element => element.slice_type === 'timer_slider');
        },
    },
    components: {
        SectionHeader,
        Board
    },
}

</script>