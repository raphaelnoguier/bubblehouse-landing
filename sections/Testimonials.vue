<template>
    <div class="section testimonials">
        <BigQuote
            content="Aura changed the way I post content online"
            author="angela mayer"
            role="photographer"
        />
        <div class="testimonials-wrapper">
            <Testimonial
                content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                author="lindsey adler"
                role="photographer"
                avatar="https://picsum.photos/id/230/500/300"
            />
            <Testimonial
                content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                author="lindsey adler"
                role="photographer"
                avatar="https://picsum.photos/id/230/500/300"
            />
            <Testimonial
                content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                author="lindsey adler"
                role="photographer"
                avatar="https://picsum.photos/id/230/500/300"
            />
            <Testimonial
                content="The first time I used Aura I really felt I had ownership over my content and the way I show it to my growing audience!"
                author="lindsey adler"
                role="photographer"
                avatar="https://picsum.photos/id/230/500/300"
            />
        </div>
    </div>
</template>

<script>
/* Components */
import BigQuote from '~/components/BigQuote';
import Testimonial from '~/components/Testimonial';

export default {
    components: {
        BigQuote,
        Testimonial
    }
}
</script>