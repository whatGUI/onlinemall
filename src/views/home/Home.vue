<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center> 购物街 </template></nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="switchGoodsList"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="switchGoodsList"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import RecommendView from "./childComps/RecommendView.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import FeatureView from "./childComps/FeatureView.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabcontrol/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home.js";
// import { debounce } from "@/common/utils.js";
import { scrollRefreshMixin } from "@/common/mixin.js";

export default {
  components: {
    NavBar,
    RecommendView,
    HomeSwiper,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  name: "Home",
  mixins: [scrollRefreshMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    // 请求首页数据

    this.getHomeMultidata();

    // 请求商品数据

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // mounted() {
  //   // 已由mixin混入取代，以下仅作为说明
  //   // 监听图片加载完成,执行better-scroll的refresh方法(添加防抖)
  //   const refresh = debounce(this.$refs.scroll.refresh, 100);
  //   this.$bus.$on("itemImgLoad", refresh);
  // },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //
    // 事件监听方法
    //
    switchGoodsList(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 判断backtop是否隐藏
      this.isShowBackTop = -position.y > 1000;
      // 根据offsettop决定tabcontrol的fixed
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoaded() {
      // 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //
    // 网络请求方法
    //
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page++;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 1;
  top: -1px;
}
.scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px; /* px-to-viewport-ignore */
  right: 0;
  left: 0;
}
</style>
