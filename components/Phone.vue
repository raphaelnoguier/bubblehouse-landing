<template>
    <div :class="`phone-component ${whiteBorder ? 'white-border' : ''} ${small ? 'sm' : ''} ${half ? 'half' : ''}`">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        whiteBorder: Boolean,
        small: Boolean,
        half: Boolean
    }
}
</script>