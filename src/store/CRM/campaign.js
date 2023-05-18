import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_CAMPAIGN_REQUEST = "CREATE_CAMPAIGN_REQUEST";
export const CREATE_CAMPAIGN_SUCCESS = "CREATE_CAMPAIGN_SUCCESS";
export const CREATE_CAMPAIGN_FAIL = "CREATE_CAMPAIGN_FAIL";
export const CREATE_CAMPAIGN_SURVEY_REQUEST = "CREATE_CAMPAIGN_SURVEY_REQUEST";
export const CREATE_CAMPAIGN_SURVEY_SUCCESS = "CREATE_CAMPAIGN_SURVEY_SUCCESS";
export const CREATE_CAMPAIGN_SURVEY_FAIL = "CREATE_CAMPAIGN_SURVEY_FAIL";
export const GET_CAMPAIGN_TYPE_REQUEST = "GET_CAMPAIGN_TYPE_REQUEST";
export const GET_CAMPAIGN_TYPE_SUCCESS = "GET_CAMPAIGN_TYPE_SUCCESS";
export const GET_CAMPAIGN_TYPE_FAIL = "GET_CAMPAIGN_TYPE_FAIL";
export const GET_CAMPAIGN_REQUEST = "GET_CAMPAIGN_REQUEST";
export const GET_CAMPAIGN_SUCCESS = "GET_CAMPAIGN_SUCCESS";
export const GET_CAMPAIGN_FAIL = "GET_CAMPAIGN_FAIL";
export const GET_SENDER_ID_REQUEST = "GET_SENDER_ID_REQUEST";
export const GET_SENDER_ID_SUCCESS = "GET_SENDER_ID_SUCCESS";
export const GET_SENDER_ID_FAIL = "GET_SENDER_ID_FAIL";
export const GET_QUEUE_FROM_CAMPAIGN_REQUEST =
  "GET_QUEUE_FROM_CAMPAIGN_REQUEST";
export const GET_QUEUE_FROM_CAMPAIGN_SUCCESS =
  "GET_QUEUE_FROM_CAMPAIGN_SUCCESS";
export const GET_QUEUE_FROM_CAMPAIGN_FAIL = "GET_QUEUE_FROM_CAMPAIGN_FAIL";
export const GET_CAMPAIGN_CONTACT_REQUEST = "GET_CAMPAIGN_CONTACT_REQUEST";
export const GET_CAMPAIGN_CONTACT_SUCCESS = "GET_CAMPAIGN_CONTACT_SUCCESS";
export const GET_CAMPAIGN_CONTACT_FAIL = "GET_CAMPAIGN_CONTACT_FAIL";
export const GET_CAMPAIGN_WORKING_HOUR_REQUEST =
  "GET_CAMPAIGN_WORKING_HOUR_REQUEST";
export const GET_CAMPAIGN_WORKING_HOUR_SUCCESS =
  "GET_CAMPAIGN_WORKING_HOUR_SUCCESS";
export const GET_CAMPAIGN_WORKING_HOUR_FAIL = "GET_CAMPAIGN_WORKING_HOUR_FAIL";
export const UPDATE_CAMPAIGN_REQUEST = "UPDATE_CAMPAIGN_REQUEST";
export const UPDATE_CAMPAIGN_SUCCESS = "UPDATE_CAMPAIGN_SUCCESS";
export const UPDATE_CAMPAIGN_FAIL = "UPDATE_CAMPAIGN_FAIL";
export const CHANGE_CAMPAIGN_STATUS_REQUEST = "CHANGE_CAMPAIGN_STATUS_REQUEST";
export const CHANGE_CAMPAIGN_STATUS_SUCCESS = "CHANGE_CAMPAIGN_STATUS_SUCCESS";
export const CHANGE_CAMPAIGN_STATUS_FAIL = "CHANGE_CAMPAIGN_STATUS_FAIL";
export const ADD_GROUP_TO_CAMPAIGN_REQUEST = "ADD_GROUP_TO_CAMPAIGN_REQUEST";
export const ADD_GROUP_TO_CAMPAIGN_SUCCESS = "ADD_GROUP_TO_CAMPAIGN_SUCCESS";
export const ADD_GROUP_TO_CAMPAIGN_FAIL = "ADD_GROUP_TO_CAMPAIGN_FAIL";
export const REMOVE_GROUP_FROM_CAMPAIGN_REQUEST =
  "REMOVE_GROUP_FROM_CAMPAIGN_REQUEST";
