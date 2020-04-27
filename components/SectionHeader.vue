<template>
    <div class="section-header-component">
        <div class="section-header-content">
            <div class="heading">
                <span>{{heading}}</span>
            </div>
            <div class="title">
                <h2
                    :class="gradient ? 'has-gradient' : ''"
                    :style="gradient && `background-image: -webkit-linear-gradient(rgba(${gradient}), #333);`"
                >
                    {{title}}
                </h2>
            </div>
            <div class="baseline">
                <p>{{subtitle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heading: String,
        title: String,
        subtitle: String,
        gradient: String
    }
}
</script>