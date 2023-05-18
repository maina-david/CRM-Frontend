import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_CENTRAL_FORM_REQUEST = "CREATE_CENTRAL_FORM_REQUEST";
export const CREATE_CENTRAL_FORM_SUCCESS = "CREATE_CENTRAL_FORM_SUCCESS";
export const CREATE_CENTRAL_FORM_FAIL = "CREATE_CENTRAL_FORM_FAIL";
export const CREATE_CENTRAL_FORM_ITEMS_REQUEST =
  "CREATE_CENTRAL_FORM_ITEMS_REQUEST";
export const CREATE_CENTRAL_FORM_ITEMS_SUCCESS =
  "CREATE_CENTRAL_FORM_ITEMS_SUCCESS";
export const CREATE_CENTRAL_FORM_ITEMS_FAIL = "CREATE_CENTRAL_FORM_ITEMS_FAIL";
export const UPDATE_CENTRAL_FORM_ITEMS_REQUEST =
  "UPDATE_CENTRAL_FORM_ITEMS_REQUEST";
export const UPDATE_CENTRAL_FORM_ITEMS_SUCCESS =
  "UPDATE_CENTRAL_FORM_ITEMS_SUCCESS";
export const UPDATE_CENTRAL_FORM_ITEMS_FAIL = "UPDATE_CENTRAL_FORM_ITEMS_FAIL";
export const ADD_CENTRAL_FORM_ITEMS_REQUEST = "ADD_CENTRAL_FORM_ITEMS_REQUEST";
export const ADD_CENTRAL_FORM_ITEMS_SUCCESS = "ADD_CENTRAL_FORM_ITEMS_SUCCESS";
export const ADD_CENTRAL_FORM_ITEMS_FAIL = "ADD_CENTRAL_FORM_ITEMS_FAIL";

export const EDIT_CENTRAL_FORM_REQUEST = "EDIT_CENTRAL_FORM_REQUEST";
export const EDIT_CENTRAL_FORM_SUCCESS = "EDIT_CENTRAL_FORM_SUCCESS";
export const EDIT_CENTRAL_FORM_FAIL = "EDIT_CENTRAL_FORM_FAIL";
export const UPDATE_FORM_SEQUENCE_REQUEST = "UPDATE_FORM_SEQUENCE_REQUEST";
export const UPDATE_FORM_SEQUENCE_SUCCESS = "UPDATE_FORM_SEQUENCE_SUCCESS";
export const UPDATE_FORM_SEQUENCE_FAIL = "UPDATE_FORM_SEQUENCE_FAIL";
export const GET_CENTRAL_FORMS_ITEMS_REQUEST =
  "GET_CENTRAL_FORMS_ITEMS_REQUEST";
export const GET_CENTRAL_FORMS_ITEMS_SUCCESS =
  "GET_CENTRAL_FORMS_ITEMS_SUCCESS";
export const GET_CENTRAL_FORMS_ITEMS_FAIL = "GET_CENTRAL_FORMS_ITEMS_FAIL";
export const GET_CENTRAL_FORMS_REQUEST = "GET_CENTRAL_FORMS_REQUEST";
export const GET_CENTRAL_FORMS_SUCCESS = "GET_CENTRAL_FORMS_SUCCESS";
export const GET_CENTRAL_FORMS_FAIL = "GET_CENTRAL_FORMS_FAIL";
export const GET_CENTRAL_FORMS_HELPDESK_REQUEST =
  "GET_CENTRAL__HELPDESK_FORMS_REQUEST";
export const GET_CENTRAL_FORMS_HELPDESK_SUCCESS =
  "GET_CENTRAL_HELPDESK_FORMS_SUCCESS";
export const GET_CENTRAL_FORMS_HELPDESK_FAIL =
  "GET_CENTRAL_HELPDESK_FORMS_FAIL";
export const STORE_SURVEY_FORM = "STORE_SURVEY_FORM";

const state = {
  loadingCENTRALForms: false,
  successCENTRALForms: "",
  errorCENTRALForms: "",
  CENTRALForms: [],
  centralFormsSurvey: [],
  selectCENTRALForms: [],
  CENTRALFormItems: [],
  CENTRALFormsHelpdesk: [],
  selectCENTRALFormsHelpdesk: [],
  errorCENTRALFormsHelpdesk: "",
  currentSurveyForm: "",
  selectCentralFormsSurvey: [],
};

const getters = {
  loadingCENTRALForms: (state) => state.loadingCENTRALForms,
  successCENTRALForms: (state) => state.successCENTRALForms,
  errorCENTRALForms: (state) => state.errorCENTRALForms,
  CENTRALForms: (state) => state.CENTRALForms,
  selectCENTRALForms: (state) => state.selectCENTRALForms,
  CENTRALFormItems: (state) => state.CENTRALFormItems,
  errorCENTRALFormsHelpdesk: (state) => state.errorCENTRALFormsHelpdesk,
  CENTRALFormsHelpdesk: (state) => state.CENTRALFormsHelpdesk,
  selectCENTRALFormsHelpdesk: (state) => state.selectCENTRALFormsHelpdesk,
  centralFormsSurvey: (state) => state.centralFormsSurvey,
  currentSurveyForm: (state) => state.currentSurveyForm,
  selectCentralFormsSurvey: (state) => state.selectCentralFormsSurvey,
};

