<template>
    <div class="section boards">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
        />
        <Board :boardItems="board" :horizontalSliders="horizontalSliders" />
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
        horizontalSliders () {
            return this.$store.state.homepage.body1.filter(element => element.slice_type === 'horizontal_phone_slider');
        },
    },
    components: {
        SectionHeader,
        Board
    }
}

</script>