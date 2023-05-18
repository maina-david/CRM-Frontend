import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const GROUP_REQUEST = "GROUP_REQUEST";
export const GROUP_SUCCESS = "GROUP_SUCCESS";
export const GROUP_FAIL = "GROUP_FAIL";
export const GROUP_CREATE_REQUEST = "GROUP_CREATE_REQUEST";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_FAIL = "GROUP_CREATE_FAIL";
export const ASSIGN_USERS_TO_GROUP_REQUEST = "ASSIGN_USERS_TO_GROUP_REQUEST";
export const ASSIGN_USERS_TO_GROUP_SUCCESS = "ASSIGN_USERS_TO_GROUP_SUCCESS";
export const ASSIGN_USERS_TO_GROUP_FAIL = "ASSIGN_USERS_TO_GROUP_FAIL";
export const ASSIGN_QUEUES_TO_GROUP_REQUEST = "ASSIGN_QUEUES_TO_GROUP_REQUEST";
export const ASSIGN_QUEUES_TO_GROUP_SUCCESS = "ASSIGN_QUEUES_TO_GROUP_SUCCESS";
export const ASSIGN_QUEUES_TO_GROUP_FAIL = "ASSIGN_QUEUES_TO_GROUP_FAIL";
export const GROUP_UPDATE_REQUEST = "GROUP_UPDATE_REQUEST";
export const GROUP_UPDATE_SUCCESS = "GROUP_UPDATE_SUCCESS";
export const GROUP_UPDATE_FAIL = "GROUP_UPDATE_FAIL";
export const GROUP_DELETE_USERS_REQUEST = "GROUP_DELETE_USERS_REQUEST";
export const GROUP_DELETE_USERS_SUCCESS = "GROUP_DELETE_USERS_SUCCESS";
export const GROUP_DELETE_USERS_FAIL = "GROUP_DELETE_USERS_FAIL";

const state = {
  loadingGroup: false,
  successGroup: "",
  errorGroup: "",
  groups: [],
  selectGroups: [],
};

const getters = {
  loadingGroup: (state) => state.loadingGroup,
  successGroup: (state) => state.successGroup,
  errorGroup: (state) => state.errorGroup,
  groups: (state) => state.groups,
  selectGroups: (state) => state.selectGroups,
};

const mutations = {
  /* 
    GROUP INFO
  */
  [GROUP_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [GROUP_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.groups = payload;
    state.selectGroups = payload.map((group) => {
      return { label: group.name, value: group.id };
    });
  },
  [GROUP_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
  /* 
  GROUP CREATE
  */
  [GROUP_CREATE_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [GROUP_CREATE_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.successGroup = payload.message;
  },
  [GROUP_CREATE_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
  /* 
    ASSIGN USERS TO GROUP
  */
  [ASSIGN_USERS_TO_GROUP_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [ASSIGN_USERS_TO_GROUP_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.successGroup = payload.message;
  },
  [ASSIGN_USERS_TO_GROUP_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
  /* 
    ASSIGN QUEUES TO GROUP
  */
  [ASSIGN_QUEUES_TO_GROUP_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [ASSIGN_QUEUES_TO_GROUP_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.successGroup = payload.message;
  },
  [ASSIGN_QUEUES_TO_GROUP_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
  /* 
    GROUP EDIT
  */
  [GROUP_UPDATE_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [GROUP_UPDATE_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.groups = payload;
    state.successGroup = payload.message;
  },
  [GROUP_UPDATE_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
  /* 
    GROUP DELETE
  */
  [GROUP_DELETE_USERS_REQUEST](state) {
    state.loadingGroup = true;
    state.errorGroup = "";
  },
  [GROUP_DELETE_USERS_SUCCESS](state, payload) {
    state.loadingGroup = false;
    state.successGroup = payload.message;
  },
  [GROUP_DELETE_USERS_FAIL](state, errorGroup) {
    state.loadingGroup = false;
    state.errorGroup = errorGroup;
  },
};

const actions = {
  /* 
    GROUP INFO 
  */
  async getGroups({ commit }, payload) {
    commit(GROUP_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}company/get_all_groups`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(GROUP_SUCCESS, response.data);
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
          commit(GROUP_FAIL, error.response.data);
        }
      });
  },
  /* 
    GROUP CREATE 
  */
  async createGroup({ commit, dispatch }, payload) {
    commit(GROUP_CREATE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}company/create_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(GROUP_CREATE_SUCCESS, response.data);
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
          commit(GROUP_CREATE_FAIL, error.response.data);
          dispatch("getGroups");
        }
      });
  },
  /* 
    ASSIGN USERS TO GROUP 
  */
  async assignUsersToGroup({ commit, dispatch }, payload) {
    commit(ASSIGN_USERS_TO_GROUP_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}company/assign_users_to_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign users to group config", config);

    axios(config)
      .then(function (response) {
        console.log("assign users to group response", response.data);
        commit(ASSIGN_USERS_TO_GROUP_SUCCESS, response.data);
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
          commit(ASSIGN_USERS_TO_GROUP_FAIL, error.response.data);
          dispatch("getGroups");
        }
      });
  },

  /* 
    ASSIGN QUEUES TO GROUP 
  */
  async assignQueuesToGroup({ commit, dispatch }, payload) {
    commit(ASSIGN_QUEUES_TO_GROUP_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/assign_queue_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign queues to group config", config);

    axios(config)
      .then(function (response) {
        console.log("assign queues to group response", response.data);
        commit(ASSIGN_QUEUES_TO_GROUP_SUCCESS, response.data);
        dispatch("getGroups");
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
          commit(ASSIGN_QUEUES_TO_GROUP_FAIL, error.response.data);
          dispatch("getGroups");
          dispatch("getQueues");
        }
      });
  },
  /* 
    GROUP UPDATE 
  */
  async updateGroup({ commit, dispatch }, payload) {
    commit(GROUP_UPDATE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}company/update_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(GROUP_UPDATE_SUCCESS, response.data);
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
          commit(GROUP_UPDATE_FAIL, error.response.data);
          dispatch("getGroups");
        }
      });
  },
  /* 
    GROUP DELETE 
  */
  async deleteUsersFromGroup({ commit, dispatch }, payload) {
    commit(GROUP_DELETE_USERS_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}company/remove_user_from_group`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete user from group config", config);

    axios(config)
      .then(function (response) {
        console.log("delete user from group response", response.data);
        commit(GROUP_DELETE_USERS_SUCCESS, response.data);
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
          commit(GROUP_DELETE_USERS_FAIL, error.response.data);
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
