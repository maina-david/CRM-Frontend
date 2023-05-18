import axios from "axios";
import router from "@/router";

const baseUrl = process.env.VUE_APP_API_URL;

export const ROLE_PROFILE_REQUEST = "ROLE_PROFILE_REQUEST";
export const ROLE_PROFILE_SUCCESS = "ROLE_PROFILE_SUCCESS";
export const ROLE_PROFILE_FAIL = "ROLE_PROFILE_FAIL";
export const ROLE_PROFILE_CREATE_REQUEST = "ROLE_PROFILE_CREATE_REQUEST";
export const ROLE_PROFILE_CREATE_SUCCESS = "ROLE_PROFILE_CREATE_SUCCESS";
export const ROLE_PROFILE_CREATE_FAIL = "ROLE_PROFILE_CREATE_FAIL";
export const ROLE_PROFILE_UPDATE_REQUEST = "ROLE_PROFILE_UPDATE_REQUEST";
export const ROLE_PROFILE_UPDATE_SUCCESS = "ROLE_PROFILE_UPDATE_SUCCESS";
export const ROLE_PROFILE_UPDATE_FAIL = "ROLE_PROFILE_UPDATE_FAIL";
export const ROLE_PROFILE_USERS_REQUEST = "ROLE_PROFILE_USERS_REQUEST";
export const ROLE_PROFILE_USERS_SUCCESS = "ROLE_PROFILE_USERS_SUCCESS";
export const ROLE_PROFILE_USERS_FAIL = "ROLE_PROFILE_USERS_FAIL";

export const ACCESS_RIGHTS_REQUEST = "ACCESS_RIGHTS_REQUEST";
export const ACCESS_RIGHTS_SUCCESS = "ACCESS_RIGHTS_SUCCESS";
export const ACCESS_RIGHTS_FAIL = "ACCESS_RIGHTS_FAIL";

export const ACCESS_RIGHTS_FORMATTED_REQUEST =
  "ACCESS_RIGHTS_FORMATTED_REQUEST";
export const ACCESS_RIGHTS_FORMATTED_SUCCESS =
  "ACCESS_RIGHTS_FORMATTED_SUCCESS";
export const ACCESS_RIGHTS_FORMATTED_FAIL = "ACCESS_RIGHTS_FORMATTED_FAIL";

export const ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_REQUEST =
  "ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_REQUEST";
export const ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_SUCCESS =
  "ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_SUCCESS";
export const ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_FAIL =
  "ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_FAIL";
export const REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_REQUEST =
  "REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_REQUEST";
export const REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_SUCCESS =
  "REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_SUCCESS";
export const REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_FAIL =
  "REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_FAIL";
export const ASSIGN_ROLE_PROFILE_TO_USER_REQUEST =
  "ASSIGN_ROLE_PROFILE_TO_USER_REQUEST";
export const ASSIGN_ROLE_PROFILE_TO_USER_SUCCESS =
  "ASSIGN_ROLE_PROFILE_TO_USER_SUCCESS";
export const ASSIGN_ROLE_PROFILE_TO_USER_FAIL =
  "REVOKE_ROLE_PROFILE_FROM_USER_FAIL";
export const REVOKE_ROLE_PROFILE_FROM_USER_REQUEST =
  "REVOKE_ROLE_PROFILE_FROM_USER_REQUEST";
export const REVOKE_ROLE_PROFILE_FROM_USER_SUCCESS =
  "REVOKE_ROLE_PROFILE_FROM_USER_SUCCESS";
export const REVOKE_ROLE_PROFILE_FROM_USER_FAIL =
  "REVOKE_ROLE_PROFILE_FROM_USER_FAIL";
export const CHECK_USER_ACCESS_RIGHTS = "CHECK_USER_ACCESS_RIGHTS";
export const CHECK_USER_ACCESS_RIGHTS_SUCCESS =
  "CHECK_USER_ACCESS_RIGHTS_SUCCESS";
