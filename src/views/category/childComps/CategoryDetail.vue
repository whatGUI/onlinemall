<template>
  <div class="detail">
    <div v-for="(item, index) in detailList" :key="index" class="detail-item">
      <a :href="item.link">
        <div class="inItem">
          <img v-lazy="item.image" alt="" />
          <p>{{ item.title }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail{
  display: grid;
  grid-template-columns:repeat(3,1fr);
}
.detail-item img{
  width: 65px;
  height: 65px;
  margin-top: 12px;
}
.detail-item p{
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
}
.inItem{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
