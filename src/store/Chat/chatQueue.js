import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    CHAT QUEUE
  */
export const STORE_CHAT_QUEUE_REQUEST = "STORE_CHAT_QUEUE_REQUEST";
export const STORE_CHAT_QUEUE_SUCCESS = "STORE_CHAT_QUEUE_SUCCESS";
export const STORE_CHAT_QUEUE_FAIL = "STORE_CHAT_QUEUE_FAIL";
export const GET_CHAT_QUEUE_REQUEST = "GET_CHAT_QUEUE_REQUEST";
export const GET_CHAT_QUEUE_SUCCESS = "GET_CHAT_QUEUE_SUCCESS";
export const GET_CHAT_QUEUE_FAIL = "GET_CHAT_QUEUE_FAIL";
export const GET_SINGLE_CHAT_QUEUE_REQUEST = "GET_SINGLE_CHAT_QUEUE_REQUEST";
export const GET_SINGLE_CHAT_QUEUE_SUCCESS = "GET_SINGLE_CHAT_QUEUE_SUCCESS";
export const GET_SINGLE_CHAT_QUEUE_FAIL = "GET_SINGLE_CHAT_QUEUE_FAIL";
export const UPDATE_CHAT_QUEUE_REQUEST = "UPDATE_CHAT_QUEUE_REQUEST";
export const UPDATE_CHAT_QUEUE_SUCCESS = "UPDATE_CHAT_QUEUE_SUCCESS";
export const UPDATE_CHAT_QUEUE_FAIL = "UPDATE_CHAT_QUEUE_FAIL";
export const ADD_USER_TO_CHAT_QUEUE_REQUEST = "ADD_USER_TO_CHAT_QUEUE_REQUEST";
export const ADD_USER_TO_CHAT_QUEUE_SUCCESS = "ADD_USER_TO_CHAT_QUEUE_SUCCESS";
export const ADD_USER_TO_CHAT_QUEUE_FAIL = "ADD_USER_TO_CHAT_QUEUE_FAIL";
export const REMOVE_USER_FROM_CHAT_QUEUE_REQUEST =
  "REMOVE_USER_FROM_CHAT_QUEUE_REQUEST";
export const REMOVE_USER_FROM_CHAT_QUEUE_SUCCESS =
  "REMOVE_USER_FROM_CHAT_QUEUE_SUCCESS";
export const REMOVE_USER_FROM_CHAT_QUEUE_FAIL =
  "REMOVE_USER_FROM_CHAT_QUEUE_FAIL";
export const ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_REQUEST =
  "ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_REQUEST";
export const ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_SUCCESS =
  "ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_SUCCESS";
export const ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_FAIL =
  "ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_FAIL";
export const REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_REQUEST =
  "REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_REQUEST";
export const REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_SUCCESS =
  "REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_SUCCESS";
export const REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_FAIL =
  "REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_FAIL";
export const ACTIVATE_CHAT_QUEUE_REQUEST = "ACTIVATE_CHAT_QUEUE_REQUEST";
export const ACTIVATE_CHAT_QUEUE_SUCCESS = "ACTIVATE_CHAT_QUEUE_SUCCESS";
export const ACTIVATE_CHAT_QUEUE_FAIL = "ACTIVATE_CHAT_QUEUE_FAIL";
export const DEACTIVATE_CHAT_QUEUE_REQUEST = "DEACTIVATE_CHAT_QUEUE_REQUEST";
export const DEACTIVATE_CHAT_QUEUE_SUCCESS = "DEACTIVATE_CHAT_QUEUE_SUCCESS";
export const DEACTIVATE_CHAT_QUEUE_FAIL = "DEACTIVATE_CHAT_QUEUE_FAIL";

const state = {
  loadingChatQueue: false,
  successChatQueue: "",
  errorChatQueue: "",
  chatQueues: [],
  selectchatQueues: [],
  singlechatQueue: {},
};

const getters = {
  loadingChatQueue: (state) => state.loadingChatQueue,
  successChatQueue: (state) => state.successChatQueue,
  errorChatQueue: (state) => state.errorChatQueue,
  chatQueues: (state) => state.chatQueues,
  selectChatQueues: (state) => state.selectChatQueues,
  singleChatQueue: (state) => state.singleChatQueue,
};

