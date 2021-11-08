<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="favBtnClick">
        <i class="icon select" :class="{ active: isActive }"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/common/utils.js";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "DetailBottomBar",
  props: ["iid"],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    ...mapActions(["updateFavoritesList"]),
    ...mapMutations(["addFavorites", "removeFavorites"]),
    addCart() {
      this.$emit("addCart");
    },
    favBtnClick() {
      if (this.isActive) {
        this.removeFavorites(this.iid);
      } else {
        this.addFavorites(this.iid);
      }
      if (this.$auth.isAuthenticated) {
        const updateFav = debounce(this.updateFavoritesList, 100);
        updateFav();
      }
      this.isActive = !this.isActive;
    },
    isInFav() {
      const { favorites } = this.$store.state.profile;
      if (favorites?.includes(this.iid)) {
        this.isActive = true;
      }
    },
  },
  mounted() {
    this.isInFav();
  },
};
</script>

<style scoped>
.bottom-bar {
  background-color: #fff;
  height: 49px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  text-align: center;
}
.bar-item {
  display: flex;
  flex: 1;
}
.bar-item > div {
  flex: 1;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0 / 100%;
}
.icon.select.active {
  background-position: 0 -26px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-left .service {
  background-position: 0 -53px;
}
.bar-left .text {
  font-size: 13px;
}
.bar-right {
  font-size: 16px;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #fff737;
  color: #666;
}
.bar-right .buy {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
