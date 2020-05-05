<template>
    <div class="section profile-example">
        <SectionHeader
            heading="your space on the internet"
            title="A place everyone can call home"
            subtitle="Your profile is your space on the internet. You can customize it as much as possible to make it unique."
        />
        <div class="profile-example-nav">
            <div class="item" @mouseover="onItemMouseHover(0)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <img src="~/assets/images/icons/image.svg" />
                </div>
                <div class="text">
                    <span>cover photos and videos</span>
                </div>
            </div>
            <div class="item" @mouseover="onItemMouseHover(1)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <img src="~/assets/images/icons/board.svg" />
                </div>
                <div class="text">
                    <span>always accessible boards</span>
                </div>
            </div>
            <div class="item" @mouseover="onItemMouseHover(2)" @mouseleave="activeIndex = null">
                <div class="icon">
                    <img src="~/assets/images/icons/grid.svg" />
                </div>
                <div class="text">
                    <span>create your own grid</span>
                </div>
            </div>
        </div>
        <div class="profile-phones">
            <div class="phones-wrapper">
                <Phone whiteBorder small >
                    <div class="media full">
                        <div class="layer-wrapper">
                            <div :class="`hero ${activeIndex === 1 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`middle ${activeIndex === 0 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`bottom ${activeIndex === 0 || activeIndex === 1 ? 'active' : ''}`" />
                        </div>
                        <img src="https://picsum.photos/id/225/300/800" />
                    </div>
                </Phone>
                <Phone whiteBorder>
                    <div class="media full video">
                        <div class="video-wrapper">
                            <video src="http://www.w3schools.com/html/mov_bbb.mp4" autoplay loop muted />
                        </div>
                        <div class="layer-wrapper">
                            <div :class="`hero ${activeIndex === 1 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`middle ${activeIndex === 0 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`bottom ${activeIndex === 0 || activeIndex === 1 ? 'active' : ''}`" />
                        </div>
                        <img src="https://picsum.photos/id/235/300/800" />
                    </div>
                </Phone>
                <Phone whiteBorder small>
                    <div class="media full">
                        <div class="layer-wrapper">
                            <div :class="`hero ${activeIndex === 1 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`middle ${activeIndex === 0 || activeIndex === 2 ? 'active' : ''}`" />
                            <div :class="`bottom ${activeIndex === 0 || activeIndex === 1 ? 'active' : ''}`" />
                        </div>
                        <img src="https://picsum.photos/id/239/300/800" />
                    </div>
                </Phone>
            </div>
            <div class="profile-example-nav center">
                <div class="item">
                    <div class="icon">
                        <img src="~/assets/images/icons/refresh.svg" />
                    </div>
                    <div class="text">
                        <span>more examples</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Components */
import SectionHeader from '~/components/SectionHeader';
import Phone from '~/components/Phone';

export default {
    data() {
        return {
            activeIndex: null
        }
    },
    components: {
        SectionHeader,
        Phone,
    },
    methods: {
        onItemMouseHover(id) {
            this.activeIndex = id;
        }
    }
}

</script>