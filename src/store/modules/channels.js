import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const AVAILABLE_DIDS_REQUEST = "AVAILABLE_DIDS_REQUEST";
export const AVAILABLE_DIDS_SUCCESS = "AVAILABLE_DIDS_SUCCESS";
export const AVAILABLE_DIDS_FAIL = "AVAILABLE_DIDS_FAIL";

export const AVAILABLE_DIDS_FILTERED_REQUEST =
  "AVAILABLE_DIDS_FILTERED_REQUEST";
export const AVAILABLE_DIDS_FILTERED_SUCCESS =
  "AVAILABLE_DIDS_FILTERED_SUCCESS";
export const AVAILABLE_DIDS_FILTERED_FAIL = "AVAILABLE_DIDS_FILTERED_FAIL";

export const ALLOCATED_DIDS_REQUEST = "ALLOCATED_DIDS_REQUEST";
export const ALLOCATED_DIDS_SUCCESS = "ALLOCATED_DIDS_SUCCESS";
export const ALLOCATED_DIDS_FAIL = "ALLOCATED_DIDS_FAIL";
export const ASSIGN_DIDS_REQUEST = "ASSIGN_DIDS_REQUEST";
export const ASSIGN_DIDS_SUCCESS = "ASSIGN_DIDS_SUCCESS";
export const ASSIGN_DIDS_FAIL = "ASSIGN_DIDS_FAIL";
export const REMOVE_DIDS_REQUEST = "REMOVE_DIDS_REQUEST";
export const REMOVE_DIDS_SUCCESS = "REMOVE_DIDS_SUCCESS";
export const REMOVE_DIDS_FAIL = "REMOVE_DIDS_FAIL";
export const GET_AGENT_WITH_CLICK_TO_CALL_SUCCESS =
  "GET_AGENT_WITH_CLICK_TO_CALL_SUCCESS";
export const GET_AGENT_WITH_CLICK_TO_CALL_REQUEST =
  "GET_AGENT_WITH_CLICK_TO_CALL_REQUEST";
export const GET_AGENT_WITH_CLICK_TO_CALL_FAIL =
  "GET_AGENT_WITH_CLICK_TO_CALL_FAIL";
export const ASSIGN_CLICK_TO_CALL_DID_REQUEST =
  "ASSIGN_CLICK_TO_CALL_DID_REQUEST";
export const ASSIGN_CLICK_TO_CALL_DID_SUCCESS =
  "ASSIGN_CLICK_TO_CALL_DID_SUCCESS";
export const ASSIGN_CLICK_TO_CALL_DID_FAIL = "ASSIGN_CLICK_TO_CALL_DID_FAIL";
export const GET_CARRIERS_REQUEST = "GET_CARRIERS_REQUEST";
export const GET_CARRIERS_SUCCESS = "GET_CARRIERS_SUCCESS";
export const GET_CARRIERS_FAIL = "GET_CARRIERS_FAIL";

const state = {
  loadingChannels: false,
  successChannels: "",
  errorChannels: "",
  channels: [],
  availableDids: [],
  availableDidsNumber: "",
  allocatedDids: [],
  selectAllocatedDids: [],
  getAgentsDIDs: [],
  carriers: [],
  availableDidsFiltered: [],
  availableDidsFilteredPageNumber: "",
};

const getters = {
  loadingChannels: (state) => state.loadingChannels,
  successChannels: (state) => state.successChannels,
  errorChannels: (state) => state.errorChannels,
  channels: (state) => state.channels,
  availableDids: (state) => state.availableDids,
  availableDidsNumber: (state) => state.availableDidsNumber,
  allocatedDids: (state) => state.allocatedDids,
  selectAllocatedDids: (state) => state.selectAllocatedDids,
  getAgentsDIDs: (state) => state.getAgentsDIDs,
  carriers: (state) => state.carriers,
  availableDidsFiltered: (state) => state.availableDidsFiltered,
  availableDidsFilteredNumber: (state) => state.availableDidsFilteredNumber,
};

