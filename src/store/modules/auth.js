import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAIL = "CHANGE_PASSWORD_FAIL";
export const OTP_REQUEST = "OTP_REQUEST";
export const OTP_SUCCESS = "OTP_SUCCESS";
export const OTP_FAIL = "OTP_FAIL";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const SET_LOG_OUT_SIP = "SET_LOG_OUT_SIP";

const state = {
  loading: false,
  success: "",
  error: "",
  userInfo: [],
  logOutSIP: false,
};

const getters = {
  userInfo: (state) => state.userInfo,
  success: (state) => state.success,
  loading: (state) => state.loading,
  error: (state) => state.error,
  logOutSIP: (state) => state.logOutSIP,
};

const mutations = {
  /* 
    SIGNUP 
  */
  [SIGNUP_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [SIGNUP_SUCCESS](state, payload) {
    state.loading = false;
    state.userInfo = payload;
    state.success = payload.message;
  },
  [SIGNUP_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [SET_LOG_OUT_SIP](state, payload) {
    state.logOutSIP = payload;
  },
  /* 
    LOGIN 
  */
  [LOGIN_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [LOGIN_SUCCESS](state, payload) {
    state.loading = false;
    state.userInfo = payload;
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
      "access_rights_formatted",
      JSON.stringify(
        payload.user.access_rights.map((access_name) => {
          return access_name.access_name;
        })
      )
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
    state.success = payload.message;
  },
  [LOGIN_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  /*
    FORGOT PASSWORD
  */
  [FORGOT_PASSWORD_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [FORGOT_PASSWORD_SUCCESS](state, payload) {
    state.loading = false;
    state.userInfo = payload;
    state.success = payload.message;
  },
  [FORGOT_PASSWORD_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  /*
    CHANGE PASSWORD
  */
  [CHANGE_PASSWORD_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [CHANGE_PASSWORD_SUCCESS](state, payload) {
    state.loading = false;
    state.success = payload.message;
  },
  [CHANGE_PASSWORD_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  /*
    OTP
  */
  [OTP_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [OTP_SUCCESS](state, payload) {
    state.loading = false;
    state.userInfo = payload;
    localStorage.setItem("company_setup_info", {});
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
    state.success = payload.message;
  },
  [OTP_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  /*
    RESET_PASSWORD
  */
  [RESET_PASSWORD_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [RESET_PASSWORD_SUCCESS](state, payload) {
    state.loading = false;
    state.success = payload.message;
  },
  [RESET_PASSWORD_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  /*
    LOGOUT
  */
  [LOGOUT_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [LOGOUT_SUCCESS](state) {
    state.loading = false;
    localStorage.clear();
  },
  [LOGOUT_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
};

const actions = {
  /* 
    SIGNUP 
  */
  async logOutSIPUser({ commit }, payload) {
    commit(SET_LOG_OUT_SIP, payload);
  },

  async signupUser({ commit }, payload) {
    commit(SIGNUP_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/signup`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("sign up new company config", config);

    axios(config)
      .then(function (response) {
        console.log("sign up new company response", response.data);
        commit(SIGNUP_SUCCESS, response.data);
        router.replace({ name: "OTP", params: { email: payload.email } });
      })
      .catch(function (error) {
        console.log(error);
        commit(SIGNUP_FAIL, error.response.data);
      });
  },
  /* 
    LOGIN 
  */
  async loginUser({ commit, dispatch }, payload) {
    commit(LOGIN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/login`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("login config", config);

    axios(config)
      .then(function (response) {
        console.log("login response", response.data);
        commit(LOGIN_SUCCESS, response.data.user);
        router.replace({ name: "HomePage" });
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 422 ||
          error.response.data.message == "Already logged in"
        ) {
          if (
            confirm(
              "To log into this device you will be logged out of other active devices! Continue?"
            ) == true
          ) {
            dispatch("forceLoginUser", payload);
          } else {
            console.log("cancelled force login");
            commit(LOGIN_FAIL, error.response.data);
          }
        } else {
          commit(LOGIN_FAIL, error.response.data);
        }
      });
  },
  /* 
    FORCE LOGIN 
  */
  async forceLoginUser({ commit }, payload) {
    commit(LOGIN_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/force_login`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
      },
      data: payload,
    };
    console.log("force login config", config);

    axios(config)
      .then(function (response) {
        console.log("force login response", response.data);
        commit(LOGIN_SUCCESS, response.data.user);
        router.replace({ name: "HomePage" });
      })
      .catch(function (error) {
        console.log(error);
        commit(LOGIN_FAIL, error.response.data);
      });
  },
  /*
    FORGOT PASSWORD
  */
  async forgotPassword({ commit }, payload) {
    commit(FORGOT_PASSWORD_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/forget_password`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(FORGOT_PASSWORD_SUCCESS, response.data);
        router.replace({
          name: "ResetPassword",
          params: { email: payload.email },
        });
      })
      .catch(function (error) {
        console.log(error);
        commit(FORGOT_PASSWORD_FAIL, error.response.data);
      });
  },
  /*
    CHANGE PASSWORD
  */
  async changePassword({ commit }, payload) {
    commit(CHANGE_PASSWORD_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/change_password`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("change password config", config);

    axios(config)
      .then(function (response) {
        console.log("change password response", response.data);
        commit(CHANGE_PASSWORD_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        commit(CHANGE_PASSWORD_FAIL, error.response.data);
      });
  },
  /*
    OTP
  */
  async otpResponse({ commit }, payload) {
    commit(OTP_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/confirm_email`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("otp config", config);

    axios(config)
      .then(function (response) {
        console.log("otp response", response.data);
        commit(OTP_SUCCESS, response.data.user);
        router.replace({ name: "CompanySetup" });
      })
      .catch(function (error) {
        console.log(error);
        commit(OTP_FAIL, error.response.data);
      });
  },
  /*
    RESET PASSWORD
  */
  async resetPassword({ commit }, payload) {
    commit(RESET_PASSWORD_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/password_reset`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("reset pasword config", config);

    axios(config)
      .then(function (response) {
        console.log("reset password response", response.data);
        commit(RESET_PASSWORD_SUCCESS, response.data);
        router.replace({ name: "LogIn" });
      })
      .catch(function (error) {
        console.log(error);
        commit(RESET_PASSWORD_FAIL, error.response.data);
      });
  },
  /*
    LOGOUT
  */
  async logoutUser({ commit }, payload) {
    commit(LOGOUT_REQUEST);
    var config = {
      method: "post",
      url: `${baseUrl}user/logout`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("logging out in vuex");

    axios(config)
      .then(function (response) {
        commit(SET_LOG_OUT_SIP, true);
        commit(LOGOUT_SUCCESS, response.data);
        router.replace({ name: "LogIn" });
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit(LOGOUT_SUCCESS);
          router.replace({ name: "LogIn" });
        } else {
          commit(LOGOUT_FAIL, error.response.data);
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
