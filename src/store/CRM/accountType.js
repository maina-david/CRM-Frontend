import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_ACCOUNT_TYPE_REQUEST = "CREATE_ACCOUNT_TYPE_REQUEST";
export const CREATE_ACCOUNT_TYPE_SUCCESS = "CREATE_ACCOUNT_TYPE_SUCCESS";
export const CREATE_ACCOUNT_TYPE_FAIL = "CREATE_ACCOUNT_TYPE_FAIL";
export const EDIT_ACCOUNT_TYPE_REQUEST = "EDIT_ACCOUNT_TYPE_REQUEST";
export const EDIT_ACCOUNT_TYPE_SUCCESS = "EDIT_ACCOUNT_TYPE_SUCCESS";
export const EDIT_ACCOUNT_TYPE_FAIL = "EDIT_ACCOUNT_TYPE_FAIL";
export const DISABLE_ACCOUNT_TYPE_REQUEST = "DISABLE_ACCOUNT_TYPE_REQUEST";
export const DISABLE_ACCOUNT_TYPE_SUCCESS = "DISABLE_ACCOUNT_TYPE_SUCCESS";
export const DISABLE_ACCOUNT_TYPE_FAIL = "DISABLE_ACCOUNT_TYPE_FAIL";
export const VERIFY_IDS_REQUEST = "VERIFY_IDS_REQUEST";
export const VERIFY_IDS_SUCCESS = "VERIFY_IDS_SUCCESS";
export const VERIFY_IDS_FAIL = "VERIFY_IDS_FAIL";
export const GET_ACCOUNT_TYPE_REQUEST = "GET_ACCOUNT_TYPE_REQUEST";
export const GET_ACCOUNT_TYPE_SUCCESS = "GET_ACCOUNT_TYPE_SUCCESS";
export const GET_ACCOUNT_TYPE_FAIL = "GET_ACCOUNT_TYPE_FAIL";
export const ASSIGN_ACCOUNT_TO_GROUP_REQUEST =
  "ASSIGN_ACCOUNT_TO_GROUP_REQUEST";
export const ASSIGN_ACCOUNT_TO_GROUP_SUCCESS =
  "ASSIGN_ACCOUNT_TO_GROUP_SUCCESS";
export const ASSIGN_ACCOUNT_TO_GROUP_FAIL = "ASSIGN_ACCOUNT_TO_GROUP_FAIL";
export const REMOVE_GROUP_ACCOUNT_TYPE_REQUEST =
  "REMOVE_GROUP_ACCOUNT_TYPE_REQUEST";
export const REMOVE_GROUP_ACCOUNT_TYPE_SUCCESS =
  "REMOVE_GROUP_ACCOUNT_TYPE_SUCCESS";
export const REMOVE_GROUP_ACCOUNT_TYPE_FAIL = "REMOVE_GROUP_ACCOUNT_TYPE_FAIL";

const state = {
  loadingAccountTypes: false,
  successAccountTypes: "",
  errorAccountTypes: "",
  accountTypes: [],
  selectAccountTypes: [],
};

const getters = {
  loadingAccountTypes: (state) => state.loadingAccountTypes,
  successAccountTypes: (state) => state.successAccountTypes,
  errorAccountTypes: (state) => state.errorAccountTypes,
  accountTypes: (state) => state.accountTypes,
  selectAccountTypes: (state) => state.selectAccountTypes,
};

const mutations = {
  /* 
    CREATE ACCOUNT TYPES
  */
  [CREATE_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [CREATE_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [CREATE_ACCOUNT_TYPE_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
    EDIT ACCOUNT TYPES
  */
  [EDIT_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [EDIT_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [EDIT_ACCOUNT_TYPE_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
    DISABLE ACCOUNT TYPES
  */
  [DISABLE_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [DISABLE_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [DISABLE_ACCOUNT_TYPE_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
   VERIFY IDS
  */
  [VERIFY_IDS_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [VERIFY_IDS_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [VERIFY_IDS_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
   GET ACCOUNT TYPE
  */
  [GET_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [GET_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.accountTypes = payload;
    state.selectAccountTypes = payload.map((type) => {
      return { label: type.name, value: type.id };
    });
  },
  [GET_ACCOUNT_TYPE_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
   ASSIGN ACCOUNT TO GROUP
  */
  [ASSIGN_ACCOUNT_TO_GROUP_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [ASSIGN_ACCOUNT_TO_GROUP_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [ASSIGN_ACCOUNT_TO_GROUP_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
  /* 
   REMOVE GROUP ACCOUNT TYPE
  */
  [REMOVE_GROUP_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountTypes = true;
    state.errorAccountTypes = "";
  },
  [REMOVE_GROUP_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountTypes = false;
    state.successAccountTypes = payload.message;
  },
  [REMOVE_GROUP_ACCOUNT_TYPE_FAIL](state, errorAccountTypes) {
    state.loadingAccountTypes = false;
    state.errorAccountTypes = errorAccountTypes;
  },
};

const actions = {
  /* 
    CREATE ACCOUNT TYPE
  */
  async createAccountType({ commit, dispatch }, payload) {
    commit(CREATE_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/create_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create account type config", config);

    axios(config)
      .then(function (response) {
        console.log("create account type response", response.data);
        commit(CREATE_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(CREATE_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    EDIT ACCOUNT TYPES
  */
  async editAccountType({ commit, dispatch }, payload) {
    commit(EDIT_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/edit_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("EDIT account type config", config);

    axios(config)
      .then(function (response) {
        console.log("EDIT account type response", response.data);
        commit(EDIT_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(EDIT_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    DISABLE ACCOUNT TYPES
  */
  async disableAccountType({ commit, dispatch }, payload) {
    commit(DISABLE_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/disable_accounttype`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("DISABLE account type config", config);

    axios(config)
      .then(function (response) {
        console.log("DISABLE account type response", response.data);
        commit(DISABLE_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(DISABLE_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    VERIFY IDS
  */
  async verifyIds({ commit, dispatch }, payload) {
    commit(VERIFY_IDS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/verify_ids`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("verify ids config", config);

    axios(config)
      .then(function (response) {
        console.log("verify ids response", response.data);
        commit(VERIFY_IDS_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(VERIFY_IDS_FAIL, error.response.data);
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    GET ACCOUNT TYPE 
  */
  async getAccountTypes({ commit }, payload) {
    commit(GET_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account type  config", config);

    axios(config)
      .then(function (response) {
        console.log("get account type response", response.data);
        commit(GET_ACCOUNT_TYPE_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_TYPE_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN ACCOUNT TO GROUP
  */
  async assignAccountToGroup({ commit, dispatch }, payload) {
    commit(ASSIGN_ACCOUNT_TO_GROUP_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/assign_account_to_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign account to group config", config);

    axios(config)
      .then(function (response) {
        console.log("assign account to group response", response.data);
        commit(ASSIGN_ACCOUNT_TO_GROUP_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(ASSIGN_ACCOUNT_TO_GROUP_FAIL, error.response.data);
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    REMOVE GROUP ACCOUNT TYPE
  */
  async removeGroupAccountType({ commit, dispatch }, payload) {
    commit(REMOVE_GROUP_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}account/remove_group_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove group accoumt type config", config);

    axios(config)
      .then(function (response) {
        console.log("remove group accoumt type response", response.data);
        commit(REMOVE_GROUP_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountTypes");
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
          commit(REMOVE_GROUP_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getAccountTypes");
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
