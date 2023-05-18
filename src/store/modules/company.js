import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const COMPANY_INFO_REQUEST = "COMPANY_INFO_REQUEST";
export const COMPANY_INFO_SUCCESS = "COMPANY_INFO_SUCCESS";
export const COMPANY_INFO_FAIL = "COMPANY_INFO_FAIL";
export const EDIT_COMPANY_INFO_REQUEST = "EDIT_COMPANY_INFO_REQUEST";
export const EDIT_COMPANY_INFO_SUCCESS = "EDIT_COMPANY_INFO_SUCCESS";
export const EDIT_COMPANY_INFO_FAIL = "EDIT_COMPANY_INFO_FAIL";
export const EDIT_COMPANY_ADDRESS_REQUEST = "EDIT_COMPANY_ADDRESS_REQUEST";
export const EDIT_COMPANY_ADDRESS_SUCCESS = "EDIT_COMPANY_ADDRESS_SUCCESS";
export const EDIT_COMPANY_ADDRESS_FAIL = "EDIT_COMPANY_ADDRESS_FAIL";
export const EDIT_COMPANY_CONTACT_REQUEST = "EDIT_COMPANY_CONTACT_REQUEST";
export const EDIT_COMPANY_CONTACT_SUCCESS = "EDIT_COMPANY_CONTACT_SUCCESS";
export const EDIT_COMPANY_CONTACT_FAIL = "EDIT_COMPANY_CONTACT_FAIL";
export const ADD_COMPANY_ADDRESS_FAIL = "ADD_COMPANY_ADDRESS_FAIL";
export const ADD_COMPANY_CONTACT_REQUEST = "ADD_COMPANY_CONTACT_REQUEST";
export const ADD_COMPANY_CONTACT_SUCCESS = "ADD_COMPANY_CONTACT_SUCCESS";
export const ADD_COMPANY_CONTACT_FAIL = "ADD_COMPANY_CONTACT_FAIL";

export const BREAK_INFO_REQUEST = "BREAK_INFO_REQUEST";
export const BREAK_INFO_SUCCESS = "BREAK_INFO_SUCCESS";
export const BREAK_INFO_FAIL = "BREAK_INFO_FAIL";
export const CREATE_BREAK_REQUEST = "CREATE_BREAK_REQUEST";
export const CREATE_BREAK_SUCCESS = "CREATE_BREAK_SUCCESS";
export const CREATE_BREAK_FAIL = "CREATE_BREAK_FAIL";
export const UPDATE_BREAK_REQUEST = "UPDATE_BREAK_REQUEST";
export const UPDATE_BREAK_SUCCESS = "UPDATE_BREAK_SUCCESS";
export const UPDATE_BREAK_FAIL = "UPDATE_BREAK_FAIL";
export const UPDATE_BREAK_STATUS_REQUEST = "UPDATE_BREAK_STATUS_REQUEST";
export const UPDATE_BREAK_STATUS_SUCCESS = "UPDATE_BREAK_STATUS_SUCCESS";
export const UPDATE_BREAK_STATUS_FAIL = "UPDATE_BREAK_STATUS_FAIL";

export const CALL_CENTER_SETTINGS_REQUEST = "CALL_CENTER_SETTINGS_REQUEST";
export const CALL_CENTER_SETTINGS_SUCCESS = "CALL_CENTER_SETTINGS_SUCCESS";
export const CALL_CENTER_SETTINGS_FAIL = "CALL_CENTER_SETTINGS_FAIL";
export const SETUP_PENALTY_AND_SERVICE_LEVEL_REQUEST =
  "SETUP_PENALTY_AND_SERVICE_LEVEL_REQUEST";
export const SETUP_PENALTY_AND_SERVICE_LEVEL_SUCCESS =
  "SETUP_PENALTY_AND_SERVICE_LEVEL_SUCCESS";
export const SETUP_PENALTY_AND_SERVICE_LEVEL_FAIL =
  "SETUP_PENALTY_AND_SERVICE_LEVEL_FAIL";
