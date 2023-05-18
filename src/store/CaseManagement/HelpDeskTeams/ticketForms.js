import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* 
    TICKET PRIORITY
  */
export const CREATE_TICKET_PRIORITY_REQUEST = "CREATE_TICKET_PRIORITY_REQUEST";
export const CREATE_TICKET_PRIORITY_SUCCESS = "CREATE_TICKET_PRIORITY_SUCCESS";
export const CREATE_TICKET_PRIORITY_FAIL = "CREATE_TICKET_PRIORITY_FAIL";
export const GET_TICKET_PRIORITY_REQUEST = "GET_TICKET_PRIORITY_REQUEST";
export const GET_TICKET_PRIORITY_SUCCESS = "GET_TICKET_PRIORITY_SUCCESS";
export const GET_TICKET_PRIORITY_FAIL = "GET_TICKET_PRIORITY_FAIL";

const state = {
  loadingTicket: false,
  successTicket: "",
  errorTicket: "",
  ticketPriority: [],
  selectTicketPriority: [],
  singleTicketPriority: {},
  ticketReminder: [],
  selectTicketReminder: [],
  singleTicketReminder: {},
  ticketForm: [],
  selectTicketForm: [],
  singleTicketForm: {},
  ticketEscalationMatrix: [],
  selectTicketEscalationMatrix: [],
  userCreatedTickets: [],
  selectUserCreatedTickets: [],
  assignedTickets: [],
  selectAssignedTickets: [],
  companyTickets: [],
  selectCompanyTickets: [],
};

const getters = {
  loadingTicket: (state) => state.loadingTicket,
  successTicket: (state) => state.successTicket,
  errorTicket: (state) => state.errorTicket,
  ticketPriority: (state) => state.ticketPriority,
  selectTicketPriority: (state) => state.selectTicketPriority,
  singleTicketPriority: (state) => state.singleTicketPriority,
  ticketReminder: (state) => state.ticketReminder,
  selectTicketReminder: (state) => state.selectTicketReminder,
  singleTicketReminder: (state) => state.singleTicketReminder,
  ticketForm: (state) => state.ticketForm,
  selectTicketForm: (state) => state.selectTicketForm,
  singleTicketForm: (state) => state.singleTicketForm,
  ticketEscalationMatrix: (state) => state.ticketEscalationMatrix,
  selectTicketEscalationMatrix: (state) => state.selectTicketEscalationMatrix,
  userCreatedTickets: (state) => state.userCreatedTickets,
  selectUserCreatedTickets: (state) => state.selectUserCreatedTickets,
  assignedTickets: (state) => state.assignedTickets,
  selectAssignedTickets: (state) => state.selectAssignedTickets,
  companyTickets: (state) => state.companyTickets,
  selectCompanyTickets: (state) => state.selectCompanyTickets,
};

const mutations = {
  /* 
    CREATE TICKET PRIORITY
  */
  [CREATE_TICKET_PRIORITY_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_PRIORITY_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_PRIORITY_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
    GET TICKET PRIORITY
  */
  [GET_TICKET_PRIORITY_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_PRIORITY_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketPriority = payload;
    state.selectTicketPriority = payload.map((ticket) => {
      return { label: ticket.name, value: ticket.id };
    });
  },
  [GET_TICKET_PRIORITY_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET SINGLE TICKET PRIORITY
      */
 
};

const actions = {
  /* 
    CREATE TICKET PRIORITY
  */
  async createTicketPriority({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_PRIORITY_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}ticketPriorities`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket priority config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket priority response", response.data);
        commit(CREATE_TICKET_PRIORITY_SUCCESS, response.data);
        dispatch("getTicketPriority");
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
          commit(CREATE_TICKET_PRIORITY_FAIL, error.response.data);
          dispatch("getTicketPriority");
        }
      });
  },
  /* 
      GET TICKET PRIORITY
    */
  async getTicketPriority({ commit }, payload) {
    commit(GET_TICKET_PRIORITY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ticketPriorities`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket priority config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket priority response", response.data);
        commit(GET_TICKET_PRIORITY_SUCCESS, response.data);
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
          commit(GET_TICKET_PRIORITY_FAIL, error.response.data);
        }
      });
  },
  /* 
      GET SINGLE TICKET PRIORITY
    */
 s
};

export default {
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV != "production",
};
