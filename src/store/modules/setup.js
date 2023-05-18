import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const SET_TRACK_COMPANY_SETUP = "SET_TRACK_COMPANY_SETUP";
export const CLEAR_TRACK_COMPANY_SETUP = "CLEAR_TRACK_COMPANY_SETUP";
export const COMPANY_SETUP_REQUEST = "COMPANY_SETUP_REQUEST";
export const COMPANY_SETUP_SUCCESS = "COMPANY_SETUP_SUCCESS";
export const COMPANY_SETUP_FAIL = "COMPANY_SETUP_FAIL";
export const LANGUAGES_REQUEST = "LANGUAGES_REQUEST";
export const LANGUAGES_SUCCESS = "LANGUAGES_SUCCESS";
export const LANGUAGES_FAIL = "LANGUAGES_FAIL";
export const COUNTRY_CODES_REQUEST = "COUNTRY_CODES_REQUEST";
export const COUNTRY_CODES_SUCCESS = "COUNTRY_CODES_SUCCESS";
export const COUNTRY_CODES_FAIL = "COUNTRY_CODES_FAIL";
export const CONTACT_TYPES_REQUEST = "CONTACT_TYPES_REQUEST";
export const CONTACT_TYPES_SUCCESS = "CONTACT_TYPES_SUCCESS";
export const CONTACT_TYPES_FAIL = "CONTACT_TYPES_FAIL";

// const configWithToken = {
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   },
// };

const state = {
  loadingSetup: false,
  successSetup: "",
  errorSetup: "",
  languages: [],
  contact_types: [],
  country_codes: [],
  company: {},
  company_setup_info: {
    company_name: "",
    prefered_language: "",
    logo: "",
    address: {
      country_code: "",
      phone: "",
      email: "",
      city: "",
      office_number: "",
      additional_information: "",
    },
    contacts: [],
  },
};

const getters = {
  loadingSetup: (state) => state.loadingSetup,
  errorSetup: (state) => state.errorSetup,
  successSetup: (state) => state.successSetup,
  company_setup_info: (state) => state.company_setup_info,
  languages: (state) => state.languages,
  country_codes: (state) => state.country_codes,
  contact_types: (state) => state.contact_types,
};

const mutations = {
  /* 
    COMPANY SETUP
  */
  [COMPANY_SETUP_REQUEST](state) {
    state.loadingSetup = true;
    state.errorSetup = "";
  },
  [COMPANY_SETUP_SUCCESS](state, payload) {
    state.loadingSetup = false;
    state.company = payload;
    localStorage.removeItem("company_setup_info");
    localStorage.setItem("userid", payload.user.id);
    localStorage.setItem("username", payload.user.name);
    localStorage.setItem("phone_number", payload.user.phone_number);
    localStorage.setItem("email", payload.user.email);
    localStorage.setItem("company_id", payload.user.company_id);
    localStorage.setItem("status", payload.user.status);
    localStorage.setItem("is_loggedin", payload.user.is_loggedin);
    localStorage.setItem("is_locked", payload.user.is_locked);
    localStorage.setItem("is_owner", payload.user.is_owner);
    localStorage.setItem(
      "access_rights",
      JSON.stringify(payload.user.access_rights)
    );
    localStorage.setItem(
      "role_profile",
      JSON.stringify(payload.user.role_profile)
    );
    if (!payload.user.sip) {
      console.log("no sip");
    } else {
      localStorage.setItem("sip_id", payload.user.sip.sip_id);
      localStorage.setItem("sip_password", payload.user.sip.password);
    }
    state.successSetup = payload.message;
  },
  [COMPANY_SETUP_FAIL](state, errorSetup) {
    state.loadingSetup = false;
    state.errorSetup = errorSetup;
  },
  /* 
    LANGUAGES
  */
  [LANGUAGES_REQUEST](state) {
    state.loadingSetup = true;
    state.errorSetup = "";
  },
  [LANGUAGES_SUCCESS](state, payload) {
    state.loadingSetup = false;
    state.languages = payload;
  },
  [LANGUAGES_FAIL](state, errorSetup) {
    state.loadingSetup = false;
    state.errorSetup = errorSetup;
  },
  /* 
    COUNTRY_CODES
  */
  [COUNTRY_CODES_REQUEST](state) {
    state.loadingSetup = true;
    state.errorSetup = "";
  },
  [COUNTRY_CODES_SUCCESS](state, payload) {
    state.loadingSetup = false;
    state.country_codes = payload;
  },
  [COUNTRY_CODES_FAIL](state, errorSetup) {
    state.loadingSetup = false;
    state.errorSetup = errorSetup;
  },
  /* 
    CONTACT TYPES
  */
  [CONTACT_TYPES_REQUEST](state) {
    state.loadingSetup = true;
    state.errorSetup = "";
  },
  [CONTACT_TYPES_SUCCESS](state, payload) {
    state.loadingSetup = false;
    state.contact_types = payload;
  },
  [CONTACT_TYPES_FAIL](state, errorSetup) {
    state.loadingSetup = false;
    state.errorSetup = errorSetup;
  },
};