export const SWITCH_OFF_CALL_CENTER_REQUEST = "SWITCH_OFF_CALL_CENTER_REQUEST";
export const SWITCH_OFF_CALL_CENTER_SUCCESS = "SWITCH_OFF_CALL_CENTER_SUCCESS";
export const SWITCH_OFF_CALL_CENTER_FAIL = "SWITCH_OFF_CALL_CENTER_FAIL";
export const BLACKLIST_REQUEST = "BLACKLIST_REQUEST";
export const BLACKLIST_SUCCESS = "BLACKLIST_SUCCESS";
export const BLACKLIST_FAIL = "BLACKLIST_FAIL";
export const ADD_TO_BLACKLIST_REQUEST = "ADD_TO_BLACKLIST_REQUEST";
export const ADD_TO_BLACKLIST_SUCCESS = "ADD_TO_BLACKLIST_SUCCESS";
export const ADD_TO_BLACKLIST_FAIL = "ADD_TO_BLACKLIST_FAIL";
export const REMOVE_FROM_BLACKLIST_REQUEST = "REMOVE_FROM_BLACKLIST_REQUEST";
export const REMOVE_FROM_BLACKLIST_SUCCESS = "REMOVE_FROM_BLACKLIST_SUCCESS";
export const REMOVE_FROM_BLACKLIST_FAIL = "REMOVE_FROM_BLACKLIST_FAIL";

export const WORKING_HOURS_REQUEST = "WORKING_HOURS_REQUEST";
export const WORKING_HOURS_SUCCESS = "WORKING_HOURS_SUCCESS";
export const WORKING_HOURS_FAIL = "WORKING_HOURS_FAIL";
export const UPDATE_WORKING_HOURS_REQUEST = "UPDATE_WORKING_HOURS_REQUEST";
export const UPDATE_WORKING_HOURS_SUCCESS = "UPDATE_WORKING_HOURS_SUCCESS";
export const UPDATE_WORKING_HOURS_FAIL = "UPDATE_WORKING_HOURS_FAIL";

export const HOLIDAY_REQUEST = "HOLIDAY_REQUEST";
export const HOLIDAY_SUCCESS = "HOLIDAY_SUCCESS";
export const HOLIDAY_FAIL = "HOLIDAY_FAIL";
export const ADD_HOLIDAY_REQUEST = "ADD_HOLIDAY_REQUEST";
export const ADD_HOLIDAY_SUCCESS = "ADD_HOLIDAY_SUCCESS";
export const ADD_HOLIDAY_FAIL = "ADD_HOLIDAY_FAIL";
export const UPDATE_HOLIDAY_REQUEST = "UPDATE_HOLIDAY_REQUEST";
export const UPDATE_HOLIDAY_SUCCESS = "UPDATE_HOLIDAY_SUCCESS";
export const UPDATE_HOLIDAY_FAIL = "UPDATE_HOLIDAY_FAIL";
export const REMOVE_HOLIDAY_REQUEST = "REMOVE_HOLIDAY_REQUEST";
export const REMOVE_HOLIDAY_SUCCESS = "REMOVE_HOLIDAY_SUCCESS";
export const REMOVE_HOLIDAY_FAIL = "REMOVE_HOLIDAY_FAIL";

export const SETTING_AUDIO_REQUEST = "SETTING_AUDIO_REQUEST";
export const SETTING_AUDIO_SUCCESS = "SETTING_AUDIO_SUCCESS";
export const SETTING_AUDIO_FAIL = "SETTING_AUDIO_FAIL";
export const ADD_SETTING_AUDIO_REQUEST = "ADD_SETTING_AUDIO_REQUEST";
export const ADD_SETTING_AUDIO_SUCCESS = "ADD_SETTING_AUDIO_SUCCESS";
export const ADD_SETTING_AUDIO_FAIL = "ADD_SETTING_AUDIO_FAIL";
export const UPDATE_SETTING_AUDIO_REQUEST = "UPDATE_SETTING_AUDIO_REQUEST";
export const UPDATE_SETTING_AUDIO_SUCCESS = "UPDATE_SETTING_AUDIO_SUCCESS";
export const UPDATE_SETTING_AUDIO_FAIL = "UPDATE_SETTING_AUDIO_FAIL";
export const DELETE_SETTING_AUDIO_REQUEST = "DELETE_SETTING_AUDIO_REQUEST";
export const DELETE_SETTING_AUDIO_SUCCESS = "DELETE_SETTING_AUDIO_SUCCESS";
export const DELETE_SETTING_AUDIO_FAIL = "DELETE_SETTING_AUDIO_FAIL";
export const CALL_CENTER_OFF_MUSIC_REQUEST = "CALL_CENTER_OFF_MUSIC_REQUEST";
export const CALL_CENTER_OFF_MUSIC_SUCCESS = "CALL_CENTER_OFF_MUSIC_SUCCESS";
export const CALL_CENTER_OFF_MUSIC_FAIL = "CALL_CENTER_OFF_MUSIC_FAIL";
export const UPDATE_CALL_CENTER_OFF_MUSIC_REQUEST =
  "UPDATE_CALL_CENTER_OFF_MUSIC_REQUEST";
