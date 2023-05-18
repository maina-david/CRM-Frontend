import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/*STORE CALL DETAILS
 */

export const GET_DASHBOARD_LIVE_DATA_REQUEST =
  "GET_DASHBOARD_LIVE_DATA_REQUEST";
export const GET_DASHBOARD_LIVE_DATA_SUCCESS =
  "GET_DASHBOARD_LIVE_DATA_SUCCESS";
export const GET_DASHBOARD_LIVE_DATA_FAIL = "GET_DASHBOARD_LIVE_DATA_FAIL";

/*GET ALL CONVERSATIONS PER CHANNEL
 */
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_FAIL =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_FAIL";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_FAIL =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_FAIL";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_FAIL =
  "GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_FAIL";

/*GET ALL CONVERSATIONS PER QUEUE
 */
export const GET_ALL_CONVERSATIONS_PER_QUEUE_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_FAIL =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_FAIL";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_FAIL =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_FAIL";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_FAIL =
  "GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_FAIL";

/*GET ALL CONVERSATIONS PER AGENT
 */
export const GET_ALL_CONVERSATIONS_PER_AGENT_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_AGENT_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_AGENT_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_AGENT_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_AGENT_FAIL =
  "GET_ALL_CONVERSATIONS_PER_AGENT_FAIL";
export const GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_FAIL =
  "GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_FAIL";
export const GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_REQUEST =
  "GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_REQUEST";
export const GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_SUCCESS =
  "GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_SUCCESS";
export const GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_FAIL =
  "GET_ALL_CONVERSATIONS_PER_AGENTL_CLOSED_FAIL";

const state = {
  dashboardLiveData: [],
  allChannels: [],
  allConversationsPerChannel: [],
  allChannelsOpen: [],
  allConversationsPerChannelOpen: [],
  allChannelsClosed: [],
  allConversationsPerChannelClosed: [],
  allQueues: [],
  allConversationsPerQueue: [],
  allQueuesOpen: [],
  allConversationsPerQueueOpen: [],
  allQueuesClosed: [],
  allConversationsPerQueueClosed: [],
  allAgent: [],
  allConversationsPerAgent: [],
  allAgentOpen: [],
  allConversationsPerAgentOpen: [],
  allAgentClosed: [],
  allConversationsPerAgentClosed: [],
};

const getters = {
  dashboardLiveData: (state) => state.dashboardLiveData,
  allChannels: (state) => state.allChannels,
  allConversationsPerChannel: (state) => state.allConversationsPerChannel,
  allChannelsOpen: (state) => state.allChannelsOpen,
  allConversationsPerChannelOpen: (state) =>
    state.allConversationsPerChannelOpen,
  allChannelsClosed: (state) => state.allChannelsClosed,
  allConversationsPerChannelClosed: (state) =>
    state.allConversationsPerChannelClosed,
  allQueues: (state) => state.allQueues,
  allConversationsPerQueue: (state) => state.allConversationsPerQueue,
  allQueuesOpen: (state) => state.allQueuesOpen,
  allConversationsPerQueueOpen: (state) => state.allConversationsPerQueueOpen,
  allQueuesClosed: (state) => state.allQueuesClosed,
  allConversationsPerQueueClosed: (state) =>
    state.allConversationsPerQueueClosed,
  allAgent: (state) => state.allAgent,
  allConversationsPerAgent: (state) => state.allConversationsPerAgent,
  allAgentOpen: (state) => state.allAgentOpen,
  allConversationsPerAgentOpen: (state) => state.allConversationsPerAgentOpen,
  allAgentClosed: (state) => state.allAgentClosed,
  allConversationsPerAgentClosed: (state) =>
    state.allConversationsPerAgentClosed,
};

