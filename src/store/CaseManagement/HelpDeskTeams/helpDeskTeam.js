import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    HELP DESK TEAM CONFIGURATIONS
  */
export const CREATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST =
  "CREATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST";
export const CREATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS =
  "CREATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS";
export const CREATE_HELP_DESK_TEAM_CONFIGURATION_FAIL =
  "CREATE_HELP_DESK_TEAM_CONFIGURATION_FAIL";
export const GET_HELP_DESK_TEAM_CONFIGURATION_REQUEST =
  "GET_HELP_DESK_TEAM_CONFIGURATION_REQUEST";
export const GET_HELP_DESK_TEAM_CONFIGURATION_SUCCESS =
  "GET_HELP_DESK_TEAM_CONFIGURATION_SUCCESS";
export const GET_HELP_DESK_TEAM_CONFIGURATION_FAIL =
  "GET_HELP_DESK_TEAM_CONFIGURATION_FAIL";
export const GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_REQUEST =
  "GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_REQUEST";
export const GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS =
  "GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS";
export const GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_FAIL =
  "GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_FAIL";
export const UPDATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST =
  "UPDATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST";
export const UPDATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS =
  "UPDATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS";
export const UPDATE_HELP_DESK_TEAM_CONFIGURATION_FAIL =
  "UPDATE_HELP_DESK_TEAM_CONFIGURATION_FAIL";
export const DELETE_HELP_DESK_TEAM_CONFIGURATION_REQUEST =
  "DELETE_HELP_DESK_TEAM_CONFIGURATION_REQUEST";
export const DELETE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS =
  "DELETE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS";
export const DELETE_HELP_DESK_TEAM_CONFIGURATION_FAIL =
  "DELETE_HELP_DESK_TEAM_CONFIGURATION_FAIL";

export const STORE_HELP_DESK_TEAM = "STORE_HELP_DESK_TEAM";

/* 
    HELP DESK TEAM
  */
export const CREATE_HELP_DESK_TEAM_REQUEST = "CREATE_HELP_DESK_TEAM_REQUEST";
export const CREATE_HELP_DESK_TEAM_SUCCESS = "CREATE_HELP_DESK_TEAM_SUCCESS";
export const CREATE_HELP_DESK_TEAM_FAIL = "CREATE_HELP_DESK_TEAM_FAIL";
export const ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_REQUEST =
  "ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_REQUEST";
export const ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_SUCCESS =
  "ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_SUCCESS";
export const ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_FAIL =
  "ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_FAIL";
export const GET_HELP_DESK_TEAM_REQUEST = "GET_HELP_DESK_TEAM_REQUEST";
export const GET_HELP_DESK_TEAM_SUCCESS = "GET_HELP_DESK_TEAM_SUCCESS";
export const GET_HELP_DESK_TEAM_FAIL = "GET_HELP_DESK_TEAM_FAIL";
export const GET_SINGLE_HELP_DESK_TEAM_REQUEST =
  "GET_SINGLE_HELP_DESK_TEAM_REQUEST";
export const GET_SINGLE_HELP_DESK_TEAM_SUCCESS =
  "GET_SINGLE_HELP_DESK_TEAM_SUCCESS";
export const GET_SINGLE_HELP_DESK_TEAM_FAIL = "GET_SINGLE_HELP_DESK_TEAM_FAIL";
export const UPDATE_HELP_DESK_TEAM_REQUEST = "UPDATE_HELP_DESK_TEAM_REQUEST";
export const UPDATE_HELP_DESK_TEAM_SUCCESS = "UPDATE_HELP_DESK_TEAM_SUCCESS";
export const UPDATE_HELP_DESK_TEAM_FAIL = "UPDATE_HELP_DESK_TEAM_FAIL";
export const ADD_USER_TO_HELP_DESK_TEAM_REQUEST =
  "ADD_USER_TO_HELP_DESK_TEAM_REQUEST";
export const ADD_USER_TO_HELP_DESK_TEAM_SUCCESS =
  "ADD_USER_TO_HELP_DESK_TEAM_SUCCESS";
export const ADD_USER_TO_HELP_DESK_TEAM_FAIL =
  "ADD_USER_TO_HELP_DESK_TEAM_FAIL";
export const GET_USERS_HELP_DESK_TEAM_REQUEST =
  "GET_USERS_HELP_DESK_TEAM_REQUEST";
export const GET_USERS_HELP_DESK_TEAM_SUCCESS =
  "GET_USERS_HELP_DESK_TEAM_SUCCESS";
