import { debounce } from '@/common/utils.js';

export const scrollRefreshMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImgLoad", refresh);
  },
}