const mutations = {
  /* 
    AVAILABLE DIDS INFO
  */
  [AVAILABLE_DIDS_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [AVAILABLE_DIDS_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.availableDids = payload.data;
    state.availableDidsNumber = payload.last_page;
  },
  [AVAILABLE_DIDS_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
  /* 
    AVAILABLE DIDS Filtered INFO
  */
  [AVAILABLE_DIDS_FILTERED_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [AVAILABLE_DIDS_FILTERED_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.availableDidsFilteredNumber = payload.total;
    state.availableDidsFiltered = payload.data;
  },
  [AVAILABLE_DIDS_FILTERED_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },

  /* 
    GET AGENT WITH DIDS
  */
  [GET_AGENT_WITH_CLICK_TO_CALL_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [GET_AGENT_WITH_CLICK_TO_CALL_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.getAgentsDIDs = payload.data;
    console.log("these are click to call agents", state.getAgentsDIDs);
  },
  [GET_AGENT_WITH_CLICK_TO_CALL_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },

  /* 
    GET AGENT WITH DIDS
  */
  [GET_CARRIERS_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [GET_CARRIERS_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.carriers = payload;
    var Carriers = payload;
    state.carriers = Carriers.map((carrier) => {
      return { label: carrier.name, value: carrier.id };
    });
  },
  [GET_CARRIERS_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
  /* 
    GET AGENT WITH DIDS
  */
  [ASSIGN_CLICK_TO_CALL_DID_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [ASSIGN_CLICK_TO_CALL_DID_SUCCESS](state) {
    state.loadingChannels = false;
  },
  [ASSIGN_CLICK_TO_CALL_DID_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
  /* 
    ALLOCATED DIDS INFO
  */
  [ALLOCATED_DIDS_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [ALLOCATED_DIDS_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.allocatedDids = payload;
    state.selectAllocatedDids = payload.map((did) => {
      return { label: did.did, value: did.id };
    });
  },
  [ALLOCATED_DIDS_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
  /* 
    ASSIGN DIDS INFO
  */
  [ASSIGN_DIDS_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [ASSIGN_DIDS_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.successChannels = payload.message;
  },
  [ASSIGN_DIDS_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
  /* 
    REMOVE DIDS INFO
  */
  [REMOVE_DIDS_REQUEST](state) {
    state.loadingChannels = true;
    state.errorChannels = "";
  },
  [REMOVE_DIDS_SUCCESS](state, payload) {
    state.loadingChannels = false;
    state.successChannels = payload.message;
  },
  [REMOVE_DIDS_FAIL](state, errorChannels) {
    state.loadingChannels = false;
    state.errorChannels = errorChannels;
  },
};

const actions = {
  /* 
    AVAILABLE DIDS INFO 
  */
  async getAvailableDids({ commit }, payload) {
    commit(AVAILABLE_DIDS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channel/view_available_dids_table?${payload}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(AVAILABLE_DIDS_SUCCESS, response.data);
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
          commit(AVAILABLE_DIDS_FAIL, error.response.data);
        }
      });
  },

  /* 
    Carriers 
  */
  async getAvailableCarriers({ commit }, payload) {
    commit(GET_CARRIERS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channel/get_carriers?country_code=${payload.country_code}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(GET_CARRIERS_SUCCESS, response.data);
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
          commit(GET_CARRIERS_FAIL, error.response.data);
        }
      });
  },

  /* 
    AVAILABLE DIDS INFO 
  */
  async getAgentClickToCallDid({ commit }, payload) {
    commit(GET_AGENT_WITH_CLICK_TO_CALL_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_agent_with_click_to_call`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(GET_AGENT_WITH_CLICK_TO_CALL_SUCCESS, response.data);
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
          commit(GET_AGENT_WITH_CLICK_TO_CALL_FAIL, error.response.data);
        }
      });
  },

  /* 
    ASSIGN CLICK TO CALL DIDS
  */
  async assignClickToCallDID({ commit, dispatch }, payload) {
    commit(ASSIGN_CLICK_TO_CALL_DID_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}agent/assign_did_to_agent`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ASSIGN_CLICK_TO_CALL_DID_SUCCESS, response.data);
        dispatch("getAgentClickToCallDid");
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
          commit(ASSIGN_CLICK_TO_CALL_DID_FAIL, error.response.data);
        }
      });
  },

  /* 
    ALLOCATED DIDS INFO 
  */
  async getAllocatedDids({ commit }, payload) {
    commit(ALLOCATED_DIDS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}channel/get_allocated_dids`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ALLOCATED_DIDS_SUCCESS, response.data);
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
          commit(ALLOCATED_DIDS_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN DIDS INFO 
  */
  async assignDids({ commit, dispatch, rootState }, payload) {
    commit(ASSIGN_DIDS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channel/assign_phone_number`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ASSIGN_DIDS_SUCCESS, response.data);
        dispatch("getAvailableDids", {
          country_code: rootState.company.companyAddress.country_code,
        });
        dispatch("getAllocatedDids");
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
          commit(ASSIGN_DIDS_FAIL, error.response.data);
        }
      });
  },
  /* 
    REMOVE DIDS INFO 
  */
  async removeDids({ commit, dispatch, rootState }, payload) {
    commit(REMOVE_DIDS_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}channel/remove_phone_number`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(REMOVE_DIDS_SUCCESS, response.data);
        dispatch("getAvailableDids", {
          country_code: rootState.company.companyAddress.country_code,
        });
        dispatch("getAllocatedDids");
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
          commit(REMOVE_DIDS_FAIL, error.response.data);
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
