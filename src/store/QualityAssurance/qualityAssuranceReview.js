import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    QUALITY ASSURANCE
  */
export const SUBMIT_QUALITY_ASSURANCE_REVIEWS_REQUEST =
  "SUBMIT_QUALITY_ASSURANCE_REVIEWS_REQUEST";
export const SUBMIT_QUALITY_ASSURANCE_REVIEWS_SUCCESS =
  "SUBMIT_QUALITY_ASSURANCE_REVIEWS_SUCCESS";
export const SUBMIT_QUALITY_ASSURANCE_REVIEWS_FAIL =
  "SUBMIT_QUALITY_ASSURANCE_REVIEWS_FAIL";
export const GET_QUALITY_ASSURANCE_OPEN_REVIEWS_REQUEST =
  "GET_QUALITY_ASSURANCE_OPEN_REVIEWS_REQUEST";
export const GET_QUALITY_ASSURANCE_OPEN_REVIEWS_SUCCESS =
  "GET_QUALITY_ASSURANCE_OPEN_REVIEWS_SUCCESS";
export const GET_QUALITY_ASSURANCE_OPEN_REVIEWS_FAIL =
  "GET_QUALITY_ASSURANCE_OPEN_REVIEWS_FAIL";
export const GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_REQUEST =
  "GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_REQUEST";
export const GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_SUCCESS =
  "GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_SUCCESS";
export const GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_FAIL =
  "GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_FAIL";
export const GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_REQUEST =
  "GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_REQUEST";
export const GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_SUCCESS =
  "GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_SUCCESS";
export const GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_FAIL =
  "GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_FAIL";
export const GET_QUALITY_ASSURANCE_REVIEW_BY_ID_REQUEST =
  "GET_QUALITY_ASSURANCE_REVIEW_BY_ID_REQUEST";
export const GET_QUALITY_ASSURANCE_REVIEW_BY_ID_SUCCESS =
  "GET_QUALITY_ASSURANCE_REVIEW_BY_ID_SUCCESS";
export const GET_QUALITY_ASSURANCE_REVIEW_BY_ID_FAIL =
  "GET_QUALITY_ASSURANCE_REVIEW_BY_ID_FAIL";

const state = {
  loadingQualityAssuranceReviews: false,
  successQualityAssuranceReviews: "",
  errorQualityAssuranceReviews: "",
  qualityAssuranceOpenReviews: [],
  selectQualityAssuranceOpenReviews: [],
  qualityAssuranceClosedReviews: [],
  selectQualityAssuranceClosedReviews: [],
  qualityAssuranceInteractionDetails: [],
  selectQualityAssuranceInteractionDetails: [],
  qualityAssuranceReviewsById: [],
  selectQualityAssuranceReviewsById: [],
};

const getters = {
  loadingQualityAssuranceReviews: (state) =>
    state.loadingQualityAssuranceReviews,
  successQualityAssuranceReviews: (state) =>
    state.successQualityAssuranceReviews,
  errorQualityAssuranceReviews: (state) => state.errorQualityAssuranceReviews,
  qualityAssuranceOpenReviews: (state) => state.qualityAssuranceOpenReviews,
  selectQualityAssuranceOpenReviews: (state) =>
    state.selectQualityAssuranceOpenReviews,
  qualityAssuranceClosedReviews: (state) => state.qualityAssuranceClosedReviews,
  selectQualityAssuranceClosedReviews: (state) =>
    state.selectQualityAssuranceClosedReviews,
  qualityAssuranceInteractionDetails: (state) =>
    state.qualityAssuranceInteractionDetails,
  selectQualityAssuranceInteractionDetails: (state) =>
    state.selectQualityAssuranceInteractionDetails,
  qualityAssuranceReviewsById: (state) => state.qualityAssuranceReviewsById,
  selectQualityAssuranceReviewsById: (state) =>
    state.selectQualityAssuranceReviewsById,
};

