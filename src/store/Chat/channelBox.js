import router from "@/router";
import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

export const CHAT_ATTACHMENTS_REQUEST = "CHAT_ATTACHMENTS_REQUEST";
export const CHAT_ATTACHMENTS_SUCCESS = "CHAT_ATTACHMENTS_SUCCESS";
export const CHAT_ATTACHMENTS_FAIL = "CHAT_ATTACHMENTS_FAIL";

/* 
    SUPPORTED CHANNEL BOX
  */
export const GET_SUPPORTED_CHANNEL_BOX_REQUEST =
  "GET_SUPPORTED_CHANNEL_BOX_REQUEST";
export const GET_SUPPORTED_CHANNEL_BOX_SUCCESS =
  "GET_SUPPORTED_CHANNEL_BOX_SUCCESS";
export const GET_SUPPORTED_CHANNEL_BOX_FAIL = "GET_SUPPORTED_CHANNEL_BOX_FAIL";

/* 
    COMPANY ACCOUNTS
  */
export const GET_COMPANY_ACCOUNTS_REQUEST = "GET_COMPANY_ACCOUNTS_REQUEST";
export const GET_COMPANY_ACCOUNTS_SUCCESS = "GET_COMPANY_ACCOUNTS_SUCCESS";
export const GET_COMPANY_ACCOUNTS_FAIL = "GET_COMPANY_ACCOUNTS_FAIL";

/* 
    SMS
  */
export const CREATE_SMS_ACCOUNTS_REQUEST = "CREATE_SMS_ACCOUNTS_REQUEST";
export const CREATE_SMS_ACCOUNTS_SUCCESS = "CREATE_SMS_ACCOUNTS_SUCCESS";
export const CREATE_SMS_ACCOUNTS_FAIL = "CREATE_SMS_ACCOUNTS_FAIL";
export const GET_SMS_ACCOUNTS_REQUEST = "GET_SMS_ACCOUNTS_REQUEST";
export const GET_SMS_ACCOUNTS_SUCCESS = "GET_SMS_ACCOUNTS_SUCCESS";
export const GET_SMS_ACCOUNTS_FAIL = "GET_SMS_ACCOUNTS_FAIL";
export const UPDATE_SMS_ACCOUNTS_REQUEST = "UPDATE_SMS_ACCOUNTS_REQUEST";
export const UPDATE_SMS_ACCOUNTS_SUCCESS = "UPDATE_SMS_ACCOUNTS_SUCCESS";
export const UPDATE_SMS_ACCOUNTS_FAIL = "UPDATE_SMS_ACCOUNTS_FAIL";
export const DELETE_SMS_ACCOUNTS_REQUEST = "DELETE_SMS_ACCOUNTS_REQUEST";
export const DELETE_SMS_ACCOUNTS_SUCCESS = "DELETE_SMS_ACCOUNTS_SUCCESS";
export const DELETE_SMS_ACCOUNTS_FAIL = "DELETE_SMS_ACCOUNTS_FAIL";

/* 
    EMAIL
  */
export const CREATE_EMAIL_ACCOUNTS_REQUEST = "CREATE_EMAIL_ACCOUNTS_REQUEST";
export const CREATE_EMAIL_ACCOUNTS_SUCCESS = "CREATE_EMAIL_ACCOUNTS_SUCCESS";
export const CREATE_EMAIL_ACCOUNTS_FAIL = "CREATE_EMAIL_ACCOUNTS_FAIL";
export const GET_EMAIL_ACCOUNTS_REQUEST = "GET_EMAIL_ACCOUNTS_REQUEST";
export const GET_EMAIL_ACCOUNTS_SUCCESS = "GET_EMAIL_ACCOUNTS_SUCCESS";
export const GET_EMAIL_ACCOUNTS_FAIL = "GET_EMAIL_ACCOUNTS_FAIL";
export const UPDATE_EMAIL_ACCOUNTS_REQUEST = "UPDATE_EMAIL_ACCOUNTS_REQUEST";
export const UPDATE_EMAIL_ACCOUNTS_SUCCESS = "UPDATE_EMAIL_ACCOUNTS_SUCCESS";
export const UPDATE_EMAIL_ACCOUNTS_FAIL = "UPDATE_EMAIL_ACCOUNTS_FAIL";
export const DELETE_EMAIL_ACCOUNTS_REQUEST = "DELETE_EMAIL_ACCOUNTS_REQUEST";
export const DELETE_EMAIL_ACCOUNTS_SUCCESS = "DELETE_EMAIL_ACCOUNTS_SUCCESS";
export const DELETE_EMAIL_ACCOUNTS_FAIL = "DELETE_EMAIL_ACCOUNTS_FAIL";

