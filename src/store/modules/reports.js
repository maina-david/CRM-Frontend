import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const QUEUE_ANSWERED_REPORT_REQUEST = "QUEUE_ANSWERED_REPORT_REQUEST";
export const QUEUE_ANSWERED_REPORT_SUCCESS = "QUEUE_ANSWERED_REPORT_SUCCESS";
export const QUEUE_ANSWERED_REPORT_FAIL = "QUEUE_ANSWERED_REPORT_FAIL";
export const QUEUE_ABANDONED_REPORT_REQUEST = "QUEUE_ABANDONED_REPORT_REQUEST";
export const QUEUE_ABANDONED_REPORT_SUCCESS = "QUEUE_ABANDONED_REPORT_SUCCESS";
export const QUEUE_ABANDONED_REPORT_FAIL = "QUEUE_ABANDONED_REPORT_FAIL";
export const QUEUE_TOTALCALL_REPORT_REQUEST = "QUEUE_TOTALCALL_REPORT_REQUEST";
export const QUEUE_TOTALCALL_REPORT_SUCCESS = "QUEUE_TOTALCALL_REPORT_SUCCESS";
export const QUEUE_TOTALCALL_REPORT_FAIL = "QUEUE_TOTALCALL_REPORT_FAIL";
export const QUEUE_AHT_REPORT_REQUEST = "QUEUE_AHT_REPORT_REQUEST";
export const QUEUE_AHT_REPORT_SUCCESS = "QUEUE_AHT_REPORT_SUCCESS";
export const QUEUE_AHT_REPORT_FAIL = "QUEUE_AHT_REPORT_FAIL";
export const QUEUE_CALLTIME_REPORT_REQUEST = "QUEUE_CALLTIME_REPORT_REQUEST";
export const QUEUE_CALLTIME_REPORT_SUCCESS = "QUEUE_CALLTIME_REPORT_SUCCESS";
export const QUEUE_CALLTIME_REPORT_FAIL = "QUEUE_CALLTIME_REPORT_FAIL";
export const QUEUE_HOLDTIME_REPORT_REQUEST = "QUEUE_HOLDTIME_REPORT_REQUEST";
export const QUEUE_HOLDTIME_REPORT_SUCCESS = "QUEUE_HOLDTIME_REPORT_SUCCESS";
export const QUEUE_HOLDTIME_REPORT_FAIL = "QUEUE_HOLDTIME_REPORT_FAIL";
export const QUEUE_MUTETIME_REPORT_REQUEST = "QUEUE_MUTETIME_REPORT_REQUEST";
export const QUEUE_MUTETIME_REPORT_SUCCESS = "QUEUE_MUTETIME_REPORT_SUCCESS";
export const QUEUE_MUTETIME_REPORT_FAIL = "QUEUE_MUTETIME_REPORT_FAIL";
export const QUEUE_SERVICELEVEL_REPORT_REQUEST =
  "QUEUE_SERVICELEVEL_REPORT_REQUEST";
export const QUEUE_SERVICELEVEL_REPORT_SUCCESS =
  "QUEUE_SERVICELEVEL_REPORT_SUCCESS";
export const QUEUE_SERVICELEVEL_REPORT_FAIL = "QUEUE_SERVICELEVEL_REPORT_FAIL";
export const QUEUE_FIRSTCALL_REPORT_REQUEST = "QUEUE_FIRSTCALL_REPORT_REQUEST";
export const QUEUE_FIRSTCALL_REPORT_SUCCESS = "QUEUE_FIRSTCALL_REPORT_SUCCESS";
export const QUEUE_FIRSTCALL_REPORT_FAIL = "QUEUE_FIRSTCALL_REPORT_FAIL";

