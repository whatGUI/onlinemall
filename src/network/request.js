import axios from "axios";

let mainURL = process.env.VUE_APP_MAIN_URL;
let baseURL = process.env.VUE_APP_API_URL;

export function autoSwitchBaseURL() {
  if (document.location.origin !== mainURL) {
    baseURL = process.env.VUE_APP_API_URL_RESERVE;
  }
}

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: baseURL,

    timeout: 10000
  });

  //发送真正的网络请求
  return instance(config);
}
