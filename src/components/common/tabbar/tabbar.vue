<template>
  <div class="tabbar" >

    <slot></slot>

  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.tabbar {
  display: flex;

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: rgb(246, 246, 246);
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  z-index: 1;
}
</style>
