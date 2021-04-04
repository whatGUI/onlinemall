<template>
  <div class="tabbarItem" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor:{type:String,default:'rgb(255, 87, 119)'},
  },
  computed:{
    isActive(){
      return this.$route.path.includes(this.path);
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(()=>{});
    },
  },
};
</script>

<style scoped>
.tabbarItem {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tabbarItem img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>
