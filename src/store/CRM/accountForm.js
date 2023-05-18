import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_ACCOUNT_FORM_REQUEST = "CREATE_ACCOUNT_FORM_REQUEST";
export const CREATE_ACCOUNT_FORM_SUCCESS = "CREATE_ACCOUNT_FORM_SUCCESS";
export const CREATE_ACCOUNT_FORM_FAIL = "CREATE_ACCOUNT_FORM_FAIL";
export const CREATE_ACCOUNT_FORM_ITEMS_REQUEST =
  "CREATE_ACCOUNT_FORM_ITEMS_REQUEST";
export const CREATE_ACCOUNT_FORM_ITEMS_SUCCESS =
  "CREATE_ACCOUNT_FORM_ITEMS_SUCCESS";
export const CREATE_ACCOUNT_FORM_ITEMS_FAIL = "CREATE_ACCOUNT_FORM_ITEMS_FAIL";
export const UPDATE_ACCOUNT_FORM_ITEMS_REQUEST =
  "UPDATE_ACCOUNT_FORM_ITEMS_REQUEST";
export const UPDATE_ACCOUNT_FORM_ITEMS_SUCCESS =
  "UPDATE_ACCOUNT_FORM_ITEMS_SUCCESS";
export const UPDATE_ACCOUNT_FORM_ITEMS_FAIL = "UPDATE_ACCOUNT_FORM_ITEMS_FAIL";
export const ADD_ACCOUNT_FORM_ITEMS_REQUEST = "ADD_ACCOUNT_FORM_ITEMS_REQUEST";
export const ADD_ACCOUNT_FORM_ITEMS_SUCCESS = "ADD_ACCOUNT_FORM_ITEMS_SUCCESS";
export const ADD_ACCOUNT_FORM_ITEMS_FAIL = "ADD_ACCOUNT_FORM_ITEMS_FAIL";
export const ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_REQUEST =
  "ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_REQUEST";
export const ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_SUCCESS =
  "ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_SUCCESS";
export const ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_FAIL =
  "ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_FAIL";
export const EDIT_ACCOUNT_FORM_REQUEST = "EDIT_ACCOUNT_FORM_REQUEST";
export const EDIT_ACCOUNT_FORM_SUCCESS = "EDIT_ACCOUNT_FORM_SUCCESS";
export const EDIT_ACCOUNT_FORM_FAIL = "EDIT_ACCOUNT_FORM_FAIL";
export const UPDATE_FORM_SEQUENCE_REQUEST = "UPDATE_FORM_SEQUENCE_REQUEST";
export const UPDATE_FORM_SEQUENCE_SUCCESS = "UPDATE_FORM_SEQUENCE_SUCCESS";
export const UPDATE_FORM_SEQUENCE_FAIL = "UPDATE_FORM_SEQUENCE_FAIL";
export const GET_ACCOUNT_FORMS_ITEMS_REQUEST =
  "GET_ACCOUNT_FORMS_ITEMS_REQUEST";
export const GET_ACCOUNT_FORMS_ITEMS_SUCCESS =
  "GET_ACCOUNT_FORMS_ITEMS_SUCCESS";
export const GET_ACCOUNT_FORMS_ITEMS_FAIL = "GET_ACCOUNT_FORMS_ITEMS_FAIL";
export const GET_ACCOUNT_FORMS_REQUEST = "GET_ACCOUNT_FORMS_REQUEST";
export const GET_ACCOUNT_FORMS_SUCCESS = "GET_ACCOUNT_FORMS_SUCCESS";
export const GET_ACCOUNT_FORMS_FAIL = "GET_ACCOUNT_FORMS_FAIL";

const state = {
  loadingAccountForms: false,
  successAccountForms: "",
  errorAccountForms: "",
  accountForms: [],
  selectAccountForms: [],
  accountFormItems: [],
};

const getters = {
  loadingAccountForms: (state) => state.loadingAccountForms,
  successAccountForms: (state) => state.successAccountForms,
  errorAccountForms: (state) => state.errorAccountForms,
  accountForms: (state) => state.accountForms,
  selectAccountForms: (state) => state.selectAccountForms,
  accountFormItems: (state) => state.accountFormItems,
};

