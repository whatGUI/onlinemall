<template>
  <div class="bottom-bar">
    <div class="check-all" @click="selectAll">
      <check-button class="btn" :isChecked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="total">合计:￥{{ totalPrice }}</div>
    <div class="checkout" @click="checkoutClick">去结算({{ allCount }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkbutton/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  computed: {
    ...mapGetters(["getCart"]),
    totalPrice() {
      return this.getCart
        .filter((item) => item.checked)
        .reduce((pre, current) => {
          return pre + current.price * current.count;
        }, 0)
        .toFixed(2);
    },
    allCount() {
      return this.getCart.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.getCart.length === 0) return false;
      return this.getCart?.every((item) => item.checked);
    },
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.getCart.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.getCart.forEach((item) => {
          item.checked = true;
        });
      }
    },
    checkoutClick() {
      if (!this.allCount) {
        this.$toast.show("请选择要购买的商品");
      } else {
        this.$toast.show("正在跳转至付款页面...", 2000);
        setTimeout(() => {
          this.$toast.show("请求失败请检查网络后再试", 5000);
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  line-height: 40px;

  display: flex;

  background-color: #eee;

  justify-content: space-between;
}
.check-all {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total {
  flex: 1.5;
}
.checkout {
  flex: 1.5;
  text-align: center;
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
