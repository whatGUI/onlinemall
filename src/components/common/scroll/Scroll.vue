<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",

  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll?.scrollTo(x,y,time)
    },
    refresh() {
      // console.log('图片刷新完成')
      this.scroll?.refresh()
    },
    finishPullUp(){
      this.scroll?.finishPullUp()
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 获取滚动位置，用来隐藏topback的判断
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // 下拉加载更多
    if (this.pullUpLoad === true) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
</style>
