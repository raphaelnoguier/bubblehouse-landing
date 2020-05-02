<template>
    <div class="big-quote-component">
        <div class="big-quote-content">
            <h3>"{{content}}"</h3>
            <span>{{author}}, {{role}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: String,
        author: String,
        role: String
    }
}
</script>