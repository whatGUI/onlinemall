<template>
  <div class="cart-list">
    <cart-list-item v-for="item in getCart" :key="item.iid" :product="item"></cart-list-item>
  </div>
</template>

<script>
import cartListItem from './cartListItem.vue'

import { mapGetters } from "vuex";

export default {
  components: { cartListItem },
  computed: {
    ...mapGetters(['getCart'])
  },

}
</script>

<style scoped>

</style>
