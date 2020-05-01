<template>
    <div class="section interactive-modules">
        <SectionHeader
            heading="one size does not fit all"
            title="Choose how to show your content"
            subtitle="Based on the number of asset you want to post, choose what component is the right fit for you."
        />
        <div class="modules">
            <div class="subtitle-component">
                <span>Interactive modules</span>
            </div>
            <div class="modules-components">
                <div class="row">
                    <BeforeAfter />
                    <SimpleSlider />
                    <Panorama />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import BeforeAfter from '~/components/BeforeAfter';
import SimpleSlider from '~/components/SimpleSlider';
import Panorama from '~/components/Panorama';

export default {
    components: {
        SectionHeader,
        BeforeAfter,
        SimpleSlider,
        Panorama
    }
}
</script>