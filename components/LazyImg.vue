<template>
    <div class="lazy-img-component">
        <img v-lazy="url" alt="" :key="url" />
        <div :class="`lazy-placeholder ${loading ? 'active' : ''}`" />
    </div>
</template>

<script>
export default {
    props: {
        url: String,
        loading: Boolean
    }
}
</script>