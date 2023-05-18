import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const AGENTS_REQUEST = "AGENTS_REQUEST";
export const AGENTS_SUCCESS = "AGENTS_SUCCESS";
export const AGENTS_FAIL = "AGENTS_FAIL";
export const ASSIGN_AGENTS_TO_QUEUE_REQUEST = "ASSIGN_AGENTS_TO_QUEUE_REQUEST";
export const ASSIGN_AGENTS_TO_QUEUE_SUCCESS = "ASSIGN_AGENTS_TO_QUEUE_SUCCESS";
export const ASSIGN_AGENTS_TO_QUEUE_FAIL = "ASSIGN_AGENTS_TO_QUEUE_FAIL";
export const ACTIVE_AGENTS_REQUEST = "ACTIVE_AGENTS_REQUEST";
export const ACTIVE_AGENTS_SUCCESS = "ACTIVE_AGENTS_SUCCESS";
export const ACTIVE_AGENTS_FAIL = "ACTIVE_AGENTS_FAIL";
export const AGENT_STATUS_REQUEST = "AGENT_STATUS_REQUEST";
export const AGENT_STATUS_SUCCESS = "AGENT_STATUS_SUCCESS";
export const AGENT_STATUS_FAIL = "AGENT_STATUS_FAIL";

export const ACTIVE_BREAK_REQUEST = "ACTIVE_BREAK_REQUEST";
export const ACTIVE_BREAK_SUCCESS = "ACTIVE_BREAK_SUCCESS";
export const ACTIVE_BREAK_FAIL = "ACTIVE_BREAK_FAIL";
export const TAKE_BREAK_REQUEST = "TAKE_BREAK_REQUEST";
export const TAKE_BREAK_SUCCESS = "TAKE_BREAK_SUCCESS";
export const TAKE_BREAK_FAIL = "TAKE_BREAK_FAIL";
export const RESUME_FROM_BREAK_REQUEST = "RESUME_FROM_BREAK_REQUEST";
export const RESUME_FROM_BREAK_SUCCESS = "RESUME_FROM_BREAK_SUCCESS";
export const RESUME_FROM_BREAK_FAIL = "RESUME_FROM_BREAK_FAIL";

const state = {
  loadingAgents: false,
  successAgents: "",
  errorAgents: "",
  agents: [],
  selectAgents: [],
  activeAgents: [],
  selectActiveAgents: [],
  sipStatus: "",
  status: "",
  penalty: "",
  activeBreaks: [],
  selectActiveBreaks: [],
};

const getters = {
  loadingAgents: (state) => state.loadingAgents,
  successAgents: (state) => state.successAgents,
  errorAgents: (state) => state.errorAgents,
  agents: (state) => state.agents,
  selectAgents: (state) => state.selectAgents,
  activeAgents: (state) => state.activeAgents,
  sipStatus: (state) => state.sipStatus,
  status: (state) => state.status,
  penalty: (state) => state.penalty,
  activeBreaks: (state) => state.activeBreaks,
  selectActiveBreaks: (state) => state.selectActiveBreaks,
  selectActiveAgents: (state) => state.selectActiveAgents,
};

