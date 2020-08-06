<template>
    <video
        :src="url"
        muted
        :autoplay="autoplay ? true : false"
        :loop="loop ? true : false"
        playsinline
        :poster="poster"
    />
</template>

<script>
export default {
    props: {
        url: String,
        autoplay: Boolean,
        loop: Boolean,
        poster: String
    }
}
</script>