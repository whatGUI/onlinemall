<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="detail-scroll"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>

    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "./DetailBottomBar.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/detail.js";

import { scrollRefreshMixin } from "@/common/mixin.js";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },

  mixins: [scrollRefreshMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      // 更新滚动位置数据
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.$refs.nav.$el.offsetHeight - this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      this.isShowBackTop = this.$refs.nav.$el.offsetHeight  - position.y > 1000;

      const positionY = this.$refs.nav.$el.offsetHeight  - position.y;
      const topY = this.themeTopYs;
      // const length = topY.length;

      // 通过比较来判断当前滚动到了哪一位置

      // 方法1.正序直接比较
      // for (let i = 0; i < length; i++) {
      //   if (
      //     (this.currentIndex !== i &&
      //       i < length - 1 &&
      //       positionY >= topY[i] &&
      //       positionY < topY[i + 1]) ||
      //     (i === length - 1 && positionY >= topY[i])
      //   ) {
      //     console.log(i);
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = i;
      //   }
      // }

      // 方法2.正序比较（需要在topY中push一个最大数MAX_VALUE作为哨兵）
      // for (let i = 0; i < length - 1; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     positionY >= topY[i] &&
      //     positionY < topY[i + 1]
      //   ) {
      //     console.log(i);
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = i;
      //     break;
      //   }
      // }

      // 方法3.倒序比较（将0作为哨兵）
      // for (let i = length - 1; i >= 0; i--) {
      //   if (positionY >= topY[i]) {
      //     if (this.currentIndex !== i) {
      //       console.log(i);
      //       this.currentIndex = i;
      //       this.$refs.nav.currentIndex = i;
      //       break;
      //     }
      //     else break;
      //   }
      // }

      // 方法4.个人方法，用类似折半查找算法，获得滚动位置（个人推荐）
      // 注：需要保证数组中的数据为正向由小到大排序
      const location = this.locate(topY, positionY);
      if (this.currentIndex !== location) {
        this.currentIndex = location;
        this.$refs.nav.currentIndex = location;
      }
    },

    // 折半查找key数在array中的所在区间，返回值为array的index
    locate(array, key) {
      let low = 1;
      let high = array.length - 1;
      let mid;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (key === array[mid]) {
          return mid;
        } else if (key > array[mid]) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return high;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    ...mapActions(["addCart"]),
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then((res) => {
        this.$toast.show(res);
      });
    },
  },
  created() {
    this.iid = this.$route.params.iid;

    // 请求详情页数据
    getDetail(this.iid).then((res) => {
      const goodsData = res.data.result;
      this.topImages = goodsData.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        goodsData.itemInfo,
        goodsData.columns,
        goodsData.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(goodsData.shopInfo);
      // 获取详情信息
      this.detailInfo = goodsData.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        goodsData.itemParams.info,
        goodsData.itemParams.rule
      );
      // 获取评论
      if (goodsData.rate.cRate !== 0) {
        this.commentInfo = goodsData.rate.list[0];
      }
    });

    // 请求推荐页数据
    getRecommend().then((res) => {
      this.recommend = res.data.data.list;
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 2;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.detail-scroll {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
