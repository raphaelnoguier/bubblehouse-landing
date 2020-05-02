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
                </div>
                <Panorama />
            </div>
            <div class="compositions-wrapper">
                <div class="subtitle-component">
                    <span>Pre-built compositions</span>
                </div>
                <div class="compositions-list">
                    <Compositions
                        type="duo-landscape"
                        :medias="['https://picsum.photos/id/237/500/300','https://www.w3schools.com/html/mov_bbb.mp4']"
                    />
                    <Compositions
                        type="duo-portrait"
                        :medias="['https://picsum.photos/id/240/500/300','https://picsum.photos/id/242/500/300']"
                    />
                    <Compositions
                        type="trio-landscape"
                        :medias="['https://picsum.photos/id/250/500/300','https://picsum.photos/id/253/500/300', 'https://picsum.photos/id/260/500/300']"
                    />
                    <Compositions
                        type="trio-portrait"
                        :medias="['https://www.w3schools.com/html/mov_bbb.mp4','https://www.w3schools.com/html/mov_bbb.mp4','https://www.w3schools.com/html/mov_bbb.mp4']"
                    />
                </div>
                <div class="compositions-list">
                    <Compositions
                        type="trio-portrait-squares"
                        :medias="['https://picsum.photos/id/290/500/300','https://picsum.photos/id/210/500/300', 'https://picsum.photos/id/278/500/300']"
                    />
                    <Compositions
                        type="trio-landscape-squares"
                        :medias="['https://www.w3schools.com/html/mov_bbb.mp4','https://picsum.photos/id/212/500/300', 'https://picsum.photos/id/255/500/300']"
                    />
                    <Compositions
                        type="quatuor-landscape-portrait"
                        :medias="['https://picsum.photos/id/230/500/300','https://picsum.photos/id/225/500/300', 'https://picsum.photos/id/206/500/300', 'https://picsum.photos/id/237/500/300']"
                    />
                    <Compositions
                        type="quatuor-squares"
                        :medias="['https://picsum.photos/id/237/500/300','https://picsum.photos/id/237/500/300', 'https://picsum.photos/id/237/500/300', 'https://picsum.photos/id/237/500/300']"
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
    components: {
        SectionHeader,
        BeforeAfter,
        SimpleSlider,
        Panorama,
        Compositions
    }
}
</script>