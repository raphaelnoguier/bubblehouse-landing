<template>
    <div class="footer-links-component">
        <ul>
            <li v-for="(link, i) in links" :key="i">
                <a :href="getLink(link)" v-on:click="(e) => getLink(link) === '#' ? e.preventDefault() : null">
                    {{link.link_text}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        getLink(link) {
            const { url } = link.link_url;
            if (!url) return '#';

            return url;
        }
    },
    props: {
        links: Array
    }
}
</script>