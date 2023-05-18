import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const CREATE_ACCOUNT_NUMBER_REQUEST = "CREATE_ACCOUNT_NUMBER_REQUEST";
export const CREATE_ACCOUNT_NUMBER_SUCCESS = "CREATE_ACCOUNT_NUMBER_SUCCESS";
export const CREATE_ACCOUNT_NUMBER_FAIL = "CREATE_ACCOUNT_NUMBER_FAIL";
export const UPDATE_ACCOUNT_NUMBER_REQUEST = "UPDATE_ACCOUNT_NUMBER_REQUEST";
export const UPDATE_ACCOUNT_NUMBER_SUCCESS = "UPDATE_ACCOUNT_NUMBER_SUCCESS";
export const UPDATE_ACCOUNT_NUMBER_FAIL = "UPDATE_ACCOUNT_NUMBER_FAIL";
export const ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_REQUEST =
  "ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_REQUEST";
export const ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_SUCCESS =
  "ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_SUCCESS";
export const ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_FAIL =
  "ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_FAIL";
export const GET_ACCOUNT_NUMBERS_REQUEST = "GET_ACCOUNT_NUMBERS_REQUEST";
export const GET_ACCOUNT_NUMBERS_SUCCESS = "GET_ACCOUNT_NUMBERS_SUCCESS";
export const GET_ACCOUNT_NUMBERS_FAIL = "GET_ACCOUNT_NUMBERS_FAIL";
export const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST";
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
export const CREATE_ACCOUNT_FAIL = "CREATE_ACCOUNT_FAIL";
export const UPDATE_ACCOUNT_REQUEST = "UPDATE_ACCOUNT_REQUEST";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_FAIL = "UPDATE_ACCOUNT_FAIL";
export const GET_ACCOUNTS_REQUEST = "GET_ACCOUNTS_REQUEST";
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS";
export const GET_ACCOUNTS_FAIL = "GET_ACCOUNTS_FAIL";
export const GET_ACCOUNT_DETAIL_REQUEST = "GET_ACCOUNT_DETAIL_REQUEST";
export const GET_ACCOUNT_DETAIL_SUCCESS = "GET_ACCOUNT_DETAIL_SUCCESS";
export const GET_ACCOUNT_DETAIL_FAIL = "GET_ACCOUNT_DETAIL_FAIL";
export const GET_ACCOUNT_PENDING_REQUEST = "GET_ACCOUNT_PENDING_REQUEST";
export const GET_ACCOUNT_PENDING_SUCCESS = "GET_ACCOUNT_PENDING_SUCCESS";
export const GET_ACCOUNT_PENDING_FAIL = "GET_ACCOUNT_PENDING_FAIL";
export const GET_ACCOUNT_DETAIL_PENDING_REQUEST =
  "GET_ACCOUNT_DETAIL_PENDING_REQUEST";
export const GET_ACCOUNT_DETAIL_PENDING_SUCCESS =
  "GET_ACCOUNT_DETAIL_PENDING_SUCCESS";
export const GET_ACCOUNT_DETAIL_PENDING_FAIL =
  "GET_ACCOUNT_DETAIL_PENDING_FAIL";
export const ACCOUNT_APPROVE_REQUEST_REQUEST =
  "ACCOUNT_APPROVE_REQUEST_REQUEST";
export const ACCOUNT_APPROVE_REQUEST_SUCCESS =
  "ACCOUNT_APPROVE_REQUEST_SUCCESS";
export const ACCOUNT_APPROVE_REQUEST_FAIL = "ACCOUNT_APPROVE_REQUEST_FAIL";

const state = {
  loadingAccount: false,
  successAccount: "",
  errorAccount: "",
  accountNumbers: [],
  selectAccountNumbers: [],
  account: [],
  selectAccount: [],
  accountDetails: [],
  accountPending: [],
  accountDetailPending: [],
};

const getters = {
  loadingAccount: (state) => state.loadingAccount,
  successAccount: (state) => state.successAccount,
  errorAccount: (state) => state.errorAccount,
  accountNumbers: (state) => state.accountNumbers,
  selectAccountNumbers: (state) => state.selectAccountNumbers,
  account: (state) => state.account,
  selectAccount: (state) => state.selectAccount,
  accountDetails: (state) => state.accountDetails,
  accountPending: (state) => state.accountPending,
  accountDetailPending: (state) => state.accountDetailPending,
};

