import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/*STORE CALL DETAILS
 */
export const STORE_CONVERSATION_DETAILS_CHANNEL_IDENTIFIER =
  "STORE_CONVERSATION_DETAILS_CHANNEL_IDENTIFIER";
export const STORE_CONVERSATION_DETAILS_ACCOUNT =
  "STORE_CONVERSATIONDETAILS_ACCOUNT";
export const STORE_CONVERSATION_DETAILS_CONTACT =
  "STORE_CONVERSATION_DETAILS_CONTACT";
export const STORE_CONVERSATION_DETAILS_CHANNEL_ID =
  "STORE_CONVERSATION_DETAILS_CHANNEL_ID";
export const STORE_CONVERSATION_DETAILS_CONVERSATION_ID =
  "STORE_CONVERSATION_DETAILS_CONVERSATION_ID";

export const GET_CONVERSATION_DETAILS_REQUEST =
  "GET_CONVERSATION_DETAILS_REQUEST";
export const GET_CONVERSATION_DETAILS_SUCCESS =
  "GET_CONVERSATION_DETAILS_SUCCESS";
export const GET_CONVERSATION_DETAILS_FAIL = "GET_CONVERSATION_DETAILS_FAIL";

/* 
    CONVERSATIONS
  */
export const CLOSE_A_CONVERSATION_REQUEST = "CLOSE_A_CONVERSATION_REQUEST";
export const CLOSE_A_CONVERSATION_SUCCESS = "CLOSE_A_CONVERSATION_SUCCESS";
export const CLOSE_A_CONVERSATION_FAIL = "CLOSE_A_CONVERSATION_FAIL";
export const REPLY_TO_A_CONVERSATION_REQUEST =
  "REPLY_TO_A_CONVERSATION_REQUEST";
export const REPLY_TO_A_CONVERSATION_SUCCESS =
  "REPLY_TO_A_CONVERSATION_SUCCESS";
export const REPLY_TO_A_CONVERSATION_FAIL = "REPLY_TO_A_CONVERSATION_FAIL";
export const MARK_MESSAGE_AS_READ_REQUEST = "MARK_MESSAGE_AS_READ_REQUEST";
export const MARK_MESSAGE_AS_READ_SUCCESS = "MARK_MESSAGE_AS_READ_SUCCESS";
export const MARK_MESSAGE_AS_READ_FAIL = "MARK_MESSAGE_AS_READ_FAIL";
export const RETURN_TO_QUEUE_REQUEST = "RETURN_TO_QUEUE_REQUEST";
export const RETURN_TO_QUEUE_SUCCESS = "RETURN_TO_QUEUE_SUCCESS";
export const RETURN_TO_QUEUE_FAIL = "RETURN_TO_QUEUE_FAIL";
export const GET_COMPANYS_CONVERSATIONS_REQUEST =
  "GET_COMPANYS_CONVERSATIONS_REQUEST";
export const GET_COMPANYS_CONVERSATIONS_SUCCESS =
  "GET_COMPANYS_CONVERSATIONS_SUCCESS";
export const GET_COMPANYS_CONVERSATIONS_FAIL =
  "GET_COMPANYS_CONVERSATIONS_FAIL";
export const GET_ASSIGNED_CONVERSATIONS_REQUEST =
  "GET_ASSIGNED_CONVERSATIONS_REQUEST";
export const GET_ASSIGNED_CONVERSATIONS_SUCCESS =
  "GET_ASSIGNED_CONVERSATIONS_SUCCESS";
export const GET_ASSIGNED_CONVERSATIONS_FAIL =
  "GET_ASSIGNED_CONVERSATIONS_FAIL";
export const GET_CHANNEL_CONVERSATIONS_REQUEST =
  "GET_CHANNEL_CONVERSATIONS_REQUEST";
export const GET_CHANNEL_CONVERSATIONS_SUCCESS =
  "GET_CHANNEL_CONVERSATIONS_SUCCESS";
export const GET_CHANNEL_CONVERSATIONS_FAIL = "GET_CHANNEL_CONVERSATIONS_FAIL";
export const GET_MESSAGES_IN_A_CONVERSATION_REQUEST =
  "GET_MESSAGES_IN_A_CONVERSATION_REQUEST";
