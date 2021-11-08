<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template #center> 购物车({{ cartCount }}) </template>
    </nav-bar>
    <scroll class="cart-scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />

    <clear-button @click.native="clearCart" v-show="cartCount" />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./childComps/cartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import ClearButton from "../../components/content/clearbutton/ClearButton.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
    ClearButton,
  },
  computed: {
    ...mapGetters({
      cartCount: "getCartCount",
    }),
  },
  methods: {
    ...mapMutations(["clear_cart"]),
    ...mapActions(["updateCartList"]),
    clearCart() {
      this.clear_cart();
      this.updateCartList();
    },
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-scroll {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