export const GET_USERS_HELP_DESK_TEAM_FAIL = "GET_USERS_HELP_DESK_TEAM_FAIL";
export const REMOVE_USER_FROM_HELP_DESK_TEAM_REQUEST =
  "REMOVE_USER_FROM_HELP_DESK_TEAM_REQUEST";
export const REMOVE_USER_FROM_HELP_DESK_TEAM_SUCCESS =
  "REMOVE_USER_FROM_HELP_DESK_TEAM_SUCCESS";
export const REMOVE_USER_FROM_HELP_DESK_TEAM_FAIL =
  "REMOVE_USER_FROM_HELP_DESK_TEAM_FAIL";

const state = {
  loadingHelpDeskTeam: false,
  successHelpDeskTeam: "",
  errorHelpDeskTeam: "",
  helpDeskTeamConfiguration: [],
  selectHelpDeskTeamConfiguration: [],
  singleHelpDeskTeamConfiguration: {},
  helpDeskTeam: [],
  selectHelpDeskTeam: [],
  singleHelpDeskTeam: {},
  helpDeskTeamUsers: [],
  selectHelpDeskTeamUsers: [],
  currentHelpDeskTeam: {},
};

const getters = {
  loadingHelpDeskTeam: (state) => state.loadingHelpDeskTeam,
  successHelpDeskTeam: (state) => state.successHelpDeskTeam,
  errorHelpDeskTeam: (state) => state.errorHelpDeskTeam,
  helpDeskTeamConfiguration: (state) => state.helpDeskTeamConfiguration,
  selectHelpDeskTeamConfiguration: (state) =>
    state.selectHelpDeskTeamConfiguration,
  singleHelpDeskTeamConfiguration: (state) =>
    state.singleHelpDeskTeamConfiguration,
  helpDeskTeam: (state) => state.helpDeskTeam,
  selectHelpDeskTeam: (state) => state.selectHelpDeskTeam,
  singleHelpDeskTeam: (state) => state.singleHelpDeskTeam,
  helpDeskTeamUsers: (state) => state.helpDeskTeamUsers,
  selectHelpDeskTeamUsers: (state) => state.selectHelpDeskTeamUsers,
  currentHelpDeskTeam: (state) => state.currentHelpDeskTeam,
};

