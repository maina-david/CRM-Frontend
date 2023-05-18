import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAIL = "USERS_FAIL";
export const USERS_DEACTIVATE_REQUEST = "USERS_DEACTIVATE_REQUEST";
export const USERS_DEACTIVATE_SUCCESS = "USERS_DEACTIVATE_SUCCESS";
export const USERS_DEACTIVATE_FAIL = "USERS_DEACTIVATE_FAIL";
// export const USERS_DEACTIVATE_RESET = "USERS_DEACTIVATE_RESET";
export const EDIT_CURRENT_USER_REQUEST = "EDIT_CURRENT_USER_REQUEST";
export const EDIT_CURRENT_USER_SUCCESS = "EDIT_CURRENT_USER_SUCCESS";
export const EDIT_CURRENT_USER_FAIL = "EDIT_CURRENT_USER_FAIL";

const state = {
  loadingUsers: false,
  successUsers: "",
  errorUsers: "",
  users: [],
  selectUsers: [],
};

const getters = {
  loadingUsers: (state) => state.loadingUsers,
  successUsers: (state) => state.successUsers,
  errorUsers: (state) => state.errorUsers,
  users: (state) => state.users,
  selectUsers: (state) => state.selectUsers,
};

const mutations = {
  /* 
    USERS INFO
  */
  [USERS_REQUEST](state) {
    state.loadingUsers = true;
    state.errorUsers = "";
  },
  [USERS_SUCCESS](state, payload) {
    state.loadingUsers = false;
    state.users = payload;
    state.selectUsers = payload.map((user) => {
      return { label: user.name, value: user.id };
    });
  },
  [USERS_FAIL](state, errorUsers) {
    state.loadingUsers = false;
    state.errorUsers = errorUsers;
  },
  /* 
    USERS DEACTIVATE
  */
  [USERS_DEACTIVATE_REQUEST](state) {
    state.loadingUsers = true;
    state.successUsers = "";
    state.errorUsers = "";
  },
  [USERS_DEACTIVATE_SUCCESS](state, payload) {
    state.loadingUsers = false;
    state.successUsers = payload.message;
  },
  [USERS_DEACTIVATE_FAIL](state, errorUsers) {
    state.loadingUsers = false;
    state.errorUsers = errorUsers;
  },
  /* 
    EDIT CURRENT USER
  */
  [EDIT_CURRENT_USER_REQUEST](state) {
    state.loadingUsers = true;
    state.successUsers = "";
    state.errorUsers = "";
  },
  [EDIT_CURRENT_USER_SUCCESS](state, payload) {
    state.loadingUsers = false;
    state.successUsers = payload.message;
    localStorage.setItem("username", payload.name);
    localStorage.setItem("email", payload.email);
    localStorage.setItem("phone_number", payload.phone_number);
  },
  [EDIT_CURRENT_USER_FAIL](state, errorUsers) {
    state.loadingUsers = false;
    state.errorUsers = errorUsers;
  },
};

const actions = {
  /* 
    USERS INFO 
  */
  async getUsers({ commit }, payload) {
    commit(USERS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/all_users`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(USERS_SUCCESS, response.data);
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
          commit(USERS_FAIL, error.response.data);
        }
      });
  },
  /* 
    USERS DEACTIVATE 
  */
  async deactivateUser({ commit, dispatch }, payload) {
    commit(USERS_DEACTIVATE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/activate_deactivate_user`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        console.log("deactivate user", response);
        commit(USERS_DEACTIVATE_SUCCESS, response.data);
        dispatch("getUsers");
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
          commit(USERS_DEACTIVATE_FAIL, error.response.data);
          dispatch("getUsers");
        }
      });
  },
  /* 
    EDIT CURRENT USER
  */
  async editCurrentUser({ commit }, payload) {
    commit(EDIT_CURRENT_USER_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/change_user_information`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("edit current user config", config);

    axios(config)
      .then(function (response) {
        console.log("edit current user response", response);
        commit(EDIT_CURRENT_USER_SUCCESS, response.data.user);
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
          commit(EDIT_CURRENT_USER_FAIL, error.response.data);
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
