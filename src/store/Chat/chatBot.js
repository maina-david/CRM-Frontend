import router from "@/router";
import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_CHAT_BOT_REQUEST = "CREATE_CHAT_BOT_REQUEST";
export const CREATE_CHAT_BOT_SUCCESS = "CREATE_CHAT_BOT_SUCCESS";
export const CREATE_CHAT_BOT_FAIL = "CREATE_CHAT_BOT_FAIL";
export const GET_CHAT_BOT_REQUEST = "GET_CHAT_BOT_REQUEST";
export const GET_CHAT_BOT_SUCCESS = "GET_CHAT_BOT_SUCCESS";
export const GET_CHAT_BOT_FAIL = "GET_CHAT_BOT_FAIL";
export const UPDATE_CHAT_BOT_REQUEST = "UPDATE_CHAT_BOT_REQUEST";
export const UPDATE_CHAT_BOT_SUCCESS = "UPDATE_CHAT_BOT_SUCCESS";
export const UPDATE_CHAT_BOT_FAIL = "UPDATE_CHAT_BOT_FAIL";
export const CREATE_CHAT_BOT_FLOW_REQUEST = "CREATE_CHAT_BOT_FLOW_REQUEST";
export const CREATE_CHAT_BOT_FLOW_SUCCESS = "CREATE_CHAT_BOT_FLOW_SUCCESS";
export const CREATE_CHAT_BOT_FLOW_FAIL = "CREATE_CHAT_BOT_FLOW_FAIL";
export const LINK_CHAT_BOT_TO_ACCOUNT_REQUEST =
  "LINK_CHAT_BOT_TO_ACCOUNT_REQUEST";
export const LINK_CHAT_BOT_TO_ACCOUNT_SUCCESS =
  "LINK_CHAT_BOT_TO_ACCOUNT_SUCCESS";
export const LINK_CHAT_BOT_TO_ACCOUNT_FAIL = "LINK_CHAT_BOT_TO_ACCOUNT_FAIL";
export const GET_LINKED_CHAT_BOT_ACCOUNTS_REQUEST =
  "GET_LINKED_CHAT_BOT_ACCOUNTS_REQUEST";
export const GET_LINKED_CHAT_BOT_ACCOUNTS_SUCCESS =
  "GET_LINKED_CHAT_BOT_ACCOUNTS_SUCCESS";
export const GET_LINKED_CHAT_BOT_ACCOUNTS_FAIL =
  "GET_LINKED_CHAT_BOT_ACCOUNTS_FAIL";
export const GET_CHAT_BOT_JSON_REQUEST = "GET_CHAT_BOT_JSON_REQUEST";
export const GET_CHAT_BOT_JSON_SUCCESS = "GET_CHAT_BOT_JSON_SUCCESS";
export const GET_CHAT_BOT_JSON_FAIL = "GET_CHAT_BOT_JSON_FAIL";
export const UPLOAD_CHAT_BOT_FILES_REQUEST = "UPLOAD_CHAT_BOT_FILES_REQUEST";
export const UPLOAD_CHAT_BOT_FILES_SUCCESS = "UPLOAD_CHAT_BOT_FILES_SUCCESS";
export const UPLOAD_CHAT_BOT_FILES_FAIL = "UPLOAD_CHAT_BOT_FILES_FAIL";
export const GET_CHAT_BOT_FILES_REQUEST = "GET_CHAT_BOT_FILES_REQUEST";
export const GET_CHAT_BOT_FILES_SUCCESS = "GET_CHAT_BOT_FILES_SUCCESS";
export const GET_CHAT_BOT_FILES_FAIL = "GET_CHAT_BOT_FILES_FAIL";
export const DELETE_CHAT_BOT_FILES_REQUEST = "DELETE_CHAT_BOT_FILES_REQUEST";
export const DELETE_CHAT_BOT_FILES_SUCCESS = "DELETE_CHAT_BOT_FILES_SUCCESS";
export const DELETE_CHAT_BOT_FILES_FAIL = "DELETE_CHAT_BOT_FILES_FAIL";
export const FILTER_ACCOUNTS_BY_CHANNEL_REQUEST =
  "FILTER_ACCOUNTS_BY_CHANNEL_REQUEST";
export const FILTER_ACCOUNTS_BY_CHANNEL_SUCCESS =
  "FILTER_ACCOUNTS_BY_CHANNEL_SUCCESS";
export const FILTER_ACCOUNTS_BY_CHANNEL_FAIL =
  "FILTER_ACCOUNTS_BY_CHANNEL_FAIL";

const state = {
  loadingChatBot: false,
  successChatBot: "",
  errorChatBot: "",
  chatBots: [],
  selectChatBots: [],
  chatBotFiles: [],
  selectChatBotFiles: [],
  linkedChatBotAccounts: [],
  chatBotJson: {},
  filteredAccounts: {},
  selectFilteredAccounts: [],
};

