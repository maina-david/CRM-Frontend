import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

export const RINGING = "RINGING";
export const ANSWERED = "ANSWERED";
export const ANSWERED_CAMPAIGN_REQUEST = "ANSWERED_CAMPAIGN_REQUEST";
export const ANSWERED_CAMPAIGN_SUCCESS = "ANSWERED_CAMPAIGN_SUCCESS";
export const ANSWERED_CAMPAIGN_FAIL = "ANSWERED_CAMPAIGN_FAIL";
export const CLICK_TO_CALL_REQUEST = "CLICK_TO_CALL_REQUEST";
export const CLICK_TO_CALL_SUCCESS = "CLICK_TO_CALL_SUCCESS";
export const CLICK_TO_CALL_FAIL = "CLICK_TO_CALL_FAIL";

export const TRANSFER_CALL_REQUEST = "TRANSFER_CALL_REQUEST";
export const TRANSFER_CALL_SUCCESS = "TRANSFER_CALL_SUCCESS";
export const TRANSFER_CALL_FAIL = "TRANSFER_CALL_FAIL";

export const ONHOLD = "ONHOLD";
export const CALL_FROM_CALL_HISTORY = "CALL_FROM_CALL_HISTORY";
export const MUTED = "MUTED";
export const ENDED = "ENDED";
export const IDLE = "IDLE";
export const CLIENT = "CLIENT";
export const OUTBOUND_CALL = "OUTBOUND_CALL";
export const LAST_REGISTER = "LAST_REGISTER";
export const PREVIOUS_STATE = "PREVIOUS_STATE";

/*STORE CALL DETAILS
 */
export const STORE_CALL_DETAILS_PHONE = "STORE_CALL_DETAILS_PHONE";
export const STORE_CALL_DETAILS_ACCOUNT = "STORE_CALL_DETAILS_ACCOUNT";
export const STORE_CALL_DETAILS_CONTACT = "STORE_CALL_DETAILS_CONTACT";

/*GET CALL DETAILS
 */
export const GET_CALL_DETAILS_REQUEST = "GET_CALL_DETAILS_REQUEST";
export const GET_CALL_DETAILS_SUCCESS = "GET_CALL_DETAILS_SUCCESS";
export const GET_CALL_DETAILS_FAIL = "GET_CALL_DETAILS_FAIL";

/*GET ALL SIP
 */
export const GET_ALL_SIP_REQUEST = "GET_ALL_SIP_REQUEST";
export const GET_ALL_SIP_SUCCESS = "GET_ALL_SIP_SUCCESS";
export const GET_ALL_SIP_FAIL = "GET_ALL_SIP_FAIL";

export const TOTAL_CALL_IN_PROGRESS_REQUEST = "TOTAL_CALL_IN_PROGRESS_REQUEST";
export const TOTAL_CALL_IN_PROGRESS_SUCCESS = "TOTAL_CALL_IN_PROGRESS_SUCCESS";
export const TOTAL_CALL_IN_PROGRESS_FAIL = "TOTAL_CALL_IN_PROGRESS_FAIL";
export const CALLS_PER_QUEUE_REQUEST = "CALLS_PER_QUEUE_REQUEST";
export const CALLS_PER_QUEUE_SUCCESS = "CALLS_PER_QUEUE_SUCCESS";
export const CALLS_PER_QUEUE_FAIL = "CALLS_PER_QUEUE_FAIL";
export const QUEUE_KPI_DAILY_REQUEST = "QUEUE_KPI_DAILY_REQUEST";
export const QUEUE_KPI_DAILY_SUCCESS = "QUEUE_KPI_DAILY_SUCCESS";
export const QUEUE_KPI_DAILY_FAIL = "QUEUE_KPI_DAILY_FAIL";
export const CALL_ABANDONMENT_RATE_DAILY_REQUEST =
  "CALL_ABANDONMENT_RATE_DAILY_REQUEST";
export const CALL_ABANDONMENT_RATE_DAILY_SUCCESS =
  "CALL_ABANDONMENT_RATE_DAILY_SUCCESS";
export const CALL_ABANDONMENT_RATE_DAILY_FAIL =
  "CALL_ABANDONMENT_RATE_DAILY_FAIL";
