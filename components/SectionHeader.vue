<template>
    <div class="section-header-component" :class="whiteTheme ? 'white-theme' : ''">
        <div class="section-header-content" :class="large ? 'lg' : ''">
            <div class="title">
                <span class="labelUpper">
                    {{title}}
                </span>
            </div>
            <div class="baseline">
                <h2 class="header2">{{subtitle}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        whiteTheme: Boolean,
        large: Boolean
    }
}
</script>