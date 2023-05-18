import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const QUEUES_REQUEST = "QUEUES_REQUEST";
export const QUEUES_SUCCESS = "QUEUES_SUCCESS";
export const QUEUES_FAIL = "QUEUES_FAIL";
export const CREATE_QUEUES_REQUEST = "CREATE_QUEUES_REQUEST";
export const CREATE_QUEUES_SUCCESS = "CREATE_QUEUES_SUCCESS";
export const CREATE_QUEUES_FAIL = "CREATE_QUEUES_FAIL";
export const EDIT_QUEUES_REQUEST = "EDIT_QUEUES_REQUEST";
export const EDIT_QUEUES_SUCCESS = "EDIT_QUEUES_SUCCESS";
export const EDIT_QUEUES_FAIL = "EDIT_QUEUES_FAIL";
export const ACTIVATE_QUEUES_REQUEST = "ACTIVATE_QUEUES_REQUEST";
export const ACTIVATE_QUEUES_SUCCESS = "ACTIVATE_QUEUES_SUCCESS";
export const ACTIVATE_QUEUES_FAIL = "ACTIVATE_QUEUES_FAIL";
export const MOH_REQUEST = "MOH_REQUEST";
export const MOH_SUCCESS = "MOH_SUCCESS";
export const MOH_FAIL = "MOH_FAIL";
export const CREATE_MOH_REQUEST = "CREATE_MOH_REQUEST";
export const CREATE_MOH_SUCCESS = "CREATE_MOH_SUCCESS";
export const CREATE_MOH_FAIL = "CREATE_MOH_FAIL";
export const CREATE_MOH_FILE_REQUEST = "CREATE_MOH_FILE_REQUEST";
export const CREATE_MOH_FILE_SUCCESS = "CREATE_MOH_FILE_SUCCESS";
export const CREATE_MOH_FILE_FAIL = "CREATE_MOH_FILE_FAIL";
export const REORDER_MOH_FILE_REQUEST = "REORDER_MOH_FILE_REQUEST";
export const REORDER_MOH_FILE_SUCCESS = "REORDER_MOH_FILE_SUCCESS";
export const REORDER_MOH_FILE_FAIL = "REORDER_MOH_FILE_FAIL";
export const DELETE_MOH_FILE_REQUEST = "DELETE_MOH_FILE_REQUEST";
export const DELETE_MOH_FILE_SUCCESS = "DELETE_MOH_FILE_SUCCESS";
export const DELETE_MOH_FILE_FAIL = "DELETE_MOH_FILE_FAIL";
export const EDIT_MOH_REQUEST = "EDIT_MOH_REQUEST";
export const EDIT_MOH_SUCCESS = "EDIT_MOH_SUCCESS";
export const EDIT_MOH_FAIL = "EDIT_MOH_FAIL";
export const ASSIGN_MOH_TO_QUEUE_REQUEST = "ASSIGN_MOH_TO_QUEUE_REQUEST";
export const ASSIGN_MOH_TO_QUEUE_SUCCESS = "ASSIGN_MOH_TO_QUEUE_SUCCESS";
export const ASSIGN_MOH_TO_QUEUE_FAIL = "ASSIGN_MOH_TO_QUEUE_FAIL";
export const REMOVE_GROUP_FROM_QUEUE_REQUEST =
  "REMOVE_GROUP_FROM_QUEUE_REQUEST";
export const REMOVE_GROUP_FROM_QUEUE_SUCCESS =
  "REMOVE_GROUP_FROM_QUEUE_SUCCESS";
export const REMOVE_GROUP_FROM_QUEUE_FAIL = "REMOVE_GROUP_FROM_QUEUE_FAIL";

export const REMOVE_AGENT_FROM_QUEUE_REQUEST =
  "REMOVE_AGENT_FROM_QUEUE_REQUEST";
export const REMOVE_AGENT_FROM_QUEUE_SUCCESS =
  "REMOVE_AGENT_FROM_QUEUE_SUCCESS";
export const REMOVE_AGENT_FROM_QUEUE_FAIL = "REMOVE_AGENT_FROM_QUEUE_FAIL";

const state = {
  loadingQueues: false,
  successQueues: "",
  errorQueues: "",
  queues: [],
  selectQueues: [],
  moh: [],
  selectMoh: [],
};

const getters = {
  loadingQueues: (state) => state.loadingQueues,
  successQueues: (state) => state.successQueues,
  errorQueues: (state) => state.errorQueues,
  queues: (state) => state.queues,
  selectQueues: (state) => state.selectQueues,
  moh: (state) => state.moh,
  selectMoh: (state) => state.selectMoh,
};