export const AGENT_ANSWERED_REPORT_REQUEST = "AGENT_ANSWERED_REPORT_REQUEST";
export const AGENT_ANSWERED_REPORT_SUCCESS = "AGENT_ANSWERED_REPORT_SUCCESS";
export const AGENT_ANSWERED_REPORT_FAIL = "AGENT_ANSWERED_REPORT_FAIL";
export const AGENT_ABANDONED_REPORT_REQUEST = "AGENT_ABANDONED_REPORT_REQUEST";
export const AGENT_ABANDONED_REPORT_SUCCESS = "AGENT_ABANDONED_REPORT_SUCCESS";
export const AGENT_ABANDONED_REPORT_FAIL = "AGENT_ABANDONED_REPORT_FAIL";
export const AGENT_TOTALCALL_REPORT_REQUEST = "AGENT_TOTALCALL_REPORT_REQUEST";
export const AGENT_TOTALCALL_REPORT_SUCCESS = "AGENT_TOTALCALL_REPORT_SUCCESS";
export const AGENT_TOTALCALL_REPORT_FAIL = "AGENT_TOTALCALL_REPORT_FAIL";
export const AGENT_AHT_REPORT_REQUEST = "AGENT_AHT_REPORT_REQUEST";
export const AGENT_AHT_REPORT_SUCCESS = "AGENT_AHT_REPORT_SUCCESS";
export const AGENT_AHT_REPORT_FAIL = "AGENT_AHT_REPORT_FAIL";
export const AGENT_CALLTIME_REPORT_REQUEST = "AGENT_CALLTIME_REPORT_REQUEST";
export const AGENT_CALLTIME_REPORT_SUCCESS = "AGENT_CALLTIME_REPORT_SUCCESS";
export const AGENT_CALLTIME_REPORT_FAIL = "AGENT_CALLTIME_REPORT_FAIL";
export const AGENT_HOLDTIME_REPORT_REQUEST = "AGENT_HOLDTIME_REPORT_REQUEST";
export const AGENT_HOLDTIME_REPORT_SUCCESS = "AGENT_HOLDTIME_REPORT_SUCCESS";
export const AGENT_HOLDTIME_REPORT_FAIL = "AGENT_HOLDTIME_REPORT_FAIL";
export const AGENT_MUTETIME_REPORT_REQUEST = "AGENT_MUTETIME_REPORT_REQUEST";
export const AGENT_MUTETIME_REPORT_SUCCESS = "AGENT_MUTETIME_REPORT_SUCCESS";
export const AGENT_MUTETIME_REPORT_FAIL = "AGENT_MUTETIME_REPORT_FAIL";
export const AGENT_TIMETOANSWER_REPORT_REQUEST =
  "AGENT_TIMETOANSWER_REPORT_REQUEST";
export const AGENT_TIMETOANSWER_REPORT_SUCCESS =
  "AGENT_TIMETOANSWER_REPORT_SUCCESS";
export const AGENT_TIMETOANSWER_REPORT_FAIL = "AGENT_TIMETOANSWER_REPORT_FAIL";

export const AGENT_CALL_REPORT_REQUEST = "AGENT_CALL_REPORT_REQUEST";
export const AGENT_CALL_REPORT_SUCCESS = "AGENT_CALL_REPORT_SUCCESS";
export const AGENT_CALL_REPORT_FAIL = "AGENT_CALL_REPORT_FAIL";
export const CDR_REPORT_REQUEST = "CDR_REPORT_REQUEST";
export const CDR_REPORT_SUCCESS = "CDR_REPORT_SUCCESS";
export const CDR_REPORT_FAIL = "CDR_REPORT_FAIL";
export const AGENT_ACTIVITY_REPORT_REQUEST = "AGENT_ACTIVITY_REPORT_REQUEST";
export const AGENT_ACTIVITY_REPORT_SUCCESS = "AGENT_ACTIVITY_REPORT_SUCCESS";
export const AGENT_ACTIVITY_REPORT_FAIL = "AGENT_ACTIVITY_REPORT_FAIL";
export const IVR_HIT_REPORT_REQUEST = "IVR_HIT_REPORT_REQUEST";
export const IVR_HIT_REPORT_SUCCESS = "IVR_HIT_REPORT_SUCCESS";
export const IVR_HIT_REPORT_FAIL = "IVR_HIT_REPORT_FAIL";
export const IVR_BACKGROUND_REQUEST = "IVR_BACKGROUND_REQUEST";
export const IVR_BACKGROUND_SUCCESS = "IVR_BACKGROUND_SUCCESS";
export const IVR_BACKGROUND_FAIL = "IVR_BACKGROUND_FAIL";

