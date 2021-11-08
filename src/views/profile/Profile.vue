<template>
  <div>
    <nav-bar class="nav-bar">
      <template #center>我的</template>
    </nav-bar>

    <div class="user-info">
      <div v-if="$auth.isAuthenticated">
        <img src="~assets/img/profile/avatar.svg" alt="" class="avatar" />
        <div class="info">
          <div>Hi~ {{ $auth.user.nickname }}</div>
        </div>
      </div>

      <div v-else>
        <img src="~assets/img/profile/avatar.svg" alt="" class="avatar" />
        <div class="info" @click="login">
          <div>登录/注册</div>
          <div>
            <img src="~assets/img/profile/phone.svg" alt="" /><span
              >暂无绑定手机号</span
            >
          </div>
        </div>
      </div>

      <div class="arrow">
        <img src="~assets/img/common/arrow-left.svg" alt="" />
      </div>
    </div>

    <div class="account">
      <div class="account-item">
        <div class="number">
          <span>{{ getBalance }}</span
          >元
        </div>
        <div class="label">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>{{ getCoupon }}</span
          >个
        </div>
        <div class="label">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>{{ getPoints }}</span
          >分
        </div>
        <div class="label">我的积分</div>
      </div>
    </div>

    <div class="list">
      <div class="list-item">
        <img src="~assets/img/profile/message.svg" alt="" />
        <div>我的消息</div>
      </div>
      <div class="list-item">
        <img src="~assets/img/profile/pointer.svg" alt="" />
        <div>积分商城</div>
      </div>
      <div class="list-item">
        <img src="~assets/img/profile/vip.svg" alt="" />
        <div>会员卡</div>
      </div>
    </div>

    <div class="list">
      <router-link to="/cart">
        <div class="list-item">
          <img src="~assets/img/profile/cart.svg" alt="" />
          <div>我的购物车</div>
        </div>
      </router-link>
      <div class="list-item">
        <img src="~assets/img/profile/shopping.svg" alt="" />
        <div>下载购物APP</div>
      </div>
      <div>
        <div class="list-item" v-if="$auth.isAuthenticated" @click="logout">
          <img src="~assets/img/profile/logout.svg" alt="" />
          <div>退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: { NavBar },
  computed: {
    ...mapGetters(["getBalance", "getCoupon", "getPoints"]),
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.user-info {
  display: flex;
  padding: 6px 15px;
  background-color: var(--color-tint);
  justify-content: space-between;
}
.user-info > div {
  display: flex;
}
.avatar {
  width: 70px;
  height: 70px;
}
.info {
  color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
}
.info span {
  font-size: 13px;
}
.info img {
  width: 20px;
  height: 30px;
  vertical-align: middle;
  margin-left: -5px;
}
.arrow {
  display: flex;
  align-items: center;
}
.arrow img {
  width: 20px;
  height: 20px;
}

.account {
  display: flex;
  margin: 18px 0;
}
.account-item {
  flex: 1;
  font-size: 13px;
  text-align: center;
}
.account-item span {
  color: var(--color-high-text);
  font-size: 24px;
}
.account-item .label {
  margin-top: 5px;
  text-align: center;
}

.list-item {
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.list-item:first-child {
  border-top: 5px solid rgba(100, 100, 100, 0.1);
}
.list-item:last-child {
  border-bottom: none;
}
.list-item > img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 12px;
}
.list-item > div {
  font-size: 13px;
  display: inline;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
