<template>
    <div class="phone-component">
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
