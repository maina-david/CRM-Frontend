import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    GET AVERAGE REVIEW PER AGENT
  */
export const GET_AVERAGE_REVIEW_PER_AGENT_REQUEST =
  "GET_AVERAGE_REVIEW_PER_AGENT_REQUEST";
export const GET_AVERAGE_REVIEW_PER_AGENT_SUCCESS =
  "GET_AVERAGE_REVIEW_PER_AGENT_SUCCESS";
export const GET_AVERAGE_REVIEW_PER_AGENT_FAIL =
  "GET_AVERAGE_REVIEW_PER_AGENT_FAIL";
export const GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_REQUEST =
  "GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_REQUEST";
export const GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_SUCCESS =
  "GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_SUCCESS";
export const GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_FAIL =
  "GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_FAIL";

const state = {
  loadingQualityAssuranceForm: false,
  successQualityAssuranceForm: "",
  errorQualityAssuranceForm: "",
  averageReviewPerAgent: [],
  averageReviewPerAgentLabels: [],
  averageReviewPerAgentData: [],
  AverageReviewPerAgentPerQuestion: [],
  AverageReviewPerAgentPerQuestionLabel: [],
  AverageReviewPerAgentPerQuestionData: [],
};

const getters = {
  loadingQualityAssuranceForm: (state) => state.loadingQualityAssuranceForm,
  successQualityAssuranceForm: (state) => state.successQualityAssuranceForm,
  errorQualityAssuranceForm: (state) => state.errorQualityAssuranceForm,
  averageReviewPerAgent: (state) => state.averageReviewPerAgent,
  averageReviewPerAgentLabels: (state) => state.averageReviewPerAgentLabels,
  averageReviewPerAgentData: (state) => state.averageReviewPerAgentData,
  AverageReviewPerAgentPerQuestion: (state) =>
    state.AverageReviewPerAgentPerQuestion,
  AverageReviewPerAgentPerQuestionLabel: (state) =>
    state.AverageReviewPerAgentPerQuestionLabel,
  AverageReviewPerAgentPerQuestionData: (state) =>
    state.AverageReviewPerAgentPerQuestionData,
};

const mutations = {
  /* 
    CREATE QUALITY ASSURANCE FORM
  */
  [GET_AVERAGE_REVIEW_PER_AGENT_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [GET_AVERAGE_REVIEW_PER_AGENT_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;

    state.averageReviewPerAgent = payload;
    state.averageReviewPerAgentLabels = [];
    payload.filter((labels) => {
      state.averageReviewPerAgentLabels.push(labels.name);
    });
    state.averageReviewPerAgentData = [];
    payload.filter((labels) => {
      state.averageReviewPerAgentData.push(labels.average_score);
    });
    console.log("this is score data", state.averageReviewPerAgentData);
  },
  [GET_AVERAGE_REVIEW_PER_AGENT_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },

  [GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;

    state.AverageReviewPerAgentPerQuestion = payload;
    state.AverageReviewPerAgentPerQuestionLabel = [];

    state.AverageReviewPerAgentPerQuestionLabel = Object.keys(
      payload[0].average_reviews
    );
    state.AverageReviewPerAgentPerQuestionLabel.unshift("Agent Name");
    state.AverageReviewPerAgentPerQuestionLabel.push("Actions");
    state.averageReviewPerAgentData = [];
    payload.filter((labels) => {
      state.AverageReviewPerAgentPerQuestionData[labels.name] = Object.values(
        payload[0].average_reviews
      );
      state.AverageReviewPerAgentPerQuestionData[labels.name].unshift(
        labels.name
      );
    });
    console.log(
      "this is score data per question labels",
      state.AverageReviewPerAgentPerQuestionData
    );
  },
  [GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_FAIL](
    state,
    errorQualityAssuranceForm
  ) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
};

const actions = {
  /* 
      GET AVERAGE REVIEW PER AGENT
    */
  async getAverageReviewPerAgent({ commit }, payload) {
    commit(GET_AVERAGE_REVIEW_PER_AGENT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/reports/agentAverageReviewReport?${payload}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("get average reveiw per agent", response.data);
        commit(GET_AVERAGE_REVIEW_PER_AGENT_SUCCESS, response.data);
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
          commit(GET_AVERAGE_REVIEW_PER_AGENT_FAIL, error.response.data);
        }
      });
  },

  async getAverageReviewPerAgentPerQuestion({ commit }, payload) {
    commit(GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/reports/agentReportPerAttribute?${payload}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("get average reveiw per agent per question", response.data);
        commit(GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_SUCCESS, response.data);
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
            GET_AVERAGE_REVIEW_PER_AGENT_QUESTION_FAIL,
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