const mutations = {
  /* 
    CREATE CENTRAL FORM
  */
  [STORE_SURVEY_FORM](state, payload) {
    state.currentSurveyForm = payload;
  },
  [CREATE_CENTRAL_FORM_REQUEST](state) {
    state.loadingCampaign = true;
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [CREATE_CENTRAL_FORM_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.loadingCampaign = false;
    state.successCENTRALForms = payload.message;
  },
  [CREATE_CENTRAL_FORM_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.loadingCampaign = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    CREATE CENTRAL FORM ITEMS
  */
  [CREATE_CENTRAL_FORM_ITEMS_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.loadingCampaign = true;
    state.errorCENTRALForms = "";
  },
  [CREATE_CENTRAL_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.loadingCampaign = false;
    state.successCENTRALForms = payload.message;
    localStorage.removeItem("Form Info");
    localStorage.removeItem("currentCENTRALFormId");
  },
  [CREATE_CENTRAL_FORM_ITEMS_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.loadingCampaign = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    UPDATE CENTRAL FORM ITEMS
  */
  [UPDATE_CENTRAL_FORM_ITEMS_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [UPDATE_CENTRAL_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.successCENTRALForms = payload.message;
  },
  [UPDATE_CENTRAL_FORM_ITEMS_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    ADD CENTRAL FORM ITEMS
  */
  [ADD_CENTRAL_FORM_ITEMS_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [ADD_CENTRAL_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.successCENTRALForms = payload.message;
  },
  [ADD_CENTRAL_FORM_ITEMS_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },

  /* 
    EDIT CENTRAL FORM
  */
  [EDIT_CENTRAL_FORM_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [EDIT_CENTRAL_FORM_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.successCENTRALForms = payload.message;
  },
  [EDIT_CENTRAL_FORM_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    UPDATE FORM SEQUENCE
  */
  [UPDATE_FORM_SEQUENCE_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [UPDATE_FORM_SEQUENCE_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.successCENTRALForms = payload.message;
  },
  [UPDATE_FORM_SEQUENCE_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    GET CENTRAL FORMS ITEMS
  */
  [GET_CENTRAL_FORMS_ITEMS_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [GET_CENTRAL_FORMS_ITEMS_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.CENTRALFormItems = payload;
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
        for (var s = 0; s < payload[i].CENTRAL_form_attr_options.length; s++) {
          selections.push({
            option: payload[i].CENTRAL_form_attr_options[s].option_name,
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
    localStorage.setItem("Form Info", JSON.stringify(formItem));
  },
  [GET_CENTRAL_FORMS_ITEMS_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },
  /* 
    GET CENTRAL FORMS
  */
  [GET_CENTRAL_FORMS_REQUEST](state) {
    state.loadingCENTRALForms = true;
    state.errorCENTRALForms = "";
  },
  [GET_CENTRAL_FORMS_SUCCESS](state, payload) {
    state.loadingCENTRALForms = false;
    state.CENTRALForms = payload;

    state.centralFormsSurvey = payload.filter(function (el) {
      return el.type === "SURVEYFROM";
    });
    console.log("I am getting survey forms", state.centralFormsSurvey);
    state.selectCentralFormsSurvey = state.centralFormsSurvey.map((form) => {
      return { label: form.name, value: form.id };
    });
    console.log(
      "I am getting select survey forms",
      state.selectCentralFormsSurvey
    );
  },
  [GET_CENTRAL_FORMS_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALForms = false;
    state.errorCENTRALForms = errorCENTRALForms;
  },

  /* 
    GET CENTRAL FORMS
  */
  [GET_CENTRAL_FORMS_HELPDESK_REQUEST](state) {
    state.loadingCENTRALFormsHelpdesk = true;
    state.errorCENTRALFormsHelpdesk = "";
  },
  [GET_CENTRAL_FORMS_HELPDESK_SUCCESS](state, payload) {
    state.loadingCENTRALFormsHelpdesk = false;
    state.CENTRALFormsHelpdesk = payload;
    state.selectCENTRALFormsHelpdesk = payload.map((user) => {
      return { label: user.name, value: user.id };
    });
  },
  [GET_CENTRAL_FORMS_HELPDESK_FAIL](state, errorCENTRALForms) {
    state.loadingCENTRALFormsHelpdesk = false;
    state.errorCENTRALFormHelpdesks = errorCENTRALForms;
  },
};

const actions = {
  async storeCurrentSurveyForm({ commit, dispatch }, payload) {
    commit(STORE_SURVEY_FORM, payload);
    console.log("I am storing current surevey form", payload);
    dispatch("getCENTRALFormItemsSurvey");
  },
  /* 
    CREATE CENTRAL FORM
  */
  async createCENTRALForm({ commit, dispatch }, payload) {
    commit(CREATE_CENTRAL_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Centralized/create_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create CENTRAL form config", config);

    axios(config)
      .then(function (response) {
        console.log("create CENTRAL form response", response.data);
        commit(CREATE_CENTRAL_FORM_SUCCESS, response.data);
        dispatch("getCENTRALForms");
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
          commit(CREATE_CENTRAL_FORM_FAIL, error.response.data);
          dispatch("getCENTRALForms");
        }
      });
  },
  /* 
    CREATE CENTRAL FORM ITEMS
  */
  async createCENTRALFormItems({ commit, dispatch }, payload) {
    commit(CREATE_CENTRAL_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Centralized/create_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create CENTRAL form items config", config);

    axios(config)
      .then(function (response) {
        console.log("create CENTRAL form items response", response.data);
        commit(CREATE_CENTRAL_FORM_ITEMS_SUCCESS, response.data);
        router.push({ name: "Forms" });
        dispatch("getCENTRALForms");
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
          commit(CREATE_CENTRAL_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getCENTRALForms");
        }
      });
  },
  /* 
    UPDATE CENTRAL FORM ITEMS
  */
  async updateCENTRALFormItems({ commit, dispatch }, payload) {
    commit(UPDATE_CENTRAL_FORM_ITEMS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}CENTRAL/update_CENTRAL_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("UPDATE CENTRAL form items config", config);

    axios(config)
      .then(function (response) {
        console.log("UPDATE CENTRAL form items response", response.data);
        commit(UPDATE_CENTRAL_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getCENTRALForms");
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
          commit(UPDATE_CENTRAL_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getCENTRALForms");
        }
      });
  },
  /* 
    ADD CENTRAL FORM ITEMS
  */
  async addCENTRALFormItems({ commit, dispatch }, payload) {
    commit(ADD_CENTRAL_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}Centralized/create_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("ADD CENTRAL form items config", config);

    axios(config)
      .then(function (response) {
        console.log("ADD CENTRAL form items response", response.data);
        commit(ADD_CENTRAL_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getCENTRALForms");
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
          commit(ADD_CENTRAL_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getCENTRALForms");
        }
      });
  },

  /* 
    EDIT CENTRAL FORM
  */
  async editCENTRALForm({ commit, dispatch }, payload) {
    commit(EDIT_CENTRAL_FORM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}Centralized/edit_form/` + payload.id,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        name: payload.name,
        description: payload.description,
        type: payload.type,
      },
    };
    console.log("edit CENTRAL form config", config);

    axios(config)
      .then(function (response) {
        console.log("edit CENTRAL form response", response.data);
        commit(EDIT_CENTRAL_FORM_SUCCESS, response.data);
        dispatch("getCENTRALForms");
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
          commit(EDIT_CENTRAL_FORM_FAIL, error.response.data);
          dispatch("getCENTRALForms");
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
      url: `${baseUrl}CENTRAL/update_form_sequence`,
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
        dispatch("getCENTRALForms");
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
          dispatch("getCENTRALForms");
        }
      });
  },
  /* 
    GET CENTRAL FORMS ITEMS
  */
  async getCENTRALFormItems({ commit }, payload) {
    commit(GET_CENTRAL_FORMS_ITEMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Centralized/get_form_items?form_id=` + payload.form_id,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get CENTRAL form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get CENTRAL form items response", response.data);
        commit(GET_CENTRAL_FORMS_ITEMS_SUCCESS, response.data);
        router.push({ name: "EscalationFormBuilder" });
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
          commit(GET_CENTRAL_FORMS_ITEMS_FAIL, error.response.data);
        }
      });
  },

  async getCENTRALFormItemsSurvey({ commit }) {
    commit(GET_CENTRAL_FORMS_ITEMS_REQUEST);

    var config = {
      method: "get",
      url:
        `${baseUrl}Centralized/get_form_items?form_id=` +
        state.currentSurveyForm.id,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {},
    };
    console.log("get CENTRAL form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get CENTRAL form items response", response.data);
        commit(GET_CENTRAL_FORMS_ITEMS_SUCCESS, response.data);

        router.push({ name: "SurveyFormBuilder" });
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
          commit(GET_CENTRAL_FORMS_ITEMS_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET CENTRAL FORMS
  */
  async getCENTRALForms({ commit }, payload) {
    commit(GET_CENTRAL_FORMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Centralized/get_forms`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get CENTRAL forms config", config);

    axios(config)
      .then(function (response) {
        console.log("get CENTRAL forms response", response.data);
        commit(GET_CENTRAL_FORMS_SUCCESS, response.data);
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
          commit(GET_CENTRAL_FORMS_FAIL, error.response.data);
        }
      });
  },

  /* 
    GET CENTRAL FORMS HELDESK
  */
  async getCENTRALFormsHelpdesk({ commit }, payload) {
    commit(GET_CENTRAL_FORMS_HELPDESK_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}Centralized/helpdesk_forms`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get CENTRAL forms config", config);

    axios(config)
      .then(function (response) {
        console.log("get CENTRAL forms response", response.data.helpdesk_forms);
        commit(
          GET_CENTRAL_FORMS_HELPDESK_SUCCESS,
          response.data.helpdesk_forms
        );
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
          commit(GET_CENTRAL_FORMS_HELPDESK_FAIL, error.response.data);
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
