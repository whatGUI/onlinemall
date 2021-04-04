import Toast from './Toast.vue';

const obj = {}

obj.install = function (Vue) {
  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 根据组件构造器创建一个组件对象
  const toast = new toastConstructor()
  // 将组件对象挂载到一个元素上
  toast.$mount(document.createElement('div'))
  // 将div添加进html
  document.body.appendChild(toast.$el)
  // 向原型中添加$toast
  Vue.prototype.$toast = toast
}

export default obj