const actions = {
  /* 
    COMPANY SETUP 
  */
  async companySetup({ commit }, payload) {
    commit(COMPANY_SETUP_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}company/create_compnay_once`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(COMPANY_SETUP_SUCCESS, response.data);
        router.replace({ name: "HomePage" });
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
          commit(COMPANY_SETUP_FAIL, error.response.data);
          router.replace({ name: "CompanySetup" });
        }
      });
  },
  /* 
    LANGUAGES 
  */
  async getLanguages({ commit }, payload) {
    commit(LANGUAGES_REQUEST);
    try {
      const response = await axios.get(
        `${baseUrl}helper/get_languages`,
        payload
      );
      const languages = response.data.map((lang) => {
        return { label: lang.lang_name, value: lang.lang_code };
      });
      commit(LANGUAGES_SUCCESS, languages);
    } catch (error) {
      console.log(error);
      if (
        error.response.status == 401 ||
        error.response.data.message == "Unauthenticated."
      ) {
        console.log("logged in from another device");
        commit("auth/LOGOUT_SUCCESS", null, { root: true });
        router.replace({ name: "LogIn" });
      } else {
        commit(LANGUAGES_FAIL, error.response.data);
      }
    }
  },
  /* 
    COUNTRY CODES 
  */
  async getCountryCodes({ commit }, payload) {
    commit(COUNTRY_CODES_REQUEST);
    try {
      const response = await axios.get(
        `${baseUrl}helper/get_country_code`,
        payload
      );
      const countryCodes = response.data.map((code) => {
        return { label: code.name, value: code.iso };
      });
      commit(COUNTRY_CODES_SUCCESS, countryCodes);
    } catch (error) {
      console.log(error);
      if (
        error.response.status == 401 ||
        error.response.data.message == "Unauthenticated."
      ) {
        console.log("logged in from another device");
        commit("auth/LOGOUT_SUCCESS", null, { root: true });
        router.replace({ name: "LogIn" });
      } else {
        commit(COUNTRY_CODES_FAIL, error.response.data);
      }
    }
  },
  /* 
    CONTACT TYPES
  */
  async getContactTypes({ commit }, payload) {
    commit(CONTACT_TYPES_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}company/get_company_contact_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        const contactTypes = response.data.map((code) => {
          return { label: code.name, value: code.name };
        });
        commit(CONTACT_TYPES_SUCCESS, contactTypes);
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
          commit(CONTACT_TYPES_FAIL, error.response.data);
        }
      });
  },

  // async getContactTypes({ commit }, payload) {
  //   commit(CONTACT_TYPES_REQUEST);
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}company/get_company_contact_type`,
  //       configWithToken,
  //       payload
  //     );

  //     const contactTypes = response.data.map((code) => {
  //       return { label: code.name, value: code.name };
  //     });
  //     commit(CONTACT_TYPES_SUCCESS, contactTypes);
  //   } catch (error) {
  //     console.log(error);
  //     if (
  //       error.response.status == 401 ||
  //       error.response.data.message == "Unauthenticated."
  //     ) {
  //       console.log("logged in from another device");
  //       commit("auth/LOGOUT_SUCCESS", null, { root: true });
  //       router.replace({ name: "LogIn" });
  //     } else {
  //       commit(CONTACT_TYPES_FAIL, error.response.data);
  //     }
  //   }
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV != "production",
};