const mutations = {
  [GET_DASHBOARD_LIVE_DATA_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_DASHBOARD_LIVE_DATA_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.dashboardLiveData = payload;
  },
  [GET_DASHBOARD_LIVE_DATA_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_CHANNEL_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allChannels = payload.map((label) => {
      return label.name;
    });
    console.log("these are the channels", state.allChannels);
    state.allConversationsPerChannel = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the channels data",
      state.allConversationsPerChannel
    );
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allChannelsOpen = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Open channels", state.allChannelsOpen);
    state.allConversationsPerChannelOpen = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the channels Open data",
      state.allConversationsPerChannelOpen
    );
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allChannelsClosed = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Closed channels", state.allChannelsClosed);
    state.allConversationsPerChannelClosed = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the channels Closed data",
      state.allConversationsPerChannelClosed
    );
  },
  [GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  /*GET QUEUE STATISTICS */

  [GET_ALL_CONVERSATIONS_PER_QUEUE_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allQueues = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Queues", state.allQueues);
    state.allConversationsPerQueue = payload.map((data) => {
      return data.conversations_count;
    });
    console.log("these are the Queues data", state.allConversationsPerQueue);
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allQueuesOpen = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Open Queues", state.allQueuesOpen);
    state.allConversationsPerQueueOpen = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the Queues Open data",
      state.allConversationsPerQueueOpen
    );
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allQueuesClosed = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Closed Queues", state.allQueuesClosed);
    state.allConversationsPerQueueClosed = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the Queues Closed data",
      state.allConversationsPerQueueClosed
    );
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  /*GET AGENT STATISTICS */

  [GET_ALL_CONVERSATIONS_PER_AGENT_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_AGENT_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allAgent = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Agent total", state.allAgent);
    state.allConversationsPerAgent = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the Agent total data",
      state.allConversationsPerAgent
    );
  },
  [GET_ALL_CONVERSATIONS_PER_AGENT_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allAgentOpen = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Open Agent", state.allAgentOpen);
    state.allConversationsPerAgentOpen = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the Agent Open data",
      state.allConversationsPerAgentOpen
    );
  },
  [GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },

  [GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_REQUEST](state) {
    state.loadingConversation = true;
    state.errorConversation = "";
  },
  [GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_SUCCESS](state, payload) {
    state.loadingConversation = false;
    state.allAgentClosed = payload.map((label) => {
      return label.name;
    });
    console.log("these are the Closed Agent", state.allAgentClosed);
    state.allConversationsPerAgentClosed = payload.map((data) => {
      return data.conversations_count;
    });
    console.log(
      "these are the Agent Closed data",
      state.allConversationsPerAgentClosed
    );
  },
  [GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_FAIL](state, errorCalls) {
    state.loadingConversation = false;
    state.errorConversation = errorCalls;
  },
};

const actions = {
  /* get concversation channels 

  */

  async getDashboardLiveData({ commit }, payload) {
    commit(GET_DASHBOARD_LIVE_DATA_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_DASHBOARD_LIVE_DATA_SUCCESS, response.data);
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
          commit(GET_DASHBOARD_LIVE_DATA_FAIL, error.response.data);
        }
      });
  },

  /*GET ALL CONVERSATIONS PER CHANNEL
   */

  async getConversationsPerChannel({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/channel_all_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_SUCCESS, response.data);
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
          commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_FAIL, error.response.data);
        }
      });
  },

  async getConversationsPerChannelOpen({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/channel_open_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_CHANNEL_OPEN_FAIL,
            error.response.data
          );
        }
      });
  },

  async getConversationsPerChannelClosed({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/channel_closed_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_CHANNEL_CLOSED_FAIL,
            error.response.data
          );
        }
      });
  },

  /*GET ALL CONVERSATIONS PER Queue
   */

  async getConversationsPerQueue({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_QUEUE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/queue_all_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_QUEUE_SUCCESS, response.data);
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
          commit(GET_ALL_CONVERSATIONS_PER_QUEUE_FAIL, error.response.data);
        }
      });
  },

  async getConversationsPerQueueOpen({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/queue_open_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_QUEUE_OPEN_FAIL,
            error.response.data
          );
        }
      });
  },

  async getConversationsPerQueueClosed({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/queue_closed_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_QUEUE_CLOSED_FAIL,
            error.response.data
          );
        }
      });
  },

  /*GET ALL CONVERSATIONS PER AGENT
   */

  async getConversationsPerAgent({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_AGENT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/agent_all_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get agent conversations", config);

    axios(config)
      .then(function (response) {
        console.log("agent conversations response", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_AGENT_SUCCESS, response.data);
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
          commit(GET_ALL_CONVERSATIONS_PER_AGENT_FAIL, error.response.data);
        }
      });
  },

  async getConversationsPerAgentOpen({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/agent_open_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_AGENT_OPEN_FAIL,
            error.response.data
          );
        }
      });
  },

  async getConversationsPerAgentClosed({ commit }, payload) {
    commit(GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}dashboard/agent_closed_conversations_statistics`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get dashboard live data config", config);

    axios(config)
      .then(function (response) {
        console.log("GET DASHBOARD LIVE DATA", response.data);
        commit(GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_SUCCESS, response.data);
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
            GET_ALL_CONVERSATIONS_PER_AGENT_CLOSED_FAIL,
            error.response.data
          );
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
