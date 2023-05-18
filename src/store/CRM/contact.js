import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const GET_CONTACT_DETAIL_REQUEST = "GET_CONTACT_DETAIL_REQUEST";
export const GET_CONTACT_DETAIL_SUCCESS = "GET_CONTACT_DETAIL_SUCCESS";
export const GET_CONTACT_DETAIL_FAIL = "GET_CONTACT_DETAIL_FAIL";
export const GET_CONTACTS_REQUEST = "GET_CONTACTS_REQUEST";
export const GET_CONTACTS_SUCCESS = "GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAIL = "GET_CONTACTS_FAIL";
export const GET_CONTACT_PENDING_REQUEST = "GET_CONTACT_PENDING_REQUEST";
export const GET_CONTACT_PENDING_SUCCESS = "GET_CONTACT_PENDING_SUCCESS";
export const GET_CONTACT_PENDING_FAIL = "GET_CONTACT_PENDING_FAIL";
export const GET_CONTACT_DETAIL_PENDING_REQUEST =
  "GET_CONTACT_DETAIL_PENDING_REQUEST";
export const GET_CONTACT_DETAIL_PENDING_SUCCESS =
  "GET_CONTACT_DETAIL_PENDING_SUCCESS";
export const GET_CONTACT_DETAIL_PENDING_FAIL =
  "GET_CONTACT_DETAIL_PENDING_FAIL";
export const CREATE_CONTACT_REQUEST = "CREATE_CONTACT_REQUEST";
export const CREATE_CONTACT_SUCCESS = "CREATE_CONTACT_SUCCESS";
export const CREATE_CONTACT_FAIL = "CREATE_CONTACT_FAIL";
export const CONTACT_APPROVE_REQUEST_REQUEST =
  "CONTACT_APPROVE_REQUEST_REQUEST";
export const CONTACT_APPROVE_REQUEST_SUCCESS =
  "CONTACT_APPROVE_REQUEST_SUCCESS";
export const CONTACT_APPROVE_REQUEST_FAIL = "CONTACT_APPROVE_REQUEST_FAIL";

const state = {
  loadingContact: false,
  successContact: "",
  errorContact: "",
  contacts: [],
  selectContact: [],
  contactDetails: [],
  contactPending: [],
  contactsDetailPending: [],
};

const getters = {
  loadingContact: (state) => state.loadingContact,
  successContact: (state) => state.successContact,
  errorContact: (state) => state.errorContact,
  contacts: (state) => state.contacts,
  selectContact: (state) => state.selectContact,
  contactDetails: (state) => state.contactDetails,
  contactPending: (state) => state.contactPending,
  contactsDetailPending: (state) => state.contactsDetailPending,
};

const mutations = {
  /* 
    GET CONTACT DETAIL
  */
  [GET_CONTACT_DETAIL_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [GET_CONTACT_DETAIL_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.contactDetails = payload;
  },
  [GET_CONTACT_DETAIL_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
    GET CONTACTS
  */
  [GET_CONTACTS_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [GET_CONTACTS_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.contacts = payload;
  },
  [GET_CONTACTS_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
    GET CONTACT PENDING
  */
  [GET_CONTACT_PENDING_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [GET_CONTACT_PENDING_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.contactPending = payload;
  },
  [GET_CONTACT_PENDING_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
   GET CONTACT DETAIL PENDING
  */
  [GET_CONTACT_DETAIL_PENDING_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [GET_CONTACT_DETAIL_PENDING_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.contactsDetailPending = payload;
  },
  [GET_CONTACT_DETAIL_PENDING_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
    CREATE CONTACT
  */
  [CREATE_CONTACT_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [CREATE_CONTACT_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.successContact = payload.message;
  },
  [CREATE_CONTACT_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
    CONTACT APPROVE REQUEST
  */
  [CONTACT_APPROVE_REQUEST_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [CONTACT_APPROVE_REQUEST_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.successContact = payload.message;
  },
  [CONTACT_APPROVE_REQUEST_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
};

const actions = {
  /* 
    GET CONTACT DETAIL
  */
  async getContactDetail({ commit }, payload) {
    commit(GET_CONTACT_DETAIL_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_contact_detail?contact_id=${payload.contact_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contact detail config", config);

    axios(config)
      .then(function (response) {
        console.log("get contact detail response", response.data);
        commit(GET_CONTACT_DETAIL_SUCCESS, response.data);
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
          commit(GET_CONTACT_DETAIL_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET CONTACTS
  */
  async getContacts({ commit }, payload) {
    commit(GET_CONTACTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_contacts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contacts config", config);

    axios(config)
      .then(function (response) {
        console.log("get contacts response", response.data);
        commit(GET_CONTACTS_SUCCESS, response.data);
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
          commit(GET_CONTACTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET CONTACT PENDING
  */
  async getContactPending({ commit }, payload) {
    commit(GET_CONTACT_PENDING_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_contact_pending`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contact pending config", config);

    axios(config)
      .then(function (response) {
        console.log("get contact pending response", response.data);
        commit(GET_CONTACT_PENDING_SUCCESS, response.data);
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
          commit(GET_CONTACT_PENDING_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET CONTACT DETAIL PENDING
  */
  async getContactDetailPending({ commit }, payload) {
    commit(GET_CONTACT_DETAIL_PENDING_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}contact/get_account_detail_pending?contact_id=${payload.contact_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get contact detail pending config", config);

    axios(config)
      .then(function (response) {
        console.log("get contact detail pending response", response.data);
        commit(GET_CONTACT_DETAIL_PENDING_SUCCESS, response.data);
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
          commit(GET_CONTACT_DETAIL_PENDING_FAIL, error.response.data);
        }
      });
  },
  /* 
   CREATE CONTACT
  */
  async createContact({ commit, dispatch }, payload) {
    commit(CREATE_CONTACT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}contact/create_contact`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create contact config", config);

    axios(config)
      .then(function (response) {
        console.log("create contact response", response.data);
        commit(CREATE_CONTACT_SUCCESS, response.data);
        dispatch("getContacts");
        dispatch("getContactPending");
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
          commit(CREATE_CONTACT_FAIL, error.response.data);
          dispatch("getContacts");
          dispatch("getContactPending");
        }
      });
  },
  /* 
     CONTACT APPROVE REQUEST
  */
  async contactApproveRequest({ commit, dispatch }, payload) {
    commit(CONTACT_APPROVE_REQUEST_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}contact/contact_approve_request`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("contact approve request config", config);

    axios(config)
      .then(function (response) {
        console.log("contact approve request response", response.data);
        commit(CONTACT_APPROVE_REQUEST_SUCCESS, response.data);
        dispatch("getContactPending");
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
          commit(CONTACT_APPROVE_REQUEST_FAIL, error.response.data);
          dispatch("getContactPending");
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