/* 
    WHATSAPP
  */
export const CREATE_WHATSAPP_ACCOUNTS_REQUEST =
  "CREATE_WHATSAPP_ACCOUNTS_REQUEST";
export const CREATE_WHATSAPP_ACCOUNTS_SUCCESS =
  "CREATE_WHATSAPP_ACCOUNTS_SUCCESS";
export const CREATE_WHATSAPP_ACCOUNTS_FAIL = "CREATE_WHATSAPP_ACCOUNTS_FAIL";
export const GET_WHATSAPP_ACCOUNTS_REQUEST = "GET_WHATSAPP_ACCOUNTS_REQUEST";
export const GET_WHATSAPP_ACCOUNTS_SUCCESS = "GET_WHATSAPP_ACCOUNTS_SUCCESS";
export const GET_WHATSAPP_ACCOUNTS_FAIL = "GET_WHATSAPP_ACCOUNTS_FAIL";
export const GET_SINGLE_WHATSAPP_ACCOUNTS_REQUEST =
  "GET_SINGLE_WHATSAPP_ACCOUNTS_REQUEST";
export const GET_SINGLE_WHATSAPP_ACCOUNTS_SUCCESS =
  "GET_SINGLE_WHATSAPP_ACCOUNTS_SUCCESS";
export const GET_SINGLE_WHATSAPP_ACCOUNTS_FAIL =
  "GET_SINGLE_WHATSAPP_ACCOUNTS_FAIL";
export const UPDATE_WHATSAPP_ACCOUNTS_REQUEST =
  "UPDATE_WHATSAPP_ACCOUNTS_REQUEST";
export const UPDATE_WHATSAPP_ACCOUNTS_SUCCESS =
  "UPDATE_WHATSAPP_ACCOUNTS_SUCCESS";
export const UPDATE_WHATSAPP_ACCOUNTS_FAIL = "UPDATE_WHATSAPP_ACCOUNTS_FAIL";

/* 
    FACEBOOK
  */
export const CREATE_FACEBOOK_ACCOUNTS_REQUEST =
  "CREATE_FACEBOOK_ACCOUNTS_REQUEST";
export const CREATE_FACEBOOK_ACCOUNTS_SUCCESS =
  "CREATE_FACEBOOK_ACCOUNTS_SUCCESS";
export const CREATE_FACEBOOK_ACCOUNTS_FAIL = "CREATE_FACEBOOK_ACCOUNTS_FAIL";
export const GET_FACEBOOK_ACCOUNTS_REQUEST = "GET_FACEBOOK_ACCOUNTS_REQUEST";
export const GET_FACEBOOK_ACCOUNTS_SUCCESS = "GET_FACEBOOK_ACCOUNTS_SUCCESS";
export const GET_FACEBOOK_ACCOUNTS_FAIL = "GET_FACEBOOK_ACCOUNTS_FAIL";
export const GET_SINGLE_FACEBOOK_ACCOUNTS_REQUEST =
  "GET_SINGLE_FACEBOOK_ACCOUNTS_REQUEST";
export const GET_SINGLE_FACEBOOK_ACCOUNTS_SUCCESS =
  "GET_SINGLE_FACEBOOK_ACCOUNTS_SUCCESS";
export const GET_SINGLE_FACEBOOK_ACCOUNTS_FAIL =
  "GET_SINGLE_FACEBOOK_ACCOUNTS_FAIL";
export const UPDATE_FACEBOOK_ACCOUNTS_REQUEST =
  "UPDATE_FACEBOOK_ACCOUNTS_REQUEST";
export const UPDATE_FACEBOOK_ACCOUNTS_SUCCESS =
  "UPDATE_FACEBOOK_ACCOUNTS_SUCCESS";
export const UPDATE_FACEBOOK_ACCOUNTS_FAIL = "UPDATE_FACEBOOK_ACCOUNTS_FAIL";

