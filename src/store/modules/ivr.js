import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const IVR_REQUEST = "IVR_REQUEST";
export const IVR_SUCCESS = "IVR_SUCCESS";
export const IVR_FAIL = "IVR_FAIL";
export const AUDIO_IVR_REQUEST = "AUDIO_IVR_REQUEST";
export const AUDIO_IVR_SUCCESS = "AUDIO_IVR_SUCCESS";
export const AUDIO_IVR_FAIL = "AUDIO_IVR_FAIL";
export const CREATE_IVR_REQUEST = "CREATE_IVR_REQUEST";
export const CREATE_IVR_SUCCESS = "CREATE_IVR_SUCCESS";
export const CREATE_IVR_FAIL = "CREATE_IVR_FAIL";
export const UPLOAD_AUDIO_IVR_REQUEST = "UPLOAD_AUDIO_IVR_REQUEST";
export const UPLOAD_AUDIO_IVR_SUCCESS = "UPLOAD_AUDIO_IVR_SUCCESS";
export const UPLOAD_AUDIO_IVR_FAIL = "UPLOAD_AUDIO_IVR_FAIL";
export const ADD_IVR_FLOW_REQUEST = "ADD_IVR_FLOW_REQUEST";
export const ADD_IVR_FLOW_SUCCESS = "ADD_IVR_FLOW_SUCCESS";
export const ADD_IVR_FLOW_FAIL = "ADD_IVR_FLOW_FAIL";
export const MAP_IVR_TO_DID_REQUEST = "MAP_IVR_TO_DID_REQUEST";
export const MAP_IVR_TO_DID_SUCCESS = "MAP_IVR_TO_DID_SUCCESS";
export const MAP_IVR_TO_DID_FAIL = "MAP_IVR_TO_DID_FAIL";
export const DELINK_IVR_FROM_DID_REQUEST = "DELINK_IVR_FROM_DID_REQUEST";
export const DELINK_IVR_FROM_DID_SUCCESS = "DELINK_IVR_FROM_DID_SUCCESS";
export const DELINK_IVR_FROM_DID_FAIL = "DELINK_IVR_FROM_DID_FAIL";
export const REMOVE_IVR_FILE_REQUEST = "REMOVE_IVR_FILE_REQUEST";
export const REMOVE_IVR_FILE_SUCCESS = "REMOVE_IVR_FILE_SUCCESS";
export const REMOVE_IVR_FILE_FAIL = "REMOVE_IVR_FILE_FAIL";

const state = {
  loadingIvr: false,
  successIvr: "",
  errorIvr: "",
  ivr: [],
  ivrAudios: [],
  selectIvrAudios: [],
};

const getters = {
  loadingIvr: (state) => state.loadingIvr,
  successIvr: (state) => state.successIvr,
  errorIvr: (state) => state.errorIvr,
  ivr: (state) => state.ivr,
  ivrAudios: (state) => state.ivrAudios,
  selectIvrAudios: (state) => state.selectIvrAudios,
};

