<template>
    <video
        :src="url"
        muted
        :autoplay="autoplay ? true : false"
        :controls="controls ? true : false"
        loop
        playsinline
    />
</template>

<script>
export default {
    props: {
        url: String,
        controls: Boolean,
        autoplay: Boolean
    }
}
</script>