/* 
    TWITTER
  */
export const CREATE_TWITTER_ACCOUNTS_REQUEST =
  "CREATE_TWITTER_ACCOUNTS_REQUEST";
export const CREATE_TWITTER_ACCOUNTS_SUCCESS =
  "CREATE_TWITTER_ACCOUNTS_SUCCESS";
export const CREATE_TWITTER_ACCOUNTS_FAIL = "CREATE_TWITTER_ACCOUNTS_FAIL";
export const GET_TWITTER_ACCOUNTS_REQUEST = "GET_TWITTER_ACCOUNTS_REQUEST";
export const GET_TWITTER_ACCOUNTS_SUCCESS = "GET_TWITTER_ACCOUNTS_SUCCESS";
export const GET_TWITTER_ACCOUNTS_FAIL = "GET_TWITTER_ACCOUNTS_FAIL";
export const GET_SINGLE_TWITTER_ACCOUNTS_REQUEST =
  "GET_SINGLE_TWITTER_ACCOUNTS_REQUEST";
export const GET_SINGLE_TWITTER_ACCOUNTS_SUCCESS =
  "GET_SINGLE_TWITTER_ACCOUNTS_SUCCESS";
export const GET_SINGLE_TWITTER_ACCOUNTS_FAIL =
  "GET_SINGLE_TWITTER_ACCOUNTS_FAIL";
export const UPDATE_TWITTER_ACCOUNTS_REQUEST =
  "UPDATE_TWITTER_ACCOUNTS_REQUEST";
export const UPDATE_TWITTER_ACCOUNTS_SUCCESS =
  "UPDATE_TWITTER_ACCOUNTS_SUCCESS";
export const UPDATE_TWITTER_ACCOUNTS_FAIL = "UPDATE_TWITTER_ACCOUNTS_FAIL";

/* 
    INSTAGRAM
  */
export const CREATE_INSTAGRAM_ACCOUNTS_REQUEST =
  "CREATE_INSTAGRAM_ACCOUNTS_REQUEST";
export const CREATE_INSTAGRAM_ACCOUNTS_SUCCESS =
  "CREATE_INSTAGRAM_ACCOUNTS_SUCCESS";
export const CREATE_INSTAGRAM_ACCOUNTS_FAIL = "CREATE_INSTAGRAM_ACCOUNTS_FAIL";
export const GET_INSTAGRAM_ACCOUNTS_REQUEST = "GET_INSTAGRAM_ACCOUNTS_REQUEST";
export const GET_INSTAGRAM_ACCOUNTS_SUCCESS = "GET_INSTAGRAM_ACCOUNTS_SUCCESS";
export const GET_INSTAGRAM_ACCOUNTS_FAIL = "GET_INSTAGRAM_ACCOUNTS_FAIL";
export const GET_SINGLE_INSTAGRAM_ACCOUNTS_REQUEST =
  "GET_SINGLE_INSTAGRAM_ACCOUNTS_REQUEST";
export const GET_SINGLE_INSTAGRAM_ACCOUNTS_SUCCESS =
  "GET_SINGLE_INSTAGRAM_ACCOUNTS_SUCCESS";
export const GET_SINGLE_INSTAGRAM_ACCOUNTS_FAIL =
  "GET_SINGLE_INSTAGRAM_ACCOUNTS_FAIL";
export const UPDATE_INSTAGRAM_ACCOUNTS_REQUEST =
  "UPDATE_INSTAGRAM_ACCOUNTS_REQUEST";
export const UPDATE_INSTAGRAM_ACCOUNTS_SUCCESS =
  "UPDATE_INSTAGRAM_ACCOUNTS_SUCCESS";
export const UPDATE_INSTAGRAM_ACCOUNTS_FAIL = "UPDATE_INSTAGRAM_ACCOUNTS_FAIL";

const state = {
  loadingChat: false,
  successChat: "",
  errorChat: "",
  chatAttachments: [],
  selectChatAttachments: [],
  supportedChannelBox: [],
  selectsupportedChannelBox: [],
  companyAccounts: {},
  smsAccounts: [],
  singleSmsAccount: {},
  emailAccounts: [],
  singleEmailAccount: {},
  whatsappAccounts: [],
  singleWhatsappAccount: {},
  facebookAccounts: [],
  singleFacebookAccount: {},
  twitterAccounts: [],
  singleTwitterAccount: {},
  instagramAccounts: [],
  singleInstagramAccount: {},
};

