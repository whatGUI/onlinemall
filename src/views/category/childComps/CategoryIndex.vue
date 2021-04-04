<template>
  <div>
    <div
      class="index-item"
      v-for="(item, index) in categoryList"
      :key="index"
      @click="itemClick(item.maitKey, index, item.miniWallkey)"
      :class="{ active: currentIndex === index }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(maitKey, index, miniWallkey) {
      this.currentIndex = index;
      // 请求数据并传给categorydetail组件
      this.$emit("indexClick", maitKey, miniWallkey);
    },
  },
};
</script>

<style scoped>
.index-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.active {
  border-left: 5px solid var(--color-tint);
  background-color: #fff;
  font-weight: 600;
  color: var(--color-tint);
}
</style>