export const GET_MESSAGES_IN_A_CONVERSATION_SUCCESS =
  "GET_MESSAGES_IN_A_CONVERSATION_SUCCESS";
export const GET_MESSAGES_IN_A_CONVERSATION_FAIL =
  "GET_MESSAGES_IN_A_CONVERSATION_FAIL";

/* GET CONVERSATION CHANNELS

  */

export const GET_CONVERSATION_CHANNELS_REQUEST =
  "GET_CONVERSATION_CHANNELS_REQUEST";
export const GET_CONVERSATION_CHANNELS_SUCCESS =
  "GET_CONVERSATION_CHANNELS_SUCCESS";
export const GET_CONVERSATION_CHANNELS_FAIL = "GET_CONVERSATION_CHANNELS_FAIL";

const state = {
  loadingConversation: false,
  successConversation: "",
  errorConversation: "",
  companysConversations: [],
  assignedConversations: [],
  channelConversations: [],
  messages: [],
  conversationChannels: [],
  currentConversationDetails: {
    channel_identifier: "",
    account: "",
    contact: "",
    channel_id: "",
    conversation_id: "",
  },
  currentConversationData: "",
  currentConversationDataErrors: "",
};

const getters = {
  loadingConversation: (state) => state.loadingConversation,
  successConversation: (state) => state.successConversation,
  errorConversation: (state) => state.errorConversation,
  companysConversations: (state) => state.companysConversations,
  assignedConversations: (state) => state.assignedConversations,
  channelConversations: (state) => state.channelConversations,
  messages: (state) => state.messages,
  conversationChannels: (state) => state.conversationChannels,
  currentConversationDetails: (state) => state.currentConversationDetails,
  currentConversationDataErrors: (state) => state.currentConversationDataErrors,
  currentConversationData: (state) => state.currentConversationData,
};

