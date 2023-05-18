import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    QUALITY ASSURANCE FORM
  */
export const CREATE_QUALITY_ASSURANCE_FORM_REQUEST =
  "CREATE_QUALITY_ASSURANCE_FORM_REQUEST";
export const CREATE_QUALITY_ASSURANCE_FORM_SUCCESS =
  "CREATE_QUALITY_ASSURANCE_FORM_SUCCESS";
export const CREATE_QUALITY_ASSURANCE_FORM_FAIL =
  "CREATE_QUALITY_ASSURANCE_FORM_FAIL";
export const GET_QUALITY_ASSURANCE_FORM_REQUEST =
  "GET_QUALITY_ASSURANCE_FORM_REQUEST";
export const GET_QUALITY_ASSURANCE_FORM_SUCCESS =
  "GET_QUALITY_ASSURANCE_FORM_SUCCESS";
export const GET_QUALITY_ASSURANCE_FORM_FAIL =
  "GET_QUALITY_ASSURANCE_FORM_FAIL";
export const GET_QUALITY_ASSURANCE_FORM_ITEMS_REQUEST =
  "GET_QUALITY_ASSURANCE_FORM_ITEMS_REQUEST";
export const GET_QUALITY_ASSURANCE_FORM_ITEMS_SUCCESS =
  "GET_QUALITY_ASSURANCE_FORM_ITEMS_SUCCESS";
export const GET_QUALITY_ASSURANCE_FORM_ITEMS_FAIL =
  "GET_QUALITY_ASSURANCE_FORM_ITEMS_FAIL";
export const GET_SINGLE_QUALITY_ASSURANCE_FORM_REQUEST =
  "GET_SINGLE_QUALITY_ASSURANCE_FORM_REQUEST";
export const GET_SINGLE_QUALITY_ASSURANCE_FORM_SUCCESS =
  "GET_SINGLE_QUALITY_ASSURANCE_FORM_SUCCESS";
export const GET_SINGLE_QUALITY_ASSURANCE_FORM_FAIL =
  "GET_SINGLE_QUALITY_ASSURANCE_FORM_FAIL";
export const UPDATE_QUALITY_ASSURANCE_FORM_REQUEST =
  "UPDATE_QUALITY_ASSURANCE_FORM_REQUEST";
export const UPDATE_QUALITY_ASSURANCE_FORM_SUCCESS =
  "UPDATE_QUALITY_ASSURANCE_FORM_SUCCESS";
export const UPDATE_QUALITY_ASSURANCE_FORM_FAIL =
  "UPDATE_QUALITY_ASSURANCE_FORM_FAIL";
export const ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_REQUEST =
  "ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_REQUEST";
export const ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_SUCCESS =
  "ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_SUCCESS";
export const ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_FAIL =
  "ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_FAIL";
export const UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_REQUEST =
  "UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_REQUEST";
export const UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_SUCCESS =
  "UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_SUCCESS";
export const UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_FAIL =
  "UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_FAIL";
export const ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_REQUEST =
  "ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_REQUEST";
export const ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_SUCCESS =
  "ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_SUCCESS";
export const ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_FAIL =
  "ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_FAIL";
export const CURRENT_QA_FORM = "CURRENT_QA_FORM";

const state = {
  loadingQualityAssuranceForm: false,
  successQualityAssuranceForm: "",
  errorQualityAssuranceForm: "",
  qualityAssuranceForm: [],
  singleQualityAssuranceForm: [],
  selectQualityAssuranceForm: [],
  selectQAForm: "",
  qaFormItems: "",
};

const getters = {
  loadingQualityAssuranceForm: (state) => state.loadingQualityAssuranceForm,
  successQualityAssuranceForm: (state) => state.successQualityAssuranceForm,
  errorQualityAssuranceForm: (state) => state.errorQualityAssuranceForm,
  qualityAssuranceForm: (state) => state.qualityAssuranceForm,
  singleQualityAssuranceForm: (state) => state.singleQualityAssuranceForm,
  selectQualityAssuranceForm: (state) => state.selectQualityAssuranceForm,
  selectQAForm: (state) => state.selectQAForm,
  qaFormItems: (state) => state.qaFormItems,
};

