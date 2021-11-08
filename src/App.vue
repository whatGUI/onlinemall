<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tabbar />
  </div>
</template>

<script>
import MainTabbar from "components/content/maintabbar/MainTabbar.vue";

import { getPrivteProfile } from "@/network/profile.js";

export default {
  components: { MainTabbar },
  watch: {
    "$auth.loading": async function (loading) {
      // get personal profile after authentication
      if (loading === false && this.$auth.isAuthenticated === true) {
        const profile = await getPrivteProfile(
          this.$auth.user.email,
          this.$auth.user.sub
        );
        this.$store.commit("getProfile", profile.data);
      }
    },
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
