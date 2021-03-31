<template>
    <div class="footer-links-component">
        <ul>
            <li v-for="(link, i) in links" :key="i">
                <a class="labelUpper" :href="getLink(link)" v-on:click="(e) => getLink(link) === '#' ? e.preventDefault() : null">
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
            const { link_type, type, url } = link.link_url;

			if (link_type === "Web") return url;
            if (!type) return '#';

            return type;
        }
    },
    props: {
        links: Array
    }
}
</script>
