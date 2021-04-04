<template>
  <div>
    <nav-bar class="nav-bar">
      <template #center>分类</template>
    </nav-bar>

    <div class="category">
      <scroll class="category-scroll">
        <category-index :categoryList="categoryList" @indexClick="indexClick" />
      </scroll>
      <scroll class="content-scroll" ref="scroll2">
        <category-detail :detailList="detailList"/>
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="switchGoodsList"
          ref="tabControl"
          class="tab-control"
        />
        <goods-list :goods="detailGoodsList" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import CategoryIndex from "./childComps/CategoryIndex.vue";
import CategoryDetail from "./childComps/CategoryDetail.vue";
import TabControl from "../../components/content/tabcontrol/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

import {
  getCategory,
  getSubCategory,
  getDetailGoods,
} from "@/network/category.js";

export default {
  components: {
    Scroll,
    NavBar,
    CategoryIndex,
    CategoryDetail,
    TabControl,
    GoodsList,
  },
  name: "Category",
  data() {
    return {
      categoryList: [],
      detailList: [],
      detailGoodsList: [],
      currentMiniWallkey: 0,
      defaultMaitKey: 0,
    };
  },
  methods: {
    //
    // 事件监听方法
    //
    indexClick(maitKey, miniWallkey) {
      if (this.currentMiniWallkey !== miniWallkey) {
        // 1.获取一次当前点击分类下的详细数据
        this.getSubCategory(maitKey);
        // 2.获取一次当前点击分类下的初始'综合'类型商品列表
        this.getDetailGoods(miniWallkey, "pop");
        // 3.保存当前分类的key数据
        this.currentMiniWallkey = miniWallkey;
        // 4.返回顶部
        this.$refs.scroll2.scrollTo(0, 0, 0);
        // 5.tab-control返回第一个标签（“综合”）
        this.$refs.tabControl.currentIndex = 0;
      } else {
        // 点击当前分类标签直接返回顶部
        this.$refs.scroll2.scrollTo(0, 0, 500);
      }
    },
    switchGoodsList(index) {
      switch (index) {
        case 0:
          this.getDetailGoods(this.currentMiniWallkey, "pop");
          break;
        case 1:
          this.getDetailGoods(this.currentMiniWallkey, "new");
          break;
        case 2:
          this.getDetailGoods(this.currentMiniWallkey, "sell");
          break;
      }
    },

    //
    // 网络请求方法
    //
    getCategory() {
      getCategory().then((res) => {
        const category = res.data.data.category.list;
        this.categoryList = category;
      });
    },
    getSubCategory(maitKey) {
      getSubCategory(maitKey).then((res) => {
        this.detailList = res.data.data.list;
      });
    },
    getDetailGoods(miniWallkey, type) {
      getDetailGoods(miniWallkey, type).then((res) => {
        this.detailGoodsList = res.data;
      });
    },
  },

  mounted() {
    // 获取category list数据
    getCategory()
      .then((res) => {
        const category = res.data.data.category.list;
        this.categoryList = category;
        // 初始化默认分类下的miniWallkey和maitKey
        this.currentMiniWallkey = category[0].miniWallkey;
        this.defaultMaitKey = category[0].maitKey;
      })
      .then(() => {
        // 获取“正在流行”的详情页初始数据
        this.getSubCategory(this.defaultMaitKey);
        // 获取goodslist的初始数据
        this.getDetailGoods(this.currentMiniWallkey, "pop");
      });
  },
};
</script>

<style scoped>
.category {
  display: flex;
}
.category-scroll {
  flex: 1;
  height: calc(100vh - 49px - 44px);
  overflow: hidden;

  font-size: 14px;
  background-color: rgb(246, 246, 246);
}
.content-scroll {
  flex: 3;
  height: calc(100vh - 49px - 44px);
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  margin-top: 30px;
}
</style>
