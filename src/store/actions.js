import { ADD_COUNTER, ADD_TO_CART } from "./mutation-type.js";

import { updateCart, updateFavorites } from "@/network/profile.js";

export default {
  addCart(context, payload) {
    return new Promise(resolve => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }
      else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('商品已加入购物车')
      }
    })

  },
  async updateCartList(context) {
    const userEmail = context.state.profile.userEmail
    const userId = context.state.profile.userId
    const cartList = context.state.cartList
    await updateCart(userEmail, userId, cartList,)
  },
  async updateFavoritesList(context) {
    const userEmail = context.state.profile.userEmail
    const userId = context.state.profile.userId
    const favorites = context.state.profile.favorites
    await updateFavorites(userEmail, userId, favorites,)
  }
}