const mutations = {
  /* 
    AGENTS INFO
  */
  [AGENTS_REQUEST](state) {
    state.loadingAgents = true;
    state.errorAgents = "";
  },
  [AGENTS_SUCCESS](state, payload) {
    state.loadingAgents = false;
    state.agents = payload;
    state.selectAgents = payload.map((agent) => {
      return { label: agent.name, value: agent.id };
    });
  },
  [AGENTS_FAIL](state, errorAgents) {
    state.loadingAgents = false;
    state.errorAgents = errorAgents;
  },
  /* 
    ASSIGN AGENTS TO QUEUE
  */
  [ASSIGN_AGENTS_TO_QUEUE_REQUEST](state) {
    state.loadingAgents = true;
    state.errorAgents = "";
  },
  [ASSIGN_AGENTS_TO_QUEUE_SUCCESS](state, payload) {
    state.loadingAgents = false;
    state.successAgents = payload.message;
  },
  [ASSIGN_AGENTS_TO_QUEUE_FAIL](state, errorAgents) {
    state.loadingAgents = false;
    state.errorAgents = errorAgents;
  },
  /* 
    ACTIVE AGENTS
  */
  [ACTIVE_AGENTS_REQUEST](state) {
    /* state.loadingAgents = true; */
    state.errorAgents = "";
  },
  [ACTIVE_AGENTS_SUCCESS](state, payload) {
    /* state.loadingAgents = false; */
    state.activeAgents = payload;
    state.selectActiveAgents = payload.map((active) => {
      return { label: active.name, value: active.user_id };
    });
    console.log(
      "this is the current active agents select",
      state.selectActiveAgents
    );
    localStorage.setItem(
      "active_agents",
      JSON.stringify(state.selectActiveAgents)
    );
  },

  [ACTIVE_AGENTS_FAIL](state, errorAgents) {
    /* state.loadingAgents = false; */
    state.errorAgents = errorAgents;
  },
  /* 
    AGENT STATUS
  */
  [AGENT_STATUS_REQUEST](state) {
    /* state.loadingAgents = true; */
    state.errorAgents = "";
  },
  [AGENT_STATUS_SUCCESS](state, payload) {
    /* state.loadingAgents = false; */
    state.sipStatus = payload.sip_status;
    state.status = payload.status;
    state.penalty = payload.penality;
  },
  [AGENT_STATUS_FAIL](state, errorAgents) {
    /* state.loadingAgents = false; */
    state.errorAgents = errorAgents;
  },

  /* 
    ACTIVE BREAK
  */
  [ACTIVE_BREAK_REQUEST](state) {
    state.loadingAgents = true;
    state.errorAgents = "";
  },
  [ACTIVE_BREAK_SUCCESS](state, payload) {
    state.loadingAgents = false;
    state.activeBreaks = payload;
    state.selectActiveBreaks = payload.map((active) => {
      return { label: active.name, value: active.id };
    });
  },
  [ACTIVE_BREAK_FAIL](state, errorAgents) {
    state.loadingAgents = false;
    state.errorAgents = errorAgents;
  },
  /* 
    TAKE BREAK
  */
  [TAKE_BREAK_REQUEST](state) {
    state.loadingAgents = true;
    state.errorAgents = "";
  },
  [TAKE_BREAK_SUCCESS](state, payload) {
    state.loadingAgents = false;
    state.successAgents = payload.message;
  },
  [TAKE_BREAK_FAIL](state, errorAgents) {
    state.loadingAgents = false;
    state.errorAgents = errorAgents;
  },
  /* 
    RESUME FROM BREAK
  */
  [RESUME_FROM_BREAK_REQUEST](state) {
    state.loadingAgents = true;
    state.errorAgents = "";
  },
  [RESUME_FROM_BREAK_SUCCESS](state, payload) {
    state.loadingAgents = false;
    state.successAgents = payload.message;
  },
  [RESUME_FROM_BREAK_FAIL](state, errorAgents) {
    state.loadingAgents = false;
    state.errorAgents = errorAgents;
  },
};

const actions = {
  /* 
    AGENTS INFO 
  */
  async getAgents({ commit }, payload) {
    commit(AGENTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}company/get_agents`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(AGENTS_SUCCESS, response.data.agents);
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
          commit(AGENTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN AGENTS TO QUEUE 
  */
  async assignAgentsToQueue({ commit, dispatch }, payload) {
    commit(ASSIGN_AGENTS_TO_QUEUE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}queue/assign_agents_to_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign agents to queue config", config);

    axios(config)
      .then(function (response) {
        console.log("assign agents to queue response", response.data);
        commit(ASSIGN_AGENTS_TO_QUEUE_SUCCESS, response.data);
        dispatch("getAgents");
        dispatch("getQueues");
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
          commit(ASSIGN_AGENTS_TO_QUEUE_FAIL, error.response.data);
          dispatch("getAgents");
          dispatch("getQueues");
        }
      });
  },
  /* 
    ACTIVE AGENTS 
  */
  async getActiveAgents({ commit }, payload) {
    commit(ACTIVE_AGENTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_active_agents`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("active agents config", config);

    axios(config)
      .then(function (response) {
        console.log("active agents response", response.data);
        commit(ACTIVE_AGENTS_SUCCESS, response.data);
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
          commit(ACTIVE_AGENTS_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT STATUS 
  */
  async getAgentStatus({ commit }, payload) {
    commit(AGENT_STATUS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_agent_status`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("agent status config", config);

    axios(config)
      .then(function (response) {
        console.log("agent status response", response.data);
        commit(AGENT_STATUS_SUCCESS, response.data);
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
          commit(AGENT_STATUS_FAIL, error.response.data);
        }
      });
  },

  /* 
    ACTIVE BREAKS INFO 
  */
  async getActiveBreaks({ commit }, payload) {
    commit(ACTIVE_BREAK_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_active_break`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ACTIVE_BREAK_SUCCESS, response.data);
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
          commit(ACTIVE_BREAK_FAIL, error.response.data);
        }
      });
  },
  /* 
    TAKE BREAK 
  */
  async takeBreak({ commit, dispatch }, payload) {
    commit(TAKE_BREAK_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}agent/take_break`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(TAKE_BREAK_SUCCESS, response.data);
        dispatch("getActiveBreaks");
        dispatch("getAgentStatus");
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
          commit(TAKE_BREAK_FAIL, error.response.data);
        }
      });
  },
  /* 
    RESUME FROM BREAK 
  */
  async resumeFromBreak({ commit, dispatch }, payload) {
    commit(RESUME_FROM_BREAK_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}agent/resume_from_break`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(RESUME_FROM_BREAK_SUCCESS, response.data);
        dispatch("getActiveBreaks");
        dispatch("getAgentStatus");
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
          commit(RESUME_FROM_BREAK_FAIL, error.response.data);
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
