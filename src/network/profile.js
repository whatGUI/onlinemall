import { request } from "@/network/request.js";
import qs from 'qs';


export function getPrivteProfile(userEmail, userId) {
  const data = { userEmail, userId }
  return request({
    url: '/profile',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateFavorites(userEmail, userId, favorites) {
  const data = { userEmail, userId, favorites }
  return request({
    url: '/profile/update_favorites',
    method: 'post',
    data: qs.stringify(data, { arrayFormat: 'repeat' })
  })
}

export function updateCart(userEmail, userId, cart) {
  const data = { userEmail, userId, cart }
  return request({
    url: '/profile/update_cart',
    method: 'post',
    data: JSON.stringify(data)
  })
}
