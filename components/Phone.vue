<template>
    <div :class="`phone-component ${whiteBorder ? 'white-border' : ''} ${half ? 'half' : ''}`">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        whiteBorder: Boolean,
        half: Boolean
    }
}
</script>