const getters = {
  loadingChat: (state) => state.loadingChat,
  successChat: (state) => state.successChat,
  errorChat: (state) => state.errorChat,
  chatAttachments: (state) => state.chatAttachments,
  selectChatAttachments: (state) => state.selectChatAttachments,
  supportedChannelBox: (state) => state.supportedChannelBox,
  selectsupportedChannelBox: (state) => state.selectsupportedChannelBox,
  companyAccounts: (state) => state.companyAccounts,
  smsAccounts: (state) => state.smsAccounts,
  singleSmsAccount: (state) => state.singleSmsAccount,
  emailAccounts: (state) => state.emailAccounts,
  singleEmailAccount: (state) => state.singleEmailAccount,
  whatsappAccounts: (state) => state.whatsappAccounts,
  singleWhatsappAccount: (state) => state.singleWhatsappAccount,
  facebookAccounts: (state) => state.facebookAccounts,
  singleFacebookAccount: (state) => state.singleFacebookAccount,
  twitterAccounts: (state) => state.twitterAccounts,
  singleTwitterAccount: (state) => state.singleTwitterAccount,
  instagramAccounts: (state) => state.instagramAccounts,
  singleInstagramAccount: (state) => state.singleInstagramAccount,
};

const mutations = {
  /* 
    CHAT ATTACHMENT INFO
  */
  [CHAT_ATTACHMENTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CHAT_ATTACHMENTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.chatAttachments = payload;
    state.selectChatAttachments = payload.map((chat) => {
      return { label: chat.name, value: chat.id };
    });
  },
  [CHAT_ATTACHMENTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  SUPPORTED CHANNEL BOX
 */
  [GET_SUPPORTED_CHANNEL_BOX_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SUPPORTED_CHANNEL_BOX_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.supportedChannelBox = payload;
    state.selectsupportedChannelBox = payload.map((chat) => {
      return { label: chat.name, value: chat.id };
    });
  },
  [GET_SUPPORTED_CHANNEL_BOX_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  COMPANY ACCOUNTS
 */
  [GET_COMPANY_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_COMPANY_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.companyAccounts = payload;
    // state.selectsupportedChannelBox = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_COMPANY_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  SMS
 */
  /* 
  CREATE SMS ACCOINT INFO
 */
  [CREATE_SMS_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_SMS_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_SMS_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET SMS ACCOUNTS
  */
  [GET_SMS_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SMS_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.smsAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_SMS_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE SMS ACCOUNTS
  */
  [UPDATE_SMS_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_SMS_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_SMS_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    DELETE SMS ACCOUNTS
  */
  [DELETE_SMS_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [DELETE_SMS_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload;
  },
  [DELETE_SMS_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  EMAIL
 */
  /* 
  CREATE EMAIL ACCOINT INFO
 */
  [CREATE_EMAIL_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_EMAIL_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_EMAIL_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET EMAIL ACCOUNTS
  */
  [GET_EMAIL_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_EMAIL_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.emailAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_EMAIL_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE EMAIL ACCOUNTS
  */
  [UPDATE_EMAIL_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_EMAIL_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_EMAIL_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    DELETE EMAIL ACCOUNTS
  */
  [DELETE_EMAIL_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [DELETE_EMAIL_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload;
  },
  [DELETE_EMAIL_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  WHATSAPP
 */
  /* 
  CREATE WHATSAPP ACCOINT INFO
 */
  [CREATE_WHATSAPP_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_WHATSAPP_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_WHATSAPP_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET WHATSAPP ACCOUNTS
  */
  [GET_WHATSAPP_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_WHATSAPP_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.whatsappAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_WHATSAPP_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET SINGLE WHATSAPP ACCOUNTS
  */
  [GET_SINGLE_WHATSAPP_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SINGLE_WHATSAPP_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.singleWhatsappAccount = payload;
  },
  [GET_SINGLE_WHATSAPP_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE WHATSAPP ACCOUNTS
  */
  [UPDATE_WHATSAPP_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_WHATSAPP_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_WHATSAPP_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  FACEBOOK
 */
  /* 
  CREATE FACEBOOK ACCOINT INFO
 */
  [CREATE_FACEBOOK_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_FACEBOOK_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_FACEBOOK_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET FACEBOOK ACCOUNTS
  */
  [GET_FACEBOOK_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_FACEBOOK_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.facebookAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_FACEBOOK_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET SINGLE FACEBOOK ACCOUNTS
  */
  [GET_SINGLE_FACEBOOK_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SINGLE_FACEBOOK_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.singleFacebookAccount = payload;
  },
  [GET_SINGLE_FACEBOOK_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE FACEBOOK ACCOUNTS
  */
  [UPDATE_FACEBOOK_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_FACEBOOK_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_FACEBOOK_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  TWITTER
 */
  /* 
  CREATE TWITTER ACCOINT INFO
 */
  [CREATE_TWITTER_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_TWITTER_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_TWITTER_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET TWITTER ACCOUNTS
  */
  [GET_TWITTER_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_TWITTER_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.twitterAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_TWITTER_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET SINGLE TWITTER ACCOUNTS
  */
  [GET_SINGLE_TWITTER_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SINGLE_TWITTER_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.singleTwitterAccount = payload;
  },
  [GET_SINGLE_TWITTER_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE TWITTER ACCOUNTS
  */
  [UPDATE_TWITTER_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_TWITTER_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_TWITTER_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },

  /* 
  INSTAGRAM
 */
  /* 
  CREATE INSTAGRAM ACCOINT INFO
 */
  [CREATE_INSTAGRAM_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [CREATE_INSTAGRAM_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [CREATE_INSTAGRAM_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET INSTAGRAM ACCOUNTS
  */
  [GET_INSTAGRAM_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_INSTAGRAM_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.instagramAccounts = payload;
    // state.selectChatAttachments = payload.map((chat) => {
    //   return { label: chat.name, value: chat.id };
    // });
  },
  [GET_INSTAGRAM_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    GET SINGLE INSTAGRAM ACCOUNTS
  */
  [GET_SINGLE_INSTAGRAM_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [GET_SINGLE_INSTAGRAM_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.singleInstagramAccount = payload;
  },
  [GET_SINGLE_INSTAGRAM_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
  /* 
    UPDATE INSTAGRAM ACCOUNTS
  */
  [UPDATE_INSTAGRAM_ACCOUNTS_REQUEST](state) {
    state.loadingChat = true;
    state.errorChat = "";
  },
  [UPDATE_INSTAGRAM_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingChat = false;
    state.successChat = payload.message;
  },
  [UPDATE_INSTAGRAM_ACCOUNTS_FAIL](state, errorChat) {
    state.loadingChat = false;
    state.errorChat = errorChat;
  },
};

const actions = {
  /* 
    CHAT ATTACHMENT INFO 
  */
  async getChatAttachments({ commit }, payload) {
    commit(CHAT_ATTACHMENTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}company/get_all_chats`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    console.log("get chat config", config);
    var sampleChatAttachments = [
      { id: "1", name: "Doc 1" },
      { id: "2", name: "Doc 2" },
      { id: "3", name: "Audio 1" },
      { id: "4", name: "Audio 2" },
      { id: "5", name: "Pic 1" },
      { id: "6", name: "Pic 2" },
    ];

    return sampleChatAttachments;

    // axios(config)
    //   .then(function (response) {
    //     commit(CHAT_ATTACHMENTS_SUCCESS, response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     if (
    //       error.response.status == 401 ||
    //       error.response.data.message == "Unauthenticated."
    //     ) {
    //       console.log("logged in from another device");
    //       commit("auth/LOGOUT_SUCCESS", null, { root: true });
    //       router.replace({ name: "LogIn" });
    //     } else {
    //       commit(CHAT_ATTACHMENTS_FAIL, error.response.data);
    //     }
    //   });
  },

  /* 
      SUPPORTED CHANNEL BOX
    */
  async getSupportedChannelBox({ commit }, payload) {
    commit(GET_SUPPORTED_CHANNEL_BOX_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/list_supported`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get supported channel box config", config);

    axios(config)
      .then(function (response) {
        console.log("get supported channel box response", response.data);
        commit(GET_SUPPORTED_CHANNEL_BOX_SUCCESS, response.data);
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
          commit(GET_SUPPORTED_CHANNEL_BOX_FAIL, error.response.data);
        }
      });
  },

  /* 
      COMPANY ACCOUNTS
    */
  async getCompanyaccounts({ commit }, payload) {
    commit(GET_COMPANY_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/companyAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get company accounts config", config);

    axios(config)
      .then(function (response) {
        console.log("get company accounts response", response.data);
        commit(GET_COMPANY_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_COMPANY_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },

  /* 
    SMS
  */
  /* 
    CREATE SMS ACCOUNT
  */
  async createSmsAccount({ commit, dispatch }, payload) {
    commit(CREATE_SMS_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/smsSettings`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create sms account config", config);

    axios(config)
      .then(function (response) {
        console.log("create sms account response", response.data);
        commit(CREATE_SMS_ACCOUNTS_SUCCESS, response.data);
        dispatch("getSmsAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_SMS_ACCOUNTS_FAIL, error.response.data);
          dispatch("getSmsAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
      GET SMS ACCOUNT
    */
  async getSMSAccounts({ commit }, payload) {
    commit(GET_SMS_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/smsSettings`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get sms account config", config);

    axios(config)
      .then(function (response) {
        console.log("get sms account response", response.data);
        commit(GET_SMS_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_SMS_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE SMS ACCOUNT
    */
  async updateSmsAccount({ commit, dispatch }, payload) {
    commit(UPDATE_SMS_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/smsSettings/${payload.sms_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update sms account config", config);

    axios(config)
      .then(function (response) {
        console.log("update sms account response", response.data);
        commit(UPDATE_SMS_ACCOUNTS_SUCCESS, response.data);
        dispatch("getSmsAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_SMS_ACCOUNTS_FAIL, error.response.data);
          dispatch("getSmsAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
      DELETE SMS ACCOUNT
    */
  async deleteSmsAccount({ commit, dispatch }, payload) {
    commit(DELETE_SMS_ACCOUNTS_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}channels/smsSettings/${payload.sms_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete sms account config", config);

    axios(config)
      .then(function (response) {
        console.log("delete sms account response", response.data);
        commit(DELETE_SMS_ACCOUNTS_SUCCESS, response.data);
        dispatch("getSmsAccounts");
        dispatch("getCompanyaccounts");
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
          commit(DELETE_SMS_ACCOUNTS_FAIL, error.response.data);
          dispatch("getSmsAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },

  /* 
    EMAIL
  */
  /* 
    CREATE EMAIL ACCOUNT
  */
  async createEmailAccount({ commit, dispatch }, payload) {
    commit(CREATE_EMAIL_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/emailSettings`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create email account config", config);

    axios(config)
      .then(function (response) {
        console.log("create email account response", response.data);
        commit(CREATE_EMAIL_ACCOUNTS_SUCCESS, response.data);
        dispatch("getEmailAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_EMAIL_ACCOUNTS_FAIL, error.response.data);
          dispatch("getEmailAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
        GET EMAIL ACCOUNT
      */
  async getEmailAccounts({ commit }, payload) {
    commit(GET_EMAIL_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/emailSettings`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get email account config", config);

    axios(config)
      .then(function (response) {
        console.log("get email account response", response.data);
        commit(GET_EMAIL_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_EMAIL_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
        UPDATE EMAIL ACCOUNT
      */
  async updateEmailAccount({ commit, dispatch }, payload) {
    commit(UPDATE_EMAIL_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/emailSettings/${payload.email_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update email account config", config);

    axios(config)
      .then(function (response) {
        console.log("update email account response", response.data);
        commit(UPDATE_EMAIL_ACCOUNTS_SUCCESS, response.data);
        dispatch("getEmailAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_EMAIL_ACCOUNTS_FAIL, error.response.data);
          dispatch("getEmailAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
        DELETE EMAIL ACCOUNT
      */
  async deleteEmailAccount({ commit, dispatch }, payload) {
    commit(DELETE_EMAIL_ACCOUNTS_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}channels/emailSettings/${payload.email_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete email account config", config);

    axios(config)
      .then(function (response) {
        console.log("delete email account response", response.data);
        commit(DELETE_EMAIL_ACCOUNTS_SUCCESS, response.data);
        dispatch("getEmailAccounts");
        dispatch("getCompanyaccounts");
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
          commit(DELETE_EMAIL_ACCOUNTS_FAIL, error.response.data);
          dispatch("getEmailAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },

  /* 
    WHATSAPP
  */
  /* 
    CREATE WHATSAPP ACCOUNT
  */
  async createWhatsappAccount({ commit, dispatch }, payload) {
    commit(CREATE_WHATSAPP_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/whatsappAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create whatsapp account config", config);

    axios(config)
      .then(function (response) {
        console.log("create whatsapp account response", response.data);
        commit(CREATE_WHATSAPP_ACCOUNTS_SUCCESS, response.data);
        dispatch("getWhatsappAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_WHATSAPP_ACCOUNTS_FAIL, error.response.data);
          dispatch("getWhatsappAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
    GET WHATSAPP ACCOUNT
  */
  async getWhatsappAccounts({ commit }, payload) {
    commit(GET_WHATSAPP_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/whatsappAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get whatsapp account config", config);

    axios(config)
      .then(function (response) {
        console.log("get whatsapp account response", response.data);
        commit(GET_WHATSAPP_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_WHATSAPP_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET SINGLE WHATSAPP ACCOUNT
  */
  async getSingleWhatsappAccount({ commit }, payload) {
    commit(GET_SINGLE_WHATSAPP_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/whatsappAccounts/${payload.whatsapp_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log(" single whatsapp account config", config);

    axios(config)
      .then(function (response) {
        console.log(" single whatsapp account response", response.data);
        commit(GET_SINGLE_WHATSAPP_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_SINGLE_WHATSAPP_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE WHATSAPP ACCOUNT
  */
  async updateWhatsappAccount({ commit, dispatch }, payload) {
    commit(UPDATE_WHATSAPP_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/whatsappAccounts/${payload.whatsapp_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update whatsapp account config", config);

    axios(config)
      .then(function (response) {
        console.log("update whatsapp account response", response.data);
        commit(UPDATE_WHATSAPP_ACCOUNTS_SUCCESS, response.data);
        dispatch("getWhatsappAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_WHATSAPP_ACCOUNTS_FAIL, error.response.data);
          dispatch("getWhatsappAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },

  /* 
    FACEBOOK
  */
  /* 
    CREATE FACEBOOK ACCOUNT
  */
  async createFacebookAccount({ commit, dispatch }, payload) {
    commit(CREATE_FACEBOOK_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/faceBookPages`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create facebook account config", config);

    axios(config)
      .then(function (response) {
        console.log("create facebook account response", response.data);
        commit(CREATE_FACEBOOK_ACCOUNTS_SUCCESS, response.data);
        dispatch("getFacebookAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_FACEBOOK_ACCOUNTS_FAIL, error.response.data);
          dispatch("getFacebookAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
      GET FACEBOOK ACCOUNT
    */
  async getFacebookAccounts({ commit }, payload) {
    commit(GET_FACEBOOK_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/faceBookPages`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get facebook account config", config);

    axios(config)
      .then(function (response) {
        console.log("get facebook account response", response.data);
        commit(GET_FACEBOOK_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_FACEBOOK_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE FACEBOOK ACCOUNT
    */
  async getSingleFacebookAccount({ commit }, payload) {
    commit(GET_SINGLE_FACEBOOK_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/faceBookPages/${payload.facebook_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log(" single facebook account config", config);

    axios(config)
      .then(function (response) {
        console.log(" single facebook account response", response.data);
        commit(GET_SINGLE_FACEBOOK_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_SINGLE_FACEBOOK_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE FACEBOOK ACCOUNT
    */
  async updateFacebookAccount({ commit, dispatch }, payload) {
    commit(UPDATE_FACEBOOK_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/faceBookPages/${payload.facebook_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update facebook account config", config);

    axios(config)
      .then(function (response) {
        console.log("update facebook account response", response.data);
        commit(UPDATE_FACEBOOK_ACCOUNTS_SUCCESS, response.data);
        dispatch("getFacebookAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_FACEBOOK_ACCOUNTS_FAIL, error.response.data);
          dispatch("getFacebookAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },

  /* 
    TWITTER
  */
  /* 
    CREATE TWITTER ACCOUNT
  */
  async createTwitterAccount({ commit, dispatch }, payload) {
    commit(CREATE_TWITTER_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/twitterAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create twitter account config", config);

    axios(config)
      .then(function (response) {
        console.log("create twitter account response", response.data);
        commit(CREATE_TWITTER_ACCOUNTS_SUCCESS, response.data);
        dispatch("getTwitterAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_TWITTER_ACCOUNTS_FAIL, error.response.data);
          dispatch("getTwitterAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
        GET TWITTER ACCOUNT
      */
  async getTwitterAccounts({ commit }, payload) {
    commit(GET_TWITTER_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/twitterAccounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get twitter account config", config);

    axios(config)
      .then(function (response) {
        console.log("get twitter account response", response.data);
        commit(GET_TWITTER_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_TWITTER_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
        GET SINGLE TWITTER ACCOUNT
      */
  async getSingleTwitterAccount({ commit }, payload) {
    commit(GET_SINGLE_TWITTER_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/twitterAccounts/${payload.twitter_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log(" single twitter account config", config);

    axios(config)
      .then(function (response) {
        console.log(" single twitter account response", response.data);
        commit(GET_SINGLE_TWITTER_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_SINGLE_TWITTER_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
        UPDATE TWITTER ACCOUNT
      */
  async updateTwitterAccount({ commit, dispatch }, payload) {
    commit(UPDATE_TWITTER_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/twitterAccounts/${payload.twitter_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update twitter account config", config);

    axios(config)
      .then(function (response) {
        console.log("update twitter account response", response.data);
        commit(UPDATE_TWITTER_ACCOUNTS_SUCCESS, response.data);
        dispatch("getTwitterAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_TWITTER_ACCOUNTS_FAIL, error.response.data);
          dispatch("getTwitterAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },

  /* 
    INSTAGRAM
  */
  /* 
    CREATE INSTAGRAM ACCOUNT
  */
  async createInstagramAccount({ commit, dispatch }, payload) {
    commit(CREATE_INSTAGRAM_ACCOUNTS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}channels/instagramPages`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create instagram account config", config);

    axios(config)
      .then(function (response) {
        console.log("create instagram account response", response.data);
        commit(CREATE_INSTAGRAM_ACCOUNTS_SUCCESS, response.data);
        dispatch("getInstagramAccounts");
        dispatch("getCompanyaccounts");
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
          commit(CREATE_INSTAGRAM_ACCOUNTS_FAIL, error.response.data);
          dispatch("getInstagramAccounts");
          dispatch("getCompanyaccounts");
        }
      });
  },
  /* 
          GET INSTAGRAM ACCOUNT
        */
  async getInstagramAccounts({ commit }, payload) {
    commit(GET_INSTAGRAM_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/instagramPages`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get instagram account config", config);

    axios(config)
      .then(function (response) {
        console.log("get instagram account response", response.data);
        commit(GET_INSTAGRAM_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_INSTAGRAM_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
          GET SINGLE INSTAGRAM ACCOUNT
        */
  async getSingleInstagramAccount({ commit }, payload) {
    commit(GET_SINGLE_INSTAGRAM_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channels/instagramPages/${payload.instagram_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log(" single instagram account config", config);

    axios(config)
      .then(function (response) {
        console.log(" single instagram account response", response.data);
        commit(GET_SINGLE_INSTAGRAM_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_SINGLE_INSTAGRAM_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
          UPDATE INSTAGRAM ACCOUNT
        */
  async updateInstagramAccount({ commit, dispatch }, payload) {
    commit(UPDATE_INSTAGRAM_ACCOUNTS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channels/instagramPages/${payload.instagram_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update instagram account config", config);

    axios(config)
      .then(function (response) {
        console.log("update instagram account response", response.data);
        commit(UPDATE_INSTAGRAM_ACCOUNTS_SUCCESS, response.data);
        dispatch("getInstagramAccounts");
        dispatch("getCompanyaccounts");
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
          commit(UPDATE_INSTAGRAM_ACCOUNTS_FAIL, error.response.data);
          dispatch("getInstagramAccounts");
          dispatch("getCompanyaccounts");
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
