<template>
    <div class="composition">
        <div v-if="type === 'duo-landscape'" class="duo-landscape">
            <img :src="items[0].media.url" />
            <video :src="items[1].media.url" autoplay loop muted />
        </div>
        <div v-if="type === 'duo-portrait'" class="duo-portrait">
            <img :src="items[0].media.url" />
            <img :src="items[1].media.url" />
        </div>
        <div v-if="type === 'trio-landscape'" class="trio-landscape">
            <img :src="items[0].media.url" />
            <img :src="items[1].media.url" />
            <img :src="items[2].media.url" />
        </div>
        <div v-if="type === 'trio-portrait'" class="trio-portrait">
            <video :src="items[0].media.url" autoplay loop muted />
        </div>
        <div v-if="type === 'trio-portrait-squares'" class="trio-portrait-squares">
            <div class="full-col">
                <img :src="items[0].media.url" />
            </div>
            <div class="splitted-col">
                <img :src="items[1].media.url" />
                <img :src="items[2].media.url" />
            </div>
        </div>
        <div v-if="type === 'trio-landscape-squares'" class="trio-landscape-squares">
            <div class="full-row">
                <video :src="items[0].media.url" autoplay loop muted />
            </div>
            <div class="splitted-row">
                <img :src="items[1].media.url" />
                <img :src="items[2].media.url" />
            </div>
        </div>
        <div v-if="type === 'quatuor-landscape-portrait'" class="quatuor-landscape-portrait">
            <div class="full-row">
                <img :src="items[0].media.url" />
            </div>
            <div class="splitted-row">
                <img :src="items[1].media.url" />
                <img :src="items[2].media.url" />
                <img :src="items[3].media.url" />
            </div>
        </div>
        <div v-if="type === 'quatuor-squares'" class="quatuor-squares">
            <img :src="items[0].media.url" />
            <img :src="items[1].media.url" />
            <img :src="items[2].media.url" />
            <img :src="items[3].media.url" />
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
        items: Array
    }
}
</script>