export const CALLS_PER_AGENT_DAILY_REQUEST = "CALLS_PER_AGENT_DAILY_REQUEST";
export const CALLS_PER_AGENT_DAILY_SUCCESS = "CALLS_PER_AGENT_DAILY_SUCCESS";
export const CALLS_PER_AGENT_DAILY_FAIL = "CALLS_PER_AGENT_DAILY_FAIL";
export const AGENT_KPI_DAILY_REQUEST = "AGENT_KPI_DAILY_REQUEST";
export const AGENT_KPI_DAILY_SUCCESS = "AGENT_KPI_DAILY_SUCCESS";
export const AGENT_KPI_DAILY_FAIL = "AGENT_KPI_DAILY_FAIL";
export const AGENT_CALL_ABANDONMENT_RATE_DAILY_REQUEST =
  "AGENT_CALL_ABANDONMENT_RATE_DAILY_REQUEST";
export const AGENT_CALL_ABANDONMENT_RATE_DAILY_SUCCESS =
  "AGENT_CALL_ABANDONMENT_RATE_DAILY_SUCCESS";
export const AGENT_CALL_ABANDONMENT_RATE_DAILY_FAIL =
  "AGENT_CALL_ABANDONMENT_RATE_DAILY_FAIL";
export const AGENT_PROGRESS_DAILY_REQUEST = "AGENT_PROGRESS_DAILY_REQUEST";
export const AGENT_PROGRESS_DAILY_SUCCESS = "AGENT_PROGRESS_DAILY_SUCCESS";
export const AGENT_PROGRESS_DAILY_FAIL = "AGENT_PROGRESS_DAILY_FAIL";
export const AGENT_QUEUE_DAILY_REQUEST = "AGENT_QUEUE_DAILY_REQUEST";
export const AGENT_QUEUE_DAILY_SUCCESS = "AGENT_QUEUE_DAILY_SUCCESS";
export const AGENT_QUEUE_DAILY_FAIL = "AGENT_QUEUE_DAILY_FAIL";
export const SERVICE_LEVEL_DAILY_REQUEST = "SERVICE_LEVEL_DAILY_REQUEST";
export const SERVICE_LEVEL_DAILY_SUCCESS = "SERVICE_LEVEL_DAILY_SUCCESS";
export const SERVICE_LEVEL_DAILY_FAIL = "SERVICE_LEVEL_DAILY_FAIL";
export const FIRST_CALL_RESOLUTION_DAILY_REQUEST =
  "FIRST_CALL_RESOLUTION_DAILY_REQUEST";
export const FIRST_CALL_RESOLUTION_DAILY_SUCCESS =
  "FIRST_CALL_RESOLUTION_DAILY_SUCCESS";
export const FIRST_CALL_RESOLUTION_DAILY_FAIL =
  "FIRST_CALL_RESOLUTION_DAILY_FAIL";

export const ANSWER_SIP_CALL = "ANSWER_SIP_CALL";
const GET_CALL_HISTORY_REQUEST = "GET_CALL_HISTORY_REQUEST";
const GET_CALL_HISTORY_SUCCESS = "GET_CALL_HISTORY_SUCCESS";
const GET_CALL_HISTORY_ERROR = "GET_CALL_HISTORY_ERROR";

const state = {
  incomingCall: false,
  outgoingCall: false,
  internalCall: false,
  dialer: false,
  call_state: "IDLE",
  current_session: "",
  remote_identity: "",
  masked_remote_identity: "",

  loadingCalls: false,
  successCalls: "",
  errorCalls: "",
  totalCallInProgress: "",
  callsPerQueueDailyTotalLabel: "",
  callsPerQueueDailyTotalData: "",
  callsPerQueueDailyAbandonedLabel: "",
  callsPerQueueDailyAbandonedData: "",
  callsPerQueueDailyAnsweredLabel: "",
  callsPerQueueDailyAnsweredData: "",
  queueKpiDaily: "",
  callAbandonmentRateDailyLabel: "",
  callAbandonmentRateDailyData: "",
  callsPerAgentDailyTotalLabel: "",
  callsPerAgentDailyTotalData: "",
  callsPerAgentDailyAbandonedLabel: "",
  callsPerAgentDailyAbandonedData: "",
  callsPerAgentDailyAnsweredLabel: "",
  callsPerAgentDailyAnsweredData: "",
  agentKpiDaily: "",
  agentCallAbandonmentRateDailyLabel: "",
  agentCallAbandonmentRateDailyData: "",
  agentProgressDaily: "",
  agentQueueDaily: "",
  agentQueueDailyMenuItems: "",
  serviceLevelDailyLabel: "",
  serviceLevelDailyData: "",
  firstCallResolutionDailyLabel: "",
  firstCallResolutionDailyData: "",
  currentCallDetails: "",
  currentCallDetailsErrors: "",
  currentCallerDetails: { phone: "", account: "", contact: "" },
  client: "",
  outboundCall: true,
  lastRegister: "",
  previousState: "",
  clickToCall: "",
  allSIP: [],
  allSIPErrors: [],
  answerSipCall: false,
  transferCallSuccess: "",
  transferCallError: "",
  callHistoryNumber: "",
  getCallHistoryData: [],
};