const mutations = {
  /* 
    IVR INFO
  */
  [IVR_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [IVR_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.ivr = payload;
  },
  [IVR_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    AUDIO IVR INFO
  */
  [AUDIO_IVR_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [AUDIO_IVR_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.ivrAudios = payload;
    state.selectIvrAudios = payload.map((ivr) => {
      return { label: ivr.name, value: ivr.file_url };
    });
  },
  [AUDIO_IVR_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    CREATE IVR INFO
  */
  [CREATE_IVR_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [CREATE_IVR_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [CREATE_IVR_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    UPLOAD AUDIO IVR INFO
  */
  [UPLOAD_AUDIO_IVR_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [UPLOAD_AUDIO_IVR_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [UPLOAD_AUDIO_IVR_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    ADD IVR FLOW INFO
  */
  [ADD_IVR_FLOW_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [ADD_IVR_FLOW_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [ADD_IVR_FLOW_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    MAP IVR TO DID
  */
  [MAP_IVR_TO_DID_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [MAP_IVR_TO_DID_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [MAP_IVR_TO_DID_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    DELINK IVR FROM DID
  */
  [DELINK_IVR_FROM_DID_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [DELINK_IVR_FROM_DID_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [DELINK_IVR_FROM_DID_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
  /* 
    REMOVE IVR FILE
  */
  [REMOVE_IVR_FILE_REQUEST](state) {
    state.loadingIvr = true;
    state.errorIvr = "";
  },
  [REMOVE_IVR_FILE_SUCCESS](state, payload) {
    state.loadingIvr = false;
    state.successIvr = payload.message;
  },
  [REMOVE_IVR_FILE_FAIL](state, errorIvr) {
    state.loadingIvr = false;
    state.errorIvr = errorIvr;
  },
};

const actions = {
  /* 
    IVR INFO 
  */
  async getIvr({ commit }, payload) {
    commit(IVR_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ivr/get_all_ivrs`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(IVR_SUCCESS, response.data);
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
          commit(IVR_FAIL, error.response.data);
        }
      });
  },
  /* 
    AUDIO IVR INFO 
  */
  async getAudioIvr({ commit }, payload) {
    commit(AUDIO_IVR_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ivr/get_ivr_files`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(AUDIO_IVR_SUCCESS, response.data);
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
          commit(AUDIO_IVR_FAIL, error.response.data);
        }
      });
  },
  /* 
    CREATE IVR INFO 
  */
  async createIvr({ commit, dispatch }, payload) {
    commit(CREATE_IVR_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}ivr/create_ivr`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(CREATE_IVR_SUCCESS, response.data);
        dispatch("getIvr");
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
          commit(CREATE_IVR_FAIL, error.response.data);
        }
      });
  },
  /* 
    UPLOAD AUDIO IVR INFO 
  */
  async uploadAudioIvr({ commit, dispatch }, payload) {
    commit(UPLOAD_AUDIO_IVR_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}ivr/upload_ivr_files`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("upload audio config", config);

    axios(config)
      .then(function (response) {
        console.log("upload audio response", response.data);
        commit(UPLOAD_AUDIO_IVR_SUCCESS, response.data);
        dispatch("getAudioIvr");
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
          commit(UPLOAD_AUDIO_IVR_FAIL, error.response.data);
          dispatch("getAudioIvr");
        }
      });
  },
  /* 
    ADD IVR FLOW INFO 
  */
  async addIvrFlow({ commit, dispatch }, payload) {
    commit(ADD_IVR_FLOW_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}ivr/add_ivr_flow`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("add ivr flow config", config);

    axios(config)
      .then(function (response) {
        commit(ADD_IVR_FLOW_SUCCESS, response.data);
        dispatch("getIvr");
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
          commit(ADD_IVR_FLOW_FAIL, error.response.data);
        }
      });
  },
  /* 
    MAP IVR TO DID
  */
  async mapIvrToDid({ commit, dispatch }, payload) {
    commit(MAP_IVR_TO_DID_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}ivr/map_ivr_to_did`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("map ivr to did config", config);

    axios(config)
      .then(function (response) {
        console.log("map ivr to did response", response.data);
        commit(MAP_IVR_TO_DID_SUCCESS, response.data);
        dispatch("getIvr");
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
          commit(MAP_IVR_TO_DID_FAIL, error.response.data);
        }
      });
  },
  /* 
    DELINK IVR FROM DID
  */
  async delinkIvrFromDid({ commit, dispatch }, payload) {
    commit(DELINK_IVR_FROM_DID_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}ivr/delink_ivr_to_did`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delink ivr from did config", config);

    axios(config)
      .then(function (response) {
        console.log("delink ivr from did response", response.data);
        commit(DELINK_IVR_FROM_DID_SUCCESS, response.data);
        dispatch("getIvr");
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
          commit(DELINK_IVR_FROM_DID_FAIL, error.response.data);
        }
      });
  },
  /* 
    REMOVE IVR FILE
  */
  async removeIvrFile({ commit, dispatch }, payload) {
    commit(REMOVE_IVR_FILE_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}ivr/remove_ivr_files`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("remove ivr file config", config);

    axios(config)
      .then(function (response) {
        console.log("remove ivr file response", response.data);
        commit(REMOVE_IVR_FILE_SUCCESS, response.data);
        dispatch("getAudioIvr");
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
          commit(REMOVE_IVR_FILE_FAIL, error.response.data);
          dispatch("getAudioIvr");
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
