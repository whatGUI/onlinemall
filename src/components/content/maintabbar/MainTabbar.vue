<template>
  <tabbar>
    <tabbar-item path="/home">
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tabbar-item>

    <tabbar-item path="/category">
      <template #item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tabbar-item>

    <tabbar-item path="/cart">
      <template #item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tabbar-item>

    <tabbar-item path="/profile">
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="" />
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "components/common/tabbar/tabbar.vue";
import TabbarItem from "components/common/tabbar/tabbarItem.vue";

export default {
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>
