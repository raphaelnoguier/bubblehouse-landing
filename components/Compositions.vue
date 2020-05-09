<template>
    <div class="composition">
        <div v-if="type === 'duo-landscape'" class="duo-landscape">
            <template v-for="(item, i) in items">
                <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                <img :src="item.media.url" :key="i" v-else />
            </template>
        </div>
        <div v-if="type === 'duo-portrait'" class="duo-portrait">
            <template v-for="(item, i) in items">
                <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                <img :src="item.media.url" :key="i" v-else />
            </template>
        </div>
        <div v-if="type === 'trio-landscape'" class="trio-landscape">
            <template v-for="(item, i) in items">
                <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                <img :src="item.media.url" :key="i" v-else />
            </template>
        </div>
        <div v-if="type === 'trio-portrait'" class="trio-portrait">
            <template v-for="(item, i) in items">
                <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                <img :src="item.media.url" :key="i" v-else />
            </template>
        </div>
        <div v-if="type === 'trio-portrait-squares'" class="trio-portrait-squares">
            <div class="full-col">
                <video v-if="isVideo(items[0].media.url)" :src="items[0].media.url" autoplay loop muted />
                <img :src="items[0].media.url" v-else />
            </div>
            <div class="splitted-col">
                <template v-for="(item, i) in items.slice(1, items.length)">
                    <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                    <img :src="item.media.url" :key="i" v-else />
                </template>
            </div>
        </div>
        <div v-if="type === 'trio-landscape-squares'" class="trio-landscape-squares">
            <div class="full-row">
                <video v-if="isVideo(items[0].media.url)" :src="items[0].media.url" autoplay loop muted />
                <img :src="items[0].media.url" v-else />
            </div>
            <div class="splitted-row">
                <template v-for="(item, i) in items.slice(1, items.length)">
                    <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                    <img :src="item.media.url" :key="i" v-else />
                </template>
            </div>
        </div>
        <div v-if="type === 'quatuor-landscape-portrait'" class="quatuor-landscape-portrait">
            <div class="full-row">
                <video v-if="isVideo(items[0].media.url)" :src="items[0].media.url" autoplay loop muted />
                <img :src="items[0].media.url" v-else />
            </div>
            <div class="splitted-row">
                <template v-for="(item, i) in items.slice(1, items.length)">
                    <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                    <img :src="item.media.url" :key="i" v-else />
                </template>
            </div>
        </div>
        <div v-if="type === 'quatuor-squares'" class="quatuor-squares">
            <template v-for="(item, i) in items">
                <video v-if="isVideo(item.media.url)" :key="i" :src="item.media.url" autoplay loop muted />
                <img :src="item.media.url" :key="i" v-else />
            </template>
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
    methods: {
        isVideo(url) {
            if (url.includes('mp4')) return true;
            return false;
        }
    },
    props: {
        type: String,
        items: Array
    }
}
</script>