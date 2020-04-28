<template>
    <div class="section boards">
        <SectionHeader
            heading="introducing boards"
            title="tell the full story"
            subtitle="Boards allows you to go in details with unlimited components because most of the time, one media is not enough. Update them as you want."
        />
        <Board />
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Board from '~/components/Board';

export default {
    components: {
        SectionHeader,
        Board
    }
}

</script>