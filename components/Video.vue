<template>
    <video
        :src="url"
        muted
        :autoplay="autoplay ? true : false"
        loop
        playsinline
    />
</template>

<script>
export default {
    props: {
        url: String,
        autoplay: Boolean
    }
}
</script>