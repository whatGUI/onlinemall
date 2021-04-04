<template>
  <div id="list-item">
    <div class="item-selector">
      <check-button
        :title="product.title"
        :isChecked="product.checked"
        @click.native="checkClick"
      ></check-button>
    </div>

    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkbutton/CheckButton.vue";

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  components: { CheckButton },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
#list-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
#list-item:last-child {
  border-bottom: 0;
}
.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  color: #333;
}
.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666;
}
.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}
.info-bottom .item-price {
  color: #ff4500;
}
</style>