const mutations = {
  /* 
    CREATE ACCOUNT NUMBER
  */
  [CREATE_ACCOUNT_NUMBER_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [CREATE_ACCOUNT_NUMBER_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [CREATE_ACCOUNT_NUMBER_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
    UPDATE ACCOUNT NUMBER
  */
  [UPDATE_ACCOUNT_NUMBER_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [UPDATE_ACCOUNT_NUMBER_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [UPDATE_ACCOUNT_NUMBER_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
    ASSIGN ACCOUNT NUMBER TO ACCOUNT TYPE
  */
  [ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
   GET ACCOUNT NUMBERS
  */
  [GET_ACCOUNT_NUMBERS_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [GET_ACCOUNT_NUMBERS_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.accountNumbers = payload;
    state.selectAccountNumbers = payload.map((acc) => {
      return { label: acc.name, value: acc.id };
    });
  },
  [GET_ACCOUNT_NUMBERS_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
   CREATE ACCOUNT
  */
  [CREATE_ACCOUNT_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [CREATE_ACCOUNT_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [CREATE_ACCOUNT_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
   UPDATE ACCOUNT
  */
  [UPDATE_ACCOUNT_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [UPDATE_ACCOUNT_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [UPDATE_ACCOUNT_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
   GET ACCOUNTS
  */
  [GET_ACCOUNTS_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [GET_ACCOUNTS_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.account = payload;
    state.selectAccount = payload.data.map((acc) => {
      return { label: acc.account_number, value: acc.id };
    });
  },
  [GET_ACCOUNTS_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
    GET ACCOUNT DETAIL
  */
  [GET_ACCOUNT_DETAIL_REQUEST](state) {
    state.loadingContact = true;
    state.errorContact = "";
  },
  [GET_ACCOUNT_DETAIL_SUCCESS](state, payload) {
    state.loadingContact = false;
    state.accountDetails = payload;
  },
  [GET_ACCOUNT_DETAIL_FAIL](state, errorContact) {
    state.loadingContact = false;
    state.errorContact = errorContact;
  },
  /* 
   GET ACCOUNT PENDING
  */
  [GET_ACCOUNT_PENDING_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [GET_ACCOUNT_PENDING_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.accountPending = payload;
  },
  [GET_ACCOUNT_PENDING_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
   GET ACCOUNT DETAIL PENDING
  */
  [GET_ACCOUNT_DETAIL_PENDING_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [GET_ACCOUNT_DETAIL_PENDING_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.accountDetailPending = payload;
  },
  [GET_ACCOUNT_DETAIL_PENDING_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
  /* 
    ACCOUNT APPROVE REQUEST
  */
  [ACCOUNT_APPROVE_REQUEST_REQUEST](state) {
    state.loadingAccount = true;
    state.errorAccount = "";
  },
  [ACCOUNT_APPROVE_REQUEST_SUCCESS](state, payload) {
    state.loadingAccount = false;
    state.successAccount = payload.message;
  },
  [ACCOUNT_APPROVE_REQUEST_FAIL](state, errorAccount) {
    state.loadingAccount = false;
    state.errorAccount = errorAccount;
  },
};

const actions = {
  /* 
    CREATE ACCOUNT NUMBER
  */
  async createAccountNumber({ commit, dispatch }, payload) {
    commit(CREATE_ACCOUNT_NUMBER_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/create_account_number`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create account number config", config);

    axios(config)
      .then(function (response) {
        console.log("create account number response", response.data);
        commit(CREATE_ACCOUNT_NUMBER_SUCCESS, response.data);
        dispatch("getAccountNumbers");
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
          commit(CREATE_ACCOUNT_NUMBER_FAIL, error.response.data);
          dispatch("getAccountNumbers");
        }
      });
  },
  /* 
    UPDATE ACCOUNT NUMBER
  */
  async updateAccountNumber({ commit, dispatch }, payload) {
    commit(UPDATE_ACCOUNT_NUMBER_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/update_account_number`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update account number config", config);

    axios(config)
      .then(function (response) {
        console.log("update account number response", response.data);
        commit(UPDATE_ACCOUNT_NUMBER_SUCCESS, response.data);
        dispatch("getAccountNumbers");
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
          commit(UPDATE_ACCOUNT_NUMBER_FAIL, error.response.data);
          dispatch("getAccountNumbers");
        }
      });
  },
  /* 
    ASSIGN ACCOUNT NUMBER TO ACCOUNT TYPE
  */
  async assignAccountNumberToAccountType({ commit, dispatch }, payload) {
    commit(ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/assign_account_number_to_account_type`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign account number to account type config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "assign account number to account type response",
          response.data
        );
        commit(ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_SUCCESS, response.data);
        dispatch("getAccountTypes");
        dispatch("getAccountNumbers");
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
          commit(
            ASSIGN_ACCOUNT_NUMBER_TO_ACCOUNT_TYPE_FAIL,
            error.response.data
          );
          dispatch("getAccountTypes");
          dispatch("getAccountNumbers");
        }
      });
  },
  /* 
    GET ACCOUNT NUMBERS
  */
  async getAccountNumbers({ commit }, payload) {
    commit(GET_ACCOUNT_NUMBERS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_numbers`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account numbers config", config);

    axios(config)
      .then(function (response) {
        console.log("get account numbers response", response.data);
        commit(GET_ACCOUNT_NUMBERS_SUCCESS, response.data);
        // dispatch("getAccountNumbers");
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
          commit(GET_ACCOUNT_NUMBERS_FAIL, error.response.data);
          // dispatch("getAccountNumbers");
        }
      });
  },
  /* 
    CREATE ACCOUNT
  */
  async createAccount({ commit, dispatch }, payload) {
    commit(CREATE_ACCOUNT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}account/create_account`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create account config", config);

    axios(config)
      .then(function (response) {
        console.log("create account response", response.data);
        commit(CREATE_ACCOUNT_SUCCESS, response.data);
        dispatch("getAccounts");
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
          console.log(
            "I AM LOGGING FAILURE IN CREATING ACCOUNT",
            error.response.data
          );
          commit(CREATE_ACCOUNT_FAIL, error.response.data);
          dispatch("getAccounts");
        }
      });
  },
  /* 
    UPDATE ACCOUNT
  */
  async updateAccount({ commit, dispatch }, payload) {
    commit(UPDATE_ACCOUNT_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/update_account`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("UPDATE account config", config);

    axios(config)
      .then(function (response) {
        console.log("UPDATE account response", response.data);
        commit(UPDATE_ACCOUNT_SUCCESS, response.data);
        dispatch("getAccounts");
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
          commit(UPDATE_ACCOUNT_FAIL, error.response.data);
          dispatch("getAccounts");
        }
      });
  },
  /* 
    GET ACCOUNTS
  */
  async getAccounts({ commit }, payload) {
    commit(GET_ACCOUNTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_accounts`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get accounts config", config);

    axios(config)
      .then(function (response) {
        console.log("get accounts response", response.data);
        commit(GET_ACCOUNTS_SUCCESS, response.data);
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
          commit(GET_ACCOUNTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET ACCOUNT DETAIL
  */
  async getAccountDetail({ commit }, payload) {
    commit(GET_ACCOUNT_DETAIL_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_detail?account_id=${payload.account_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get account detail config", config);

    axios(config)
      .then(function (response) {
        console.log("get account detail response", response.data);
        commit(GET_ACCOUNT_DETAIL_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_DETAIL_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET ACCOUNT PENDING
  */
  async getAccountsPending({ commit }, payload) {
    commit(GET_ACCOUNT_PENDING_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_pending`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get accounts pending config", config);

    axios(config)
      .then(function (response) {
        console.log("get accounts pending response", response.data);
        commit(GET_ACCOUNT_PENDING_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_PENDING_FAIL, error.response.data);
        }
      });
  },
  /* 
    GET ACCOUNT DETAIL PENDING
  */
  async getAccountsDetailPending({ commit }, payload) {
    commit(GET_ACCOUNT_DETAIL_PENDING_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}account/get_account_detail_pending?account_id=${payload.account_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get accounts detail pending config", config);

    axios(config)
      .then(function (response) {
        console.log("get accounts detail pending response", response.data);
        commit(GET_ACCOUNT_DETAIL_PENDING_SUCCESS, response.data);
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
          commit(GET_ACCOUNT_DETAIL_PENDING_FAIL, error.response.data);
        }
      });
  },
  /* 
     ACCOUNT APPROVE REQUEST
  */
  async accountApproveRequest({ commit, dispatch }, payload) {
    commit(ACCOUNT_APPROVE_REQUEST_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}account/account_approve_request`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("account approve request config", config);

    axios(config)
      .then(function (response) {
        console.log("account approve request response", response.data);
        commit(ACCOUNT_APPROVE_REQUEST_SUCCESS, response.data);
        dispatch("getAccountsPending");
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
          commit(ACCOUNT_APPROVE_REQUEST_FAIL, error.response.data);
          dispatch("getAccountsPending");
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