const mutations = {
  /* 
    CREATE ACCOUNT FORM
  */
  [CREATE_ACCOUNT_FORM_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [CREATE_ACCOUNT_FORM_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [CREATE_ACCOUNT_FORM_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    CREATE ACCOUNT FORM ITEMS
  */
  [CREATE_ACCOUNT_FORM_ITEMS_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [CREATE_ACCOUNT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
    localStorage.removeItem("Form Info");
    localStorage.removeItem("currentAccountFormId");
  },
  [CREATE_ACCOUNT_FORM_ITEMS_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    UPDATE ACCOUNT FORM ITEMS
  */
  [UPDATE_ACCOUNT_FORM_ITEMS_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [UPDATE_ACCOUNT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [UPDATE_ACCOUNT_FORM_ITEMS_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    ADD ACCOUNT FORM ITEMS
  */
  [ADD_ACCOUNT_FORM_ITEMS_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [ADD_ACCOUNT_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [ADD_ACCOUNT_FORM_ITEMS_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
   ASSIGN ACCOUNT FORM TO ACCOUNT TYPE
  */
  [ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    EDIT ACCOUNT FORM
  */
  [EDIT_ACCOUNT_FORM_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [EDIT_ACCOUNT_FORM_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [EDIT_ACCOUNT_FORM_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    UPDATE FORM SEQUENCE
  */
  [UPDATE_FORM_SEQUENCE_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [UPDATE_FORM_SEQUENCE_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.successAccountForms = payload.message;
  },
  [UPDATE_FORM_SEQUENCE_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    GET ACCOUNT FORMS ITEMS
  */
  [GET_ACCOUNT_FORMS_ITEMS_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [GET_ACCOUNT_FORMS_ITEMS_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.accountFormItems = payload;
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
      } else if (
        payload[i].data_type == "select" ||
        payload[i].data_type == "checkbox" ||
        payload[i].data_type == "radio"
      ) {
        var selections = [];
        for (var s = 0; s < payload[i].account_form_attr_options.length; s++) {
          selections.push({
            id: payload[i].account_form_attr_options[s].id,
            option: payload[i].account_form_attr_options[s].option_name,
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
  [GET_ACCOUNT_FORMS_ITEMS_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
  /* 
    GET ACCOUNT FORMS
  */
  [GET_ACCOUNT_FORMS_REQUEST](state) {
    state.loadingAccountForms = true;
    state.errorAccountForms = "";
  },
  [GET_ACCOUNT_FORMS_SUCCESS](state, payload) {
    state.loadingAccountForms = false;
    state.accountForms = payload;
    state.selectAccountForms = payload.map((user) => {
      return { label: user.name, value: user.id };
    });
  },
  [GET_ACCOUNT_FORMS_FAIL](state, errorAccountForms) {
    state.loadingAccountForms = false;
    state.errorAccountForms = errorAccountForms;
  },
};

const actions = {
  /* 
    CREATE ACCOUNT FORM
  */
  async createAccountForm({ commit, dispatch }, payload) {
    commit(CREATE_ACCOUNT_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/create_account_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create account form config", config);

    axios(config)
      .then(function (response) {
        console.log("create account form response", response.data);
        commit(CREATE_ACCOUNT_FORM_SUCCESS, response.data);
        dispatch("getAccountForms");
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
          commit(CREATE_ACCOUNT_FORM_FAIL, error.response.data);
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    CREATE ACCOUNT FORM ITEMS
  */
  async createAccountFormItems({ commit, dispatch }, payload) {
    commit(CREATE_ACCOUNT_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/create_account_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create account form items config", config);

    axios(config)
      .then(function (response) {
        console.log("create account form items response", response.data);
        commit(CREATE_ACCOUNT_FORM_ITEMS_SUCCESS, response.data);
        router.push({ name: "Forms" });
        dispatch("getAccountForms");
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
          commit(CREATE_ACCOUNT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    UPDATE ACCOUNT FORM ITEMS
  */
  async updateAccountFormItems({ commit, dispatch }, payload) {
    commit(UPDATE_ACCOUNT_FORM_ITEMS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/update_account_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("UPDATE account form items config", config);

    axios(config)
      .then(function (response) {
        console.log("UPDATE account form items response", response.data);
        commit(UPDATE_ACCOUNT_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getAccountForms");
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
          commit(UPDATE_ACCOUNT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    ADD ACCOUNT FORM ITEMS
  */
  async addAccountFormItems({ commit, dispatch }, payload) {
    commit(ADD_ACCOUNT_FORM_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/add_account_form_item`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("ADD account form items config", config);

    axios(config)
      .then(function (response) {
        console.log("ADD account form items response", response.data);
        commit(ADD_ACCOUNT_FORM_ITEMS_SUCCESS, response.data);
        dispatch("getAccountForms");
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
          commit(ADD_ACCOUNT_FORM_ITEMS_FAIL, error.response.data);
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    ASSIGN ACCOUNT FORM TO ACCOUNT TYPE
  */
  async assignAccountFormToAccountType({ commit, dispatch }, payload) {
    commit(ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/assign_account_form_to_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign account form to account type config", config);

    axios(config)
      .then(function (response) {
        console.log("edit current user response", response);
        commit(ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountForms");
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
          commit(ASSIGN_ACCOUNT_FORM_TO_ACCOUNT_TYPE_FAIL, error.response.data);
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    EDIT ACCOUNT FORM
  */
  async editAccountForm({ commit, dispatch }, payload) {
    commit(EDIT_ACCOUNT_FORM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/edit_account_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("edit account form config", config);

    axios(config)
      .then(function (response) {
        console.log("edit account form response", response.data);
        commit(EDIT_ACCOUNT_FORM_SUCCESS, response.data);
        dispatch("getAccountForms");
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
          commit(EDIT_ACCOUNT_FORM_FAIL, error.response.data);
          dispatch("getAccountForms");
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
      url: `${baseUrl}account/update_form_sequence`,
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
        dispatch("getAccountForms");
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
          dispatch("getAccountForms");
          dispatch("getAccountTypes");
        }
      });
  },
  /* 
    GET ACCOUNT FORMS ITEMS
  */
  async getAccountFormItems({ commit }, payload) {
    commit(GET_ACCOUNT_FORMS_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/get_account_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get account form items response", response.data);
        commit(GET_ACCOUNT_FORMS_ITEMS_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_FORMS_ITEMS_FAIL, error.response.data);
        }
      });
  },

  /* 
    GET ACCOUNT FORMS ITEMS
  */
  async getAccountFormItemsBuilder({ commit }, payload) {
    commit(GET_ACCOUNT_FORMS_ITEMS_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/get_account_form_items`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get account form items response", response.data);
        commit(GET_ACCOUNT_FORMS_ITEMS_SUCCESS, response.data);
        router.push({ name: "AccountFormBuilder" });
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
          commit(GET_ACCOUNT_FORMS_ITEMS_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET ACCOUNT FORMS
  */
  async getAccountForms({ commit }, payload) {
    commit(GET_ACCOUNT_FORMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_forms`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account forms config", config);

    axios(config)
      .then(function (response) {
        console.log("get account forms response", response.data);
        commit(GET_ACCOUNT_FORMS_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_FORMS_FAIL, error.response.data);
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
