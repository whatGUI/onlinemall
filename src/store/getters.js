export default {
  getCartCount(state) {
    return state.cartList.length
  },
  getCart(state) {
    return state.cartList
  },
  getBalance(state) {
    return state.profile.balance
  },
  getCoupon(state) {
    return state.profile.coupon
  },
  getPoints(state) {
    return state.profile.points
  }
}
