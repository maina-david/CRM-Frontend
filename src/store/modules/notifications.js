import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const ALL_NOTIFICATIONS_REQUEST = "ALL_NOTIFICATIONS_REQUEST";
export const ALL_NOTIFICATIONS_SUCCESS = "ALL_NOTIFICATIONS_SUCCESS";
export const ALL_NOTIFICATIONS_FAIL = "ALL_NOTIFICATIONS_FAIL";
export const UNREAD_NOTIFICATIONS_REQUEST = "UNREAD_NOTIFICATIONS_REQUEST";
export const UNREAD_NOTIFICATIONS_SUCCESS = "UNREAD_NOTIFICATIONS_SUCCESS";
export const UNREAD_NOTIFICATIONS_FAIL = "UNREAD_NOTIFICATIONS_FAIL";
export const MARK_AS_READ_REQUEST = "MARK_AS_READ_REQUEST";
export const MARK_AS_READ_SUCCESS = "MARK_AS_READ_SUCCESS";
export const MARK_AS_READ_FAIL = "MARK_AS_READ_FAIL";
export const CLEAR_NOTIFICATIONS_REQUEST = "CLEAR_NOTIFICATIONS_REQUEST";
export const CLEAR_NOTIFICATIONS_SUCCESS = "CLEAR_NOTIFICATIONS_SUCCESS";
export const CLEAR_NOTIFICATIONS_FAIL = "CLEAR_NOTIFICATIONS_FAIL";

const state = {
  loadingNotifications: false,
  successNotifications: "",
  errorNotifications: "",
  notifications: [],
};

const getters = {
  loadingNotifications: (state) => state.loadingNotifications,
  successNotifications: (state) => state.successNotifications,
  errorNotifications: (state) => state.errorNotifications,
  notifications: (state) => state.notifications,
};

const mutations = {
  /* 
    ALL NOTIFICATIONS
  */
  [ALL_NOTIFICATIONS_REQUEST](state) {
    state.loadingNotifications = true;
    state.errorNotifications = "";
  },
  [ALL_NOTIFICATIONS_SUCCESS](state, payload) {
    state.loadingNotifications = false;
    state.notifications = payload;
  },
  [ALL_NOTIFICATIONS_FAIL](state, errorNotifications) {
    state.loadingNotifications = false;
    state.errorNotifications = errorNotifications;
  },
  /* 
    UNREAD NOTIFICATIONS
  */
  [UNREAD_NOTIFICATIONS_REQUEST](state) {
    state.loadingNotifications = true;
    state.errorNotifications = "";
  },
  [UNREAD_NOTIFICATIONS_SUCCESS](state, payload) {
    state.loadingNotifications = false;
    state.notifications = payload;
  },
  [UNREAD_NOTIFICATIONS_FAIL](state, errorNotifications) {
    state.loadingNotifications = false;
    state.errorNotifications = errorNotifications;
  },
  /* 
    MARK AS READ
  */
  [MARK_AS_READ_REQUEST](state) {
    state.loadingNotifications = true;
    state.errorNotifications = "";
  },
  [MARK_AS_READ_SUCCESS](state, payload) {
    state.loadingNotifications = false;
    state.successNotifications = payload.message;
  },
  [MARK_AS_READ_FAIL](state, errorNotifications) {
    state.loadingNotifications = false;
    state.errorNotifications = errorNotifications;
  },
  /* 
    CLEAR NOTIFICATIONS
  */
  [CLEAR_NOTIFICATIONS_REQUEST](state) {
    state.loadingNotifications = true;
    state.errorNotifications = "";
  },
  [CLEAR_NOTIFICATIONS_SUCCESS](state, payload) {
    state.loadingNotifications = false;
    state.successNotifications = payload.message;
  },
  [CLEAR_NOTIFICATIONS_FAIL](state, errorNotifications) {
    state.loadingNotifications = false;
    state.errorNotifications = errorNotifications;
  },
};

const actions = {
  /* 
    ALL NOTIFICATIONS 
  */
  async getAllNotifications({ commit }, payload) {
    commit(ALL_NOTIFICATIONS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}notification/get_allNotifications`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ALL_NOTIFICATIONS_SUCCESS, response.data);
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
          commit(ALL_NOTIFICATIONS_FAIL, error.response.data);
        }
      });
  },
  /* 
    UNREAD NOTIFICATIONS 
  */
  async getUnreadNotifications({ commit }, payload) {
    commit(UNREAD_NOTIFICATIONS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}notification/get_unreadNotifications`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(UNREAD_NOTIFICATIONS_SUCCESS, response.data);
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
          commit(UNREAD_NOTIFICATIONS_FAIL, error.response.data);
        }
      });
  },
  /* 
    MARK AS READ 
  */
  async markAsRead({ commit, dispatch }, payload) {
    commit(MARK_AS_READ_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}notification/mark_as_read`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        console.log("mark as read response", response);
        commit(MARK_AS_READ_SUCCESS, response.data);
        dispatch("getUnreadNotifications");
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
          commit(MARK_AS_READ_FAIL, error.response.data);
          dispatch("getUnreadNotifications");
        }
      });
  },
  /* 
    CLEAR NOTIFICATIONS
  */
  async clearNotifications({ commit, dispatch }, payload) {
    commit(CLEAR_NOTIFICATIONS_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}notification/clear_notification`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("clear notifications config", config);

    axios(config)
      .then(function (response) {
        console.log("clear notifications response", response);
        commit(CLEAR_NOTIFICATIONS_SUCCESS, response.data);
        dispatch("getUnreadNotifications");
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
          commit(CLEAR_NOTIFICATIONS_FAIL, error.response.data);
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