const state = {
  loadingReports: false,
  successReports: "",
  errorReports: "",
  queueAnsweredLabel: [],
  queueAnsweredData: [],
  queueAbandonedLabel: [],
  queueAbandonedData: [],
  queueTotalCallLabel: [],
  queueTotalCallData: [],
  queueAHTLabel: [],
  queueAHTData: [],
  queueCallTimeLabel: [],
  queueCallTimeData: [],
  queueHoldTimeLabel: [],
  queueHoldTimeData: [],
  queueMuteTimeLabel: [],
  queueMuteTimeData: [],
  queueServiceLevelLabel: [],
  queueServiceLevelData: [],
  queueFirstCallLabel: [],
  queueFirstCallData: [],

  agentAnsweredLabel: [],
  agentAnsweredData: [],
  agentAbandonedLabel: [],
  agentAbandonedData: [],
  agentTotalCallLabel: [],
  agentTotalCallData: [],
  agentAHTLabel: [],
  agentAHTData: [],
  agentCallTimeLabel: [],
  agentCallTimeData: [],
  agentHoldTimeLabel: [],
  agentHoldTimeData: [],
  agentMuteTimeLabel: [],
  agentMuteTimeData: [],
  agentTimeToAnswerLabel: [],
  agentTimeToAnswerData: [],

  agentCallcumulativeLabel: [],
  agentCallcumulativeData: [],
  agentCallPerQueue: [],
  cdrReport: [],
  agentActivityReport: [],
  ivrHitLabel: [],
  ivrHitData: [],
  ivrBackground: [],
  selectIvrBackground: [],
  pageNumbers: "",
};

const getters = {
  loadingReports: (state) => state.loadingReports,
  successReports: (state) => state.successReports,
  errorReports: (state) => state.errorReports,
  queueAnsweredLabel: (state) => state.queueAnsweredLabel,
  queueAnsweredData: (state) => state.queueAnsweredData,
  queueAbandonedLabel: (state) => state.queueAbandonedLabel,
  queueAbandonedData: (state) => state.queueAbandonedData,
  queueTotalCallLabel: (state) => state.queueTotalCallLabel,
  queueTotalCallData: (state) => state.queueTotalCallData,
  queueAHTLabel: (state) => state.queueAHTLabel,
  queueAHTData: (state) => state.queueAHTData,
  queueCallTimeLabel: (state) => state.queueCallTimeLabel,
  queueCallTimeData: (state) => state.queueCallTimeData,
  queueHoldTimeLabel: (state) => state.queueHoldTimeLabel,
  queueHoldTimeData: (state) => state.queueHoldTimeData,
  queueMuteTimeLabel: (state) => state.queueMuteTimeLabel,
  queueMuteTimeData: (state) => state.queueMuteTimeData,
  queueServiceLevelLabel: (state) => state.queueServiceLevelLabel,
  queueServiceLevelData: (state) => state.queueServiceLevelData,
  queueFirstCallLabel: (state) => state.queueFirstCallLabel,
  queueFirstCallData: (state) => state.queueFirstCallData,
  pageNumbers: (state) => state.pageNumbers,

  agentAnsweredLabel: (state) => state.agentAnsweredLabel,
  agentAnsweredData: (state) => state.agentAnsweredData,
  agentAbandonedLabel: (state) => state.agentAbandonedLabel,
  agentAbandonedData: (state) => state.agentAbandonedData,
  agentTotalCallLabel: (state) => state.agentTotalCallLabel,
  agentTotalCallData: (state) => state.agentTotalCallData,
  agentAHTLabel: (state) => state.agentAHTLabel,
  agentAHTData: (state) => state.agentAHTData,
  agentCallTimeLabel: (state) => state.agentCallTimeLabel,
  agentCallTimeData: (state) => state.agentCallTimeData,
  agentHoldTimeLabel: (state) => state.agentHoldTimeLabel,
  agentHoldTimeData: (state) => state.agentHoldTimeData,
  agentMuteTimeLabel: (state) => state.agentMuteTimeLabel,
  agentMuteTimeData: (state) => state.agentMuteTimeData,
  agentTimeToAnswerLabel: (state) => state.agentTimeToAnswerLabel,
  agentTimeToAnswerData: (state) => state.agentTimeToAnswerData,

  agentCallcumulativeLabel: (state) => state.agentCallcumulativeLabel,
  agentCallcumulativeData: (state) => state.agentCallcumulativeData,
  agentCallPerQueue: (state) => state.agentCallPerQueue,
  cdrReport: (state) => state.cdrReport,
  agentActivityReport: (state) => state.agentActivityReport,
  ivrHitLabel: (state) => state.ivrHitLabel,
  ivrHitData: (state) => state.ivrHitData,
  ivrBackground: (state) => state.ivrBackground,
  selectIvrBackground: (state) => state.selectIvrBackground,
};

