<template>
    <div class="before-after-wrapper" ref="component">
        <div class="before-after-component">
            <div :class="`divider ${isDragging ? 'active' : ''}`" ref="divider">
                <div class="circle" ref="circle">
                    <img src="~/assets/images/icons/drag.svg" />
                </div>
            </div>
            <div class="initial">
                <img src="~/assets/images/before.jpg" />
            </div>
            <div class="reveal" ref="revealBlock">
                <img src="~/assets/images/after.jpg" ref="revealImg" />
            </div>
        </div>
        <div class="component-name">
            <span>before / after</span>
        </div>
    </div>
</template>
<script>
/* Utils */
import math from '~/utils/math';

export default {
    data() {
        return {
            isDragging: false
        }
    },
    mounted() {
        this.divider = this.$refs.divider;
        this.circle = this.$refs.circle;
        this.component = this.$refs.component;
        this.revealBlock = this.$refs.revealBlock;
        this.revealImg = this.$refs.revealImg;

        this.calcBounds();

        this.circle.addEventListener('mousedown', this.down, false);
        this.component.addEventListener('mousemove', this.move, false);
        this.component.addEventListener('mouseup', this.up, false);
        this.circle.addEventListener('mouseup', this.up, false);
    },
    methods: {
        calcBounds() {
            const { left, width } = this.component.getBoundingClientRect();
            this.componentL = left;
            this.componentW = width;
        },
        down() { this.isDragging = true },
        move(cursor) {
            if (!this.isDragging) return;
            const { x, y } = cursor;

            const mappedX = math.clamp(math.map(x - this.componentL, 0, this.componentW, 100, 0), 0, 100);

            this.revealBlock.style.transform = `translate3d(${-mappedX}%, 0, 0)`;
            this.revealImg.style.transform = `translate3d(${mappedX}%, 0, 0)`;
            this.divider.style.transform = `translate3d(${(-mappedX + 50)}%, 0, 0)`;
        },
        up() { this.isDragging = false }
    }
}
</script>
