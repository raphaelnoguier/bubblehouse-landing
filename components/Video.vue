<template>
    <video
        :src="url"
        muted
        autoplay
        loop
        playsinline
    />
</template>

<script>
export default {
    props: {
        url: String
    }
}
</script>