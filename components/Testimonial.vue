<template>
    <div class="testimonial-component swiper-slide">
        <div class="testimonial-content">
            <p class="bodyRegularLG">"{{content}}"</p>
        </div>
        <div class="testimonial-footer">
            <div class="avatar">
                <img :src="avatar" />
            </div>
            <div class="user-infos">
                <span class="role header3">{{role}}</span>
                <span class="name">{{author}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: String,
        author: String,
        role: String,
        avatar: String
    }
}
</script>