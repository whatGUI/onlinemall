<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template #center> 购物车({{ cartCount }}) </template>
    </nav-bar>
    <scroll class="cart-scroll">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from './childComps/cartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

import Scroll from '../../components/common/scroll/Scroll.vue';

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      cartCount: "getCartCount",
    }),
  },
};
</script>

<style scoped>
#cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-scroll{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
