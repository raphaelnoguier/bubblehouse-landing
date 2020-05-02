<template>
    <div class="composition">
        <div v-if="type === 'duo-landscape'" class="duo-landscape">
            <img :src="medias[0]" />
            <video :src="medias[1]" autoplay loop muted />
        </div>
        <div v-if="type === 'duo-portrait'" class="duo-portrait">
            <img :src="medias[0]" />
            <img :src="medias[1]" />
        </div>
        <div v-if="type === 'trio-landscape'" class="trio-landscape">
            <img :src="medias[0]" />
            <img :src="medias[1]" />
            <img :src="medias[2]" />
        </div>
        <div v-if="type === 'trio-portrait'" class="trio-portrait">
            <video :src="medias[0]" autoplay loop muted />
        </div>
        <div v-if="type === 'trio-portrait-squares'" class="trio-portrait-squares">
            <div class="full-col">
                <img :src="medias[0]" />
            </div>
            <div class="splitted-col">
                <img :src="medias[1]" />
                <img :src="medias[2]" />
            </div>
        </div>
        <div v-if="type === 'trio-landscape-squares'" class="trio-landscape-squares">
            <div class="full-row">
                <video :src="medias[0]" autoplay loop muted />
            </div>
            <div class="splitted-row">
                <img :src="medias[1]" />
                <img :src="medias[2]" />
            </div>
        </div>
        <div v-if="type === 'quatuor-landscape-portrait'" class="quatuor-landscape-portrait">
            <div class="full-row">
                <img :src="medias[0]" />
            </div>
            <div class="splitted-row">
                <img :src="medias[1]" />
                <img :src="medias[2]" />
                <img :src="medias[3]" />
            </div>
        </div>
        <div v-if="type === 'quatuor-squares'" class="quatuor-squares">
            <img :src="medias[0]" />
            <img :src="medias[1]" />
            <img :src="medias[2]" />
            <img :src="medias[3]" />
        </div>
    </div>
</template>

<script>
/* Utils */
import reveal from '~/utils/reveal';

export default {
    mounted() {
        this.reveal = reveal({ dom: this.$el, ratioIn: 0.8 })
    },
    beforeDestroy() {
        this.reveal.destroy();
    },
    props: {
        type: String,
        medias: Array
    }
}
</script>