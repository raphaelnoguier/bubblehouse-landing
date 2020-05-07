<template>
    <div class="footer-links-component">
        <ul>
            <li v-for="(link, i) in links" :key="i">
                <a :href="getLink(link)">
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
            if (link.link_url.url.includes('#')) return '#';

            return link.link_url.url;
        }
    },
    props: {
        links: Array
    }
}
</script>