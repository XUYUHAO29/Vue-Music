import aioxs from "axios";

const aioxsRequests = aioxs.create({
  timeout: 6000000,
  withCredentials: true,

});
// 请求拦截器
aioxsRequests.interceptors.request.use(
  function (config) {
    // config.headers["cookie"] = localStorage.getItem("Cookie")
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default aioxsRequests;
