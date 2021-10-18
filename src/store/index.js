/* eslint-disable no-unused-vars */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.interceptors.response.use(
  (response) => {
    return response && response.data;
  },
  (error) => {
    if (
      error &&
      error.response &&
      error.response.data.message === "Unauthorized!"
    ) {
      this.$toasted.error("Token expired", {
        theme: "bubble",
        position: "top-right",
        duration: 4000,
      });
      window.location = "/login";
    } else {
      return error.response && error.response.data;
    }
  }
);

export const store = new Vuex.Store({
  state: {
    layout: "auth-layout",
    products: {},
    productDetails: {},
    categories: [],
  },

  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload;
    },
    products(state, value) {
      state.products = value;
    },
    categories(state, value) {
      state.categories = value;
    },
    productDetails(state, value) {
      state.productDetails = value;
    },
  },
  getters: {
    layout(state) {
      return state.layout;
    },
    products(state) {
      return state.products ? state.products : [];
    },
    categories(state) {
      return state.categories;
    },
    productDetails(state) {
      return state.productDetails ? state.productDetails : {};
    },
  },

  actions: {
    // Lists all products
    async products({ commit }, data) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/products?skip=${data.skip}`, data,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        commit("products", response);
      } catch (error) {
        return error;
      }
    },

    // Add's product
    addProduct({ commit }, data) {
      try {
        const response = axios.post("http://localhost:8080/api/products/add", data, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    },

    // Edit's a product
    async editProduct({ commit }, data) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/products/${data.id}`,
          data,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        return response;
      } catch (error) {
        return error;
      }
    },

    // Delete's a product
    async deleteProduct({ commit }, data) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/products/${data.id}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        return response;
      } catch (error) {
        return error;
      }
    },

    // Lists all categories
    async getCategoryList({ commit }) {
      try {
        const response = await axios.get("http://localhost:8080/api/category", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        commit("categories", response);
        return response;
      } catch (error) {
        return error;
      }
    },

    // Gets product details
    async getProductDetails({ commit }, data) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${data.id}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        commit("productDetails", response);
      } catch (error) {
        return error;
      }
    },

    // Registers user
    async register({ commit }, data) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/auth/signup`,
          data,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        return response;
      } catch (error) {
        return error;
      }
    },

    // User Login
    async login({ commit }, data) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/auth/signin`,
          data,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        console;
        localStorage.setItem("token", response.data.accessToken);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
});
