import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    QUALITY ASSURANCE TEAM
  */
export const CREATE_QUALITY_ASSURANCE_TEAM_REQUEST =
  "CREATE_QUALITY_ASSURANCE_TEAM_REQUEST";
export const CREATE_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "CREATE_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const CREATE_QUALITY_ASSURANCE_TEAM_FAIL =
  "CREATE_QUALITY_ASSURANCE_TEAM_FAIL";
export const GET_QUALITY_ASSURANCE_TEAM_REQUEST =
  "GET_QUALITY_ASSURANCE_TEAM_REQUEST";
export const GET_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "GET_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const GET_QUALITY_ASSURANCE_TEAM_FAIL =
  "GET_QUALITY_ASSURANCE_TEAM_FAIL";
export const GET_QUALITY_ASSURANCE_USERS_REQUEST =
  "GET_QUALITY_ASSURANCE_USERS_REQUEST";
export const GET_QUALITY_ASSURANCE_USERS_SUCCESS =
  "GET_QUALITY_ASSURANCE_USERS_SUCCESS";
export const GET_QUALITY_ASSURANCE_USERS_FAIL =
  "GET_QUALITY_ASSURANCE_USERS_FAIL";
export const UPDATE_QUALITY_ASSURANCE_TEAM_REQUEST =
  "UPDATE_QUALITY_ASSURANCE_TEAM_REQUEST";
export const UPDATE_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "UPDATE_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const UPDATE_QUALITY_ASSURANCE_TEAM_FAIL =
  "UPDATE_QUALITY_ASSURANCE_TEAM_FAIL";
export const ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_REQUEST =
  "ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_REQUEST";
export const ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_FAIL =
  "ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_FAIL";
export const ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_REQUEST =
  "ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_REQUEST";
export const ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_FAIL =
  "ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_FAIL";
export const ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_REQUEST =
  "ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_REQUEST";
export const ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_FAIL =
  "ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_FAIL";
export const ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_REQUEST =
  "ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_REQUEST";
export const ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_FAIL =
  "ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_FAIL";
export const TOGGLE_QUALITY_ASSURANCE_STATUS_REQUEST =
  "TOGGLE_QUALITY_ASSURANCE_STATUS_REQUEST";
export const TOGGLE_QUALITY_ASSURANCE_STATUS_SUCCESS =
  "TOGGLE_QUALITY_ASSURANCE_STATUS_SUCCESS";
export const TOGGLE_QUALITY_ASSURANCE_STATUS_FAIL =
  "TOGGLE_QUALITY_ASSURANCE_STATUS_FAIL";
export const REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_REQUEST =
  "REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_REQUEST";
export const REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_FAIL =
  "REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_FAIL";
export const REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_REQUEST =
  "REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_REQUEST";
export const REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_FAIL =
  "REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_FAIL";
export const REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_REQUEST =
  "REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_REQUEST";
export const REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS =
  "REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS";
export const REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_FAIL =
  "REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_FAIL";

export const GET_INTERACTION_DATA_REQUEST = "GET_INTERACTION_DATA_REQUEST";
export const GET_INTERACTION_DATA_SUCCESS = "GET_INTERACTION_DATA_SUCCESS";
export const GET_INTERACTION_DATA_FAIL = "GET_INTERACTION_DATA_FAIL";
export const SUBMIT_REVIEW_REQUEST = "SUBMIT_REVIEW__REQUEST";
export const SUBMIT_REVIEW_SUCCESS = "SUBMIT_REVIEW_SUCCESS";
export const SUBMIT_REVIEW_FAIL = "SUBMIT_REVIEW_FAIL";

const state = {
  loadingQualityAssuranceTeam: false,
  successQualityAssuranceTeam: "",
  errorQualityAssuranceTeam: "",
  qualityAssuranceTeam: [],
  selectQualityAssuranceTeam: [],
  qualityAssuranceUsers: [],
  selectQualityAssuranceUsers: [],
  interactionData: [],
};

const getters = {
  loadingQualityAssuranceTeam: (state) => state.loadingQualityAssuranceTeam,
  successQualityAssuranceTeam: (state) => state.successQualityAssuranceTeam,
  errorQualityAssuranceTeam: (state) => state.errorQualityAssuranceTeam,
  qualityAssuranceTeam: (state) => state.qualityAssuranceTeam,
  selectQualityAssuranceTeam: (state) => state.selectQualityAssuranceTeam,
  qualityAssuranceUsers: (state) => state.qualityAssuranceUsers,
  selectQualityAssuranceUsers: (state) => state.selectQualityAssuranceUsers,
  interactionData: (state) => state.interactionData.data,
};