const mutations = {
  /* 
    CREATE HELP DESK TEAM CONFIGURATION
  */
  [CREATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [CREATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [CREATE_HELP_DESK_TEAM_CONFIGURATION_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  [STORE_HELP_DESK_TEAM](state, payload) {
    state.currentHelpDeskTeam = payload;
  },
  /* 
    GET HELP DESK TEAM CONFIGURATION
  */
  [GET_HELP_DESK_TEAM_CONFIGURATION_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [GET_HELP_DESK_TEAM_CONFIGURATION_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.helpDeskTeamConfiguration = payload;
    state.selectHelpDeskTeamConfiguration = payload.map((helpDeskTeam) => {
      return { label: helpDeskTeam.name, value: helpDeskTeam.id };
    });
  },
  [GET_HELP_DESK_TEAM_CONFIGURATION_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
        GET SINGLE HELP DESK TEAM CONFIGURATION
      */
  [GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.singleHelpDeskTeamConfiguration = payload;
  },
  [GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
    UPDATE HELP DESK TEAM CONFIGURATION
  */
  [UPDATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [UPDATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [UPDATE_HELP_DESK_TEAM_CONFIGURATION_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
    DELETE HELP DESK TEAM CONFIGURATION
  */
  [DELETE_HELP_DESK_TEAM_CONFIGURATION_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [DELETE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [DELETE_HELP_DESK_TEAM_CONFIGURATION_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },

  /* 
    CREATE HELP DESK TEAM
  */
  [CREATE_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [CREATE_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [CREATE_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
    DE/ACTIVATE HELP DESK TEAM
  */
  [ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
      GET HELP DESK TEAM
    */
  [GET_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [GET_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.helpDeskTeam = payload;
    state.selectHelpDeskTeam = payload.map((helpDeskTeam) => {
      return { label: helpDeskTeam.name, value: helpDeskTeam.id };
    });
  },
  [GET_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
          GET SINGLE HELP DESK TEAM
        */
  [GET_SINGLE_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [GET_SINGLE_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.singleHelpDeskTeam = payload;
  },
  [GET_SINGLE_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
      UPDATE HELP DESK TEAM
    */
  [UPDATE_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [UPDATE_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [UPDATE_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
      ADD USER TO HELP DESK TEAM
    */
  [ADD_USER_TO_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [ADD_USER_TO_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [ADD_USER_TO_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
          GET USERS HELP DESK TEAM
        */
  [GET_USERS_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [GET_USERS_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.helpDeskTeamUsers = payload;
    state.selectHelpDeskTeamUsers = payload.map((helpDeskTeamUsers) => {
      return { label: helpDeskTeamUsers.name, value: helpDeskTeamUsers.id };
    });
  },
  [GET_USERS_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
  /* 
      REMOVE USER FROM HELP DESK TEAM
    */
  [REMOVE_USER_FROM_HELP_DESK_TEAM_REQUEST](state) {
    state.loadingHelpDeskTeam = true;
    state.errorHelpDeskTeam = "";
  },
  [REMOVE_USER_FROM_HELP_DESK_TEAM_SUCCESS](state, payload) {
    state.loadingHelpDeskTeam = false;
    state.successHelpDeskTeam = payload.message;
  },
  [REMOVE_USER_FROM_HELP_DESK_TEAM_FAIL](state, errorHelpDeskTeam) {
    state.loadingHelpDeskTeam = false;
    state.errorHelpDeskTeam = errorHelpDeskTeam;
  },
};

const actions = {
  /* 
    CREATE HELP DESK TEAM CONFIGURATION
  */

  async storeHelpDeskTeam({ commit }, payload) {
    commit(STORE_HELP_DESK_TEAM, payload);
    console.log(
      "I AM STORING CURRENT HELP DESK TEAM",
      state.currentHelpDeskTeam
    );
  },
  async createHelpDeskTeamConfiguration({ commit, dispatch }, payload) {
    commit(CREATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}helpdesk/team/configuration`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create help desk team configuration config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "create help desk team configuration response",
          response.data
        );
        commit(CREATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS, response.data);
        dispatch("getHelpDeskTeamConfiguration");
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
          commit(CREATE_HELP_DESK_TEAM_CONFIGURATION_FAIL, error.response.data);
          dispatch("getHelpDeskTeamConfiguration");
        }
      });
  },
  /* 
      GET HELP DESK TEAM CONFIGURATION
    */
  async getHelpDeskTeamConfiguration({ commit }, payload) {
    commit(GET_HELP_DESK_TEAM_CONFIGURATION_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}helpdesk/team/configuration`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get help desk team configuration config", config);

    axios(config)
      .then(function (response) {
        console.log("get help desk team configuration response", response.data);
        commit(GET_HELP_DESK_TEAM_CONFIGURATION_SUCCESS, response.data);
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
          commit(GET_HELP_DESK_TEAM_CONFIGURATION_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE HELP DESK TEAM CONFIGURATION
    */
  async getSingleHelpDeskTeamConfiguration({ commit }, payload) {
    commit(GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}helpdesk/team/configuration/${payload.help_desk_team_configuration_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single help desk team configuration config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "get single help desk team configuration response",
          response.data
        );
        commit(GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS, response.data);
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
            GET_SINGLE_HELP_DESK_TEAM_CONFIGURATION_FAIL,
            error.response.data
          );
        }
      });
  },
  /* 
      UPDATE HELP DESK TEAM CONFIGURATION
    */
  async updateHelpDeskTeamConfiguration({ commit, dispatch }, payload) {
    commit(UPDATE_HELP_DESK_TEAM_CONFIGURATION_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}helpdesk/team/configuration/${payload.help_desk_team_configuration_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update help desk team configuration config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "update help desk team configuration response",
          response.data
        );
        commit(UPDATE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS, response.data);
        dispatch("getHelpDeskTeamConfiguration");
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
          commit(UPDATE_HELP_DESK_TEAM_CONFIGURATION_FAIL, error.response.data);
          dispatch("getHelpDeskTeamConfiguration");
        }
      });
  },
  /* 
      DELETE HELP DESK TEAM CONFIGURATION
    */
  async deleteHelpDeskTeamConfiguration({ commit, dispatch }, payload) {
    commit(DELETE_HELP_DESK_TEAM_CONFIGURATION_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}helpdesk/team/configuration/${payload.help_desk_team_configuration_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete help desk team configuration config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "delete help desk team configuration response",
          response.data
        );
        commit(DELETE_HELP_DESK_TEAM_CONFIGURATION_SUCCESS, response.data);
        dispatch("getHelpDeskTeamConfiguration");
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
          commit(DELETE_HELP_DESK_TEAM_CONFIGURATION_FAIL, error.response.data);
          dispatch("getHelpDeskTeamConfiguration");
        }
      });
  },

  /* 
    CREATE HELP DESK TEAM
  */
  async createHelpDeskTeam({ commit, dispatch }, payload) {
    commit(CREATE_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}helpDeskTeams`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("create help desk team response", response.data);
        commit(CREATE_HELP_DESK_TEAM_SUCCESS, response.data);
        dispatch("getHelpDeskTeam");
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
          commit(CREATE_HELP_DESK_TEAM_FAIL, error.response.data);
          dispatch("getHelpDeskTeam");
        }
      });
  },
  /* 
    DE/ACTIVATE HELP DESK TEAM
  */
  async activateDeactivateHelpDeskTeam({ commit, dispatch }, payload) {
    commit(ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}helpdesk/team/activate`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("ACTIVATE_DEACTIVATE help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "ACTIVATE_DEACTIVATE help desk team response",
          response.data
        );
        commit(ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_SUCCESS, response.data);
        dispatch("getHelpDeskTeam");
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
          commit(ACTIVATE_DEACTIVATE_HELP_DESK_TEAM_FAIL, error.response.data);
          dispatch("getHelpDeskTeam");
        }
      });
  },
  /* 
        GET HELP DESK TEAM
      */
  async getHelpDeskTeam({ commit }, payload) {
    commit(GET_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}helpDeskTeams`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("get help desk team response", response.data);
        commit(GET_HELP_DESK_TEAM_SUCCESS, response.data);
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
          commit(GET_HELP_DESK_TEAM_FAIL, error.response.data);
        }
      });
  },
  /* 
        GET SINGLE HELP DESK TEAM
      */
  async getSingleHelpDeskTeam({ commit }, payload) {
    commit(GET_SINGLE_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}helpdesk/teams/${payload.team_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("get single help desk team response", response.data);
        commit(GET_SINGLE_HELP_DESK_TEAM_SUCCESS, response.data);
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
          commit(GET_SINGLE_HELP_DESK_TEAM_FAIL, error.response.data);
        }
      });
  },
  /* 
        UPDATE HELP DESK TEAM
      */
  async updateHelpDeskTeam({ commit, dispatch }, payload) {
    commit(UPDATE_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}helpDeskTeams/${payload.id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { name: payload.name, description: payload.description },
    };
    console.log("update help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("update help desk team response", response.data);
        commit(UPDATE_HELP_DESK_TEAM_SUCCESS, response.data);
        dispatch("getHelpDeskTeam");
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
          commit(UPDATE_HELP_DESK_TEAM_FAIL, error.response.data);
          dispatch("getHelpDeskTeam");
        }
      });
  },
  /* 
        ADD USER TO HELP DESK TEAM
      */
  async addUserToHelpDeskTeam({ commit, dispatch }, payload) {
    commit(ADD_USER_TO_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}helpdesk/team/add_user`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add user to help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("add user to help desk team response", response.data);
        commit(ADD_USER_TO_HELP_DESK_TEAM_SUCCESS, response.data);
        dispatch("getHelpDeskTeamUsers");
        dispatch("getHelpDeskTeam");
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
          commit(ADD_USER_TO_HELP_DESK_TEAM_FAIL, error.response.data);
          dispatch("getHelpDeskTeamUsers");
          dispatch("getHelpDeskTeam");
        }
      });
  },
  /* 
        GET USERs HELP DESK TEAM
      */
  async getHelpDeskTeamUsers({ commit }, payload) {
    commit(GET_USERS_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}helpdesk/team/user_teams`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get users help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("get users help desk team response", response.data);
        commit(GET_USERS_HELP_DESK_TEAM_SUCCESS, response.data);
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
          commit(GET_USERS_HELP_DESK_TEAM_FAIL, error.response.data);
        }
      });
  },
  /* 
        REMOVE USER FROM HELP DESK TEAM
      */
  async removeUserFromHelpDeskTeam({ commit, dispatch }, payload) {
    commit(REMOVE_USER_FROM_HELP_DESK_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}helpdesk/team/remove_user`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove user from help desk team config", config);

    axios(config)
      .then(function (response) {
        console.log("remove user from help desk team response", response.data);
        commit(REMOVE_USER_FROM_HELP_DESK_TEAM_SUCCESS, response.data);
        dispatch("getHelpDeskTeamUsers");
        dispatch("getHelpDeskTeam");
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
          commit(REMOVE_USER_FROM_HELP_DESK_TEAM_FAIL, error.response.data);
          dispatch("getHelpDeskTeamUsers");
          dispatch("getHelpDeskTeam");
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