const getters = {
  incomingCall: (state) => state.incomingCall,
  outgoingCall: (state) => state.outgoingCall,
  internalCall: (state) => state.internalCall,
  dialer: (state) => state.dialer,
  call_state: (state) => state.call_state,
  current_session: (state) => state.current_session,
  remote_identity: (state) => state.remote_identity,
  masked_remote_identity: (state) => state.masked_remote_identity,

  loadingCalls: (state) => state.loadingCalls,
  successCalls: (state) => state.successCalls,
  errorCalls: (state) => state.errorCalls,
  totalCallInProgress: (state) => state.totalCallInProgress,
  callsPerQueueDailyTotalLabel: (state) => state.callsPerQueueDailyTotalLabel,
  callsPerQueueDailyTotalData: (state) => state.callsPerQueueDailyTotalData,
  callsPerQueueDailyAbandonedLabel: (state) =>
    state.callsPerQueueDailyAbandonedLabel,
  callsPerQueueDailyAbandonedData: (state) =>
    state.callsPerQueueDailyAbandonedData,
  callsPerQueueDailyAnsweredLabel: (state) =>
    state.callsPerQueueDailyAnsweredLabel,
  callsPerQueueDailyAnsweredData: (state) =>
    state.callsPerQueueDailyAnsweredData,
  queueKpiDaily: (state) => state.queueKpiDaily,
  callAbandonmentRateDailyLabel: (state) => state.callAbandonmentRateDailyLabel,
  callAbandonmentRateDailyData: (state) => state.callAbandonmentRateDailyData,
  callsPerAgentDailyTotalLabel: (state) => state.callsPerAgentDailyTotalLabel,
  callsPerAgentDailyTotalData: (state) => state.callsPerAgentDailyTotalData,
  callsPerAgentDailyAbandonedLabel: (state) =>
    state.callsPerAgentDailyAbandonedLabel,
  callsPerAgentDailyAbandonedData: (state) =>
    state.callsPerAgentDailyAbandonedData,
  callsPerAgentDailyAnsweredLabel: (state) =>
    state.callsPerAgentDailyAnsweredLabel,
  callsPerAgentDailyAnsweredData: (state) =>
    state.callsPerAgentDailyAnsweredData,
  agentKpiDaily: (state) => state.agentKpiDaily,
  agentCallAbandonmentRateDailyLabel: (state) =>
    state.agentCallAbandonmentRateDailyLabel,
  agentCallAbandonmentRateDailyData: (state) =>
    state.agentCallAbandonmentRateDailyData,
  agentProgressDaily: (state) => state.agentProgressDaily,
  agentQueueDaily: (state) => state.agentQueueDaily,
  agentQueueDailyMenuItems: (state) => state.agentQueueDailyMenuItems,
  serviceLevelDailyLabel: (state) => state.serviceLevelDailyLabel,
  serviceLevelDailyData: (state) => state.serviceLevelDailyData,
  firstCallResolutionDailyLabel: (state) => state.firstCallResolutionDailyLabel,
  firstCallResolutionDailyData: (state) => state.firstCallResolutionDailyData,
  currentCallDetails: (state) => state.currentCallDetails,
  currentCallDetailsErrors: (state) => state.currentCallDetailsErrors,
  currentCallerDetails: (state) => state.currentCallerDetails,
  client: (state) => state.client,
  outboundCall: (state) => state.outboundCall,
  lastRegister: (state) => state.lastRegister,
  previousState: (state) => state.previousState,
  clickToCall: (state) => state.clickToCall,
  allSIP: (state) => state.allSIP,
  allSIPErrors: (state) => state.allSIPErrors,
  answerSipCall: (state) => state.answerSipCall,
  transferCallSuccess: (state) => state.transferCall,
  transferCallError: (state) => state.transferCallError,
  callHistoryNumber: (state) => state.callHistoryNumber,
  getCallHistoryData: (state) => state.getCallHistoryData,
};