const mutations = {
  [CURRENT_QA_FORM](state, payload) {
    state.selectQAForm = payload;
  },
  /* 
    CREATE QUALITY ASSURANCE FORM
  */
  [CREATE_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [CREATE_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.successQualityAssuranceForm = payload.message;
  },
  [CREATE_QUALITY_ASSURANCE_FORM_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
    GET QUALITY ASSURANCE FORM
  */
  [GET_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [GET_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.qualityAssuranceForm = payload;
    state.selectQualityAssuranceForm = payload.map((qualityAssuranceForm) => {
      return {
        label: qualityAssuranceForm.name,
        value: qualityAssuranceForm.id,
      };
    });
    state.qaFormItems = payload.map((qualityAssuranceForm) => {
      return {
        label: qualityAssuranceForm.name,
        value: qualityAssuranceForm.id,
      };
    });
  },
  [GET_QUALITY_ASSURANCE_FORM_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
    GET QUALITY ASSURANCE FORM
  */
  [GET_QUALITY_ASSURANCE_FORM_ITEMS_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [GET_QUALITY_ASSURANCE_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.qaFormItems = payload;
    console.log("I am getting form Items", payload);
    // state.selectQualityAssuranceForm = payload.map((qualityAssuranceForm) => {
    //   return {
    //     label: qualityAssuranceForm.name,
    //     value: qualityAssuranceForm.id,
    //   };
    // });
  },
  [GET_QUALITY_ASSURANCE_FORM_ITEMS_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
    GET SINGLE QUALITY ASSURANCE FORM
  */
  [GET_SINGLE_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [GET_SINGLE_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.singleQualityAssuranceForm = payload;
  },
  [GET_SINGLE_QUALITY_ASSURANCE_FORM_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
        UPDATE QUALITY ASSURANCE FORM
      */
  [UPDATE_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [UPDATE_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.successQualityAssuranceForm = payload;
  },
  [UPDATE_QUALITY_ASSURANCE_FORM_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
        ADD ITEMS TO QUALITY ASSURANCE FORM
      */
  [ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.successQualityAssuranceForm = payload;
  },
  [ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_FAIL](state, errorQualityAssuranceForm) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
        UPDATE ITEMS IN QUALITY ASSURANCE FORM
      */
  [UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.successQualityAssuranceForm = payload;
  },
  [UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_FAIL](
    state,
    errorQualityAssuranceForm
  ) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
  /* 
        ADD RESPONSE TO QUALITY ASSURANCE FORM
      */
  [ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_REQUEST](state) {
    state.loadingQualityAssuranceForm = true;
    state.errorQualityAssuranceForm = "";
  },
  [ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_SUCCESS](state, payload) {
    state.loadingQualityAssuranceForm = false;
    state.successQualityAssuranceForm = payload;
  },
  [ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_FAIL](
    state,
    errorQualityAssuranceForm
  ) {
    state.loadingQualityAssuranceForm = false;
    state.errorQualityAssuranceForm = errorQualityAssuranceForm;
  },
};

const actions = {
  async storeQAFormSelect({ commit }, payload) {
    commit(CURRENT_QA_FORM, payload);
    console.log("I am storing current QA form ", state.selectQAForm);
    if (state.selectQAForm.q_a_form_items?.length == 0) {
      localStorage.setItem("QA Form Info", "");
      router.replace({ name: "QualityAssuranceFormBuilder" });
    } else {
      console.log(
        "these are the select qa form items",
        state.selectQAForm.q_a_form_items
      );

      state.qaFormItems = state.selectQAForm.q_a_form_items.map(
        (selected_items) => {
          var is_mandatory = false;
          if (selected_items.is_required == 0) {
            is_mandatory = false;
          } else {
            is_mandatory = true;
          }
          if (selected_items.type === "toggle") {
            return {
              is_mandatory: is_mandatory,
              question: selected_items.question,
              question_type: selected_items.type,
              weight: selected_items.weight,
            };
          } else {
            return {
              is_mandatory: is_mandatory,
              question: selected_items.question,
              max_range: selected_items.range,
              question_type: selected_items.type,
              weight: selected_items.weight,
            };
          }
        }
      );
      console.log("this is the formated form items", state.qaFormItems);
      localStorage.setItem(
        "QA Form Info",
        JSON.stringify([{ form_items: state.qaFormItems }])
      );
      router.replace({ name: "QualityAssuranceFormBuilder" });
    }
  },
  /* 
    CREATE QUALITY ASSURANCE FORM
  */
  async createQualityAssuranceForm({ commit, dispatch }, payload) {
    commit(CREATE_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/create_q_a_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("create quality assurance form response", response.data);
        commit(CREATE_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
        dispatch("getQualityAssuranceForm");
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
          commit(CREATE_QUALITY_ASSURANCE_FORM_FAIL, error.response.data);
          dispatch("getQualityAssuranceForm");
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE FORM
    */
  async getQualityAssuranceForm({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/get_q_a_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("get quality assurance form response", response.data);
        commit(GET_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
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
          commit(GET_QUALITY_ASSURANCE_FORM_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET QUALITY ASSURANCE FORM ITEMS
    */
  async getQualityAssuranceFormItems({ commit }, payload) {
    commit(GET_QUALITY_ASSURANCE_FORM_ITEMS_REQUEST);

    var config = {
      method: "get",
      url:
        `${baseUrl}quality_assurances/get_qa_form_by_id?q_a_form_id=` + payload,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("get quality assurance form response", response.data);
        commit(GET_QUALITY_ASSURANCE_FORM_ITEMS_SUCCESS, response.data);
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
          commit(GET_QUALITY_ASSURANCE_FORM_ITEMS_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE QUALITY ASSURANCE FORM
    */
  async getSingleQualityAssuranceForm({ commit }, payload) {
    commit(GET_SINGLE_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}quality_assurances/get_qa_form_by_id?q_a_form_id=${payload.quality_assurance_form_id}`,
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
        console.log(
          "get single quality assurance form response",
          response.data
        );
        commit(GET_SINGLE_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
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
          commit(GET_SINGLE_QUALITY_ASSURANCE_FORM_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE QUALITY ASSURANCE FORM
    */
  async updateQualityAssuranceForm({ commit, dispatch }, payload) {
    commit(UPDATE_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}quality_assurances/update_q_a_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log("update quality assurance form response", response.data);
        commit(UPDATE_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
        dispatch("getQualityAssuranceForm");
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
          commit(UPDATE_QUALITY_ASSURANCE_FORM_FAIL, error.response.data);
          dispatch("getQualityAssuranceForm");
        }
      });
  },
  /* 
      ADD ITEMS TO QUALITY ASSURANCE FORM
    */
  async createQualityAssuranceFormItems({ commit, dispatch }, payload) {
    commit(ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}quality_assurances/add_items_to_qa_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add items to quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add items to quality assurance form response",
          response.data
        );
        commit(ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
        dispatch("getQualityAssuranceForm");
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
          commit(ADD_ITEMS_TO_QUALITY_ASSURANCE_FORM_FAIL, error.response.data);
          dispatch("getQualityAssuranceForm");
        }
      });
  },
  /* 
      UPDATE ITEMS IN QUALITY ASSURANCE FORM
    */
  async updateItemsInQualityAssuranceForm({ commit, dispatch }, payload) {
    commit(UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}quality_assurances/update_items_to_qa_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update items in quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "update items in quality assurance form response",
          response.data
        );
        commit(UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
        dispatch("getQualityAssuranceForm");
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
            UPDATE_ITEMS_IN_QUALITY_ASSURANCE_FORM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceForm");
        }
      });
  },
  /* 
      ADD RESPONSE TO QUALITY ASSURANCE FORM
    */
  async addResponseToQualityAssuranceForm({ commit, dispatch }, payload) {
    commit(ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_REQUEST);

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
    console.log("add response to quality assurance form config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "add response to quality assurance form response",
          response.data
        );
        commit(ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_SUCCESS, response.data);
        dispatch("getQualityAssuranceForm");
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
            ADD_RESPONSE_TO_QUALITY_ASSURANCE_FORM_FAIL,
            error.response.data
          );
          dispatch("getQualityAssuranceForm");
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