const mutations = {
  [GET_CONVERSATION_DETAILS_REQUEST](state) {
    state.loadingCalls = true;
    state.currentConversationDataErrors = "";
  },
  [GET_CONVERSATION_DETAILS_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.currentConversationData = payload;
  },
  [GET_CONVERSATION_DETAILS_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.currentConversationDatasErrors = errorCalls;
  },

  /* 
    STORE CURRENT CALLER DETAILS
  */
  [STORE_CONVERSATION_DETAILS_CHANNEL_IDENTIFIER](state, payload) {
    state.currentConversationDetails.channel_identifier = payload;
  },
  /* 
      STORE CURRENT CALLER DETAILS
    */
  [STORE_CONVERSATION_DETAILS_ACCOUNT](state, payload) {
    state.currentonversationrDetails.account = payload;
  },

  /* 
      STORE CURRENT CALLER DETAILS
    */
  [STORE_CONVERSATION_DETAILS_CONTACT](state, payload) {
    state.currentConversationDetails.contact = payload;
  },

  /* 
      STORE CURRENT CALLER DETAILS
    */
  [STORE_CONVERSATION_DETAILS_CHANNEL_ID](state, payload) {
    state.currentConversationDetails.channel_id = payload;
  },

  /* 
      STORE CURRENT CALLER DETAILS
    */
  [STORE_CONVERSATION_DETAILS_CONVERSATION_ID](state, payload) {
    state.currentConversationDetails.conversation_id = payload;
  },
  /* 
    CLOSE A CONVERSATION
  */
  [CLOSE_A_CONVERSATION_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [CLOSE_A_CONVERSATION_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.successConversation = payload.message;
    localStorage.removeItem("conversation_id");
  },
  [CLOSE_A_CONVERSATION_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },

  /* 
    CONVERSATION CHANNELS
  */
  [GET_CONVERSATION_CHANNELS_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_CONVERSATION_CHANNELS_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.conversationChannels = payload.message;
  },
  [GET_CONVERSATION_CHANNELS_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
    REPLY TO A CONVERSATION
  */
  [REPLY_TO_A_CONVERSATION_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [REPLY_TO_A_CONVERSATION_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.successConversation = payload.message;
  },
  [REPLY_TO_A_CONVERSATION_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
    MARK MESSAGE AS READ
  */
  [MARK_MESSAGE_AS_READ_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [MARK_MESSAGE_AS_READ_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.successConversation = payload.message;
  },
  [MARK_MESSAGE_AS_READ_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
    RETURN TO QUEUE
  */
  [RETURN_TO_QUEUE_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [RETURN_TO_QUEUE_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.successConversation = payload.message;
    localStorage.removeItem("conversation_id");
  },
  [RETURN_TO_QUEUE_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
        GET COMPANYS CONVERSATIONS
      */
  [GET_COMPANYS_CONVERSATIONS_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_COMPANYS_CONVERSATIONS_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.companysConversations = payload;
  },
  [GET_COMPANYS_CONVERSATIONS_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
        GET ASSIGNED CONVERSATIONS
      */
  [GET_ASSIGNED_CONVERSATIONS_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ASSIGNED_CONVERSATIONS_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.assignedConversations = payload.data;
  },
  [GET_ASSIGNED_CONVERSATIONS_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
        GET CHANNEL CONVERSATIONS
      */
  [GET_CHANNEL_CONVERSATIONS_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_CHANNEL_CONVERSATIONS_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.channelConversations = payload.data;
  },
  [GET_CHANNEL_CONVERSATIONS_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
  /* 
        GET MESSAGES IN A CONVERSATION
      */
  [GET_MESSAGES_IN_A_CONVERSATION_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_MESSAGES_IN_A_CONVERSATION_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.messages = payload.data;
    localStorage.setItem("conversation_id", payload.data[0].conversation_id);
  },
  [GET_MESSAGES_IN_A_CONVERSATION_FAIL](state, errorConversation) {
    state.loadingConversation = false;
    state.errorConversation = errorConversation;
  },
};

const actions = {
  /* 
    STORE CALLER DETAILS
  */
  async storeConversationDetailsPhone({ commit }, payload) {
    commit(STORE_CONVERSATION_DETAILS_CHANNEL_IDENTIFIER, payload);
    console.log(
      "i am getting current caller phone",
      state.currentConversationDetails
    );
  },

  async storeConversationDetailsAccount({ commit }, payload) {
    commit(STORE_CONVERSATION_DETAILS_ACCOUNT, payload);
    console.log(
      "i am getting current caller account",
      state.currentConversationDetails
    );
  },
  async storeConversationDetailsContact({ commit }, payload) {
    commit(STORE_CONVERSATION_DETAILS_CONTACT, payload);
    console.log(
      "i am getting current caller contact",
      state.currentConversationDetails
    );
  },

  async storeConversationDetailsChannel({ commit }, payload) {
    commit(STORE_CONVERSATION_DETAILS_CHANNEL_ID, payload);
    console.log(
      "i am getting current caller contact",
      state.currentConversationDetails
    );
  },

  async storeConversationDetailsConversationID({ commit }, payload) {
    commit(STORE_CONVERSATION_DETAILS_CONVERSATION_ID, payload);
    console.log(
      "i am getting current caller contact",
      state.currentConversationDetails
    );
  },

  /* 
    CLOSE A CONVERSATION REQUEST
  */
  async closeAConversation({ commit, dispatch }, payload) {
    commit(CLOSE_A_CONVERSATION_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/close`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("close a conversation config", config);

    axios(config)
      .then(function (response) {
        console.log("close a conversation response", response.data);
        commit(CLOSE_A_CONVERSATION_SUCCESS, response.data);
        dispatch("getAssignedConversations");
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
          commit(CLOSE_A_CONVERSATION_FAIL, error.response.data);
          dispatch("getAssignedConversations");
        }
      });
  },

  /* get concversation channels 

  */

  async getConversationChannels({ commit }, payload) {
    commit(GET_CONVERSATION_CHANNELS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Conversation/Channels`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("close a conversation config", config);

    axios(config)
      .then(function (response) {
        console.log("GET CONVERSATION CHANNELS", response.data.channels);
        commit(GET_CONVERSATION_CHANNELS_SUCCESS, response.data.channels);
        state.conversationChannels = response.data.channels;
        console.log(state.conversationChannels);
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
          commit(GET_CONVERSATION_CHANNELS_FAIL, error.response.data);
        }
      });
  },
  /* 
      REPLY TO A CONVERSATION
    */
  async replyToAConversation({ commit, dispatch }, payload) {
    commit(REPLY_TO_A_CONVERSATION_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/reply`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("reply to a conversation config", config);

    axios(config)
      .then(function (response) {
        console.log("reply to a conversation response", response.data);
        commit(REPLY_TO_A_CONVERSATION_SUCCESS, response.data);
        dispatch("getMessagesInAConversation");
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
          commit(REPLY_TO_A_CONVERSATION_FAIL, error.response.data);
          dispatch("getMessagesInAConversation");
        }
      });
  },
  /* 
      MARK MESSAGE AS READ
    */
  async markMessageAsRead({ commit }, payload) {
    commit(MARK_MESSAGE_AS_READ_REQUEST);
    if (!payload?.conversation_id) {
      payload = { conversation_id: localStorage.getItem("conversation_id") };
    }

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/Message/markAsRead`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("mark message as read config", config);

    axios(config)
      .then(function (response) {
        console.log("mark message as read response", response.data);
        commit(MARK_MESSAGE_AS_READ_SUCCESS, response.data);
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
          commit(MARK_MESSAGE_AS_READ_FAIL, error.response.data);
        }
      });
  },
  /* 
      RETURN TO QUEUE
    */
  async returnToQueue({ commit, dispatch }, payload) {
    commit(RETURN_TO_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/returnToQueue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("return to queue config", config);

    axios(config)
      .then(function (response) {
        console.log("return to queue response", response.data);
        commit(RETURN_TO_QUEUE_SUCCESS, response.data);
        dispatch("getAssignedConversations");
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
          commit(RETURN_TO_QUEUE_FAIL, error.response.data);
          dispatch("getAssignedConversations");
        }
      });
  },
  /* 
      GET COMPANYS CONVERSATIONS
    */
  async getCompanysConversations({ commit }, payload) {
    commit(GET_COMPANYS_CONVERSATIONS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Conversation/list`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get companys conversations config", config);

    axios(config)
      .then(function (response) {
        console.log("get companys conversations response", response.data);
        commit(GET_COMPANYS_CONVERSATIONS_SUCCESS, response.data);
        // dispatch("getMetaAccessToken");
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
          commit(GET_COMPANYS_CONVERSATIONS_FAIL, error.response.data);
          // dispatch("getMetaAccessToken");
        }
      });
  },
  /* 
      GET ASSIGNED CONVERSATIONS
    */
  async getAssignedConversations({ commit }, payload) {
    commit(GET_ASSIGNED_CONVERSATIONS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Conversation/listAssigned`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get assigned conversations config", config);

    axios(config)
      .then(function (response) {
        console.log("get assigned conversations response", response.data);
        commit(GET_ASSIGNED_CONVERSATIONS_SUCCESS, response.data);
        // dispatch("getMetaAccessToken");
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
          commit(GET_ASSIGNED_CONVERSATIONS_FAIL, error.response.data);
          // dispatch("getMetaAccessToken");
        }
      });
  },
  /* 
      GET CHANNEL CONVERSATIONS
    */
  async getChannelConversations({ commit }, payload) {
    commit(GET_CHANNEL_CONVERSATIONS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/listByChannel`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get channel conversations config", config);

    axios(config)
      .then(function (response) {
        console.log("get channel conversations response", response.data);
        commit(GET_CHANNEL_CONVERSATIONS_SUCCESS, response.data);
        // dispatch("getMetaAccessToken");
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
          commit(GET_CHANNEL_CONVERSATIONS_FAIL, error.response.data);
          // dispatch("getMetaAccessToken");
        }
      });
  },
  /* 
      GET MESSAGES IN A CONVERSATION
    */
  async getMessagesInAConversation({ commit, dispatch }, payload) {
    commit(GET_MESSAGES_IN_A_CONVERSATION_REQUEST);
    if (!payload?.conversation_id) {
      payload = { conversation_id: localStorage.getItem("conversation_id") };
    }

    var config = {
      method: "post",
      url: `${baseUrl}Conversation/listMessages`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get messages in a conversation config", config);

    axios(config)
      .then(function (response) {
        console.log("get messages in a conversation response", response.data);
        commit(GET_MESSAGES_IN_A_CONVERSATION_SUCCESS, response.data);
        dispatch("markMessageAsRead");
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
          commit(GET_MESSAGES_IN_A_CONVERSATION_FAIL, error.response.data);
          dispatch("markMessageAsRead");
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