export const UPDATE_CALL_CENTER_OFF_MUSIC_SUCCESS =
  "UPDATE_CALL_CENTER_OFF_MUSIC_SUCCESS";
export const UPDATE_CALL_CENTER_OFF_MUSIC_FAIL =
  "UPDATE_CALL_CENTER_OFF_MUSIC_FAIL";

export const SMS_TEMPLATES_REQUEST = "SMS_TEMPLATES_REQUEST";
export const SMS_TEMPLATES_SUCCESS = "SMS_TEMPLATES_SUCCESS";
export const SMS_TEMPLATES_ERROR = "SMS_TEMPLATES_ERROR";
export const FETCH_SMS_TEMPLATES_REQUEST = "FETCH_SMS_TEMPLATES_REQUEST";
export const FETCH_SMS_TEMPLATES_SUCCESS = "FETCH_SMS_TEMPLATES_SUCCESS";
export const FETCH_SMS_TEMPLATES_ERROR = "FETCH_SMS_TEMPLATES_ERROR";

const EDIT_SMS_TEMPLATE_REQUEST = "EDIT_SMS_TEMPLATE_REQUEST";
const EDIT_SMS_TEMPLATE_SUCCESS = "EDIT_SMS_TEMPLATE_SUCCESS";
const EDIT_SMS_TEMPLATE_ERROR = "EDIT_SMS_TEMPLATE_ERROR";
const DELETE_SMS_TEMPLATE_REQUEST = "DELETE_SMS_TEMPLATE_REQUEST";
const DELETE_SMS_TEMPLATE_SUCCESS = "DELETE_SMS_TEMPLATE_SUCCESS";
const DELETE_SMS_TEMPLATE_ERROR = "DELETE_SMS_TEMPLATE_ERROR";
const SEND_SMS_REQUEST = "SEND_SMS_REQUEST";
const SEND_SMS_SUCCESS = "SEND_SMS_SUCCESS";
const SEND_SMS_ERROR = "SEND_SMS_ERROR";

const state = {
  loadingCompany: false,
  successCompany: "",
  errorCompany: "",
  companyName: "",
  systemId: "",
  preferedLanguage: "",
  companyLogo: "",
  companyAddress: {},
  companyContacts: [],
  breaks: [],
  callCenterSettings: "",
  blacklisted: [],
  workingHours: [],
  holidays: [],
  settingAudio: [],
  callCenterOffMusic: "",
  smsTemplates: [],
  smsTemplatesSelect: [],
};

const getters = {
  loadingCompany: (state) => state.loadingCompany,
  successCompany: (state) => state.successCompany,
  errorCompany: (state) => state.errorCompany,
  companyName: (state) => state.companyName,
  systemId: (state) => state.systemId,
  preferedLanguage: (state) => state.preferedLanguage,
  companyLogo: (state) => state.companyLogo,
  companyAddress: (state) => state.companyAddress,
  companyContacts: (state) => state.companyContacts,
  breaks: (state) => state.breaks,
  callCenterSettings: (state) => state.callCenterSettings,
  blacklisted: (state) => state.blacklisted,
  workingHours: (state) => state.workingHours,
  holidays: (state) => state.holidays,
  settingAudio: (state) => state.settingAudio,
  selectSettingAudio: (state) => state.selectSettingAudio,
  callCenterOffMusic: (state) => state.callCenterOffMusic,
  smsTemplates: (state) => state.smsTemplates,
  smsTemplatesSelect: (state) => state.smsTemplatesSelect,
};