const getters = {
  loadingChatBot: (state) => state.loadingChatBot,
  successChatBot: (state) => state.successChatBot,
  errorChatBot: (state) => state.errorChatBot,
  chatBots: (state) => state.chatBots,
  selectChatBots: (state) => state.selectChatBots,
  chatBotFiles: (state) => state.chatBotFiles,
  selectChatBotFiles: (state) => state.selectChatBotFiles,
  linkedChatBotAccounts: (state) => state.linkedChatBotAccounts,
  chatBotJson: (state) => state.chatBotJson,
  filteredAccounts: (state) => state.filteredAccounts,
  selectFilteredAccounts: (state) => state.selectFilteredAccounts,
};

const mutations = {
  /* 
    CREATE CHAT BOT
  */
  [CREATE_CHAT_BOT_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [CREATE_CHAT_BOT_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload.message;
  },
  [CREATE_CHAT_BOT_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
    GET CHAT BOT 
  */
  [GET_CHAT_BOT_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [GET_CHAT_BOT_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.chatBots = payload.chatbot;
    state.selectChatBots = payload.chatbot.map((chatBot) => {
      return { label: chatBot.name, value: chatBot.id };
    });
  },
  [GET_CHAT_BOT_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
        UPDATE CHAT BOT
      */
  [UPDATE_CHAT_BOT_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [UPDATE_CHAT_BOT_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload;
  },
  [UPDATE_CHAT_BOT_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
   CREATE CHAT BOT FLOW
  */
  [CREATE_CHAT_BOT_FLOW_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [CREATE_CHAT_BOT_FLOW_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload.message;
  },
  [CREATE_CHAT_BOT_FLOW_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
    LINK CHAT BOT TO ACCOUNT
  */
  [LINK_CHAT_BOT_TO_ACCOUNT_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [LINK_CHAT_BOT_TO_ACCOUNT_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload.message;
  },
  [LINK_CHAT_BOT_TO_ACCOUNT_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
    GET LINKED CHAT BOT ACCOUNTS
  */
  [GET_LINKED_CHAT_BOT_ACCOUNTS_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [GET_LINKED_CHAT_BOT_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.linkedChatBotAccounts = payload;
  },
  [GET_LINKED_CHAT_BOT_ACCOUNTS_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
    GET CHAT BOT JSON
  */
  [GET_CHAT_BOT_JSON_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [GET_CHAT_BOT_JSON_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.chatBotJson = payload;
  },
  [GET_CHAT_BOT_JSON_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
   UPLOAD CHAT BOT FILES
  */
  [UPLOAD_CHAT_BOT_FILES_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [UPLOAD_CHAT_BOT_FILES_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload.message;
  },
  [UPLOAD_CHAT_BOT_FILES_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
    GET CHAT BOT FILES
  */
  [GET_CHAT_BOT_FILES_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [GET_CHAT_BOT_FILES_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.chatBotFiles = payload;
    state.selectChatBotFiles = payload.map((chatBot) => {
      return { label: chatBot.name, value: chatBot.id };
    });
  },
  [GET_CHAT_BOT_FILES_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
  /* 
   DELETE CHAT BOT FILES
  */
  [DELETE_CHAT_BOT_FILES_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [DELETE_CHAT_BOT_FILES_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.successChatBot = payload.message;
  },
  [DELETE_CHAT_BOT_FILES_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },

  /* 
    FILTER ACCOUNTS BY CHANNEL
  */
  [FILTER_ACCOUNTS_BY_CHANNEL_REQUEST](state) {
    state.loadingChatBot = true;
    state.errorChatBot = "";
  },
  [FILTER_ACCOUNTS_BY_CHANNEL_SUCCESS](state, payload) {
    state.loadingChatBot = false;
    state.filteredAccounts = payload;
    state.selectFilteredAccounts = payload.account.map((chatBot) => {
      return { label: chatBot.account_name, value: chatBot.account_id };
    });
  },
  [FILTER_ACCOUNTS_BY_CHANNEL_FAIL](state, errorChatBot) {
    state.loadingChatBot = false;
    state.errorChatBot = errorChatBot;
  },
};

const actions = {
  /* 
    CREATE CHAT BOT
  */
  async creatChatBot({ commit, dispatch }, payload) {
    commit(CREATE_CHAT_BOT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/createChatbot`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create chat bot config", config);

    axios(config)
      .then(function (response) {
        console.log("create chat bot response", response.data);
        commit(CREATE_CHAT_BOT_SUCCESS, response.data);
        dispatch("getChatBot");
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
          commit(CREATE_CHAT_BOT_FAIL, error.response.data);
          dispatch("getChatBot");
        }
      });
  },
  /* 
      GET CHAT BOT 
    */
  async getChatBot({ commit }, payload) {
    commit(GET_CHAT_BOT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}chatbot/listChatbots`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get chat bots config", config);

    axios(config)
      .then(function (response) {
        console.log("get chat bots response", response.data);
        commit(GET_CHAT_BOT_SUCCESS, response.data);
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
          commit(GET_CHAT_BOT_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE CHAT BOT
    */
  async updateChatBot({ commit, dispatch }, payload) {
    commit(UPDATE_CHAT_BOT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/updateChatbot`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update chat bot config", config);

    axios(config)
      .then(function (response) {
        console.log("update chat bot response", response.data);
        commit(UPDATE_CHAT_BOT_SUCCESS, response.data);
        dispatch("getChatBot");
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
          commit(UPDATE_CHAT_BOT_FAIL, error.response.data);
          dispatch("getChatBot");
        }
      });
  },
  /* 
      CREATE CHAT BOT FLOW
    */
  async createChatBotFlow({ commit, dispatch }, payload) {
    commit(CREATE_CHAT_BOT_FLOW_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/addChatbotFLow`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create chat bot flow config", config);

    axios(config)
      .then(function (response) {
        console.log("create chat bot flow response", response.data);
        commit(CREATE_CHAT_BOT_FLOW_SUCCESS, response.data);
        dispatch("getChatBot");
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
          commit(CREATE_CHAT_BOT_FLOW_FAIL, error.response.data);
          dispatch("getChatBot");
        }
      });
  },
  /* 
      LINK CHAT BOT TO ACCOUNT
    */
  async linkChatBotToAccount({ commit, dispatch }, payload) {
    commit(LINK_CHAT_BOT_TO_ACCOUNT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/link/Account`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("link chat bot to account config", config);

    axios(config)
      .then(function (response) {
        console.log("link chat bot to account response", response.data);
        commit(LINK_CHAT_BOT_TO_ACCOUNT_SUCCESS, response.data);
        dispatch("getChatBot");
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
          commit(LINK_CHAT_BOT_TO_ACCOUNT_FAIL, error.response.data);
          dispatch("getChatBot");
        }
      });
  },
  /* 
      GET LINKED CHAT BOT ACCOUNTS
    */
  async getLinkedChatBotAccounts({ commit }, payload) {
    commit(GET_LINKED_CHAT_BOT_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/listLinkedAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get linked chat bot accounts config", config);

    axios(config)
      .then(function (response) {
        console.log("get linked chat bot accounts response", response.data);
        commit(GET_LINKED_CHAT_BOT_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_LINKED_CHAT_BOT_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET CHAT BOT JSON
    */
  async getChatBotJson({ commit }, payload) {
    commit(GET_CHAT_BOT_JSON_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}chatbot/getChatBotJSON`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get chat bot json config", config);

    axios(config)
      .then(function (response) {
        console.log("get chat bot json response", response.data);
        commit(GET_CHAT_BOT_JSON_SUCCESS, response.data);
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
          commit(GET_CHAT_BOT_JSON_FAIL, error.response.data);
        }
      });
  },
  /* 
          UPLOAD CHAT BOT FILES
        */
  async uploadChatBotFiles({ commit, dispatch }, payload) {
    commit(UPLOAD_CHAT_BOT_FILES_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/uploadChatbotFiles`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("upload chat bot files config", config);

    axios(config)
      .then(function (response) {
        console.log("upload chat bot files response", response.data);
        commit(UPLOAD_CHAT_BOT_FILES_SUCCESS, response.data);
        dispatch("getChatBotFiles");
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
          commit(UPLOAD_CHAT_BOT_FILES_FAIL, error.response.data);
          dispatch("getChatBotFiles");
        }
      });
  },
  /* 
      GET CHAT BOT FILES 
    */
  async getChatBotFiles({ commit }, payload) {
    commit(GET_CHAT_BOT_FILES_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}chatbot/getChatbotFiles`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get chat bot files config", config);

    axios(config)
      .then(function (response) {
        console.log("get chat bot files response", response.data);
        commit(GET_CHAT_BOT_FILES_SUCCESS, response.data);
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
          commit(GET_CHAT_BOT_FILES_FAIL, error.response.data);
        }
      });
  },
  /* 
          DELETE CHAT BOT FILES
        */
  async deleteChatBotFiles({ commit, dispatch }, payload) {
    commit(DELETE_CHAT_BOT_FILES_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/deleteChatbotFile`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete chat bot files config", config);

    axios(config)
      .then(function (response) {
        console.log("delete chat bot files response", response.data);
        commit(DELETE_CHAT_BOT_FILES_SUCCESS, response.data);
        dispatch("getChatBotFiles");
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
          commit(DELETE_CHAT_BOT_FILES_FAIL, error.response.data);
          dispatch("getChatBotFiles");
        }
      });
  },

  /* 
    FILTER ACCOUNTS BY CHANNEL
  */
  async filterAccountsByChannel({ commit }, payload) {
    commit(FILTER_ACCOUNTS_BY_CHANNEL_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}chatbot/Accounts/filterByChannel`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("filter accounts by channel config", config);

    axios(config)
      .then(function (response) {
        console.log("filter accounts by channel response", response.data);
        commit(FILTER_ACCOUNTS_BY_CHANNEL_SUCCESS, response.data);
        // dispatch("getChatBot");
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
          commit(FILTER_ACCOUNTS_BY_CHANNEL_FAIL, error.response.data);
          // dispatch("getChatBot");
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