const mutations = {
  /* 
    SUBMIT QUALITY ASSURANCE REVIEWS
  */
  [SUBMIT_QUALITY_ASSURANCE_REVIEWS_REQUEST](state) {
    state.loadingQualityAssuranceReviews = true;
    state.errorQualityAssuranceReviews = "";
  },
  [SUBMIT_QUALITY_ASSURANCE_REVIEWS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceReviews = false;
    state.successQualityAssuranceReviews = payload.message;
  },
  [SUBMIT_QUALITY_ASSURANCE_REVIEWS_FAIL](state, errorQualityAssuranceReviews) {
    state.loadingQualityAssuranceReviews = false;
    state.errorQualityAssuranceReviews = errorQualityAssuranceReviews;
  },

  /*
    GET QUALITY ASSURANCE OPEN REVIEWS
  */
  [GET_QUALITY_ASSURANCE_OPEN_REVIEWS_REQUEST](state) {
    state.loadingQualityAssuranceReviews = true;
    state.errorQualityAssuranceReviews = "";
  },
  [GET_QUALITY_ASSURANCE_OPEN_REVIEWS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceReviews = false;
    state.qualityAssuranceOpenReviews = payload;
    state.selectQualityAssuranceOpenReviews = payload.map(
      (qualityAssurance) => {
        return { label: qualityAssurance.name, value: qualityAssurance.id };
      }
    );
  },
  [GET_QUALITY_ASSURANCE_OPEN_REVIEWS_FAIL](
    state,
    errorQualityAssuranceReviews
  ) {
    state.loadingQualityAssuranceReviews = false;
    state.errorQualityAssuranceReviews = errorQualityAssuranceReviews;
  },
  /* 
    GET QUALITY ASSURANCE CLOSED REVIEWS
  */
  [GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_REQUEST](state) {
    state.loadingQualityAssuranceReviews = true;
    state.errorQualityAssuranceReviews = "";
  },
  [GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceReviews = false;
    state.qualityAssuranceClosedReviews = payload;
    state.selectQualityAssuranceClosedReviews = payload.map(
      (qualityAssurance) => {
        return { label: qualityAssurance.name, value: qualityAssurance.id };
      }
    );
  },
  [GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_FAIL](
    state,
    errorQualityAssuranceReviews
  ) {
    state.loadingQualityAssuranceReviews = false;
    state.errorQualityAssuranceReviews = errorQualityAssuranceReviews;
  },
  /* 
    GET QUALITY ASSURANCE INTERACTION DETAILS
  */
  [GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_REQUEST](state) {
    state.loadingQualityAssuranceReviews = true;
    state.errorQualityAssuranceReviews = "";
  },
  [GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceReviews = false;
    state.qualityAssuranceInteractionDetails = payload;
    state.selectQualityAssuranceInteractionDetails = payload.map(
      (qualityAssurance) => {
        return { label: qualityAssurance.name, value: qualityAssurance.id };
      }
    );
  },
  [GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_FAIL](
    state,
    errorQualityAssuranceReviews
  ) {
    state.loadingQualityAssuranceReviews = false;
    state.errorQualityAssuranceReviews = errorQualityAssuranceReviews;
  },
  /* 
        GET QUALITY ASSURANCE REVIEW BY ID
      */
  [GET_QUALITY_ASSURANCE_REVIEW_BY_ID_REQUEST](state) {
    state.loadingQualityAssuranceReviews = true;
    state.errorQualityAssuranceReviews = "";
  },
  [GET_QUALITY_ASSURANCE_REVIEW_BY_ID_SUCCESS](state, payload) {
    state.loadingQualityAssuranceReviews = false;
    state.qualityAssuranceReviewsById = payload;
  },
  [GET_QUALITY_ASSURANCE_REVIEW_BY_ID_FAIL](
    state,
    errorQualityAssuranceReviews
  ) {
    state.loadingQualityAssuranceReviews = false;
    state.errorQualityAssuranceReviews = errorQualityAssuranceReviews;
  },
};

const actions = {
  /* 
    SUBMIT QUALITY ASSURANCE REVIEWS
  */
  async submitQualityAssuranceReviews({ commit, dispatch }, payload) {
    commit(SUBMIT_QUALITY_ASSURANCE_REVIEWS_REQUEST);

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
    console.log("submit quality assurance reviews config", config);

    axios(config)
      .then(function (response) {
        console.log("submit quality assurance reviews response", response.data);
        commit(SUBMIT_QUALITY_ASSURANCE_REVIEWS_SUCCESS, response.data);
        dispatch("getQualityAssuranceClosedReviews");
        dispatch("getQualityAssuranceOpenReviews");
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
          commit(SUBMIT_QUALITY_ASSURANCE_REVIEWS_FAIL, error.response.data);
          dispatch("getQualityAssuranceClosedReviews");
          dispatch("getQualityAssuranceOpenReviews");
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE OPEN REVIEWS
    */
  async getQualityAssuranceOpenReviews({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_OPEN_REVIEWS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/list_open_reviews`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance open reviews config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "get quality assurance open reviews response",
          response.data
        );
        commit(GET_QUALITY_ASSURANCE_OPEN_REVIEWS_SUCCESS, response.data);
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
          commit(GET_QUALITY_ASSURANCE_OPEN_REVIEWS_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE CLOSED REVIEWS
    */
  async getQualityAssuranceClosedReviews({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/list_closed_reviews`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance closed reviews config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "get quality assurance closed reviews response",
          response.data
        );
        commit(GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_SUCCESS, response.data);
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
            GET_QUALITY_ASSURANCE_CLOSED_REVIEWS_FAIL,
            error.response.data
          );
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE INTERACTION DETAILS
    */
  async getQualityAssuranceInteractionDetails({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/get_interaction_details?interaction_reference=${payload.interaction_reference}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance interaction details config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "get quality assurance interaction details response",
          response.data
        );
        commit(
          GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_SUCCESS,
          response.data
        );
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
            GET_QUALITY_ASSURANCE_INTERACTION_DETAILS_FAIL,
            error.response.data
          );
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE REVIEW BY ID
    */
  async getQualityAssuranceReviewById({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_REVIEW_BY_ID_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/show_review_details?review_id=${payload.review_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance review by id config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "get quality assurance review by id response",
          response.data
        );
        commit(GET_QUALITY_ASSURANCE_REVIEW_BY_ID_SUCCESS, response.data);
        router.replace({ name: "CompletedReviewsPage" });
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
          commit(GET_QUALITY_ASSURANCE_REVIEW_BY_ID_FAIL, error.response.data);
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
