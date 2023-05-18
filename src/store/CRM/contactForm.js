import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_CONTACT_FORM_ITEMS_REQUEST =
  "CREATE_CONTACT_FORM_ITEMS_REQUEST";
export const CREATE_CONTACT_FORM_ITEMS_SUCCESS =
  "CREATE_CONTACT_FORM_ITEMS_SUCCESS";
export const CREATE_CONTACT_FORM_ITEMS_FAIL = "CREATE_CONTACT_FORM_ITEMS_FAIL";
export const ADD_CONTACT_FORM_ITEMS_REQUEST = "ADD_CONTACT_FORM_ITEMS_REQUEST";
export const ADD_CONTACT_FORM_ITEMS_SUCCESS = "ADD_CONTACT_FORM_ITEMS_SUCCESS";
export const ADD_CONTACT_FORM_ITEMS_FAIL = "ADD_CONTACT_FORM_ITEMS_FAIL";
export const UPDATE_CONTACT_FORM_ITEMS_REQUEST =
  "UPDATE_CONTACT_FORM_ITEMS_REQUEST";
export const UPDATE_CONTACT_FORM_ITEMS_SUCCESS =
  "UPDATE_CONTACT_FORM_ITEMS_SUCCESS";
export const UPDATE_CONTACT_FORM_ITEMS_FAIL = "UPDATE_CONTACT_FORM_ITEMS_FAIL";
export const UPDATE_FORM_SEQUENCE_REQUEST = "UPDATE_FORM_SEQUENCE_REQUEST";
export const UPDATE_FORM_SEQUENCE_SUCCESS = "UPDATE_FORM_SEQUENCE_SUCCESS";
export const UPDATE_FORM_SEQUENCE_FAIL = "UPDATE_FORM_SEQUENCE_FAIL";
export const GET_CONTACT_FORM_ITEMS_REQUEST = "GET_CONTACT_FORM_ITEMS_REQUEST";
export const GET_CONTACT_FORM_ITEMS_SUCCESS = "GET_CONTACT_FORM_ITEMS_SUCCESS";
export const GET_CONTACT_FORM_ITEMS_FAIL = "GET_CONTACT_FORM_ITEMS_FAIL";
export const CREATE_CONTACT_FORM_REQUEST = "CREATE_CONTACT_FORM_REQUEST";
export const CREATE_CONTACT_FORM_SUCCESS = "CREATE_CONTACT_FORM_SUCCESS";
export const CREATE_CONTACT_FORM_FAIL = "CREATE_CONTACT_FORM_FAIL";
export const UPDATE_CONTACT_FORM_REQUEST = "UPDATE_CONTACT_FORM_REQUEST";
export const UPDATE_CONTACT_FORM_SUCCESS = "UPDATE_CONTACT_FORM_SUCCESS";
export const UPDATE_CONTACT_FORM_FAIL = "UPDATE_CONTACT_FORM_FAIL";
export const GET_CONTACT_FORM_REQUEST = "GET_CONTACT_FORM_REQUEST";
export const GET_CONTACT_FORM_SUCCESS = "GET_CONTACT_FORM_SUCCESS";
export const GET_CONTACT_FORM_FAIL = "GET_CONTACT_FORM_FAIL";
export const ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_REQUEST =
  "ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_REQUEST";
export const ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_SUCCESS =
  "ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_SUCCESS";
export const ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_FAIL =
  "ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_FAIL";

const state = {
  loadingContactForm: false,
  successContactForm: "",
  errorContactForm: "",
  contactForms: [],
  selectContactForms: [],
  contactFormItems: [],
};

const getters = {
  loadingContactForm: (state) => state.loadingContactForm,
  successContactForm: (state) => state.successContactForm,
  errorContactForm: (state) => state.errorContactForm,
  contactForms: (state) => state.contactForms,
  selectContactForms: (state) => state.selectContactForms,
  contactFormItems: (state) => state.contactFormItems,
};

