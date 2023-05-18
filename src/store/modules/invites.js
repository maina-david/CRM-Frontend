import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const INVITES_REQUEST = "INVITES_REQUEST";
export const INVITES_SUCCESS = "INVITES_SUCCESS";
export const INVITES_FAIL = "INVITES_FAIL";
export const INVITES_CREATE_REQUEST = "INVITES_CREATE_REQUEST";
export const INVITES_CREATE_SUCCESS = "INVITES_CREATE_SUCCESS";
export const INVITES_CREATE_FAIL = "INVITES_CREATE_FAIL";
export const INVITES_CREATE_FAIL_BULK = "INVITES_CREATE_FAIL_BULK";
export const INVITES_REVOKE_REQUEST = "INVITES_REVOKE_REQUEST";
export const INVITES_REVOKE_SUCCESS = "INVITES_REVOKE_SUCCESS";
export const INVITES_REVOKE_FAIL = "INVITES_REVOKE_FAIL";
export const INVITES_REACTIVATE_REQUEST = "INVITES_REACTIVATE_REQUEST";
export const INVITES_REACTIVATE_SUCCESS = "INVITES_REACTIVATE_SUCCESS";
export const INVITES_REACTIVATE_FAIL = "INVITES_REACTIVATE_FAIL";
export const INVITES_RESEND_REQUEST = "INVITES_RESEND_REQUEST";
export const INVITES_RESEND_SUCCESS = "INVITES_RESEND_SUCCESS";
export const INVITES_RESEND_FAIL = "INVITES_RESEND_FAIL";

export const INVITES_ACCEPT_REQUEST = "INVITES_ACCEPT_REQUEST";
export const INVITES_ACCEPT_SUCCESS = "INVITES_ACCEPT_SUCCESS";
export const INVITES_ACCEPT_FAIL = "INVITES_ACCEPT_FAIL";

const state = {
  loadingInvites: false,
  successInvites: "",
  errorInvites: "",
  errorInvitesBulk: [],
  invites: [],
};

const getters = {
  loadingInvites: (state) => state.loadingInvites,
  successInvites: (state) => state.successInvites,
  errorInvites: (state) => state.errorInvites,
  errorInvitesBulk: (state) => state.errorInvitesBulk,
  invites: (state) => state.invites,
};

const mutations = {
  /* 
    INVITES INFO
  */
  [INVITES_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_SUCCESS](state, payload) {
    state.loadingInvites = false;
    state.invites = payload;
  },
  [INVITES_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },
  /* 
    INVITES CREATE
  */
  [INVITES_CREATE_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_CREATE_SUCCESS](state, payload) {
    state.loadingInvites = false;
    state.successInvites = payload.message;
  },
  [INVITES_CREATE_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },
  [INVITES_CREATE_FAIL_BULK](state, errorInvitesBulk) {
    state.loadingInvites = false;
    state.errorInvitesBulk = errorInvitesBulk;
  },
  /* 
    INVITES REVOKE
  */
  [INVITES_REVOKE_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_REVOKE_SUCCESS](state, payload) {
    state.loadingInvites = false;
    state.successInvites = payload.message;
  },
  [INVITES_REVOKE_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },
  /* 
    INVITES REACTIVATE
  */
  [INVITES_REACTIVATE_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_REACTIVATE_SUCCESS](state, payload) {
    state.loadingInvites = false;
    state.successInvites = payload.message;
  },
  [INVITES_REACTIVATE_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },
  /* 
    INVITES RESEND
  */
  [INVITES_RESEND_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_RESEND_SUCCESS](state, payload) {
    state.loadingInvites = false;
    state.successInvites = payload.message;
  },
  [INVITES_RESEND_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },

  /* 
    INVITES ACCEPT
  */
  [INVITES_ACCEPT_REQUEST](state) {
    state.loadingInvites = true;
    state.errorInvites = "";
  },
  [INVITES_ACCEPT_SUCCESS](state, payload) {
    state.loadingInvites = false;
    localStorage.setItem("userid", payload.user.id);
    localStorage.setItem("username", payload.user.name);
    localStorage.setItem("phone_number", payload.user.phone_number);
    localStorage.setItem("email", payload.user.email);
    localStorage.setItem("company_id", payload.user.company_id);
    localStorage.setItem("status", payload.user.status);
    localStorage.setItem("is_loggedin", payload.user.is_loggedin);
    localStorage.setItem("is_locked", payload.user.is_locked);
    localStorage.setItem("is_owner", payload.user.is_owner);
    localStorage.setItem("token", payload.token);
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
    state.successInvites = payload.message;
    router.replace({ name: "HomePage" });
  },
  [INVITES_ACCEPT_FAIL](state, errorInvites) {
    state.loadingInvites = false;
    state.errorInvites = errorInvites;
  },
};

const actions = {
  /* 
    INVITES INFO 
  */
  async getInvites({ commit }, payload) {
    commit(INVITES_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/get_all_invitations`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        console.log("invites response", response);
        commit(INVITES_SUCCESS, response.data);
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
          commit(INVITES_FAIL, error.response.data);
        }
      });
  },
  /* 
    INVITES CREATE 
  */
  async createInvites({ commit, dispatch }, payload) {
    commit(INVITES_CREATE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/invite_users`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create invites config", config);

    axios(config)
      .then(function (response) {
        if (response.data.has_eror) {
          commit(INVITES_CREATE_FAIL_BULK, response.data.error_message);
        } else {
          commit(INVITES_CREATE_SUCCESS, response.data);
        }
        dispatch("getInvites");
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
          commit(INVITES_CREATE_FAIL, error.response.data);
          dispatch("getInvites");
        }
      });
  },
  /* 
    INVITES REVOKE 
  */
  async revokeInvites({ commit, dispatch }, payload) {
    commit(INVITES_REVOKE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/revoke_invitation`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(INVITES_REVOKE_SUCCESS, response.data);
        dispatch("getInvites");
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
          commit(INVITES_REVOKE_FAIL, error.response.data);
          dispatch("getInvites");
        }
      });
  },
  /* 
    INVITES REACTIVATE 
  */
  async reactivateInvites({ commit, dispatch }, payload) {
    commit(INVITES_REACTIVATE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/reactivate_invite`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(INVITES_REACTIVATE_SUCCESS, response.data);
        dispatch("getInvites");
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
          commit(INVITES_REACTIVATE_FAIL, error.response.data);
          dispatch("getInvites");
        }
      });
  },
  /* 
    INVITES RESEND 
  */
  async resendInvites({ commit, dispatch }, payload) {
    commit(INVITES_RESEND_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/resend_invitation`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(INVITES_RESEND_SUCCESS, response.data);
        dispatch("getInvites");
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
          commit(INVITES_RESEND_FAIL, error.response.data);
          dispatch("getInvites");
        }
      });
  },

  /* 
    INVITES ACCEPT 
  */
  async acceptInvitation({ commit }, payload) {
    commit(INVITES_ACCEPT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/accept_invitation`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        // Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("accept invites config", config);

    axios(config)
      .then(function (response) {
        console.log("accept invites response", response.data);
        commit(INVITES_ACCEPT_SUCCESS, response.data.user);
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
          commit(INVITES_ACCEPT_FAIL, error.response.data);
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