const mutations = {
  /* 
    STORE CHAT QUEUE
  */
  [STORE_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [STORE_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [STORE_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    GET CHAT QUEUE
  */
  [GET_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [GET_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.chatQueues = payload;
    state.selectChatQueues = payload.map((chatQueue) => {
      return { label: chatQueue.name, value: chatQueue.id };
    });
  },
  [GET_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
        GET SINGLE CHAT QUEUE
      */
  [GET_SINGLE_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [GET_SINGLE_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.singleChatQueue = payload;
  },
  [GET_SINGLE_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    UPDATE CHAT QUEUE
  */
  [UPDATE_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [UPDATE_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [UPDATE_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    ADD_USER_TO_CHAT_QUEUE
  */
  [ADD_USER_TO_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [ADD_USER_TO_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [ADD_USER_TO_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    REMOVE USER FROM CHAT QUEUE
  */
  [REMOVE_USER_FROM_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [REMOVE_USER_FROM_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [REMOVE_USER_FROM_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    ADD AUTOREPLY MESSAGE TO CHAT QUEUE
  */
  [ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
  /* 
    REMOVE AUTOREPLY MESSAGE FROM CHAT QUEUE
  */
  [REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_REQUEST](state) {
    state.loadingChatQueue = true;
    state.errorChatQueue = "";
  },
  [REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_SUCCESS](state, payload) {
    state.loadingChatQueue = false;
    state.successChatQueue = payload.message;
  },
  [REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_FAIL](state, errorChatQueue) {
    state.loadingChatQueue = false;
    state.errorChatQueue = errorChatQueue;
  },
};

const actions = {
  /* 
    CREATE CHAT QUEUE
  */
  async createChatQueue({ commit, dispatch }, payload) {
    commit(STORE_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueues`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("create chat queue response", response.data);
        commit(STORE_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(STORE_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
      GET CHAT QUEUE
    */
  async getChatQueue({ commit }, payload) {
    commit(GET_CHAT_QUEUE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}chatQueues`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("get chat queue response", response.data);
        commit(GET_CHAT_QUEUE_SUCCESS, response.data);
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
          commit(GET_CHAT_QUEUE_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE CHAT QUEUE
    */
  async getSingleChatQueue({ commit }, payload) {
    commit(GET_SINGLE_CHAT_QUEUE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}chatQueues/${payload.chat_queue_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("get single chat queue response", response.data);
        commit(GET_SINGLE_CHAT_QUEUE_SUCCESS, response.data);
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
          commit(GET_SINGLE_CHAT_QUEUE_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE CHAT QUEUE
    */
  async updateChatQueue({ commit, dispatch }, payload) {
    commit(UPDATE_CHAT_QUEUE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}chatQueues/${payload.chat_queue_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("update chat queue response", response.data);
        commit(UPDATE_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(UPDATE_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
      ADD USER TO CHAT QUEUE
    */
  async addUserToChatQueue({ commit, dispatch }, payload) {
    commit(ADD_USER_TO_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/addUser`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add user to chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("add user to chat queue response", response.data);
        commit(ADD_USER_TO_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(ADD_USER_TO_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
      REMOVE USER FROM CHAT QUEUE
    */
  async removeUserFormoChatQueue({ commit, dispatch }, payload) {
    commit(REMOVE_USER_FROM_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/removeUser`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove user from chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("remove user from chat queue response", response.data);
        commit(REMOVE_USER_FROM_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(REMOVE_USER_FROM_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
      ADD AUTOREPLY MESSAGE TO CHAT QUEUE
    */
  async addAutoreplyMessageToChatQueue({ commit, dispatch }, payload) {
    commit(ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/add/Autoreply/message`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add autoreply message to chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add autoreply message to chat queue response",
          response.data
        );
        commit(ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(ADD_AUTOREPLY_MESSAGE_TO_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
      REMOVE AUTOREPLY MESSAGE FROM CHAT QUEUE
    */
  async removeAutoreplyMessageFormoChatQueue({ commit, dispatch }, payload) {
    commit(REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/remove/Autoreply/message`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove autoreply message from chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "remove autoreply message from chat queue response",
          response.data
        );
        commit(REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(
            REMOVE_AUTOREPLY_MESSAGE_FROM_CHAT_QUEUE_FAIL,
            error.response.data
          );
          dispatch("getChatQueue");
        }
      });
  },
  /* 
    ACTIVATE CHAT QUEUE
  */
  async activateChatQueue({ commit, dispatch }, payload) {
    commit(ACTIVATE_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/activate`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("activate chat queue response", response.data);
        commit(ACTIVATE_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(ACTIVATE_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
        }
      });
  },
  /* 
    DEACTIVATE CHAT QUEUE
  */
  async deactivateChatQueue({ commit, dispatch }, payload) {
    commit(DEACTIVATE_CHAT_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatQueue/deactivate`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("deactivate chat queue config", config);

    axios(config)
      .then(function (response) {
        console.log("deactivate chat queue response", response.data);
        commit(DEACTIVATE_CHAT_QUEUE_SUCCESS, response.data);
        dispatch("getChatQueue");
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
          commit(DEACTIVATE_CHAT_QUEUE_FAIL, error.response.data);
          dispatch("getChatQueue");
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