const mutations = {
  /* 
    CREATE CONTACT FORM ITEMS
  */
  [CREATE_CONTACT_FORM_ITEMS_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [CREATE_CONTACT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
    localStorage.removeItem("Contact Form Info");
    localStorage.removeItem("currentContactFormId");
  },
  [CREATE_CONTACT_FORM_ITEMS_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    ADD CONTACT FORM ITEMS
  */
  [ADD_CONTACT_FORM_ITEMS_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [ADD_CONTACT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [ADD_CONTACT_FORM_ITEMS_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    UPDATE CONTACT FORM ITEMS
  */
  [UPDATE_CONTACT_FORM_ITEMS_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [UPDATE_CONTACT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [UPDATE_CONTACT_FORM_ITEMS_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    UPDATE FORM SEQUENCE
  */
  [UPDATE_FORM_SEQUENCE_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [UPDATE_FORM_SEQUENCE_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [UPDATE_FORM_SEQUENCE_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    GET CONTACT FORM ITEMS
  */
  [GET_CONTACT_FORM_ITEMS_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [GET_CONTACT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.contactFormItems = payload;
    var formItem = [{ multipleNames: [], form_items: [] }];
    for (var i = 0; i < payload.length; i++) {
      if (
        payload[i].data_type == "firstname" ||
        payload[i].data_type == "maidenname" ||
        payload[i].data_type == "lastname" ||
        payload[i].data_type == "multiplenames"
      ) {
        formItem[0].multipleNames.push({
          name: payload[i].name,
          placeholder: payload[i].place_holder,
          is_required: payload[i].is_required,
          data_type: payload[i].data_type,
          is_masked: payload[i].is_masked,
          sequence: payload[i].sequence,
        });
      } else if (payload[i].data_type == "select") {
        var selections = [];
        for (var s = 0; s < payload[i].contact_form_attr_opts.length; s++) {
          selections.push({
            option: payload[i].contact_form_attr_opts[s].option_name,
          });
        }
        formItem[0].form_items.push({
          name: payload[i].name,
          placeholder: payload[i].place_holder,
          is_required: payload[i].is_required,
          data_type: payload[i].data_type,
          is_masked: payload[i].is_masked,
          sequence: payload[i].sequence,
          options: selections,
        });
      } else {
        formItem[0].form_items.push({
          name: payload[i].name,
          placeholder: payload[i].place_holder,
          is_required: payload[i].is_required,
          data_type: payload[i].data_type,
          is_masked: payload[i].is_masked,
          sequence: payload[i].sequence,
        });
      }
    }
    console.log("form items constructed", formItem);
    localStorage.setItem("Contact Form Info", JSON.stringify(formItem));
  },
  [GET_CONTACT_FORM_ITEMS_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    CREATE CONTACT FORM
  */
  [CREATE_CONTACT_FORM_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [CREATE_CONTACT_FORM_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [CREATE_CONTACT_FORM_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    UPDATE CONTACT FORM
  */
  [UPDATE_CONTACT_FORM_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [UPDATE_CONTACT_FORM_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [UPDATE_CONTACT_FORM_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    GET CONTACT FORM
  */
  [GET_CONTACT_FORM_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [GET_CONTACT_FORM_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.contactForms = payload;
    state.selectContactForms = payload.map((contact) => {
      return { label: contact.name, value: contact.id };
    });
  },
  [GET_CONTACT_FORM_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
  /* 
    ASSIGN CONTACT FORM ACCOUNT TYPE
  */
  [ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingContactForm = true;
    state.errorContactForm = "";
  },
  [ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingContactForm = false;
    state.successContactForm = payload.message;
  },
  [ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_FAIL](state, errorContactForm) {
    state.loadingContactForm = false;
    state.errorContactForm = errorContactForm;
  },
};

const actions = {
  /* 
    CREATE CONTACT FORM ITEMS
  */
  async createContactFormItems({ commit, dispatch }, payload) {
    commit(CREATE_CONTACT_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}contact/create_contact_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create CONTACT form items config", config);

    axios(config)
      .then(function (response) {
        console.log("create CONTACT form items response", response.data);
        commit(CREATE_CONTACT_FORM_ITEMS_SUCCESS, response.data);
        router.push({ name: "Forms" });
        dispatch("getContactForms");
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
          commit(CREATE_CONTACT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    ADD CONTACT FORM ITEMS
  */
  async addContactFormItems({ commit, dispatch }, payload) {
    commit(ADD_CONTACT_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}contact/add_contact_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add CONTACT form items config", config);

    axios(config)
      .then(function (response) {
        console.log("add CONTACT form items response", response.data);
        commit(ADD_CONTACT_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(ADD_CONTACT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    UPDATE CONTACT FORM ITEMS
  */
  async updateContactFormItems({ commit, dispatch }, payload) {
    commit(UPDATE_CONTACT_FORM_ITEMS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}contact/update_contact_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update contact form items config", config);

    axios(config)
      .then(function (response) {
        console.log("update contact form items response", response.data);
        commit(UPDATE_CONTACT_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(UPDATE_CONTACT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    UPDATE FORM SEQUENCE
  */
  async updateFormSequence({ commit, dispatch }, payload) {
    commit(UPDATE_FORM_SEQUENCE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}contact/update_form_sequence`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update form sequence config", config);

    axios(config)
      .then(function (response) {
        console.log("update form sequence response", response.data);
        commit(UPDATE_FORM_SEQUENCE_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(UPDATE_FORM_SEQUENCE_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    GET CONTACT FORM ITEMS
  */
  async getContactFormItems({ commit }, payload) {
    commit(GET_CONTACT_FORM_ITEMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_contact_form_items?contact_form_id=${payload.contact_form_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contact form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get contact form items response", response.data);
        commit(GET_CONTACT_FORM_ITEMS_SUCCESS, response.data);
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
          commit(GET_CONTACT_FORM_ITEMS_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE CONTACT FORM
  */
  async createContactForm({ commit, dispatch }, payload) {
    commit(CREATE_CONTACT_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}contact/create_contact_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create contact form config", config);

    axios(config)
      .then(function (response) {
        console.log("create contact form response", response.data);
        commit(CREATE_CONTACT_FORM_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(CREATE_CONTACT_FORM_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    UPDATE CONTACT FORM
  */
  async updateContactForm({ commit, dispatch }, payload) {
    commit(UPDATE_CONTACT_FORM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}contact/update_contact_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update contact form config", config);

    axios(config)
      .then(function (response) {
        console.log("update contact form response", response.data);
        commit(UPDATE_CONTACT_FORM_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(UPDATE_CONTACT_FORM_FAIL, error.response.data);
          dispatch("getContactForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    GET CONTACT FORM 
  */
  async getContactForms({ commit }, payload) {
    commit(GET_CONTACT_FORM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_contact_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contact form config", config);

    axios(config)
      .then(function (response) {
        console.log("get contact form response", response.data);
        commit(GET_CONTACT_FORM_SUCCESS, response.data);
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
          commit(GET_CONTACT_FORM_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN CONTACT FORM ACCOUNT TYPE
  */
  async assignContactFormAccountType({ commit, dispatch }, payload) {
    commit(ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}contact/assign_contact_form_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign contact form account type config", config);

    axios(config)
      .then(function (response) {
        console.log("assign contact form account type response", response.data);
        commit(ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getContactForms");
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
          commit(ASSIGN_CONTACT_FORM_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getContactForms");
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
