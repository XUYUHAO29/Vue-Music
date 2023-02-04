import _axios from "./_axios";

_axios.defaults.baseURL = "http://localhost:3000";
export default {
  async get(url, payload = {}, config) {
    try {
      let response;
      response = await _axios.get(
        url,
        Object.assign({ params: payload }),
        config
      );
      console.log(url, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async post(url, payload = {}, config) {
    try {
      let response;
      response = await _axios.post(
        url,
        Object.assign({ params: payload }),
        config
      );
      console.log(url, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async patch(url, payload = {}, config) {
    try {
      let response;
      response = await _axios.patch(
        url,
        Object.assign({ params: payload }),
        config
      );
      console.log(url, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async delete(url, payload = {}, config) {
    try {
      let response;
      response = await _axios.delete(
        url,
        Object.assign({ params: payload }),
        config
      );
      console.log(url, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async put(url, payload = {}, config) {
    try {
      let response;
      response = await _axios.put(
        url,
        Object.assign({ params: payload }),
        config
      );
      console.log(url, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
