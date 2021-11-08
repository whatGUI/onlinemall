import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

Vue.use(Vuex)

const state = {
  cartList: [],
  profile: {
    balance: 0.00,
    coupon: 0,
    points: 0,
    favorites: [],
    userId: '',
    userEmail: ''
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