export const CHECK_USER_ACCESS_RIGHTS_FAIL = "CHECK_USER_ACCESS_RIGHTS_FAIL";
export const CHECKED_INPUTS_ACCESS = "CHECKED_INPUTS_ACCESS";

const state = {
  loadingRoleProfile: false,
  successRoleProfile: "",
  errorRoleProfile: "",
  roleProfiles: [],
  selectRoleProfiles: [],
  roleProfileUsers: [],
  accessRights: [],
  accessRightsGrouped: [],
  accessRightsGroupedFormatted: [],
  accessRoot: [],
  successAccessRights: "",
  errorAccessRights: "",
  loadingAccessRights: false,
  hasAccess: false,
  checkedInputs: [],
};

const getters = {
  loadingRoleProfile: (state) => state.loadingRoleProfile,
  successRoleProfile: (state) => state.successRoleProfile,
  errorRoleProfile: (state) => state.errorRoleProfile,
  roleProfiles: (state) => state.roleProfiles,
  selectRoleProfiles: (state) => state.selectRoleProfiles,
  roleProfileUsers: (state) => state.roleProfileUsers,
  accessRights: (state) => state.accessRights,
  accessRightsGrouped: (state) => state.accessRightsGrouped,
  accessRightsGroupedFormatted: (state) => state.accessRightsGroupedFormatted,
  loadingAccessRights: (state) => state.loadingAccessRights,
  successAccessRights: (state) => state.successAccessRights,
  errorAccessRights: (state) => state.errorAccessRights,
  hasAccess: (state) => state.hasAccess,
  accessRoot: (state) => state.accessRoot,
  checkedInputs: (state) => state.checkedInputs,
};

