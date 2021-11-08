import { ADD_COUNTER, ADD_TO_CART, CLEAR_CART } from "./mutation-type.js";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [CLEAR_CART](state) {
    state.cartList = []
  },
  getProfile(state, payload) {
    const data = {}
    data.balance = payload.balance.substring(1)
    data.coupon = payload.coupon
    data.points = payload.points
    data.favorites = payload.favorites || []
    data.userEmail = payload.useremail
    data.userId = payload.userid
    state.profile = { ...data }
    state.cartList = payload.cart || []
  },
  addFavorites(state, payload) {
    state.profile.favorites.push(payload)
  },
  removeFavorites(state, payload) {
    let favorites = state.profile.favorites
    favorites.splice(favorites.indexOf(payload), 1)
    state.profile.favorites = favorites
  }
}