export const REMOVE_GROUP_FROM_CAMPAIGN_SUCCESS =
  "REMOVE_GROUP_FROM_CAMPAIGN_SUCCESS";
export const REMOVE_GROUP_FROM_CAMPAIGN_FAIL =
  "REMOVE_GROUP_FROM_CAMPAIGN_FAIL";
export const ADD_CAMPAIGN_WORKING_HOUR_REQUEST =
  "ADD_CAMPAIGN_WORKING_HOUR_REQUEST";
export const ADD_CAMPAIGN_WORKING_HOUR_SUCCESS =
  "ADD_CAMPAIGN_WORKING_HOUR_SUCCESS";
export const ADD_CAMPAIGN_WORKING_HOUR_FAIL = "ADD_CAMPAIGN_WORKING_HOUR_FAIL";
export const REMOVE_CAMPAIGN_WORKING_HOUR_REQUEST =
  "REMOVE_CAMPAIGN_WORKING_HOUR_REQUEST";
export const REMOVE_CAMPAIGN_WORKING_HOUR_SUCCESS =
  "REMOVE_CAMPAIGN_WORKING_HOUR_SUCCESS";
export const REMOVE_CAMPAIGN_WORKING_HOUR_FAIL =
  "REMOVE_CAMPAIGN_WORKING_HOUR_FAIL";
export const CAMPAIGN_SETTING_SETUP_REQUEST = "CAMPAIGN_SETTING_SETUP_REQUEST";
export const CAMPAIGN_SETTING_SETUP_SUCCESS = "CAMPAIGN_SETTING_SETUP_SUCCESS";
export const CAMPAIGN_SETTING_SETUP_FAIL = "CAMPAIGN_SETTING_SETUP_FAIL";
export const UPLOAD_CONTACT_CAMPAIGN_REQUEST =
  "UPLOAD_CONTACT_CAMPAIGN_REQUEST";
export const UPLOAD_CONTACT_CAMPAIGN_SUCCESS =
  "UPLOAD_CONTACT_CAMPAIGN_SUCCESS";
export const UPLOAD_CONTACT_CAMPAIGN_FAIL = "UPLOAD_CONTACT_CAMPAIGN_FAIL";
export const SELECT_CONTACT_FOR_CAMPAIGN_REQUEST =
  "SELECT_CONTACT_FOR_CAMPAIGN_REQUEST";
export const SELECT_CONTACT_FOR_CAMPAIGN_SUCCESS =
  "SELECT_CONTACT_FOR_CAMPAIGN_SUCCESS";
export const SELECT_CONTACT_FOR_CAMPAIGN_FAIL =
  "SELECT_CONTACT_FOR_CAMPAIGN_FAIL";
export const MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_REQUEST =
  "MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_REQUEST";
export const MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_SUCCESS =
  "MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_SUCCESS";
export const MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_FAIL =
  "MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_FAIL";
export const ADD_QUESTION_CAMPAIGN_REQUEST = "ADD_QUESTION_CAMPAIGN_REQUEST";
export const ADD_QUESTION_CAMPAIGN_SUCCESS = "ADD_QUESTION_CAMPAIGN_SUCCESS";
export const ADD_QUESTION_CAMPAIGN_FAIL = "ADD_QUESTION_CAMPAIGN_FAIL";