const mutations = {
  /* 
    CREATE QUALITY ASSURANCE TEAM
  */
  [CREATE_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [CREATE_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [CREATE_QUALITY_ASSURANCE_TEAM_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    SUBMIT REVIEW
  */
  [SUBMIT_REVIEW_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [SUBMIT_REVIEW_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [SUBMIT_REVIEW_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    GET QUALITY ASSURANCE TEAM
  */
  [GET_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [GET_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.qualityAssuranceTeam = payload;
    state.selectQualityAssuranceTeam = payload.map((qualityAssuranceTeam) => {
      return {
        label: qualityAssuranceTeam.name,
        value: qualityAssuranceTeam.id,
      };
    });
  },
  [GET_QUALITY_ASSURANCE_TEAM_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },

  /* 
    GET QUALITY ASSURANCE TEAM
  */
  [GET_INTERACTION_DATA_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [GET_INTERACTION_DATA_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.interactionData = payload;
  },
  [GET_INTERACTION_DATA_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    GET QUALITY ASSURANCE USERS
  */
  [GET_QUALITY_ASSURANCE_USERS_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [GET_QUALITY_ASSURANCE_USERS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.qualityAssuranceUsers = payload;
    state.selectQualityAssuranceUsers = payload.map((qualityAssuranceUsers) => {
      return {
        label: qualityAssuranceUsers.name,
        value: qualityAssuranceUsers.id,
      };
    });
  },
  [GET_QUALITY_ASSURANCE_USERS_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
        UPDATE QUALITY ASSURANCE
      */
  [UPDATE_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [UPDATE_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload;
  },
  [UPDATE_QUALITY_ASSURANCE_TEAM_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    ADD FORM TO QUALITY ASSURANCE TEAM
  */
  [ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    ADD MEMBERS TO QUALITY ASSURANCE TEAM
  */
  [ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
    ADD Queues TO QUALITY ASSURANCE TEAM
  */
  [ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },

  /* 
    ADD SUPERVISORS TO QUALITY ASSURANCE TEAM
  */
  [ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload.message;
  },
  [ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
        TOGGLE QUALITY ASSURANCE STATUS
      */
  [TOGGLE_QUALITY_ASSURANCE_STATUS_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [TOGGLE_QUALITY_ASSURANCE_STATUS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload;
  },
  [TOGGLE_QUALITY_ASSURANCE_STATUS_FAIL](state, errorQualityAssuranceTeam) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
        REMOVE MEMBERS FROM QUALITY ASSURANCE TEAM
      */
  [REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload;
  },
  [REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },

  /* 
        REMOVE SUPERVISORS FROM QUALITY ASSURANCE TEAM
      */
  [REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload;
  },
  [REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
  /* 
        REMOVE QUEUE FROM QUALITY ASSURANCE TEAM
      */
  [REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_REQUEST](state) {
    state.loadingQualityAssuranceTeam = true;
    state.errorQualityAssuranceTeam = "";
  },
  [REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceTeam = false;
    state.successQualityAssuranceTeam = payload;
  },
  [REMOVE_QUEUE_FROM_QUALITY_ASSURANCE_TEAM_FAIL](
    state,
    errorQualityAssuranceTeam
  ) {
    state.loadingQualityAssuranceTeam = false;
    state.errorQualityAssuranceTeam = errorQualityAssuranceTeam;
  },
};

const actions = {
  /* 
    CREATE QUALITY ASSURANCE TEAM
  */
  async createQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(CREATE_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/create_q_a_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log("create quality assurance team response", response.data);
        commit(CREATE_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
          commit(CREATE_QUALITY_ASSURANCE_TEAM_FAIL, error.response.data);
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* SUBMIT REVIEW
   */
  async submitReview({ commit }, payload) {
    commit(SUBMIT_REVIEW_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/add_qa_form_response`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log("create quality assurance team response", response.data);
        commit(SUBMIT_REVIEW_SUCCESS, response.data);
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
          commit(SUBMIT_REVIEW_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE TEAM
    */
  async getQualityAssuranceTeam({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/get_q_a_teams`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log("get quality assurance team response", response.data);
        commit(GET_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
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
          commit(GET_QUALITY_ASSURANCE_TEAM_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE USERS
    */
  async getQualityAssuranceUsers({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_USERS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/get_qa_users`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance users config", config);

    axios(config)
      .then(function (response) {
        console.log("get quality assurance users response", response.data);
        commit(GET_QUALITY_ASSURANCE_USERS_SUCCESS, response.data);
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
          commit(GET_QUALITY_ASSURANCE_USERS_FAIL, error.response.data);
        }
      });
  },

  /* 
      GET INTERACTION DATA 
    */
  async getInteractionData({ commit }, payload) {
    commit(GET_INTERACTION_DATA_REQUEST);

    var config = {
      method: "get",
      url:
        `${baseUrl}quality_assurances/get_interaction_details?interaction_reference=` +
        payload.id,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance interaction data", config);

    axios(config)
      .then(function (response) {
        console.log("get quality assurance interaction data", response.data);
        commit(GET_INTERACTION_DATA_SUCCESS, response.data);
        router.replace({ name: "ReviewsPage" });
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
          commit(GET_INTERACTION_DATA_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE QUALITY ASSURANCE TEAM
    */
  async updateQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(UPDATE_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}quality_assurances/update_q_a_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log("update quality assurance team response", response.data);
        commit(UPDATE_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
          commit(UPDATE_QUALITY_ASSURANCE_TEAM_FAIL, error.response.data);
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    ADD FORM TO QUALITY ASSURANCE TEAM
  */
  async addFormToQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}quality_assurances/add_form_to_q_a_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add form to quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add form to quality assurance team response",
          response.data
        );
        commit(ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
          commit(ADD_FORM_TO_QUALITY_ASSURANCE_TEAM_FAIL, error.response.data);
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    ADD MEMBERS TO QUALITY ASSURANCE TEAM
  */
  async addMembersToQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/add_members_to_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add members to quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add members to quality assurance team response",
          response.data
        );
        commit(ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
            ADD_MEMBERS_TO_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    ADD QUEUES TO QUALITY ASSURANCE TEAM
  */
  async addQueuesToQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/add_queue_to_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add members to quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add members to quality assurance team response",
          response.data
        );
        commit(ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
            ADD_QUEUES_TO_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    ADD SUPERVISOR TO QUALITY ASSURANCE TEAM
  */
  async addSupervisorsToQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/add_supervisor_to_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add members to quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add members to quality assurance team response",
          response.data
        );
        commit(ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
            ADD_SUPERVISOR_TO_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
      TOGGLE QUALITY ASSURANCE STATUS
    */
  async toggleQualityAssuranceStatus({ commit, dispatch }, payload) {
    commit(TOGGLE_QUALITY_ASSURANCE_STATUS_REQUEST);

    var config = {
      method: "patch",
      url: `${baseUrl}quality_assurances/toggle_qa_member_status`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("toggle quality assurance status config", config);

    axios(config)
      .then(function (response) {
        console.log("toggle quality assurance status response", response.data);
        commit(TOGGLE_QUALITY_ASSURANCE_STATUS_SUCCESS, response.data);
        dispatch("getQualityAssuranceTeam");
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
          commit(TOGGLE_QUALITY_ASSURANCE_STATUS_FAIL, error.response.data);
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    REMOVE MEMBERS FROM QUALITY ASSURANCE TEAM
  */
  async removeMembersFromQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}quality_assurances/remove_member_from_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("REMOVE members from quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "REMOVE members from quality assurance team response",
          response.data
        );
        commit(
          REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS,
          response.data
        );
        dispatch("getQualityAssuranceTeam");
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
            REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    REMOVE QUEUE FROM QUALITY ASSURANCE TEAM
  */
  async removeQueueFromQualityAssuranceTeam({ commit, dispatch }, payload) {
    commit(REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}quality_assurances/remove_queue_from_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("REMOVE members from quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "REMOVE members from quality assurance team response",
          response.data
        );
        commit(
          REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS,
          response.data
        );
        dispatch("getQualityAssuranceTeam");
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
            REMOVE_MEMBERS_FROM_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
        }
      });
  },
  /* 
    REMOVE SUPERVISOR FROM QUALITY ASSURANCE TEAM
  */
  async removeSupervisorFromQualityAssuranceTeam(
    { commit, dispatch },
    payload
  ) {
    commit(REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}quality_assurances/remove_supervisor_from_qa_team`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("REMOVE members from quality assurance team config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "REMOVE members from quality assurance team response",
          response.data
        );
        commit(
          REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_SUCCESS,
          response.data
        );
        dispatch("getQualityAssuranceTeam");
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
            REMOVE_SUPERVISOR_FROM_QUALITY_ASSURANCE_TEAM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceTeam");
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
