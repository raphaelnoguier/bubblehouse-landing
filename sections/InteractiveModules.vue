<template>
    <div class="section interactive-modules">
        <SectionHeader
            :heading="header.heading"
            :title="header.title"
            :subtitle="header.subtitle"
        />
        <div class="modules">
            <div class="subtitle-component">
                <span>Interactive modules</span>
            </div>
            <div class="modules-components">
                <div class="row">
                    <BeforeAfter :data="beforeAfter" />
                    <SimpleSlider :items="simpleSlider" />
                </div>
                <Panorama :data="panorama" />
            </div>
            <div class="compositions-wrapper">
                <div class="subtitle-component">
                    <span>Pre-built compositions</span>
                </div>
                <div class="compositions-list">
                    <Compositions
                        v-for="(composition, i) in compositions.slice(0, 4)"
                        :key="i"
                        :type="composition.primary.composition_type"
                        :items="composition.items"
                    />
                </div>
                <div class="compositions-list">
                    <Compositions
                        v-for="(composition, i) in compositions.slice(4, compositions.length)"
                        :key="i"
                        :type="composition.primary.composition_type"
                        :items="composition.items"
                    />
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
import Compositions from '~/components/Compositions';

export default {
    computed: {
        header() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'header_section').primary;
        },
        beforeAfter() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'before___after').primary;
        },
        simpleSlider() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'simple_slider').items;
        },
        panorama() {
            return this.$store.state.homepage.body3.find(slice => slice.slice_type === 'panorama').primary;
        },
        compositions() {
            return this.$store.state.homepage.body3.filter(slice => slice.slice_type === 'composition');
        }
    },
    components: {
        SectionHeader,
        BeforeAfter,
        SimpleSlider,
        Panorama,
        Compositions
    }
}
</script>