export const SUBMIT_SURVEY_REQUEST = "SUBMIT_SURVEY_REQUEST";
export const SUBMIT_SURVEY_SUCCESS = "SUBMIT_SURVEY_SUCCESS";
export const SUBMIT_SURVEY_FAIL = "SUBMIT_SURVEY_FAIL";
const state = {
  loadingCampaign: false,
  successCampaign: "",
  errorCampaign: "",
  campaign: [],
  selectCampaign: [],
  senderId: [],
  selectSenderId: [],
  queueFromCampaign: [],
  selectQueueFromCampaign: [],
  campaignContact: [],
  selectCampaignContact: [],
  campaignWorkingHour: [],
  selectCampaignWorkingHour: [],
  campaignType: [],
  selectCampaignType: [],
};

const getters = {
  loadingCampaign: (state) => state.loadingCampaign,
  successCampaign: (state) => state.successCampaign,
  errorCampaign: (state) => state.errorCampaign,
  campaign: (state) => state.campaign,
  selectCampaign: (state) => state.selectCampaign,
  senderId: (state) => state.senderId,
  selectSenderId: (state) => state.selectSenderId,
  queueFromCampaign: (state) => state.queueFromCampaign,
  selectQueueFromCampaign: (state) => state.selectQueueFromCampaign,
  campaignContact: (state) => state.campaignContact,
  selectCampaignContact: (state) => state.selectCampaignContact,
  campaignWorkingHour: (state) => state.campaignWorkingHour,
  selectCampaignWorkingHour: (state) => state.selectCampaignWorkingHour,
  campaignType: (state) => state.campaignType,
  selectCampaignType: (state) => state.selectCampaignType,
};

