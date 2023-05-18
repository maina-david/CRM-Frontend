import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    META ACCESS TOKEN
  */
export const CREATE_META_ACCESS_TOKEN_REQUEST =
  "CREATE_META_ACCESS_TOKEN_REQUEST";
export const CREATE_META_ACCESS_TOKEN_SUCCESS =
  "CREATE_META_ACCESS_TOKEN_SUCCESS";
export const CREATE_META_ACCESS_TOKEN_FAIL = "CREATE_META_ACCESS_TOKEN_FAIL";
export const GET_META_ACCESS_TOKEN_REQUEST = "GET_META_ACCESS_TOKEN_REQUEST";
export const GET_META_ACCESS_TOKEN_SUCCESS = "GET_META_ACCESS_TOKEN_SUCCESS";
export const GET_META_ACCESS_TOKEN_FAIL = "GET_META_ACCESS_TOKEN_FAIL";
export const GET_SINGLE_META_ACCESS_TOKEN_REQUEST =
  "GET_SINGLE_META_ACCESS_TOKEN_REQUEST";
export const GET_SINGLE_META_ACCESS_TOKEN_SUCCESS =
  "GET_SINGLE_META_ACCESS_TOKEN_SUCCESS";
export const GET_SINGLE_META_ACCESS_TOKEN_FAIL =
  "GET_SINGLE_META_ACCESS_TOKEN_FAIL";
export const UPDATE_META_ACCESS_TOKEN_REQUEST =
  "UPDATE_META_ACCESS_TOKEN_REQUEST";
export const UPDATE_META_ACCESS_TOKEN_SUCCESS =
  "UPDATE_META_ACCESS_TOKEN_SUCCESS";
export const UPDATE_META_ACCESS_TOKEN_FAIL = "UPDATE_META_ACCESS_TOKEN_FAIL";
export const DELETE_META_ACCESS_TOKEN_REQUEST =
  "DELETE_META_ACCESS_TOKEN_REQUEST";
export const DELETE_META_ACCESS_TOKEN_SUCCESS =
  "DELETE_META_ACCESS_TOKEN_SUCCESS";
export const DELETE_META_ACCESS_TOKEN_FAIL = "DELETE_META_ACCESS_TOKEN_FAIL";

const state = {
  loadingMetaAccessToken: false,
  successMetaAccessToken: "",
  errorMetaAccessToken: "",
  metaAccessTokens: [],
  selectMetaAccessTokens: [],
  singleMetaAccessToken: {},
};

const getters = {
  loadingMetaAccessToken: (state) => state.loadingMetaAccessToken,
  successMetaAccessToken: (state) => state.successMetaAccessToken,
  errorMetaAccessToken: (state) => state.errorMetaAccessToken,
  metaAccessTokens: (state) => state.metaAccessTokens,
  singleMetaAccessToken: (state) => state.singleMetaAccessToken,
};