const mutations = {
  /* 
    QUEUE ANSWERED REPORT INFO
  */
  [QUEUE_ANSWERED_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_ANSWERED_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueAnsweredData = payload;
  },
  [QUEUE_ANSWERED_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE ABANDONED REPORT INFO
  */
  [QUEUE_ABANDONED_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_ABANDONED_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueAbandonedData = payload;
  },
  [QUEUE_ABANDONED_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE TOTALCALL REPORT INFO
  */
  [QUEUE_TOTALCALL_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_TOTALCALL_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueTotalCallData = payload;
  },
  [QUEUE_TOTALCALL_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE AHT REPORT INFO
  */
  [QUEUE_AHT_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_AHT_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueAHTData = payload;
  },
  [QUEUE_AHT_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE CALLTIME REPORT INFO
  */
  [QUEUE_CALLTIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_CALLTIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueCallTimeData = payload;
  },
  [QUEUE_CALLTIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE HOLDTIME REPORT INFO
  */
  [QUEUE_HOLDTIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_HOLDTIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueHoldTimeData = payload;
  },
  [QUEUE_HOLDTIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE MUTETIME REPORT INFO
  */
  [QUEUE_MUTETIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_MUTETIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueMuteTimeData = payload;
  },
  [QUEUE_MUTETIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE SERVICELEVEL REPORT INFO
  */
  [QUEUE_SERVICELEVEL_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_SERVICELEVEL_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueServiceLevelData = payload;
  },
  [QUEUE_SERVICELEVEL_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    QUEUE FIRSTCALL REPORT INFO
  */
  [QUEUE_FIRSTCALL_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [QUEUE_FIRSTCALL_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.queueFirstCallData = payload;
  },
  [QUEUE_FIRSTCALL_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },

  /* 
    AGENT ANSWERED REPORT INFO
  */
  [AGENT_ANSWERED_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_ANSWERED_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentAnsweredData = payload;
  },
  [AGENT_ANSWERED_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT ABANDONED REPORT INFO
  */
  [AGENT_ABANDONED_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_ABANDONED_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentAbandonedData = payload;
  },
  [AGENT_ABANDONED_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT TOTALCALL REPORT INFO
  */
  [AGENT_TOTALCALL_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_TOTALCALL_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentTotalCallData = payload;
  },
  [AGENT_TOTALCALL_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT AHT REPORT INFO
  */
  [AGENT_AHT_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_AHT_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentAHTData = payload;
  },
  [AGENT_AHT_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT CALLTIME REPORT INFO
  */
  [AGENT_CALLTIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_CALLTIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentCallTimeData = payload;
  },
  [AGENT_CALLTIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT HOLDTIME REPORT INFO
  */
  [AGENT_HOLDTIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_HOLDTIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentHoldTimeData = payload;
  },
  [AGENT_HOLDTIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT MUTETIME REPORT INFO
  */
  [AGENT_MUTETIME_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_MUTETIME_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentMuteTimeData = payload;
  },
  [AGENT_MUTETIME_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /* 
    AGENT TIMETOANSWER REPORT INFO
  */
  [AGENT_TIMETOANSWER_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_TIMETOANSWER_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;

    state.agentTimeToAnswerData = payload;
  },
  [AGENT_TIMETOANSWER_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },

  /*
    CDR REPORT INFO
  */
  [CDR_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [CDR_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;
    state.cdrReport = payload.data;
    state.pageNumbers = payload.meta.last_page;
  },
  [CDR_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },

  /*
    AGENT ACTIVITY REPORT INFO
  */
  [AGENT_ACTIVITY_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [AGENT_ACTIVITY_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;
    state.agentActivityReport = payload;
  },
  [AGENT_ACTIVITY_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /*
    IVR HIT REPORT INFO
  */
  [IVR_HIT_REPORT_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [IVR_HIT_REPORT_SUCCESS](state, payload) {
    state.loadingReports = false;
    state.ivrHitLabel = payload.map((label) => {
      return label.flow_name;
    });
    state.ivrHitData = payload.map((data) => {
      return data.ivr_hits;
    });
  },
  [IVR_HIT_REPORT_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
  /*
    IVR BACKGROUND REPORT INFO
  */
  [IVR_BACKGROUND_REQUEST](state) {
    state.loadingReports = true;
    state.errorReports = "";
  },
  [IVR_BACKGROUND_SUCCESS](state, payload) {
    state.loadingReports = false;
    state.ivrBackground = payload;
    state.selectIvrBackground = payload.map((ivr) => {
      return { label: ivr.flow_name, value: ivr.id };
    });
  },
  [IVR_BACKGROUND_FAIL](state, errorReports) {
    state.loadingReports = false;
    state.errorReports = errorReports;
  },
};

const actions = {
  /* 
    QUEUE ANSWERED REPORT INFO 
  */
  async getQueueAnsweredReport({ commit }, payload) {
    commit(QUEUE_ANSWERED_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=ANSWERED`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue ANSWERED report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue ANSWERED report response", response.data);
        commit(QUEUE_ANSWERED_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_ANSWERED_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE ABANDONED REPORT INFO 
  */
  async getQueueAbandonedReport({ commit }, payload) {
    commit(QUEUE_ABANDONED_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=ABANDONED`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue ABANDONED report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue ABANDONED report response", response.data);
        commit(QUEUE_ABANDONED_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_ABANDONED_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE TOTALCALL REPORT INFO 
  */
  async getQueueTotalCallReport({ commit }, payload) {
    commit(QUEUE_TOTALCALL_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=TOTALCALL`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue TOTALCALL report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue TOTALCALL report response", response.data);
        commit(QUEUE_TOTALCALL_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_TOTALCALL_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE AHT REPORT INFO 
  */
  async getQueueAHTReport({ commit }, payload) {
    commit(QUEUE_AHT_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=AHT`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue AHT report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue AHT report response", response.data);
        commit(QUEUE_AHT_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_AHT_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE CALLTIME REPORT INFO 
  */
  async getQueueCallTimeReport({ commit }, payload) {
    commit(QUEUE_CALLTIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=CALLTIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue CALLTIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue CALLTIME report response", response.data);
        commit(QUEUE_CALLTIME_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_CALLTIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE HOLDTIME REPORT INFO 
  */
  async getQueueHoldTimeReport({ commit }, payload) {
    commit(QUEUE_HOLDTIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=HOLDTIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue HOLDTIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue HOLDTIME report response", response.data);
        commit(QUEUE_HOLDTIME_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_HOLDTIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE MUTETIME REPORT INFO 
  */
  async getQueueMuteTimeReport({ commit }, payload) {
    commit(QUEUE_MUTETIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=MUTETIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue MUTETIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue MUTETIME report response", response.data);
        commit(QUEUE_MUTETIME_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_MUTETIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE SERVICELEVEL REPORT INFO 
  */
  async getQueueServiceLevelReport({ commit }, payload) {
    commit(QUEUE_SERVICELEVEL_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=SERVICELEVEL`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue SERVICELEVEL report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue SERVICELEVEL report response", response.data);
        commit(QUEUE_SERVICELEVEL_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_SERVICELEVEL_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE FIRSTCALL REPORT INFO 
  */
  async getQueueFirstCallReport({ commit }, payload) {
    commit(QUEUE_FIRSTCALL_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/queue_report?frequency=${payload.frequency}&date=${payload.date}&kpi=FIRSTCALL`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue FIRSTCALL report config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue FIRSTCALL report response", response.data);
        commit(QUEUE_FIRSTCALL_REPORT_SUCCESS, response.data);
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
          commit(QUEUE_FIRSTCALL_REPORT_FAIL, error.response.data);
        }
      });
  },

  /* 
    AGENT ANSWERED REPORT INFO 
  */
  async getAgentAnsweredReport({ commit }, payload) {
    commit(AGENT_ANSWERED_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=ANSWERED`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT ANSWERED report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT ANSWERED report response", response.data);
        commit(AGENT_ANSWERED_REPORT_SUCCESS, response.data);
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
          commit(AGENT_ANSWERED_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT ABANDONED REPORT INFO 
  */
  async getAgentAbandonedReport({ commit }, payload) {
    commit(AGENT_ABANDONED_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=ABANDONED`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT ABANDONED report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT ABANDONED report response", response.data);
        commit(AGENT_ABANDONED_REPORT_SUCCESS, response.data);
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
          commit(AGENT_ABANDONED_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT TOTALCALL REPORT INFO 
  */
  async getAgentTotalCallReport({ commit }, payload) {
    commit(AGENT_TOTALCALL_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=TOTALCALL`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT TOTALCALL report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT TOTALCALL report response", response.data);
        commit(AGENT_TOTALCALL_REPORT_SUCCESS, response.data);
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
          commit(AGENT_TOTALCALL_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT AHT REPORT INFO 
  */
  async getAgentAHTReport({ commit }, payload) {
    commit(AGENT_AHT_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=AHT`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT AHT report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT AHT report response", response.data);
        commit(AGENT_AHT_REPORT_SUCCESS, response.data);
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
          commit(AGENT_AHT_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT CALLTIME REPORT INFO 
  */
  async getAgentCallTimeReport({ commit }, payload) {
    commit(AGENT_CALLTIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=CALLTIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT CALLTIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT CALLTIME report response", response.data);
        commit(AGENT_CALLTIME_REPORT_SUCCESS, response.data);
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
          commit(AGENT_CALLTIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT HOLDTIME REPORT INFO 
  */
  async getAgentHoldTimeReport({ commit }, payload) {
    commit(AGENT_HOLDTIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=HOLDTIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT HOLDTIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT HOLDTIME report response", response.data);
        commit(AGENT_HOLDTIME_REPORT_SUCCESS, response.data);
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
          commit(AGENT_HOLDTIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT MUTETIME REPORT INFO 
  */
  async getAgentMuteTimeReport({ commit }, payload) {
    commit(AGENT_MUTETIME_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=MUTETIME`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT MUTETIME report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT MUTETIME report response", response.data);
        commit(AGENT_MUTETIME_REPORT_SUCCESS, response.data);
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
          commit(AGENT_MUTETIME_REPORT_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT TIMETOANSWER REPORT INFO 
  */
  async getAgentTimeToAnswerReport({ commit }, payload) {
    commit(AGENT_TIMETOANSWER_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_call_report?frequency=${payload.frequency}&date=${payload.date}&kpi=TIMETOANSWER`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get AGENT TIMETOANSWER report config", config);

    axios(config)
      .then(function (response) {
        console.log("get AGENT TIMETOANSWER report response", response.data);
        commit(AGENT_TIMETOANSWER_REPORT_SUCCESS, response.data);
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
          commit(AGENT_TIMETOANSWER_REPORT_FAIL, error.response.data);
        }
      });
  },
  /*
    CDR REPORT INFO
  */
  async getCdrReport({ commit }, payload) {
    commit(CDR_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/cdr_report?from=${payload.start}&to=${payload.end}&page=${payload.page}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get cdr report config", config);

    axios(config)
      .then(function (response) {
        console.log("get cdr report response", response.data);
        commit(CDR_REPORT_SUCCESS, response.data);
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
          commit(CDR_REPORT_FAIL, error.response.data);
        }
      });
  },
  /*
    AGENT ACTIVITY REPORT INFO
  */
  async getAgentActivityReport({ commit }, payload) {
    commit(AGENT_ACTIVITY_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_agent_activity_report?from=${payload.start}&to=${payload.end}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get agent activity report config", config);

    axios(config)
      .then(function (response) {
        console.log("get agent activity report response", response.data);
        commit(AGENT_ACTIVITY_REPORT_SUCCESS, response.data);
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
          commit(AGENT_ACTIVITY_REPORT_FAIL, error.response.data);
        }
      });
  },
  /*
    IVR HIT REPORT INFO
  */
  async getIvrHitReport({ commit }, payload) {
    commit(IVR_HIT_REPORT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_ivr_hit_report?from=${payload.start}&to=${payload.end}&ivr_option=${payload.option}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("ivr hit report config", config);

    axios(config)
      .then(function (response) {
        console.log("ivr hit report response", response.data);
        commit(IVR_HIT_REPORT_SUCCESS, response.data);
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
          commit(IVR_HIT_REPORT_FAIL, error.response.data);
        }
      });
  },
  /*
    IVR BACKGROUND INFO
  */
  async getIvrBackground({ commit }, payload) {
    commit(IVR_BACKGROUND_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_ivr_background`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("ivr background config", config);

    axios(config)
      .then(function (response) {
        console.log("ivr background response", response.data);
        commit(IVR_BACKGROUND_SUCCESS, response.data);
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
          commit(IVR_BACKGROUND_FAIL, error.response.data);
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