const mutations = {
  /* 
    CREATE CAMPAIGN
  */
  [CREATE_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [CREATE_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [CREATE_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  /*SUBMIT SURVEY */

  [SUBMIT_SURVEY_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [SUBMIT_SURVEY_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [SUBMIT_SURVEY_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  [CREATE_CAMPAIGN_SURVEY_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [CREATE_CAMPAIGN_SURVEY_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [CREATE_CAMPAIGN_SURVEY_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
    GET CAMPAIGN TYPE
  */
  [GET_CAMPAIGN_TYPE_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_CAMPAIGN_TYPE_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.campaignType = payload;
    state.selectCampaignType = payload.map((campaign) => {
      return { label: campaign.name, value: campaign.name };
    });
  },
  [GET_CAMPAIGN_TYPE_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
    GET CAMPAIGN
  */
  [GET_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.campaign = payload;
    state.selectCampaign = payload.map((campaign) => {
      return { label: campaign.name, value: campaign.id };
    });
  },
  [GET_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  /* 
    GET SENDER ID
  */
  [GET_SENDER_ID_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_SENDER_ID_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.senderId = payload;
    state.selectSenderId = payload.map((sender) => {
      return { label: sender.name, value: sender.id };
    });
  },
  [GET_SENDER_ID_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  /* 
    GET QUEUE FROM CAMPAIGN
  */
  [GET_QUEUE_FROM_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_QUEUE_FROM_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.queueFromCampaign = payload;
    state.selectQueueFromCampaign = payload.map((queue) => {
      return { label: queue.name, value: queue.id };
    });
  },
  [GET_QUEUE_FROM_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  /* 
    GET CAMPAIGN CONTACT
  */
  [GET_CAMPAIGN_CONTACT_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_CAMPAIGN_CONTACT_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.campaignContact = payload;
    state.selectCampaignContact = payload.map((contact) => {
      return { label: contact.name, value: contact.id };
    });
  },
  [GET_CAMPAIGN_CONTACT_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
    GET CAMPAIGN WORKING HOUR
  */
  [GET_CAMPAIGN_WORKING_HOUR_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [GET_CAMPAIGN_WORKING_HOUR_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.campaignWorkingHour = payload;
    state.selectCampaignWorkingHour = payload.map((campaign) => {
      return { label: campaign.date, value: campaign.id };
    });
  },
  [GET_CAMPAIGN_WORKING_HOUR_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
    UPDATE CAMPAIGN
  */
  [UPDATE_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [UPDATE_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [UPDATE_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
    CHANGE CAMPAIGN STATUS
  */
  [CHANGE_CAMPAIGN_STATUS_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [CHANGE_CAMPAIGN_STATUS_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [CHANGE_CAMPAIGN_STATUS_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
      ADD GROUP TO CAMPAIGN
    */
  [ADD_GROUP_TO_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [ADD_GROUP_TO_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [ADD_GROUP_TO_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
          REMOVE GROUP FROM CAMPAIGN
        */
  [REMOVE_GROUP_FROM_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [REMOVE_GROUP_FROM_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload;
  },
  [REMOVE_GROUP_FROM_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
      ADD CAMPAIGN WORKING HOUR
    */
  [ADD_CAMPAIGN_WORKING_HOUR_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [ADD_CAMPAIGN_WORKING_HOUR_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [ADD_CAMPAIGN_WORKING_HOUR_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },

  /* 
    REMOVE CAMPAIGN WORKING HOUR
  */
  [REMOVE_CAMPAIGN_WORKING_HOUR_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [REMOVE_CAMPAIGN_WORKING_HOUR_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [REMOVE_CAMPAIGN_WORKING_HOUR_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
        CAMPAIGN SETTING SETUP
      */
  [CAMPAIGN_SETTING_SETUP_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [CAMPAIGN_SETTING_SETUP_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [CAMPAIGN_SETTING_SETUP_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
            UPLOAD CONTACT CAMPAIGN
          */
  [UPLOAD_CONTACT_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [UPLOAD_CONTACT_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload;
  },
  [UPLOAD_CONTACT_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
        SELECT CONTACT FOR CAMPAIGN
      */
  [SELECT_CONTACT_FOR_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [SELECT_CONTACT_FOR_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [SELECT_CONTACT_FOR_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
        MIGRATE CAMPAIGN CONTACT BY FILTER
      */
  [MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
  /* 
        ADD QUESTION CAMPAIGN
      */
  [ADD_QUESTION_CAMPAIGN_REQUEST](state) {
    state.loadingCampaign = true;
    state.errorCampaign = "";
  },
  [ADD_QUESTION_CAMPAIGN_SUCCESS](state, payload) {
    state.loadingCampaign = false;
    state.successCampaign = payload.message;
  },
  [ADD_QUESTION_CAMPAIGN_FAIL](state, errorCampaign) {
    state.loadingCampaign = false;
    state.errorCampaign = errorCampaign;
  },
};

const actions = {
  /* 
    SUBMIT SURVEY
  */
  async submitSurvey({ commit }, payload) {
    commit(SUBMIT_SURVEY_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/survey_submit`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("create campaign response", response.data);
        commit(SUBMIT_SURVEY_SUCCESS, response.data);
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
          commit(SUBMIT_SURVEY_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE CAMPAIGN
  */
  async createCampaign({ commit, dispatch }, payload) {
    commit(CREATE_CAMPAIGN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/create_campaign_once`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("create campaign response", response.data);
        commit(CREATE_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(CREATE_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
    CREATE CAMPAIGN SURVEY
  */
  async createCampaignSurvey({ commit }, payload) {
    commit(CREATE_CAMPAIGN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/add_question_camapign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("create campaign response", response.data);
        commit(CREATE_CAMPAIGN_SUCCESS, response.data);
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
          commit(CREATE_CAMPAIGN_SURVEY_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET CAMPAIGN TYPE
    */
  async getCampaignType({ commit }, payload) {
    commit(GET_CAMPAIGN_TYPE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_campaign_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get campaign type config", config);

    axios(config)
      .then(function (response) {
        console.log("get campaign type response", response.data);
        commit(GET_CAMPAIGN_TYPE_SUCCESS, response.data);
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
          commit(GET_CAMPAIGN_TYPE_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET CAMPAIGN
    */
  async getCampaign({ commit }, payload) {
    commit(GET_CAMPAIGN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_campaigns`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("get campaign response", response.data);
        commit(GET_CAMPAIGN_SUCCESS, response.data);
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
          commit(GET_CAMPAIGN_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET SENDER ID
    */
  async getSenderId({ commit }, payload) {
    commit(GET_SENDER_ID_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_sender_id`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get sender id config", config);

    axios(config)
      .then(function (response) {
        console.log("get sender id response", response.data);
        commit(GET_SENDER_ID_SUCCESS, response.data);
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
          commit(GET_SENDER_ID_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET QUEUE FROM CAMPAIGN
    */
  async getQueueFromCampaign({ commit }, payload) {
    commit(GET_QUEUE_FROM_CAMPAIGN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_queue_from_camapaign?campaign_id=${payload.campaign_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue from campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue from campaign response", response.data);
        commit(GET_QUEUE_FROM_CAMPAIGN_SUCCESS, response.data);
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
          commit(GET_QUEUE_FROM_CAMPAIGN_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET CAMPAIGN CONTACT
    */
  async getCampaignContact({ commit }, payload) {
    commit(GET_CAMPAIGN_CONTACT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_campaign_contact?campaign_id=${payload.campaign_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get campaign contact config", config);

    axios(config)
      .then(function (response) {
        console.log("get campaign contact response", response.data);
        commit(GET_CAMPAIGN_CONTACT_SUCCESS, response.data);
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
          commit(GET_CAMPAIGN_CONTACT_FAIL, error.response.data);
        }
      });
  },
  /* 
       GET CAMPAIGN WORKING HOUR
    */
  async getCampaignWorkingHour({ commit }, payload) {
    commit(GET_CAMPAIGN_WORKING_HOUR_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}campaign/get_campaign_working_hour?campaign_id=${payload.campaign_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get campaign working hour config", config);

    axios(config)
      .then(function (response) {
        console.log("get campaign working hour response", response.data);
        commit(GET_CAMPAIGN_WORKING_HOUR_SUCCESS, response.data);
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
          commit(GET_CAMPAIGN_WORKING_HOUR_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE CAMPAIGN
    */
  async updateCampaign({ commit, dispatch }, payload) {
    commit(UPDATE_CAMPAIGN_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}campaign/update_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("update campaign response", response.data);
        commit(UPDATE_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(UPDATE_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
      CHANGE CAMPAIGN STATUS
    */
  async changeCampaignStatus({ commit, dispatch }, payload) {
    commit(CHANGE_CAMPAIGN_STATUS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}campaign/change_campaign_status`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("change campaign status config", config);

    axios(config)
      .then(function (response) {
        console.log("change campaign status response", response.data);
        commit(CHANGE_CAMPAIGN_STATUS_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(CHANGE_CAMPAIGN_STATUS_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },

  /* 
    ADD GROUP TO CAMPAIGN
  */
  async addGroupToCampaign({ commit, dispatch }, payload) {
    commit(ADD_GROUP_TO_CAMPAIGN_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}campaign/add_group_to_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add group to campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("add group to campaign response", response.data);
        commit(ADD_GROUP_TO_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(ADD_GROUP_TO_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
        REMOVE GROUP FROM CAMPAIGN
      */
  async removeGroupFromCampaign({ commit, dispatch }, payload) {
    commit(REMOVE_GROUP_FROM_CAMPAIGN_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}campaign/remove_group_from_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove group from campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("remove group from campaign response", response.data);
        commit(REMOVE_GROUP_FROM_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(REMOVE_GROUP_FROM_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
       ADD CAMPAIGN WORKING HOUR
      */
  async addCampaignWorkingHour({ commit, dispatch }, payload) {
    commit(ADD_CAMPAIGN_WORKING_HOUR_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/add_campaign_working_hour`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add campaign working hour config", config);

    axios(config)
      .then(function (response) {
        console.log("add campaign working hour response", response.data);
        commit(ADD_CAMPAIGN_WORKING_HOUR_SUCCESS, response.data);
        dispatch("getCampaignWorkingHour", {
          campaign_id: payload.campaign_id,
        });
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
          commit(ADD_CAMPAIGN_WORKING_HOUR_FAIL, error.response.data);
          dispatch("getCampaignWorkingHour", {
            campaign_id: payload.campaign_id,
          });
        }
      });
  },
  /* 
        REMOVE CAMPAIGN WORKING HOUR
      */
  async removeCampaignWorkingHour({ commit, dispatch }, payload) {
    commit(REMOVE_CAMPAIGN_WORKING_HOUR_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}campaign/remove_campaign_working_hour`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove campaign working hour config", config);

    axios(config)
      .then(function (response) {
        console.log("remove campaign working hour response", response.data);
        commit(REMOVE_CAMPAIGN_WORKING_HOUR_SUCCESS, response.data);
        dispatch("getCampaignWorkingHour", {
          campaign_id: payload.campaign_id,
        });
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
          commit(REMOVE_CAMPAIGN_WORKING_HOUR_FAIL, error.response.data);
          dispatch("getCampaignWorkingHour", {
            campaign_id: payload.campaign_id,
          });
        }
      });
  },

  /* 
    CAMPAIGN SETTING SETUP
  */
  async campaignSettingSetup({ commit, dispatch }, payload) {
    commit(CAMPAIGN_SETTING_SETUP_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}campaign/campaign_setting_setup`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("campaign setting setup config", config);

    axios(config)
      .then(function (response) {
        console.log("campaign setting setup response", response.data);
        commit(CAMPAIGN_SETTING_SETUP_SUCCESS, response.data);
        dispatch("getCampaign");
        // dispatch("getCampaignWorkingHour");
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
          commit(CAMPAIGN_SETTING_SETUP_FAIL, error.response.data);
          dispatch("getCampaign");
          // dispatch("getCampaignWorkingHour");
        }
      });
  },
  /* 
          UPLOAD CONTACT CAMPAIGN
        */
  async uploadContactCampaign({ commit, dispatch }, payload) {
    commit(UPLOAD_CONTACT_CAMPAIGN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/upload_contact_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("upload contact campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("upload contact campaign response", response.data);
        commit(UPLOAD_CONTACT_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaignContact", { campaign_id: payload.campaign_id });
        dispatch("getCampaignWorkingHour", {
          campaign_id: payload.campaign_id,
        });
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
          commit(UPLOAD_CONTACT_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaignContact", { campaign_id: payload.campaign_id });
          dispatch("getCampaignWorkingHour", {
            campaign_id: payload.campaign_id,
          });
        }
      });
  },
  /* 
          SELECT CONTACT FOR CAMPAIGN
        */
  async selectContactForCampaign({ commit, dispatch }, payload) {
    commit(SELECT_CONTACT_FOR_CAMPAIGN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/select_contact_for_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("select contact for campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("select contact for campaign response", response.data);
        commit(SELECT_CONTACT_FOR_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(SELECT_CONTACT_FOR_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
          MIGRATE CAMPAIGN CONTACT BY FILTER
        */
  async migrateCampaignContactByFilter({ commit, dispatch }, payload) {
    commit(MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/migrate_campaign_contacts_by_filter`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("migrate campaign contact by filter config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "migrate campaign contact by filter response",
          response.data
        );
        commit(MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(MIGRATE_CAMPAIGN_CONTACT_BY_FILTER_FAIL, error.response.data);
          dispatch("getCampaign");
        }
      });
  },
  /* 
          ADD QUESTION CAMPAIGN
        */
  async addQuestionCampaign({ commit, dispatch }, payload) {
    commit(ADD_QUESTION_CAMPAIGN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}campaign/add_question_camapign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add question campaign config", config);

    axios(config)
      .then(function (response) {
        console.log("add question campaign response", response.data);
        commit(ADD_QUESTION_CAMPAIGN_SUCCESS, response.data);
        dispatch("getCampaign");
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
          commit(ADD_QUESTION_CAMPAIGN_FAIL, error.response.data);
          dispatch("getCampaign");
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
