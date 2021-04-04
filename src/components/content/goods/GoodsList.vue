<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      required:true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 2px;
}
</style>
