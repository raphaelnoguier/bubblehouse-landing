<template>
    <video
        :src="url"
        muted
        :autoplay="autoplay ? true : false"
        playsinline
        :poster="poster"
    />
</template>

<script>
export default {
    watch: {
        playing() {
            if (this.playing) this.$el.play();
            else this.$el.pause();
        },
    },
    props: {
        url: String,
        autoplay: Boolean,
        playing: {
            type: Boolean,
            default: false
        },
        poster: String
    }
}
</script>