const mutations = {
  /* 
    COMPANY INFO
  */
  [COMPANY_INFO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [COMPANY_INFO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.companyName = payload.name;
    state.systemId = payload.sysytem_id;
    state.preferedLanguage = payload.prefered_language;
    state.companyLogo = payload.logo;
    state.companyAddress = payload.company_address;
    state.companyContacts = payload.company_contacts;
  },
  [COMPANY_INFO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    EDIT COMPANY INFO
  */
  [EDIT_COMPANY_INFO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [EDIT_COMPANY_INFO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [EDIT_COMPANY_INFO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /*create SMS Templates*/

  [SMS_TEMPLATES_REQUEST]: (state) => {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [SMS_TEMPLATES_SUCCESS]: (state) => {
    state.loadingCompany = false;
  },
  [SMS_TEMPLATES_ERROR]: (state, error) => {
    state.loadingCompany = false;
    state.errorCompany = error;
  },
  /*fetch SMS Templates */
  [FETCH_SMS_TEMPLATES_REQUEST](state) {
    state.loadingCompany = true;
  },
  [FETCH_SMS_TEMPLATES_SUCCESS](state, smsTemplates) {
    state.loadingCompany = false;
    state.smsTemplates = smsTemplates;
    state.smsTemplatesSelect = smsTemplates.map((sms) => {
      return { label: sms.name, value: sms.id };
    });
  },
  [FETCH_SMS_TEMPLATES_ERROR](state, error) {
    state.loadingCompany = false;
    state.errorCompany = error;
  },
  /*DELETE sms TEMPLATE */
  [DELETE_SMS_TEMPLATE_REQUEST](state) {
    state.loadingCompany = "loading";
  },
  [DELETE_SMS_TEMPLATE_SUCCESS](state) {
    state.loadingCompany = true;
  },
  [DELETE_SMS_TEMPLATE_ERROR](state, error) {
    state.loadingCompany = false;
    state.errorCompany = error;
  },

  /*Edit SMS Templates */

  [EDIT_SMS_TEMPLATE_REQUEST](state) {
    state.loadingCompany = true;
  },
  [EDIT_SMS_TEMPLATE_SUCCESS](state, smsTemplate) {
    state.status = "success";
    state.smsTemplate = smsTemplate;
  },
  [EDIT_SMS_TEMPLATE_ERROR](state, error) {
    state.loadingCompany = false;
    state.errorCompany = error;
  },
  /* 
    EDIT COMPANY ADDRESS
  */
  [EDIT_COMPANY_ADDRESS_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [EDIT_COMPANY_ADDRESS_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [EDIT_COMPANY_ADDRESS_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    EDIT COMPANY CONTACT
  */
  [EDIT_COMPANY_CONTACT_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [EDIT_COMPANY_CONTACT_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [EDIT_COMPANY_CONTACT_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    ADD COMPANY CONTACT
  */
  [ADD_COMPANY_CONTACT_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [ADD_COMPANY_CONTACT_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [ADD_COMPANY_CONTACT_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /* 
    BREAK INFO
  */
  [BREAK_INFO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [BREAK_INFO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.breaks = payload;
  },
  [BREAK_INFO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    CREATE BREAK
  */
  [CREATE_BREAK_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [CREATE_BREAK_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [CREATE_BREAK_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    UPDATE BREAK
  */
  [UPDATE_BREAK_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_BREAK_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_BREAK_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    UPDATE BREAK_STATUS
  */
  [UPDATE_BREAK_STATUS_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_BREAK_STATUS_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_BREAK_STATUS_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /* 
    CALL CENTER SETTINGS STATUS
  */
  [CALL_CENTER_SETTINGS_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [CALL_CENTER_SETTINGS_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.callCenterSettings = payload.settings;
  },
  [CALL_CENTER_SETTINGS_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    SETUP PENALTY AND SERVICE LEVEL
  */
  [SETUP_PENALTY_AND_SERVICE_LEVEL_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [SETUP_PENALTY_AND_SERVICE_LEVEL_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [SETUP_PENALTY_AND_SERVICE_LEVEL_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    SWITCH OFF CALL CENTER
  */
  [SWITCH_OFF_CALL_CENTER_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [SWITCH_OFF_CALL_CENTER_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [SWITCH_OFF_CALL_CENTER_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    BLACKLIST STATUS
  */
  [BLACKLIST_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [BLACKLIST_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.blacklisted = payload;
  },
  [BLACKLIST_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    ADD TO BLACKLIST STATUS
  */
  [ADD_TO_BLACKLIST_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [ADD_TO_BLACKLIST_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [ADD_TO_BLACKLIST_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    REMOVE FROM BLACKLIST
  */
  [REMOVE_FROM_BLACKLIST_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [REMOVE_FROM_BLACKLIST_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [REMOVE_FROM_BLACKLIST_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /* 
    WORKING HOURS
  */
  [WORKING_HOURS_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [WORKING_HOURS_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.workingHours = payload;
  },
  [WORKING_HOURS_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    UPDATE WORKING HOURS
  */
  [UPDATE_WORKING_HOURS_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_WORKING_HOURS_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_WORKING_HOURS_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /* 
    HOLIDAY
  */
  [HOLIDAY_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [HOLIDAY_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.holidays = payload;
  },
  [HOLIDAY_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    ADD HOLIDAY
  */
  [ADD_HOLIDAY_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [ADD_HOLIDAY_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [ADD_HOLIDAY_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    UPDATE HOLIDAY
  */
  [UPDATE_HOLIDAY_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_HOLIDAY_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_HOLIDAY_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    REMOVE HOLIDAY
  */
  [REMOVE_HOLIDAY_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [REMOVE_HOLIDAY_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [REMOVE_HOLIDAY_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },

  /* 
    SETTING AUDIO
  */
  [SETTING_AUDIO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [SETTING_AUDIO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.settingAudio = payload;
    state.selectSettingAudio = payload.map((audio) => {
      return { label: audio.name, value: audio.id };
    });
  },
  [SETTING_AUDIO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    ADD SETTING AUDIO
  */
  [ADD_SETTING_AUDIO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [ADD_SETTING_AUDIO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [ADD_SETTING_AUDIO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    UPDATE SETTING AUDIO
  */
  [UPDATE_SETTING_AUDIO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_SETTING_AUDIO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_SETTING_AUDIO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    DELETE SETTING AUDIO
  */
  [DELETE_SETTING_AUDIO_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [DELETE_SETTING_AUDIO_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [DELETE_SETTING_AUDIO_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /*send SMS */
  [SEND_SMS_REQUEST](state) {
    state.loadingCompany = true;
  },
  [SEND_SMS_SUCCESS](state) {
    state.loadingCompany = false;
  },
  [SEND_SMS_ERROR](state, error) {
    state.loadingCompany = false;
    state.error = error;
  },
  /* 
    CALL CENTER OFF MUSIC
  */
  [CALL_CENTER_OFF_MUSIC_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [CALL_CENTER_OFF_MUSIC_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.callCenterOffMusic = payload[0]?.file;
  },
  [CALL_CENTER_OFF_MUSIC_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
  /* 
    GET CALL CENTER OFF MUSIC
  */
  [UPDATE_CALL_CENTER_OFF_MUSIC_REQUEST](state) {
    state.loadingCompany = true;
    state.errorCompany = "";
  },
  [UPDATE_CALL_CENTER_OFF_MUSIC_SUCCESS](state, payload) {
    state.loadingCompany = false;
    state.successCompany = payload.message;
  },
  [UPDATE_CALL_CENTER_OFF_MUSIC_FAIL](state, errorCompany) {
    state.loadingCompany = false;
    state.errorCompany = errorCompany;
  },
};

const actions = {
  /* 
    COMPANY INFO 
  */
  async getCompanyInfo({ commit }, payload) {
    commit(COMPANY_INFO_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}company/get_company_information`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(COMPANY_INFO_SUCCESS, response.data);
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
          commit(COMPANY_INFO_FAIL, error.response.data);
        }
      });
  },
  /* 
    EDIT COMPANY INFO 
  */
  async editCompanyInfo({ commit, dispatch }, payload) {
    commit(EDIT_COMPANY_INFO_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/edit_company`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(EDIT_COMPANY_INFO_SUCCESS, response.data);
        dispatch("getCompanyInfo");
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
          commit(EDIT_COMPANY_INFO_FAIL, error.response.data);
        }
      });
  },
  /*Send SMS */
  sendSms({ commit }, payload) {
    commit(SEND_SMS_REQUEST);
    console.log("this is the send sms payload", payload);

    axios
      .post(baseUrl + "sms_template/send_sms_template", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: payload,
      })
      .then((response) => {
        commit(SEND_SMS_SUCCESS, response.data);
      })
      .catch((error) => {
        commit(SEND_SMS_ERROR, error);
      });
  },
  /*create SMS Template */
  async createSmsTemplate({ commit, dispatch }, template) {
    try {
      commit(SMS_TEMPLATES_REQUEST);
      const headers = {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios.post(`${baseUrl}sms_template/create_sms_template`, template, {
        headers,
      });

      commit(SMS_TEMPLATES_SUCCESS);
      dispatch("fetchSmsTemplates");
    } catch (error) {
      commit(SMS_TEMPLATES_ERROR, error);
    }
  },
  /*delete SMS template */
  deleteSmsTemplate({ commit, dispatch }, payload) {
    commit(DELETE_SMS_TEMPLATE_REQUEST);
    const token = localStorage.getItem("token");
    axios
      .delete(baseUrl + "sms-templates/" + payload.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        commit(DELETE_SMS_TEMPLATE_SUCCESS, response.data);
        dispatch("fetchSmsTemplates");
      })
      .catch((error) => {
        commit(DELETE_SMS_TEMPLATE_ERROR, error);
      });
  },
  async fetchSmsTemplates({ commit }) {
    try {
      commit(FETCH_SMS_TEMPLATES_REQUEST);
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${baseUrl}sms_template/get_sms_template`,
        { headers }
      );

      console.log("these are the sms templates", response.data);
      commit(FETCH_SMS_TEMPLATES_SUCCESS, response.data);
    } catch (error) {
      commit(FETCH_SMS_TEMPLATES_ERROR, error);
    }
  },
  /*edit SMS Template */
  editSmsTemplate({ commit, dispatch }, payload) {
    commit(EDIT_SMS_TEMPLATE_REQUEST);
    axios
      .put(
        `${baseUrl}sms_template/update_sms_template`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: payload,
        }
      )
      .then((response) => {
        commit(EDIT_SMS_TEMPLATE_SUCCESS, response.data);
        dispatch("fetchSmsTemplates");
      })
      .catch((error) => {
        commit(EDIT_SMS_TEMPLATE_ERROR, error);
      });
  },
  /* 
    EDIT COMPANY ADDRESS 
  */
  async editCompanyAddress({ commit, dispatch }, payload) {
    commit(EDIT_COMPANY_ADDRESS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/edit_company_address`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(EDIT_COMPANY_ADDRESS_SUCCESS, response.data);
        dispatch("getCompanyInfo");
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
          commit(EDIT_COMPANY_ADDRESS_FAIL, error.response.data);
        }
      });
  },
  /* 
    EDIT COMPANY CONTACT 
  */
  async editCompanyContact({ commit, dispatch }, payload) {
    commit(EDIT_COMPANY_CONTACT_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/edit_company_contact`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(EDIT_COMPANY_CONTACT_SUCCESS, response.data);
        dispatch("getCompanyInfo");
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
          commit(EDIT_COMPANY_CONTACT_FAIL, error.response.data);
        }
      });
  },
  /* 
    ADD COMPANY CONTACT 
  */
  async addCompanyContact({ commit, dispatch }, payload) {
    commit(ADD_COMPANY_CONTACT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}company/add_company_contact`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ADD_COMPANY_CONTACT_SUCCESS, response.data);
        dispatch("getCompanyInfo");
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
          commit(ADD_COMPANY_CONTACT_FAIL, error.response.data);
        }
      });
  },

  /* 
    BREAK INFO 
  */
  async getBreaks({ commit }, payload) {
    commit(BREAK_INFO_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_all_breaks`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(BREAK_INFO_SUCCESS, response.data);
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
          commit(BREAK_INFO_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE BREAK 
  */
  async addBreak({ commit, dispatch }, payload) {
    commit(CREATE_BREAK_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}agent/create_break`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(CREATE_BREAK_SUCCESS, response.data);
        dispatch("getBreaks");
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
          commit(CREATE_BREAK_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE BREAK 
  */
  async updateBreak({ commit, dispatch }, payload) {
    commit(UPDATE_BREAK_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}agent/update_break`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(UPDATE_BREAK_SUCCESS, response.data);
        dispatch("getBreaks");
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
          commit(UPDATE_BREAK_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE BREAK STATUS
  */
  async updateBreakStatus({ commit, dispatch }, payload) {
    commit(UPDATE_BREAK_STATUS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}agent/update_break_status`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(UPDATE_BREAK_STATUS_SUCCESS, response.data);
        dispatch("getBreaks");
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
          commit(UPDATE_BREAK_STATUS_FAIL, error.response.data);
        }
      });
  },

  /* 
    CALL CENTER SETTINGS
  */
  async getCallCenterSettings({ commit }, payload) {
    commit(CALL_CENTER_SETTINGS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_callcenter_basic_settings`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(CALL_CENTER_SETTINGS_SUCCESS, response.data);
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
          commit(CALL_CENTER_SETTINGS_FAIL, error.response.data);
        }
      });
  },
  /* 
    SETUP PENALTY AND SERVICE LEVEL
  */
  async setupPenaltyAndServiceLevel({ commit, dispatch }, payload) {
    commit(SETUP_PENALTY_AND_SERVICE_LEVEL_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/setup_penality_sl`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(SETUP_PENALTY_AND_SERVICE_LEVEL_SUCCESS, response.data);
        dispatch("getCallCenterSettings");
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
          commit(SETUP_PENALTY_AND_SERVICE_LEVEL_FAIL, error.response.data);
        }
      });
  },
  /* 
    SWITCH OFF CALL CENTER
  */
  async switchOffCallCenter({ commit, dispatch }, payload) {
    commit(SWITCH_OFF_CALL_CENTER_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/switch_callcenter_off`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(SWITCH_OFF_CALL_CENTER_SUCCESS, response.data);
        dispatch("getCallCenterSettings");
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
          commit(SWITCH_OFF_CALL_CENTER_FAIL, error.response.data);
        }
      });
  },
  /* 
    BLACKLIST STATUS
  */
  async getBlacklist({ commit }, payload) {
    commit(BLACKLIST_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_blacklisted`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(BLACKLIST_SUCCESS, response.data);
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
          commit(BLACKLIST_FAIL, error.response.data);
        }
      });
  },
  /* 
    ADD TO BLACKLIST STATUS
  */
  async addToBlacklist({ commit, dispatch }, payload) {
    commit(ADD_TO_BLACKLIST_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}callcenter_setting/add_to_blacklist`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add to blacklist config", config);

    axios(config)
      .then(function (response) {
        console.log("add to blacklist response", response.data);
        commit(ADD_TO_BLACKLIST_SUCCESS, response.data);
        dispatch("getBlacklist");
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
          commit(ADD_TO_BLACKLIST_FAIL, error.response.data);
        }
      });
  },
  /* 
    REMOVE FROM BLACKLIST
  */
  async removeFromBlacklist({ commit, dispatch }, payload) {
    commit(REMOVE_FROM_BLACKLIST_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}callcenter_setting/remove_from_blacklist`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(REMOVE_FROM_BLACKLIST_SUCCESS, response.data);
        dispatch("getBlacklist");
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
          commit(REMOVE_FROM_BLACKLIST_FAIL, error.response.data);
        }
      });
  },

  /* 
    WORKING HOURS
  */
  async getWorkingHours({ commit }, payload) {
    commit(WORKING_HOURS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_working_hour`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get working hours config", config);

    axios(config)
      .then(function (response) {
        console.log("get working hours response", response.data);
        commit(WORKING_HOURS_SUCCESS, response.data);
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
          commit(WORKING_HOURS_FAIL, error.response.data);
        }
      });
  },

  /* 
    UPDATE WORKING HOURS
  */
  async updateWorkingHours({ commit, dispatch }, payload) {
    commit(UPDATE_WORKING_HOURS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/update_working_hour`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update working hours config", config);

    axios(config)
      .then(function (response) {
        console.log("update working hours response", response.data);
        commit(UPDATE_WORKING_HOURS_SUCCESS, response.data);
        dispatch("getWorkingHours");
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
          commit(UPDATE_WORKING_HOURS_FAIL, error.response.data);
        }
      });
  },

  /* 
     HOLIDAY
  */
  async getHolidays({ commit }, payload) {
    commit(HOLIDAY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_holidays`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get holiday config", config);

    axios(config)
      .then(function (response) {
        console.log("get holiday response", response.data);
        commit(HOLIDAY_SUCCESS, response.data);
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
          commit(HOLIDAY_FAIL, error.response.data);
        }
      });
  },
  /* 
     ADD HOLIDAY
  */
  async addHoliday({ commit, dispatch }, payload) {
    commit(ADD_HOLIDAY_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}callcenter_setting/add_contactcenter_holiday`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add holiday config", config);

    axios(config)
      .then(function (response) {
        console.log("add holiday response", response.data);
        commit(ADD_HOLIDAY_SUCCESS, response.data);
        dispatch("getHolidays");
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
          commit(ADD_HOLIDAY_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE HOLIDAY
  */
  async updateHoliday({ commit, dispatch }, payload) {
    commit(UPDATE_HOLIDAY_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/update_holiday`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update holiday config", config);

    axios(config)
      .then(function (response) {
        console.log("update holiday response", response.data);
        commit(UPDATE_HOLIDAY_SUCCESS, response.data);
        dispatch("getHolidays");
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
          commit(UPDATE_HOLIDAY_FAIL, error.response.data);
        }
      });
  },
  /* 
    REMOVE HOLIDAY
  */
  async removeHoliday({ commit, dispatch }, payload) {
    commit(REMOVE_HOLIDAY_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}callcenter_setting/remove_holiday`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete holiday config", config);

    axios(config)
      .then(function (response) {
        console.log("delete holiday response", response.data);
        commit(REMOVE_HOLIDAY_SUCCESS, response.data);
        dispatch("getHolidays");
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
          commit(REMOVE_HOLIDAY_FAIL, error.response.data);
        }
      });
  },

  /* 
     SETTING AUDIO
  */
  async getSettingAudios({ commit }, payload) {
    commit(SETTING_AUDIO_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_callcenter_setting_audio`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get setting audio config", config);

    axios(config)
      .then(function (response) {
        console.log("get setting audio response", response.data);
        commit(SETTING_AUDIO_SUCCESS, response.data);
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
          commit(SETTING_AUDIO_FAIL, error.response.data);
        }
      });
  },
  /* 
    ADD SETTING AUDIO
  */
  async addSettingAudio({ commit, dispatch }, payload) {
    commit(ADD_SETTING_AUDIO_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}callcenter_setting/add_callcenter_setting_audio`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add setting audio config", config);

    axios(config)
      .then(function (response) {
        console.log("add setting audio response", response.data);
        commit(ADD_SETTING_AUDIO_SUCCESS, response.data);
        dispatch("getSettingAudios");
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
          commit(ADD_SETTING_AUDIO_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE SETTING AUDIO
  */
  async updateSettingAudioName({ commit, dispatch }, payload) {
    commit(UPDATE_SETTING_AUDIO_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/edit_callcenter_setting_audio_name`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update setting audio config", config);

    axios(config)
      .then(function (response) {
        console.log("update setting audio response", response.data);
        commit(UPDATE_SETTING_AUDIO_SUCCESS, response.data);
        dispatch("getSettingAudios");
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
          commit(UPDATE_SETTING_AUDIO_FAIL, error.response.data);
        }
      });
  },
  /* 
    DELETE SETTING AUDIO
  */
  async deleteSettingAudio({ commit, dispatch }, payload) {
    commit(DELETE_SETTING_AUDIO_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}callcenter_setting/delete_callcenter_setting_audio`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete setting audio config", config);

    axios(config)
      .then(function (response) {
        console.log("delete setting audio response", response.data);
        commit(DELETE_SETTING_AUDIO_SUCCESS, response.data);
        dispatch("getSettingAudios");
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
          commit(DELETE_SETTING_AUDIO_FAIL, error.response.data);
        }
      });
  },
  /* 
      CALL CENTER OFF MUSIC
  */
  async getCallCenterOffMusic({ commit }, payload) {
    commit(CALL_CENTER_OFF_MUSIC_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}callcenter_setting/get_callcenter_off`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("call center off music config", config);

    axios(config)
      .then(function (response) {
        console.log("call center off music response", response.data);
        commit(CALL_CENTER_OFF_MUSIC_SUCCESS, response.data);
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
          commit(CALL_CENTER_OFF_MUSIC_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPDATE CALL CENTER OFF MUSIC
  */
  async updateCallCenterOffMusic({ commit, dispatch }, payload) {
    commit(UPDATE_CALL_CENTER_OFF_MUSIC_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}callcenter_setting/callcenter_off_music`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update call center off music config", config);

    axios(config)
      .then(function (response) {
        console.log("update setting audio response", response.data);
        commit(UPDATE_CALL_CENTER_OFF_MUSIC_SUCCESS, response.data);
        dispatch("getCallCenterOffMusic");
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
          commit(UPDATE_CALL_CENTER_OFF_MUSIC_FAIL, error.response.data);
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