const mutations = {
  /* 
    RINGING
  */
  [RINGING](state, payload) {
    state.dialer = false;
    state.current_session = payload.session;
    state.remote_identity = payload.remote_identity;
    if (payload.remote_identity.slice(0, 3) == "000") {
      state.masked_remote_identity =
        ("" + payload.remote_identity).slice(0, 1).replace(/./g, "+") +
        ("" + payload.remote_identity).slice(3, -8) +
        ("" + payload.remote_identity).slice(-8, -3).replace(/./g, "*") +
        ("" + payload.remote_identity).slice(-3);
    } else {
      state.masked_remote_identity =
        ("" + payload.remote_identity).slice(0, -8) +
        ("" + payload.remote_identity).slice(-8, -3).replace(/./g, "*") +
        ("" + payload.remote_identity).slice(-3);
    }
    state.call_state = "RINGING";
  },
  [CALL_FROM_CALL_HISTORY](state, payload) {
    state.callHistoryNumber = payload;
  },
  /* 
    STORE CURRENT CALLER DETAILS
  */
  [STORE_CALL_DETAILS_PHONE](state, payload) {
    state.currentCallerDetails.phone = payload;
  },
  [ANSWER_SIP_CALL](state, payload) {
    state.answerSipCall = payload;
  },
  [CLIENT](state, payload) {
    state.client = payload;
  },
  [OUTBOUND_CALL](state, payload) {
    state.outboundCall = payload;
  },
  [LAST_REGISTER](state, payload) {
    state.lastRegister = payload;
  },
  [PREVIOUS_STATE](state, payload) {
    state.previousState = payload;
  },
  /* 
    STORE CURRENT CALLER DETAILS
  */
  [STORE_CALL_DETAILS_ACCOUNT](state, payload) {
    state.currentCallerDetails.account = payload;
  },

  [GET_CALL_HISTORY_REQUEST](state) {
    state.loadingCalls = true;
  },
  [GET_CALL_HISTORY_SUCCESS](state, callHistory) {
    state.loadingCalls = false;
    state.getCallHistoryData = callHistory;
  },
  [GET_CALL_HISTORY_ERROR](state, error) {
    state.loadingCalls = false;
    state.errorCalls = error;
  },

  /* 
    STORE CURRENT CALLER DETAILS
  */
  [STORE_CALL_DETAILS_CONTACT](state, payload) {
    state.currentCallerDetails.contact = payload;
  },

  /* 
    ANSWERED
  */
  [ANSWERED](state) {
    // state.incomingCall = true;
    // state.outgoingCall = true;
    state.dialer = false;
    state.call_state = "ANSWERED";
  },
  /* 
    ONHOLD
  */
  [ONHOLD](state) {
    // state.incomingCall = true;
    // state.outgoingCall = true;
    state.dialer = false;
    state.call_state = "ONHOLD";
  },
  /* 
    MUTED
  */
  [MUTED](state) {
    // state.incomingCall = true;
    // state.outgoingCall = true;
    state.dialer = false;
    state.call_state = "MUTED";
  },
  /* 
    ENDED
  */
  [ENDED](state) {
    state.incomingCall = false;
    state.outgoingCall = false;
    state.internalCall = false;
    state.dialer = false;
    state.current_session = {};
    state.remote_identity = "";
    state.call_state = "ENDED";
  },
  /* 
    IDLE
  */
  [IDLE](state) {
    state.incomingCall = false;
    state.outgoingCall = false;
    state.internalCall = false;
    state.dialer = false;
    state.current_session = {};
    state.remote_identity = "";
    state.call_state = "IDLE";
  },

  /* 
    TOTAL CALL IN PROGRESS INFO
  */
  [GET_CALL_DETAILS_REQUEST](state) {
    state.loadingCalls = true;
    state.currentCallDetailsErrors = "";
  },
  [GET_CALL_DETAILS_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.currentCallDetails = payload;
    if (payload.call_type === "INBOUND") {
      state.incomingCall = true;
    } else if (payload.call_type === "AGENT_CAMPAIGN") {
      state.outgoingCall = true;
      console.log("i am logging outbound calling state", state.outgoingCall);
    } else if (payload.call_type === "SIPCALL") {
      console.log("i am getting into sip call");
      state.internalCall = true;
      console.log("i am logging Internal calling state", state.internalCall);
    }
  },
  [GET_CALL_DETAILS_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.currentCallDetailsErrors = errorCalls;
  },

  [CLICK_TO_CALL_REQUEST](state) {
    state.loadingCalls = true;
    state.clickToCall = "";
  },
  [CLICK_TO_CALL_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.clickToCall = payload;
    state.outboundCall = false;
    console.log("this is the outgoing call state", state.outboundCall);
  },
  [CLICK_TO_CALL_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.clickToCall = errorCalls;
  },

  /*GET ALL SIP */

  [GET_ALL_SIP_REQUEST](state) {
    state.loadingCalls = true;
    state.allSIPErrors = "";
  },
  [GET_ALL_SIP_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.allSIP = payload;
  },
  [GET_ALL_SIP_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.allSIPErrors = errorCalls;
  },

  /* 
    TOTAL CALL IN PROGRESS INFO
  */
  [ANSWERED_CAMPAIGN_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [ANSWERED_CAMPAIGN_SUCCESS](state) {
    state.loadingCalls = false;
  },
  [ANSWERED_CAMPAIGN_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },

  /* 
    TRANSFER CALL
  */
  [TRANSFER_CALL_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [TRANSFER_CALL_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.transferCallSuccess = payload;
  },
  [TRANSFER_CALL_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.transferCallError = errorCalls;
  },
  /* 
    CALLS PER QUEUE INFO
  */
  [CALLS_PER_QUEUE_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [CALLS_PER_QUEUE_SUCCESS](state, payload) {
    state.loadingCalls = false;
    /* console.log("CALLS_PER_QUEUE_SUCCESS kpi", payload); */
    if (payload.kpi == "total_call") {
      state.callsPerQueueDailyTotalLabel = payload.data.map((label) => {
        return label.queue_name;
      });
      state.callsPerQueueDailyTotalData = payload.data.map((data) => {
        return data.calls;
      });
    } else if (payload.kpi == "ABANDONED") {
      state.callsPerQueueDailyAbandonedLabel = payload.data.map((label) => {
        return label.queue_name;
      });
      state.callsPerQueueDailyAbandonedData = payload.data.map((data) => {
        return data.calls;
      });
    } else if (payload.kpi == "ANSWERED") {
      state.callsPerQueueDailyAnsweredLabel = payload.data.map((label) => {
        return label.queue_name;
      });
      state.callsPerQueueDailyAnsweredData = payload.data.map((data) => {
        return data.calls;
      });
    }
  },
  [CALLS_PER_QUEUE_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    QUEUE KPI DAILY INFO
  */
  [QUEUE_KPI_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [QUEUE_KPI_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.queueKpiDaily = payload;
  },
  [QUEUE_KPI_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    CALL ABANDONMENT RATE DAILY INFO
  */
  [CALL_ABANDONMENT_RATE_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [CALL_ABANDONMENT_RATE_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.callAbandonmentRateDailyLabel = payload.map((label) => {
      return label.queue_name;
    });
    state.callAbandonmentRateDailyData = payload.map((data) => {
      return data.abandoned_rate;
    });
  },
  [CALL_ABANDONMENT_RATE_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    CALLS PER AGENT INFO
  */
  [CALLS_PER_AGENT_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [CALLS_PER_AGENT_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    /* console.log("CALLS_PER_AGENT_DAILY_SUCCESS kpi", payload); */
    if (payload.kpi == "total_call") {
      state.callsPerAgentDailyTotalLabel = payload.data.map((label) => {
        return label.agent;
      });
      state.callsPerAgentDailyTotalData = payload.data.map((data) => {
        return data.calls;
      });
    } else if (payload.kpi == "ABANDONED") {
      state.callsPerAgentDailyAbandonedLabel = payload.data.map((label) => {
        return label.agent;
      });
      state.callsPerAgentDailyAbandonedData = payload.data.map((data) => {
        return data.calls;
      });
    } else if (payload.kpi == "ANSWERED") {
      state.callsPerAgentDailyAnsweredLabel = payload.data.map((label) => {
        return label.agent;
      });
      state.callsPerAgentDailyAnsweredData = payload.data.map((data) => {
        return data.calls;
      });
    }
  },
  [CALLS_PER_AGENT_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    AGENT KPI DAILY INFO
  */
  [AGENT_KPI_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [AGENT_KPI_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.agentKpiDaily = payload;
  },
  [AGENT_KPI_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    AGENT CALL ABANDONMENT RATE DAILY INFO
  */
  [AGENT_CALL_ABANDONMENT_RATE_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [AGENT_CALL_ABANDONMENT_RATE_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.agentCallAbandonmentRateDailyLabel = payload.map((label) => {
      return label.agent;
    });
    state.agentCallAbandonmentRateDailyData = payload.map((data) => {
      return data.abandoned_rate;
    });
  },
  [AGENT_CALL_ABANDONMENT_RATE_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    AGENT PROGRESS DAILY INFO
  */
  [AGENT_PROGRESS_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [AGENT_PROGRESS_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.agentProgressDaily = payload;
  },
  [AGENT_PROGRESS_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    AGENT QUEUE DAILY INFO
  */
  [AGENT_QUEUE_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [AGENT_QUEUE_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.agentQueueDaily = payload;
    state.agentQueueDailyMenuItems = payload.map((data) => {
      return data.queue_name;
    });
  },
  [AGENT_QUEUE_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    SERVICE LEVEL DAILY INFO
  */
  [SERVICE_LEVEL_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [SERVICE_LEVEL_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.serviceLevelDailyLabel = payload.map((label) => {
      return label.name;
    });
    state.serviceLevelDailyData = payload.map((data) => {
      return data.service_level;
    });
  },
  [SERVICE_LEVEL_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
  /* 
    FIRST CALL RESOLUTION DAILY INFO
  */
  [FIRST_CALL_RESOLUTION_DAILY_REQUEST](state) {
    state.loadingCalls = true;
    state.errorCalls = "";
  },
  [FIRST_CALL_RESOLUTION_DAILY_SUCCESS](state, payload) {
    state.loadingCalls = false;
    state.firstCallResolutionDailyLabel = payload.map((label) => {
      return label.name;
    });
    state.firstCallResolutionDailyData = payload.map((data) => {
      return data.first_call;
    });
  },
  [FIRST_CALL_RESOLUTION_DAILY_FAIL](state, errorCalls) {
    state.loadingCalls = false;
    state.errorCalls = errorCalls;
  },
};

const actions = {
  async callFromHistory({ commit }, payload) {
    commit(CALL_FROM_CALL_HISTORY, payload);
  },

  /*get call history */

  async getCallHistory({ commit }) {
    commit(GET_CALL_HISTORY_REQUEST);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(baseUrl + "agent/get_call_log", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      commit(GET_CALL_HISTORY_SUCCESS, response.data.data);
      console.log("this is the call history", response.data.data);
    } catch (error) {
      commit(GET_CALL_HISTORY_ERROR, error);
    }
  },

  async store_client({ commit }, payload) {
    commit(CLIENT, payload);
    console.log("i am storing client detaisl", state.client);
  },

  async answerSIPCallState({ commit }, payload) {
    console.log("I am getting here to store answer sip state");
    commit(ANSWER_SIP_CALL, payload);
    console.log(state.answerSipCall);
  },
  async store_outgoing({ commit }, payload) {
    commit(OUTBOUND_CALL, payload);
    console.log("i am storing outbound call detaisl", state.outboundCall);
  },

  /* 
    RINGING
  */
  async ringing({ commit, rootState }, payload) {
    console.log("current session in store", rootState.calls.current_session);
    commit(RINGING, payload);
  },
  /* 
    ANSWERED
  */
  async answered({ commit, dispatch }) {
    console.log("Answered");
    commit(ANSWERED);
    dispatch("getCallHistory");
  },

  async storeLastRegister({ commit }, payload) {
    console.log("stroring last register");
    commit(LAST_REGISTER, payload);
  },
  async store_Previous_State({ commit }, payload) {
    commit(PREVIOUS_STATE, payload);
    await setTimeout(5000);
    console.log("store previous state", state.previousState);
  },
  /* 
    ONHOLD
  */
  async onHold({ commit, rootState }) {
    var sip_id = localStorage.getItem("sip_id");
    var data = {
      sip: sip_id,
      phone_number: rootState.calls.remote_identity,
    };
    var config = {
      method: "put",
      url: `${baseUrl}call_action/hold_call`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };
    console.log("hold config", config);

    axios(config)
      .then(function (response) {
        console.log("hold response", response.data);
        if (rootState.calls.call_state !== "ONHOLD") {
          commit(ONHOLD);
        } else {
          commit(ANSWERED);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  /* 
    ONHOLD
  */
  async answerCampaign({ commit }, payload) {
    commit(ANSWERED_CAMPAIGN_REQUEST);
    var config = {
      method: "post",
      url: `${baseUrl}call_action/agent_answered_campaign`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("hold config", config);

    axios(config)
      .then(function () {
        commit(ANSWERED_CAMPAIGN_SUCCESS);
      })
      .catch(function (error) {
        console.log(error);
        commit(ANSWERED_CAMPAIGN_FAIL);
      });
  },

  /* 
   TRANSFER CALL
  */
  async transferCall({ commit }, payload) {
    commit(TRANSFER_CALL_REQUEST);
    var config = {
      method: "post",
      url: `${baseUrl}call_action/call_transfer`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("hold config", config);

    axios(config)
      .then(function (response) {
        commit(TRANSFER_CALL_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        commit(TRANSFER_CALL_FAIL, error.response.data);
      });
  },
  /* 
   CLICK TO CALL
  */
  async clickToCallHandler({ commit }, payload) {
    commit(CLICK_TO_CALL_REQUEST);
    var config = {
      method: "post",
      url: `${baseUrl}call_action/click_to_call`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("hold config", config);

    axios(config)
      .then(function () {
        commit(CLICK_TO_CALL_SUCCESS);
      })
      .catch(function (error) {
        console.log(error);
        commit(CLICK_TO_CALL_FAIL);
      });
  },

  async clickToSip({ commit }, payload) {
    commit(CLICK_TO_CALL_REQUEST);
    var config = {
      method: "post",
      url: `${baseUrl}call_action/call_sip_to_sip`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("hold config", config);

    axios(config)
      .then(function () {
        commit(CLICK_TO_CALL_SUCCESS);
      })
      .catch(function (error) {
        console.log(error);
        commit(CLICK_TO_CALL_FAIL);
      });
  },
  /* 
    MUTED
  */
  async muted({ commit, rootState }) {
    var sip_id = localStorage.getItem("sip_id");
    var data = {
      sip: sip_id,
      phone_number: rootState.calls.remote_identity,
    };
    var config = {
      method: "put",
      url: `${baseUrl}call_action/mute_call`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };
    console.log("mute config", config);

    axios(config)
      .then(function (response) {
        console.log("mute response", response.data);
        if (rootState.calls.call_state !== "MUTED") {
          commit(MUTED);
        } else {
          commit(ANSWERED);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  /* 
    ENDED
  */
  async ended({ commit, rootState, dispatch }) {
    var sip_id = localStorage.getItem("sip_id");
    var data = {
      sip: sip_id,
      phone_number: rootState.calls.remote_identity,
    };
    var config = {
      method: "put",
      url: `${baseUrl}call_action/cancel_call`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };
    console.log("ended config", config);

    axios(config)
      .then(function (response) {
        console.log("ended response", response.data);
        commit(ENDED);
        dispatch("getCallHistory");
      })
      .catch(function (error) {
        commit(IDLE);
        console.log(error);
      });
  },

  /* 
    ENDED
  */
  async endedClickToCall({ commit, dispatch }) {
    var config = {
      method: "put",
      url: `${baseUrl}call_action/hangup_click_tocall`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {},
    };
    console.log("ended config", config);

    axios(config)
      .then(function (response) {
        console.log("ended response", response.data);
        commit(ENDED);
        dispatch("getCallHistory");
      })
      .catch(function (error) {
        commit(IDLE);
        console.log(error);
      });
  },
  /* 
    IDLE
  */
  async idle({ commit }) {
    commit(IDLE);
  },

  /* 
    GET CURRENT CALL DETAISS
  */
  async getCurrentCall({ commit }, payload) {
    commit(GET_CALL_DETAILS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_caller_information?phone=` + payload,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("total calls in progress config", config);

    axios(config)
      .then(function (response) {
        console.log("I AM GETTING 360 VIEW", response.data);
        commit(GET_CALL_DETAILS_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(GET_CALL_DETAILS_FAIL, error.response.data);
        }
      });
  },

  /* 
    STORE CALLER DETAILS
  */
  async storeCallDetailsPhone({ commit }, payload) {
    commit(STORE_CALL_DETAILS_PHONE, payload);
    console.log(
      "i am getting current caller phone",
      state.currentCallerDetails
    );
  },

  async storeCallDetailsAccount({ commit }, payload) {
    commit(STORE_CALL_DETAILS_ACCOUNT, payload);
    console.log(
      "i am getting current caller account",
      state.currentCallerDetails
    );
  },
  async storeCallDetailsContact({ commit }, payload) {
    commit(STORE_CALL_DETAILS_CONTACT, payload);
    console.log(
      "i am getting current caller contact",
      state.currentCallerDetails
    );
  },

  /* 
    TOTAL CALL IN PROGRESS INFO 
  */
  async getTotalCallsInProgress({ commit }, payload) {
    commit(TOTAL_CALL_IN_PROGRESS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_total_call_inprogress`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("total calls in progress config", config);

    axios(config)
      .then(function (response) {
        console.log("total calls in progress response", response.data);
        commit(TOTAL_CALL_IN_PROGRESS_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(TOTAL_CALL_IN_PROGRESS_FAIL, error.response.data);
        }
      });
  },

  /* 
    GET ALL SIPS
  */
  async getAllSip({ commit }, payload) {
    commit(GET_ALL_SIP_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}agent/get_all_sip`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("total calls in progress config", config);

    axios(config)
      .then(function (response) {
        console.log("total calls in progress response", response.data);
        commit(GET_ALL_SIP_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(GET_ALL_SIP_FAIL, error.response.data);
        }
      });
  },
  /* 
    CALLS PER QUEUE INFO 
  */
  async getCallsPerQueue({ commit }, payload) {
    commit(CALLS_PER_QUEUE_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/calls_per_queue_daily?kpi=${payload.kpi}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("calls per queue rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log("calls per queue rate daily response", response.data);
        var queue_response = {};
        queue_response.data = response.data;
        queue_response.kpi = payload.kpi;
        commit(CALLS_PER_QUEUE_SUCCESS, queue_response);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response?.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(CALLS_PER_QUEUE_FAIL, error.response.data);
        }
      });
  },
  /* 
    QUEUE KPI DAILY 
  */
  async getQueueKpiDaily({ commit }, payload) {
    commit(QUEUE_KPI_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_queue_kpi_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get queue kpi daily config", config);

    axios(config)
      .then(function (response) {
        console.log("get queue kpi daily response", response.data);
        commit(QUEUE_KPI_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(QUEUE_KPI_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    CALL ABANDONMENT RATE DAILY INFO 
  */
  async getCallAbandonmentRateDaily({ commit }, payload) {
    commit(CALL_ABANDONMENT_RATE_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_call_abandonment_rate_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("call abandonment rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log("call abandonment rate daily response", response.data);
        commit(CALL_ABANDONMENT_RATE_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(CALL_ABANDONMENT_RATE_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    CALLS PER AGENT DAILY INFO 
  */
  async getCallsPerAgentDaily({ commit }, payload) {
    commit(CALLS_PER_AGENT_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/calls_per_agent_daily?kpi=${payload.kpi}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("calls per agent rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log("calls per agent rate daily response", response.data);
        var agent_response = {};
        agent_response.data = response.data;
        agent_response.kpi = payload.kpi;
        commit(CALLS_PER_AGENT_DAILY_SUCCESS, agent_response);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(CALLS_PER_AGENT_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT KPI DAILY INFO 
  */
  async getAgentKpiDaily({ commit }, payload) {
    commit(AGENT_KPI_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_agent_kpi_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("agent kpi rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log("agent kpi rate daily response", response.data);
        commit(AGENT_KPI_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(AGENT_KPI_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT CALL ABANDONMENT RATE DAILY INFO 
  */
  async getAgentCallAbandonmentRateDaily({ commit }, payload) {
    commit(AGENT_CALL_ABANDONMENT_RATE_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_agent_call_abandonment_rate_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("agent call abandonment rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "agent call abandonment rate daily response",
          response.data
        );
        commit(AGENT_CALL_ABANDONMENT_RATE_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(AGENT_CALL_ABANDONMENT_RATE_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT PROGRESS DAILY INFO 
  */
  async getAgentProgressDaily({ commit }, payload) {
    commit(AGENT_PROGRESS_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/get_agent_progress_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("agent progress rate daily config", config);

    axios(config)
      .then(function (response) {
        console.log("agent progress rate daily response", response.data);
        commit(AGENT_PROGRESS_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(AGENT_PROGRESS_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    AGENT QUEUE DAILY INFO 
  */
  async getAgentQueueDaily({ commit }, payload) {
    commit(AGENT_QUEUE_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_action/agent_queue_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("Agent Call Status per queue daily config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "Agent Call Status per queue daily response",
          response.data
        );
        commit(AGENT_QUEUE_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(AGENT_QUEUE_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    SERVICE LEVEL DAILY INFO 
  */
  async getServiceLevelDaily({ commit }, payload) {
    commit(SERVICE_LEVEL_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_service_level_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("service level daily config", config);

    axios(config)
      .then(function (response) {
        console.log("service level daily response", response.data);
        commit(SERVICE_LEVEL_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(SERVICE_LEVEL_DAILY_FAIL, error.response.data);
        }
      });
  },
  /* 
    FIRST CALL RESOLUTION DAILY INFO 
  */
  async getFirstCallResolutionDaily({ commit }, payload) {
    commit(FIRST_CALL_RESOLUTION_DAILY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}call_report/get_first_call_resolution_daily`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("first call resolution daily config", config);

    axios(config)
      .then(function (response) {
        console.log("first call resolution daily response", response.data);
        commit(FIRST_CALL_RESOLUTION_DAILY_SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.status == 401 ||
          error.response.data.message == "Unauthenticated."
        ) {
          console.log("logged in from another device");
          commit("LOGOUT_SUCCESS", null, { root: true });
          router.replace({ name: "LogIn" });
        } else {
          commit(FIRST_CALL_RESOLUTION_DAILY_FAIL, error.response.data);
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