const mutations = {
  /* 
    CREATE META ACCESS TOKEN
  */
  [CREATE_META_ACCESS_TOKEN_REQUEST](state) {
    state.loadingMetaAccessToken = true;
    state.errorMetaAccessToken = "";
  },
  [CREATE_META_ACCESS_TOKEN_SUCCESS](state, payload) {
    state.loadingMetaAccessToken = false;
    state.successMetaAccessToken = payload.message;
  },
  [CREATE_META_ACCESS_TOKEN_FAIL](state, errorMetaAccessToken) {
    state.loadingMetaAccessToken = false;
    state.errorMetaAccessToken = errorMetaAccessToken;
  },
  /* 
    GET META ACCESS TOKEN
  */
  [GET_META_ACCESS_TOKEN_REQUEST](state) {
    state.loadingMetaAccessToken = true;
    state.errorMetaAccessToken = "";
  },
  [GET_META_ACCESS_TOKEN_SUCCESS](state, payload) {
    state.loadingMetaAccessToken = false;
    state.metaAccessTokens = payload;
    state.selectMetaAccessTokens = payload.map((metaAccessToken) => {
      return { label: metaAccessToken.name, value: metaAccessToken.id };
    });
  },
  [GET_META_ACCESS_TOKEN_FAIL](state, errorMetaAccessToken) {
    state.loadingMetaAccessToken = false;
    state.errorMetaAccessToken = errorMetaAccessToken;
  },
  /* 
        GET SINGLE META ACCESS TOKEN
      */
  [GET_SINGLE_META_ACCESS_TOKEN_REQUEST](state) {
    state.loadingMetaAccessToken = true;
    state.errorMetaAccessToken = "";
  },
  [GET_SINGLE_META_ACCESS_TOKEN_SUCCESS](state, payload) {
    state.loadingMetaAccessToken = false;
    state.singleMetaAccessToken = payload;
  },
  [GET_SINGLE_META_ACCESS_TOKEN_FAIL](state, errorMetaAccessToken) {
    state.loadingMetaAccessToken = false;
    state.errorMetaAccessToken = errorMetaAccessToken;
  },
  /* 
    UPDATE META ACCESS TOKEN
  */
  [UPDATE_META_ACCESS_TOKEN_REQUEST](state) {
    state.loadingMetaAccessToken = true;
    state.errorMetaAccessToken = "";
  },
  [UPDATE_META_ACCESS_TOKEN_SUCCESS](state, payload) {
    state.loadingMetaAccessToken = false;
    state.successMetaAccessToken = payload.message;
  },
  [UPDATE_META_ACCESS_TOKEN_FAIL](state, errorMetaAccessToken) {
    state.loadingMetaAccessToken = false;
    state.errorMetaAccessToken = errorMetaAccessToken;
  },
  /* 
    DELETE META ACCESS TOKEN
  */
  [DELETE_META_ACCESS_TOKEN_REQUEST](state) {
    state.loadingMetaAccessToken = true;
    state.errorMetaAccessToken = "";
  },
  [DELETE_META_ACCESS_TOKEN_SUCCESS](state, payload) {
    state.loadingMetaAccessToken = false;
    state.metaAccessTokens = payload;
    state.selectMetaAccessTokens = payload.map((metaAccessToken) => {
      return { label: metaAccessToken.name, value: metaAccessToken.id };
    });
  },
  [DELETE_META_ACCESS_TOKEN_FAIL](state, errorMetaAccessToken) {
    state.loadingMetaAccessToken = false;
    state.errorMetaAccessToken = errorMetaAccessToken;
  },
};

const actions = {
  /* 
    CREATE META ACCESS TOKEN
  */
  async createMetaAccessToken({ commit, dispatch }, payload) {
    commit(CREATE_META_ACCESS_TOKEN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}meta/accessTokens`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create meta access token config", config);

    axios(config)
      .then(function (response) {
        console.log("create meta access token response", response.data);
        commit(CREATE_META_ACCESS_TOKEN_SUCCESS, response.data);
        dispatch("getMetaAccessToken");
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("auth/LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(CREATE_META_ACCESS_TOKEN_FAIL, error.response.data);
          dispatch("getMetaAccessToken");
        }
      });
  },
  /* 
      GET META ACCESS TOKEN
    */
  async getMetaAccessToken({ commit }, payload) {
    commit(GET_META_ACCESS_TOKEN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}meta/accessToken`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get meta access token config", config);

    axios(config)
      .then(function (response) {
        console.log("get meta access token response", response.data);
        commit(GET_META_ACCESS_TOKEN_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("auth/LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(GET_META_ACCESS_TOKEN_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE META ACCESS TOKEN
    */
  async getSingleMetaAccessToken({ commit }, payload) {
    commit(GET_SINGLE_META_ACCESS_TOKEN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}meta/accessToken`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single meta access token config", config);

    axios(config)
      .then(function (response) {
        console.log("get single meta access token response", response.data);
        commit(GET_SINGLE_META_ACCESS_TOKEN_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("auth/LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(GET_SINGLE_META_ACCESS_TOKEN_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE META ACCESS TOKEN
    */
  async updateMetaAccessToken({ commit, dispatch }, payload) {
    commit(UPDATE_META_ACCESS_TOKEN_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}meta/accessToken/${payload.meta_access_token_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update meta access token config", config);

    axios(config)
      .then(function (response) {
        console.log("update meta access token response", response.data);
        commit(UPDATE_META_ACCESS_TOKEN_SUCCESS, response.data);
        dispatch("getMetaAccessToken");
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("auth/LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(UPDATE_META_ACCESS_TOKEN_FAIL, error.response.data);
          dispatch("getMetaAccessToken");
        }
      });
  },
  /* 
      DELETE META ACCESS TOKEN
    */
  async deleteMetaAccessToken({ commit, dispatch }, payload) {
    commit(DELETE_META_ACCESS_TOKEN_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}meta/accessToken/${payload.meta_access_token_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete meta access token config", config);

    axios(config)
      .then(function (response) {
        console.log("delete meta access token response", response.data);
        commit(DELETE_META_ACCESS_TOKEN_SUCCESS, response.data);
        dispatch("getMetaAccessToken");
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("auth/LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(DELETE_META_ACCESS_TOKEN_FAIL, error.response.data);
          dispatch("getMetaAccessToken");
        }
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV != "production",
};