const mutations = {
  /* 
    QUEUES INFO
  */
  [QUEUES_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [QUEUES_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.queues = payload;
    state.selectQueues = payload.map((queue) => {
      return { label: queue.name, value: queue.id };
    });
    localStorage.setItem("active_queues", JSON.stringify(state.selectQueues));
    console.log("this is the current active agents select", state.selectQueues);
  },
  [QUEUES_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    CREATE QUEUES INFO
  */
  [CREATE_QUEUES_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [CREATE_QUEUES_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [CREATE_QUEUES_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    EDIT QUEUES INFO
  */
  [EDIT_QUEUES_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [EDIT_QUEUES_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [EDIT_QUEUES_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    ACTIVATE QUEUES INFO
  */
  [ACTIVATE_QUEUES_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [ACTIVATE_QUEUES_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [ACTIVATE_QUEUES_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    MOH INFO
  */
  [MOH_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [MOH_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.moh = payload;
    state.selectMoh = payload.map((m) => {
      return { label: m.name, value: m.id };
    });
    // localStorage.setItem("current_moh", JSON.stringify({}));
    if (!localStorage.getItem("current_moh")) {
      console.log("No current MOH item");
    } else {
      var currentMOH = JSON.parse(localStorage.getItem("current_moh"));
      console.log("currentMOH", currentMOH);
      var currentMOHIndex = state.moh.findIndex(
        (obj) => obj.id == currentMOH.id
      );
      console.log("currentMOH before update", currentMOH);
      console.log("currentMOH after update", state.moh[currentMOHIndex]);
      localStorage.setItem(
        "current_moh",
        JSON.stringify(state.moh[currentMOHIndex])
      );
    }
  },
  [MOH_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    CREATE MOH INFO
  */
  [CREATE_MOH_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [CREATE_MOH_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [CREATE_MOH_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    CREATE MOH FILE
  */
  [CREATE_MOH_FILE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [CREATE_MOH_FILE_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [CREATE_MOH_FILE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    REORDER MOH FILE
  */
  [REORDER_MOH_FILE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [REORDER_MOH_FILE_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [REORDER_MOH_FILE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    DELETE MOH FILE
  */
  [DELETE_MOH_FILE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [DELETE_MOH_FILE_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [DELETE_MOH_FILE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    EDIT MOH INFO
  */
  [EDIT_MOH_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [EDIT_MOH_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [EDIT_MOH_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    ASSIGN MOH TO QUEUE
  */
  [ASSIGN_MOH_TO_QUEUE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [ASSIGN_MOH_TO_QUEUE_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [ASSIGN_MOH_TO_QUEUE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
  /* 
    REMOVE GROUP FROM QUEUE
  */
  [REMOVE_GROUP_FROM_QUEUE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [REMOVE_GROUP_FROM_QUEUE_SUCCESS](state, payload) {
    state.loadingQueues = false;
    state.successQueues = payload.message;
  },
  [REMOVE_GROUP_FROM_QUEUE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },

  /* 
    REMOVE AGENT FROM QUEUE
  */
  [REMOVE_AGENT_FROM_QUEUE_REQUEST](state) {
    state.loadingQueues = true;
    state.errorQueues = "";
  },
  [REMOVE_AGENT_FROM_QUEUE_SUCCESS](state) {
    state.loadingQueues = false;
  },
  [REMOVE_AGENT_FROM_QUEUE_FAIL](state, errorQueues) {
    state.loadingQueues = false;
    state.errorQueues = errorQueues;
  },
};

const actions = {
  /* 
    QUEUES INFO 
  */
  async getQueues({ commit }, payload) {
    commit(QUEUES_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}queue/get_all_queues`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(QUEUES_SUCCESS, response.data);
        console.log("these are all queues", response.data);
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
          commit(QUEUES_FAIL, error.response.data);
        }
      });
  },

  /* 
    REMOVE AGENT FROM QUEUES
  */
  async removeAgent({ commit, dispatch }, payload) {
    commit(REMOVE_AGENT_FROM_QUEUE_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}queue/remove_agent_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create queue config", config);

    axios(config)
      .then(function (response) {
        commit(REMOVE_AGENT_FROM_QUEUE_SUCCESS, response.data);
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
          commit(REMOVE_AGENT_FROM_QUEUE_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE QUEUES 
  */
  async createQueue({ commit, dispatch }, payload) {
    commit(CREATE_QUEUES_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}queue/create_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create queue config", config);

    axios(config)
      .then(function (response) {
        commit(CREATE_QUEUES_SUCCESS, response.data);
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
          commit(CREATE_QUEUES_FAIL, error.response.data);
        }
      });
  },
  /* 
    EDIT QUEUES 
  */
  async editQueue({ commit, dispatch }, payload) {
    commit(EDIT_QUEUES_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}queue/edit_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("edit queue config", config);

    axios(config)
      .then(function (response) {
        commit(EDIT_QUEUES_SUCCESS, response.data);
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
          commit(EDIT_QUEUES_FAIL, error.response.data);
        }
      });
  },
  /* 
    ACTIVATE QUEUES 
  */
  async activateDeactivateQueue({ commit, dispatch }, payload) {
    commit(ACTIVATE_QUEUES_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}queue/activate_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate deactivate queue config", config);

    axios(config)
      .then(function (response) {
        commit(ACTIVATE_QUEUES_SUCCESS, response.data);
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
          commit(ACTIVATE_QUEUES_FAIL, error.response.data);
        }
      });
  },
  /* 
    MOH INFO 
  */
  async getMohs({ commit }, payload) {
    commit(MOH_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}queue/get_all_moh`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(MOH_SUCCESS, response.data);
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
          commit(MOH_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE MOH
  */
  async createMoh({ commit, dispatch }, payload) {
    commit(CREATE_MOH_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}queue/create_moh`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create moh config", config);

    axios(config)
      .then(function (response) {
        console.log("create moh response", response.data);
        commit(CREATE_MOH_SUCCESS, response.data);
        dispatch("getMohs");
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
          commit(CREATE_MOH_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE MOH FILE
  */
  async createMohFile({ commit, dispatch }, payload) {
    commit(CREATE_MOH_FILE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}queue/create_moh_file_bulk`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create moh file config", config);

    axios(config)
      .then(function (response) {
        console.log("create moh file response", response.data);
        commit(CREATE_MOH_FILE_SUCCESS, response.data);
        dispatch("getMohs");

        // router.push({ name: "QueueManagement" });
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
          commit(CREATE_MOH_FILE_FAIL, error.response.data);
          dispatch("getMohs");
        }
      });
  },
  /* 
    REORDER MOH FILE
  */
  async reorderMohFile({ commit, dispatch }, payload) {
    commit(REORDER_MOH_FILE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}queue/re_order_files`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("reorder moh file config", config);

    axios(config)
      .then(function (response) {
        console.log("reorder moh file response", response.data);
        commit(REORDER_MOH_FILE_SUCCESS, response.data);
        dispatch("getMohs");

        router.push({ name: "QueueManagement" });
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
          commit(REORDER_MOH_FILE_FAIL, error.response.data);
          dispatch("getMohs");
        }
      });
  },
  /* 
    DELETE MOH FILE
  */
  async deleteMohFile({ commit, dispatch }, payload) {
    commit(DELETE_MOH_FILE_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}queue/remove_moh_file`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete moh file config", config);

    axios(config)
      .then(function (response) {
        console.log("delete moh file response", response.data);
        commit(DELETE_MOH_FILE_SUCCESS, response.data);
        dispatch("getMohs");

        router.push({ name: "QueueManagement" });
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
          commit(DELETE_MOH_FILE_FAIL, error.response.data);
          dispatch("getMohs");
        }
      });
  },
  /* 
    EDIT MOH
  */
  async editMoh({ commit, dispatch }, payload) {
    commit(EDIT_MOH_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}queue/update_moh`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("edit moh config", config);

    axios(config)
      .then(function (response) {
        console.log("edit moh response", response.data);
        commit(EDIT_MOH_SUCCESS, response.data);
        dispatch("getMohs");
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
          commit(EDIT_MOH_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN MOH TO QUEUE
  */
  async assignMohToQueue({ commit, dispatch }, payload) {
    commit(ASSIGN_MOH_TO_QUEUE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}queue/assign_moh_to_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign moh to queue config", config);

    axios(config)
      .then(function (response) {
        console.log("assign moh to queue response", response.data);
        commit(ASSIGN_MOH_TO_QUEUE_SUCCESS, response.data);
        dispatch("getMohs");
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
          commit(ASSIGN_MOH_TO_QUEUE_FAIL, error.response.data);
          dispatch("getMohs");
          dispatch("getQueues");
        }
      });
  },
  /* 
    REMOVE GROUP FROM QUEUE
  */
  async removeGroupFromQueue({ commit, dispatch }, payload) {
    commit(REMOVE_GROUP_FROM_QUEUE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/remove_group_from_queue`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove group from queue config", config);

    axios(config)
      .then(function (response) {
        console.log("remove group from queue response", response.data);
        commit(REMOVE_GROUP_FROM_QUEUE_SUCCESS, response.data);
        dispatch("getMohs");
        dispatch("getQueues");
        dispatch("getGroups");
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
          commit(REMOVE_GROUP_FROM_QUEUE_FAIL, error.response.data);
          dispatch("getMohs");
          dispatch("getQueues");
          dispatch("getGroups");
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