const mutations = {
  /* 
    ROLE PROFILES
  */
  [ROLE_PROFILE_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [CHECKED_INPUTS_ACCESS](state, payload) {
    if (!state.checkedInputs.includes(payload)) {
      state.checkedInputs.push(payload);
      console.log("this i sthe new data", state.checkedInputs);
    }
  },
  [ROLE_PROFILE_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.roleProfiles = payload;
    state.selectRoleProfiles = payload.map((role) => {
      return { label: role.name, value: role.id };
    });
  },
  [ROLE_PROFILE_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    ROLE PROFILE CREATE
  */
  [ROLE_PROFILE_CREATE_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ROLE_PROFILE_CREATE_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.successRoleProfile = payload.message;
  },
  [ROLE_PROFILE_CREATE_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    ROLE PROFILE EDIT
  */
  [ROLE_PROFILE_UPDATE_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ROLE_PROFILE_UPDATE_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.roleProfiles = payload;
    state.successRoleProfile = payload.message;
  },
  [ROLE_PROFILE_UPDATE_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    ROLE PROFILE USERS
  */
  [ROLE_PROFILE_USERS_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ROLE_PROFILE_USERS_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.roleProfileUsers = payload;
  },
  [ROLE_PROFILE_USERS_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },

  /* 
    ACCESS RIGHTS
  */
  [ACCESS_RIGHTS_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ACCESS_RIGHTS_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.accessRights = payload.access_right_list;
    state.accessRightsGrouped = payload.access_right_group;
  },
  [ACCESS_RIGHTS_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },

  /*  
    ACCESS RIGHTS FORMATTED
  */
  [ACCESS_RIGHTS_FORMATTED_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ACCESS_RIGHTS_FORMATTED_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.accessRights = payload.access_right_list;
    state.accessRoot = [];
    state.accessRightsGroupedFormatted = payload.access_right_list;

    markSelectedAccessRights(
      payload.selected_access_rights,
      state.accessRightsGroupedFormatted
    );

    function markSelectedAccessRights(selectedAccessRights, accessRightList) {
      accessRightList.forEach((accessRight) => {
        if (selectedAccessRights.includes(accessRight.id)) {
          accessRight.checked = true;
        }
        if (accessRight.children) {
          markSelectedAccessRights(selectedAccessRights, accessRight.children);
        }
      });

      state.accessRightsGroupedFormatted = accessRightList;
    }
    console.log(
      "these are the access rights",
      state.accessRightsGroupedFormatted
    );
  },
  [ACCESS_RIGHTS_FORMATTED_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    ASSIGN ACCESS TO ROLE PROFILE 
  */
  [ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.successRoleProfile = payload.message;
    state.checkedInputs = [];
  },
  [ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    REVOKE ACCESS FROM ROLE PROFILE 
  */
  [REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.successRoleProfile = payload.message;
  },
  [REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    REVOKE ROLE PROFILE FROM USER
  */
  [REVOKE_ROLE_PROFILE_FROM_USER_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [REVOKE_ROLE_PROFILE_FROM_USER_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.successRoleProfile = payload.message;
  },
  [REVOKE_ROLE_PROFILE_FROM_USER_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },
  /* 
    ASSIGN ROLE PROFILE TO USER
  */
  [ASSIGN_ROLE_PROFILE_TO_USER_REQUEST](state) {
    state.loadingRoleProfile = true;
    state.errorRoleProfile = "";
  },
  [ASSIGN_ROLE_PROFILE_TO_USER_SUCCESS](state, payload) {
    state.loadingRoleProfile = false;
    state.successRoleProfile = payload.message;
  },
  [ASSIGN_ROLE_PROFILE_TO_USER_FAIL](state, errorRoleProfile) {
    state.loadingRoleProfile = false;
    state.errorRoleProfile = errorRoleProfile;
  },

  /**CHECK IF USER HAS ACCESS RIGHTS */

  [CHECK_USER_ACCESS_RIGHTS](state) {
    state.loadingAccessRights = true;
    state.errorAccessRights = "";
  },
  [CHECK_USER_ACCESS_RIGHTS_SUCCESS](state, payload) {
    state.loadingAccessRights = false;
    state.hasAccess = payload;
    payload.successAccessRights = payload;
  },
  [CHECK_USER_ACCESS_RIGHTS_FAIL](state, errorAccessRights) {
    state.loadingAccessRights = false;
    state.errorAccessRights = errorAccessRights;
  },
};

const actions = {
  /* 
    ROLE PROFILE 
  */

  async addCheckedInputs({ commit }, payload) {
    commit(CHECKED_INPUTS_ACCESS, payload);
  },
  async getRoleProfiles({ commit }, payload) {
    commit(ROLE_PROFILE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/get_role_profile`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ROLE_PROFILE_SUCCESS, response.data);
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
          commit(ROLE_PROFILE_FAIL, error.response.data);
        }
      });
  },
  /* 
    ROLE PROFILE CREATE 
  */
  async createRoleProfile({ commit, dispatch }, payload) {
    commit(ROLE_PROFILE_CREATE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/create_role_profile`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ROLE_PROFILE_CREATE_SUCCESS, response.data);
        dispatch("getRoleProfiles");
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
          commit(ROLE_PROFILE_CREATE_FAIL, error.response.data);
          dispatch("getRoleProfiles");
        }
      });
  },
  /* 
    ROLE PROFILE UPDATE 
  */
  async updateRoleProfile({ commit, dispatch }, payload) {
    commit(ROLE_PROFILE_UPDATE_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}user/edit_role_profile`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ROLE_PROFILE_UPDATE_SUCCESS, response.data);
        dispatch("getRoleProfiles");
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
          commit(ROLE_PROFILE_UPDATE_FAIL, error.response.data);
          dispatch("getRoleProfiles");
        }
      });
  },
  /* 
    ROLE PROFILE USERS
  */
  async getRoleProfileUsers({ commit }, payload) {
    commit(ROLE_PROFILE_USERS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/get_users_in_profile?role_profile_id=${payload.role_profile_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get role profile users config", config);

    axios(config)
      .then(function (response) {
        console.log("get role profile users response", response.data);
        commit(ROLE_PROFILE_USERS_SUCCESS, response.data);
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
          commit(ROLE_PROFILE_USERS_FAIL, error.response.data);
        }
      });
  },

  /* 
    ACCESS RIGHTS 
  */
  async getAccessRights({ commit }, payload) {
    commit(ACCESS_RIGHTS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/get_access_rights`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ACCESS_RIGHTS_SUCCESS, response.data);
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
          commit(ACCESS_RIGHTS_FAIL, error.response.data);
        }
      });
  },

  /* 
    ACCESS RIGHTS FORMATTED
  */
  async getAccessRightsFormatted({ commit }, payload) {
    commit(ACCESS_RIGHTS_FORMATTED_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}user/get_formated_access_rights?profile_id=${payload.profile_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };

    axios(config)
      .then(function (response) {
        commit(ACCESS_RIGHTS_FORMATTED_SUCCESS, response.data);
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
          commit(ACCESS_RIGHTS_FORMATTED_FAIL, error.response.data);
        }
      });
  },
  /* 
    ASSIGN ACCESS TO ROLE PROFILE 
  */
  async assignAccessRightsToRoleProfile({ commit, dispatch }, payload) {
    commit(ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/assign_access_to_profile_bulk`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign access config", config);

    axios(config)
      .then(function (response) {
        commit(ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_SUCCESS, response.data);
        dispatch("getRoleProfiles");
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
            ASSIGN_ACCESS_RIGHTS_TO_ROLE_PROFILE_FAIL,
            error.response.data
          );
          dispatch("getRoleProfiles");
        }
      });
  },
  /* 
    REVOKE ACCESS FROM ROLE PROFILE 
  */
  async revokeAccessRightsFromRoleProfile({ commit, dispatch }, payload) {
    commit(REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}user/revoke_access_from_role_profile`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign access config", config);

    axios(config)
      .then(function (response) {
        commit(REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_SUCCESS, response.data);
        dispatch("getRoleProfiles");
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
            REVOKE_ACCESS_RIGHTS_FROM_ROLE_PROFILE_FAIL,
            error.response.data
          );
          dispatch("getRoleProfiles");
        }
      });
  },
  /* 
    REVOKE ACCESS FROM USER
  */
  async revokeRoleProfileFromUser({ commit, dispatch }, payload) {
    commit(REVOKE_ROLE_PROFILE_FROM_USER_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}user/revoke_role_profile_from_user`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("revoke role profile from user config", config);

    axios(config)
      .then(function (response) {
        commit(REVOKE_ROLE_PROFILE_FROM_USER_SUCCESS, response.data);
        dispatch("getRoleProfiles");
        dispatch("getUsers");
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
          commit(REVOKE_ROLE_PROFILE_FROM_USER_FAIL, error.response.data);
          dispatch("getRoleProfiles");
          dispatch("getUsers");
        }
      });
  },
  /* 
    ASSIGN ROLE PROFILE TO USER
  */
  async assignRoleProfileToUser({ commit, dispatch }, payload) {
    commit(ASSIGN_ROLE_PROFILE_TO_USER_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}user/assign_role_profile_to_user`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("assign role profile to user config", config);

    axios(config)
      .then(function (response) {
        commit(ASSIGN_ROLE_PROFILE_TO_USER_SUCCESS, response.data);
        dispatch("getRoleProfiles");
        dispatch("getUsers");
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
          commit(ASSIGN_ROLE_PROFILE_TO_USER_FAIL, error.response.data);
          dispatch("getRoleProfiles");
          dispatch("getUsers");
        }
      });
  },

  //CHECK IF USER HAS ACCESS RIGHT
  async checkAccessRight({ commit }, payload) {
    commit(CHECK_USER_ACCESS_RIGHTS);
    var config = {
      method: "get",
      url: `${baseUrl}user/has_access?access_rights=${payload}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("check if user has access right", config);

    axios(config)
      .then(function (response) {
        commit(CHECK_USER_ACCESS_RIGHTS_SUCCESS, response.data);
        console.log("DATA SENT", response.data);
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
          commit(CHECK_USER_ACCESS_RIGHTS_FAIL, error.response.data);
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
