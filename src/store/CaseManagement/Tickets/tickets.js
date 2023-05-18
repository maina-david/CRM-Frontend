import axios from "axios";
import router from "@/router";
const baseUrl = process.env.VUE_APP_API_URL;

/* store current ticket

*/

export const CURRENT_TICKET = "CURRENT_TICKET";
export const CURRENT_TICKET_CHAT_TRANSCRIPT = "CURRENT_TICKET_CHAT_TRANSCRIPT";

/* GET CURRENT TICKET */

export const GET_TICKET_DETAIL_REQUEST = "GET_TICKET_DETAIL_REQUEST";
export const GET_TICKET_DETAIL_SUCCESS = "GET_TICKET_DETAIL_SUCCESS";
export const GET_TICKET_DETAIL_FAIL = "GET_TICKET_DETAIL_FAIL";

/*
Activate Ticket form 
*/

export const ACTIVATE_TICKET_FORM_REQUEST = "ACTIVATE_TICKET_FORM_REQUEST";
export const ACTIVATE_TICKET_FORM_SUCCESS = "ACTIVATE_TICKET_FORM_SUCCESS";
export const ACTIVATE_TICKET_FORM_FAIL = "ACTIVATE_TICKET_FORM_FAIL";
export const DEACTIVATE_TICKET_FORM_REQUEST = "DEACTIVATE_TICKET_FORM_REQUEST";
export const DEACTIVATE_TICKET_FORM_SUCCESS = "DEACTIVATE_TICKET_FORM_SUCCESS";
export const DEACTIVATE_TICKET_FORM_FAIL = "DEACTIVATE_TICKET_FORM_FAIL";
export const GET_ACTIVE_TICKET_FORM_REQUEST = "GET_ACTIVE_TICKET_FORM_REQUEST";
export const GET_ACTIVE_TICKET_FORM_SUCCESS = "GET_ACTIVE_TICKET_FORM_SUCCESS";
export const GET_ACTIVE_TICKET_FORM_FAIL = "GET_ACTIVE_TICKET_FORM_FAIL";

/*
Escalate Ticket && Resolve Ticket 
*/

export const ESCALATE_TICKET_REQUEST = "ESCALATE_TICKET_REQUEST";
export const ESCALATE_TICKET_SUCCESS = "ESCALATE_TICKET_SUCCESS";
export const ESCALATE_TICKET_FAIL = "ESCALATE_TICKET_FAIL";
export const RESOLVE_TICKET_REQUEST = "RESOLVE_TICKET_REQUEST";
export const RESOLVE_TICKET_SUCCESS = "RESOLVE_TICKET_SUCCESS";
export const RESOLVE_TICKET_FAIL = "RESOLVE_TICKET_FAIL";

/* 
    TICKET PRIORITY
  */
export const CREATE_TICKET_PRIORITY_REQUEST = "CREATE_TICKET_PRIORITY_REQUEST";
export const CREATE_TICKET_PRIORITY_SUCCESS = "CREATE_TICKET_PRIORITY_SUCCESS";
export const CREATE_TICKET_PRIORITY_FAIL = "CREATE_TICKET_PRIORITY_FAIL";
export const GET_TICKET_PRIORITY_REQUEST = "GET_TICKET_PRIORITY_REQUEST";
export const GET_TICKET_PRIORITY_SUCCESS = "GET_TICKET_PRIORITY_SUCCESS";
export const GET_TICKET_PRIORITY_FAIL = "GET_TICKET_PRIORITY_FAIL";
export const GET_SINGLE_TICKET_PRIORITY_REQUEST =
  "GET_SINGLE_TICKET_PRIORITY_REQUEST";
export const GET_SINGLE_TICKET_PRIORITY_SUCCESS =
  "GET_SINGLE_TICKET_PRIORITY_SUCCESS";
export const GET_SINGLE_TICKET_PRIORITY_FAIL =
  "GET_SINGLE_TICKET_PRIORITY_FAIL";
export const UPDATE_TICKET_PRIORITY_REQUEST = "UPDATE_TICKET_PRIORITY_REQUEST";
export const UPDATE_TICKET_PRIORITY_SUCCESS = "UPDATE_TICKET_PRIORITY_SUCCESS";
export const UPDATE_TICKET_PRIORITY_FAIL = "UPDATE_TICKET_PRIORITY_FAIL";

/* 
    TICKET REMINDERS
  */
export const CREATE_TICKET_REMINDER_REQUEST = "CREATE_TICKET_REMINDER_REQUEST";
export const CREATE_TICKET_REMINDER_SUCCESS = "CREATE_TICKET_REMINDER_SUCCESS";
export const CREATE_TICKET_REMINDER_FAIL = "CREATE_TICKET_REMINDER_FAIL";
export const GET_TICKET_REMINDER_REQUEST = "GET_TICKET_REMINDER_REQUEST";
export const GET_TICKET_REMINDER_SUCCESS = "GET_TICKET_REMINDER_SUCCESS";
export const GET_TICKET_REMINDER_FAIL = "GET_TICKET_REMINDER_FAIL";
export const GET_SINGLE_TICKET_REMINDER_REQUEST =
  "GET_SINGLE_TICKET_REMINDER_REQUEST";
export const GET_SINGLE_TICKET_REMINDER_SUCCESS =
  "GET_SINGLE_TICKET_REMINDER_SUCCESS";
export const GET_SINGLE_TICKET_REMINDER_FAIL =
  "GET_SINGLE_TICKET_REMINDER_FAIL";
export const UPDATE_TICKET_REMINDER_REQUEST = "UPDATE_TICKET_REMINDER_REQUEST";
export const UPDATE_TICKET_REMINDER_SUCCESS = "UPDATE_TICKET_REMINDER_SUCCESS";
export const UPDATE_TICKET_REMINDER_FAIL = "UPDATE_TICKET_REMINDER_FAIL";

/* 
    TICKET ESCALATION LEVEL
  */
export const CREATE_TICKET_ESCALALTION_LEVEL_REQUEST =
  "CREATE_TICKET_ESCALATION_LEVEL_REQUEST";
export const CREATE_TICKET_ESCALATION_LEVEL_SUCCESS =
  "CREATE_TICKET_ESCALATION_LEVEL_SUCCESS";
export const CREATE_TICKET_ESCALATION_LEVEL_FAIL =
  "CREATE_TICKET_ESCALATION_LEVEL_FAIL";
export const GET_TICKET_ESCALATION_LEVEL_REQUEST =
  "GET_TICKET_ESCALATION_LEVEL_REQUEST";
export const GET_TICKET_ESCALATION_LEVEL_SUCCESS =
  "GET_TICKET_ESCALATION_LEVEL_SUCCESS";
export const GET_TICKET_ESCALATION_LEVEL_FAIL =
  "GET_TICKET_ESCALATION_LEVEL_FAIL";

/* 
    TICKET CREATION FORM
  */
export const CREATE_TICKET_FORM_REQUEST = "CREATE_TICKET_FORM_REQUEST";
export const CREATE_TICKET_FORM_SUCCESS = "CREATE_TICKET_FORM_SUCCESS";
export const CREATE_TICKET_FORM_FAIL = "CREATE_TICKET_FORM_FAIL";
export const CREATE_TICKET_REQUEST = "CREATE_TICKET_REQUEST";
export const CREATE_TICKET_SUCCESS = "CREATE_TICKET_SUCCESS";
export const CREATE_TICKET_FAIL = "CREATE_TICKET_FAIL";
export const GET_TICKET_FORM_REQUEST = "GET_TICKET_FORM_REQUEST";
export const GET_TICKET_FORM_SUCCESS = "GET_TICKET_FORM_SUCCESS";
export const GET_TICKET_FORM_FAIL = "GET_TICKET_FORM_FAIL";
export const GET_TICKET_FORM_JSON_REQUEST = "GET_TICKET_FORM_JSON_REQUEST";
export const GET_TICKET_FORM_JSON_SUCCESS = "GET_TICKET_FORM_JSON_SUCCESS";
export const GET_TICKET_FORM_JSON_FAIL = "GET_TICKET_FORM_JSON_FAIL";
export const GET_FORM_ITEMS_REQUEST = "GET_FORM_ITEMS_REQUEST";
export const GET_FORM_ITEMS_SUCCESS = "GET_FORM_ITEMS_SUCCESS";
export const GET_FORM_ITEMS_FAIL = "GET_FORM_ITEMS_FAIL";
export const UPDATE_TICKET_FORM_REQUEST = "UPDATE_TICKET_FORM_REQUEST";
export const UPDATE_TICKET_FORM_SUCCESS = "UPDATE_TICKET_FORM_SUCCESS";
export const UPDATE_TICKET_FORM_FAIL = "UPDATE_TICKET_FORM_FAIL";
export const ADD_TICKET_FORM_ITEMS_REQUEST = "ADD_TICKET_FORM_ITEMS_REQUEST";
export const ADD_TICKET_FORM_ITEMS_SUCCESS = "ADD_TICKET_FORM_ITEMS_SUCCESS";
export const ADD_TICKET_FORM_ITEMS_FAIL = "ADD_TICKET_FORM_ITEMS_FAIL";

/* Ticket escalation point

*/

export const CREATE_TICKET_ESCALATION_POINT_REQUEST =
  "CREATE_TICKET_ESCALATION_POINT_REQUEST";
export const CREATE_TICKET_ESCALATION_POINT_SUCCESS =
  "CREATE_TICKET_ESCALATION_POINT_SUCCESS";
export const CREATE_TICKET_ESCALATION_POINT_FAIL =
  "CREATE_TICKET_ESCALATION_POINT_FAIL";

export const GET_TICKET_ESCALATION_POINT_REQUEST =
  "GET_TICKET_ESCALATION_POINT_REQUEST";
export const GET_TICKET_ESCALATION_POINT_SUCCESS =
  "GET_TICKET_ESCALATION_POINT_SUCCESS";
export const GET_TICKET_ESCALATION_POINT_FAIL =
  "GET_TICKET_ESCALATION_POINT_FAIL";

/* 
    TICKET MANAGEMENT
  */
export const CREATE_TICKET_ESCALATION_MATRIX_REQUEST =
  "CREATE_TICKET_ESCALATION_MATRIX_REQUEST";
export const CREATE_TICKET_ESCALATION_MATRIX_SUCCESS =
  "CREATE_TICKET_ESCALATION_MATRIX_SUCCESS";
export const CREATE_TICKET_ESCALATION_MATRIX_FAIL =
  "CREATE_TICKET_ESCALATION_MATRIX_FAIL";
export const GET_TICKET_ESCALATION_MATRIX_REQUEST =
  "GET_TICKET_ESCALATION_MATRIX_REQUEST";
export const GET_TICKET_ESCALATION_MATRIX_SUCCESS =
  "GET_TICKET_ESCALATION_MATRIX_SUCCESS";
export const GET_TICKET_ESCALATION_MATRIX_FAIL =
  "GET_TICKET_ESCALATION_MATRIX_FAIL";
export const UPDATE_TICKET_ESCALATION_MATRIX_REQUEST =
  "UPDATE_TICKET_ESCALATION_MATRIX_REQUEST";
export const UPDATE_TICKET_ESCALATION_MATRIX_SUCCESS =
  "UPDATE_TICKET_ESCALATION_MATRIX_SUCCESS";
export const UPDATE_TICKET_ESCALATION_MATRIX_FAIL =
  "UPDATE_TICKET_ESCALATION_MATRIX_FAIL";
export const DELETE_TICKET_ESCALATION_MATRIX_REQUEST =
  "DELETE_TICKET_ESCALATION_MATRIX_REQUEST";
export const DELETE_TICKET_ESCALATION_MATRIX_SUCCESS =
  "DELETE_TICKET_ESCALATION_MATRIX_SUCCESS";
export const DELETE_TICKET_ESCALATION_MATRIX_FAIL =
  "DELETE_TICKET_ESCALATION_MATRIX_FAIL";
export const GET_USER_CREATED_TICKETS_REQUEST =
  "GET_USER_CREATED_TICKETS_REQUEST";
export const GET_USER_CREATED_TICKETS_SUCCESS =
  "GET_USER_CREATED_TICKETS_SUCCESS";
export const GET_USER_CREATED_TICKETS_FAIL = "GET_USER_CREATED_TICKETS_FAIL";
export const GET_ASSIGNED_TICKETS_REQUEST = "GET_ASSIGNED_TICKETS_REQUEST";
export const GET_ASSIGNED_TICKETS_SUCCESS = "GET_ASSIGNED_TICKETS_SUCCESS";
export const GET_ASSIGNED_TICKETS_FAIL = "GET_ASSIGNED_TICKETS_FAIL";
export const GET_COMPANY_TICKETS_REQUEST = "GET_COMPANY_TICKETS_REQUEST";
export const GET_COMPANY_TICKETS_SUCCESS = "GET_COMPANY_TICKETS_SUCCESS";
export const GET_COMPANY_TICKETS_FAIL = "GET_COMPANY_TICKETS_FAIL";
export const ACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST =
  "ACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST";
export const ACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS =
  "ACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS";
export const ACTIVATE_TICKET_ESCALATION_MATRIX_FAIL =
  "ACTIVATE_TICKET_ESCALATION_MATRIX_FAIL";
export const DEACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST =
  "DEACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST";
export const DEACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS =
  "DEACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS";
export const DEACTIVATE_TICKET_ESCALATION_MATRIX_FAIL =
  "DEACTIVATE_TICKET_ESCALATION_MATRIX_FAIL";

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
  ticketFormJson: {},
  ticketFormItems: [],
  ticketEscalationMatrix: [],
  ticketEscalationPoint: [],
  selectTicketEscalationMatrix: [],
  userCreatedTickets: [],
  selectUserCreatedTickets: [],
  assignedTickets: [],
  selectAssignedTickets: [],
  companyTickets: [],
  selectCompanyTickets: [],
  activateTicketForm: "",
  currentTicket: "",
  ticketDetail: [],
  currentTicketChatTranscript: [],
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
  ticketFormJson: (state) => state.ticketFormJson,
  ticketFormItems: (state) => state.ticketFormItems,
  ticketEscalationMatrix: (state) => state.ticketEscalationMatrix,
  ticketEscalationPoint: (state) => state.ticketEscalationPoint,
  selectTicketEscalationMatrix: (state) => state.selectTicketEscalationMatrix,
  userCreatedTickets: (state) => state.userCreatedTickets,
  selectUserCreatedTickets: (state) => state.selectUserCreatedTickets,
  assignedTickets: (state) => state.assignedTickets,
  selectAssignedTickets: (state) => state.selectAssignedTickets,
  companyTickets: (state) => state.companyTickets,
  selectCompanyTickets: (state) => state.selectCompanyTickets,
  activateTicketForm: (state) => state.activateTicketForm,
  ticketEscalationLevels: (state) => state.ticketEscalationLevels,
  currentTicket: (state) => state.currentTicket,
  ticketDetail: (state) => state.ticketDetail,
  currentTicketChatTranscript: (state) => state.currentTicketChatTranscript,
};

const mutations = {
  [CURRENT_TICKET](state, payload) {
    state.currentTicket = payload;
  },

  [CURRENT_TICKET_CHAT_TRANSCRIPT](state, payload) {
    state.currentTicketChatTranscript = payload;
  },

  /* 
    GET TICKET DETAILS
  */
  [GET_TICKET_DETAIL_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_DETAIL_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketDetail = payload;
  },
  [GET_TICKET_DETAIL_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

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
    ESCALATE TICKET PRIORITY
  */
  [ESCALATE_TICKET_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [ESCALATE_TICKET_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [ESCALATE_TICKET_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    RESOLVE TICKET PRIORITY
  */
  [RESOLVE_TICKET_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [RESOLVE_TICKET_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [RESOLVE_TICKET_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  [GET_TICKET_ESCALATION_LEVEL_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_ESCALATION_LEVEL_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketEscalationLevels = payload.message;
  },
  [GET_TICKET_ESCALATION_LEVEL_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    CREATE TICKET ESCALATION LEVEL
  */
  [CREATE_TICKET_ESCALALTION_LEVEL_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_ESCALATION_LEVEL_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_ESCALATION_LEVEL_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    ACTIVATE TICKET FORM
  */
  [ACTIVATE_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [ACTIVATE_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [ACTIVATE_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    DEACTIVATE TICKET FORM
  */
  [DEACTIVATE_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [DEACTIVATE_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [DEACTIVATE_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    GET ACTIVE TICKET FORM
  */
  [GET_ACTIVE_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_ACTIVE_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.activateTicketForm = payload;
  },
  [GET_ACTIVE_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    GET USER CREATED TICKETS
  */
  [GET_USER_CREATED_TICKETS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_USER_CREATED_TICKETS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.userCreatedTickets = payload;
  },
  [GET_USER_CREATED_TICKETS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 

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
  [GET_SINGLE_TICKET_PRIORITY_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_SINGLE_TICKET_PRIORITY_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.singleTicketPriority = payload;
  },
  [GET_SINGLE_TICKET_PRIORITY_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
    UPDATE TICKET PRIORITY
  */
  [UPDATE_TICKET_PRIORITY_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [UPDATE_TICKET_PRIORITY_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [UPDATE_TICKET_PRIORITY_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    CREATE TICKET REMINDER
  */
  [CREATE_TICKET_REMINDER_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_REMINDER_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_REMINDER_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
      GET TICKET REMINDER
    */
  [GET_TICKET_REMINDER_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_REMINDER_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketReminder = payload;
    state.selectTicketReminder = payload.map((ticket) => {
      return { label: ticket.name, value: ticket.id };
    });
  },
  [GET_TICKET_REMINDER_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
          GET SINGLE TICKET REMINDER
        */
  [GET_SINGLE_TICKET_REMINDER_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_SINGLE_TICKET_REMINDER_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.singleTicketReminder = payload;
  },
  [GET_SINGLE_TICKET_REMINDER_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
      UPDATE TICKET REMINDER
    */
  [UPDATE_TICKET_REMINDER_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [UPDATE_TICKET_REMINDER_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [UPDATE_TICKET_REMINDER_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    CREATE TICKET FORM
  */
  [CREATE_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
    CREATE TICKET
  */
  [CREATE_TICKET_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET TICKET FORM
      */
  [GET_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketForm = payload;
    state.selectTicketForm = payload.map((ticket) => {
      return { label: ticket.name, value: ticket.id };
    });
  },
  [GET_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET TICKET FORM JSON
      */
  [GET_TICKET_FORM_JSON_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_FORM_JSON_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketFormJson = payload;
  },
  [GET_TICKET_FORM_JSON_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET FORM ITEMS
      */
  [GET_FORM_ITEMS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketFormItems = payload;
  },
  [GET_FORM_ITEMS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        UPDATE TICKET FORM
      */
  [UPDATE_TICKET_FORM_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [UPDATE_TICKET_FORM_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [UPDATE_TICKET_FORM_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
            ADD TICKET FORM ITEMS
          */
  [ADD_TICKET_FORM_ITEMS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [ADD_TICKET_FORM_ITEMS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.singleTicketForm = payload;
  },
  [ADD_TICKET_FORM_ITEMS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
    CREATE TICKET ESCALATION MATRIX
  */
  [CREATE_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_ESCALATION_MATRIX_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* CREATE TICKET ESCALATION POINT
   */
  [CREATE_TICKET_ESCALATION_POINT_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [CREATE_TICKET_ESCALATION_POINT_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [CREATE_TICKET_ESCALATION_POINT_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },

  /* 
        GET TICKET ESCALATION MATRIX
      */
  [GET_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketEscalationMatrix = payload;
    state.selectTicketEscalationMatrix = payload.map((ticket) => {
      return { label: ticket.name, value: ticket.id };
    });
  },
  /*GET TICKET ESCALATION POINT
   */

  [GET_TICKET_ESCALATION_POINT_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },

  [GET_TICKET_ESCALATION_POINT_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.ticketEscalationPoint = payload;
  },

  [GET_TICKET_ESCALATION_POINT_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        UPDATE TICKET ESCALATION MATRIX
      */
  [UPDATE_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [UPDATE_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [UPDATE_TICKET_ESCALATION_MATRIX_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        DELETE TICKET ESCALATION MATRIX
      */
  [DELETE_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [DELETE_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [DELETE_TICKET_ESCALATION_MATRIX_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET USER CREATED TICKETS
      */
  [GET_USER_CREATED_TICKETS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_USER_CREATED_TICKETS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.userCreatedTickets = payload;
    state.selectUserCreatedTickets = payload.map((ticket) => {
      return { label: ticket.name, value: ticket.id };
    });
  },
  [GET_USER_CREATED_TICKETS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET ASSIGNED TICKETS
      */
  [GET_ASSIGNED_TICKETS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_ASSIGNED_TICKETS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.assignedTickets = payload;
  },
  [GET_ASSIGNED_TICKETS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        GET COMPANY TICKETS
      */
  [GET_COMPANY_TICKETS_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [GET_COMPANY_TICKETS_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.companyTickets = payload.tickets;
    state.selectCompanyTickets = payload.tickets.map((ticket) => {
      return { label: ticket.ticket_number, value: ticket.id };
    });
  },
  [GET_COMPANY_TICKETS_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        ACTIVATE TICKET ESCALATION MATRIX
      */
  [ACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [ACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [ACTIVATE_TICKET_ESCALATION_MATRIX_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
  /* 
        DEACTIVATE TICKET ESCALATION MATRIX
      */
  [DEACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST](state) {
    state.loadingTicket = true;
    state.errorTicket = "";
  },
  [DEACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS](state, payload) {
    state.loadingTicket = false;
    state.successTicket = payload.message;
  },
  [DEACTIVATE_TICKET_ESCALATION_MATRIX_FAIL](state, errorTicket) {
    state.loadingTicket = false;
    state.errorTicket = errorTicket;
  },
};

const actions = {
  /*current Ticket

  */

  async storeCurrentTicket({ commit, dispatch }, payload) {
    commit(CURRENT_TICKET, payload);
    dispatch("getTicketDetail", { ticket_id: payload });
  },

  /*current Ticket

  */

  async storeCurrentTicketChatTranscript({ commit }, payload) {
    commit(CURRENT_TICKET_CHAT_TRANSCRIPT, payload);
  },

  /* 
    CREATE TICKET ESCALATION LEVEL
  */
  async createEscalationLevel({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_ESCALALTION_LEVEL_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}escalationLevels`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket form", config);

    axios(config)
      .then(function (response) {
        console.log("activate ticket form", response.data);
        commit(CREATE_TICKET_ESCALATION_LEVEL_SUCCESS, response.data);
        dispatch("getEscalationLevel", {
          escalation_point_id: JSON.parse(
            localStorage.getItem("escalation_point_current")
          ).id,
        });
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
          commit(CREATE_TICKET_ESCALATION_LEVEL_FAIL, error.response.data);
        }
      });
  },

  /* 
    ESCALATE TICKET
  */
  async escalateTicket({ commit }, payload) {
    commit(ESCALATE_TICKET_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/escalate_ticket`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket form", config);

    axios(config)
      .then(function (response) {
        console.log("activate ticket form", response.data);
        commit(ESCALATE_TICKET_SUCCESS, response.data);
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
          commit(ESCALATE_TICKET_FAIL, error.response.data);
        }
      });
  },

  /* 
    RESOLVE TICKET
  */
  async resolveTicket({ commit }, payload) {
    commit(RESOLVE_TICKET_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/resolve`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket form", config);

    axios(config)
      .then(function (response) {
        console.log("activate ticket form", response.data);
        commit(RESOLVE_TICKET_SUCCESS, response.data);
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
          commit(RESOLVE_TICKET_FAIL, error.response.data);
        }
      });
  },

  /* 
    GET TICKET ESCALATION LEVELS
  */
  async getEscalationLevel({ commit }, payload) {
    commit(GET_TICKET_ESCALATION_LEVEL_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}EscalationPointLevels`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("getting current escalation levels", config);

    axios(config)
      .then(function (response) {
        console.log("getting current escalation levels", response.data);
        commit(GET_TICKET_ESCALATION_LEVEL_SUCCESS, response.data);
        state.ticketEscalationLevels = response.data;
        console.log(
          "i have completed the process",
          state.ticketEscalationLevels
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
          commit(GET_TICKET_ESCALATION_LEVEL_FAIL, error.response.data);
        }
      });
  },

  /* 
    ACTIVATE TICKET FORM
  */
  async activateActiveTicketForm({ commit, dispatch }, payload) {
    commit(ACTIVATE_TICKET_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/activate_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket form", config);

    axios(config)
      .then(function (response) {
        console.log("activate ticket form", response.data);
        commit(ACTIVATE_TICKET_FORM_SUCCESS, response.data);
        dispatch("getActiveTicketForm");
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
          commit(ACTIVATE_TICKET_FORM_FAIL, error.response.data);
          dispatch("getActiveTicketForm");
        }
      });
  },
  /* 
    DEACTIVATE TICKET FORM
  */
  async deactivateTicketForm({ commit, dispatch }, payload) {
    commit(DEACTIVATE_TICKET_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/deactivate_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket form", config);

    axios(config)
      .then(function (response) {
        console.log("activate ticket form", response.data);
        commit(DEACTIVATE_TICKET_FORM_SUCCESS, response.data);
        dispatch("getActiveTicketForm");
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
          commit(DEACTIVATE_TICKET_FORM_FAIL, error.response.data);
          dispatch("getActiveTicketForm");
        }
      });
  },

  /* 
      GET ACTIVE TICKET FORM
    */
  async getTicketDetail({ commit }, payload) {
    commit(GET_TICKET_DETAIL_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/get_ticket_details`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket details", config);

    axios(config)
      .then(function (response) {
        console.log("get active ticket DATA", response.data);
        commit(GET_TICKET_DETAIL_SUCCESS, response.data);
        console.log("get active ticket DATA STATE", state.ticketDetail);
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
          commit(GET_TICKET_DETAIL_FAIL, error.response.data);
        }
      });
  },

  /* 
      GET ACTIVE TICKET FORM
    */
  async getActiveTicketForm({ commit }, payload) {
    commit(GET_ACTIVE_TICKET_FORM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/active_ticket_form`,
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
        var data_response = response.data;
        if ("ticket_form" in data_response) {
          console.log("get active ticket form", response.data.ticket_form.id);
          commit(GET_ACTIVE_TICKET_FORM_SUCCESS, response.data.ticket_form.id);
        } else {
          commit(GET_ACTIVE_TICKET_FORM_SUCCESS, "");
        }
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
          commit(GET_ACTIVE_TICKET_FORM_FAIL, error.response.data);
        }
      });
  },
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
  async getSingleTicketPriority({ commit }, payload) {
    commit(GET_SINGLE_TICKET_PRIORITY_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ticketPriorities/${payload.ticket_priority_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single ticket priority config", config);

    axios(config)
      .then(function (response) {
        console.log("get single ticket priority response", response.data);
        commit(GET_SINGLE_TICKET_PRIORITY_SUCCESS, response.data);
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
          commit(GET_SINGLE_TICKET_PRIORITY_FAIL, error.response.data);
        }
      });
  },
  /* 
      UPDATE TICKET PRIORITY
    */
  async updateTicketPriority({ commit, dispatch }, payload) {
    commit(UPDATE_TICKET_PRIORITY_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}ticketPriorities/${payload.ticket_priority_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update ticket priority config", config);

    axios(config)
      .then(function (response) {
        console.log("update ticket priority response", response.data);
        commit(UPDATE_TICKET_PRIORITY_SUCCESS, response.data);
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
          commit(UPDATE_TICKET_PRIORITY_FAIL, error.response.data);
          dispatch("getTicketPriority");
        }
      });
  },

  /* 
    CREATE TICKET REMINDER
  */
  async createTicketReminder({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_REMINDER_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}ticketReminderTypes`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket reminder config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket reminder response", response.data);
        commit(CREATE_TICKET_REMINDER_SUCCESS, response.data);
        dispatch("getTicketReminder");
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
          commit(CREATE_TICKET_REMINDER_FAIL, error.response.data);
          dispatch("getTicketReminder");
        }
      });
  },
  /* 
        GET TICKET REMINDER
      */
  async getTicketReminder({ commit }, payload) {
    commit(GET_TICKET_REMINDER_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ticketReminderTypes`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket reminder config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket reminder response", response.data);
        commit(GET_TICKET_REMINDER_SUCCESS, response.data);
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
          commit(GET_TICKET_REMINDER_FAIL, error.response.data);
        }
      });
  },
  /* 
        GET SINGLE TICKET REMINDER
      */
  async getSingleTicketReminder({ commit }, payload) {
    commit(GET_SINGLE_TICKET_REMINDER_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}ticketReminderTypes/${payload.ticket_Reminder_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single ticket reminder config", config);

    axios(config)
      .then(function (response) {
        console.log("get single ticket reminder response", response.data);
        commit(GET_SINGLE_TICKET_REMINDER_SUCCESS, response.data);
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
          commit(GET_SINGLE_TICKET_REMINDER_FAIL, error.response.data);
        }
      });
  },
  /* 
        UPDATE TICKET REMINDER
      */
  async updateTicketReminder({ commit, dispatch }, payload) {
    commit(UPDATE_TICKET_REMINDER_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}ticketReminderTypes/${payload.ticket_reminder_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update ticket reminder config", config);

    axios(config)
      .then(function (response) {
        console.log("update ticket reminder response", response.data);
        commit(UPDATE_TICKET_REMINDER_SUCCESS, response.data);
        dispatch("getTicketReminder");
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
          commit(UPDATE_TICKET_REMINDER_FAIL, error.response.data);
          dispatch("getTicketReminder");
        }
      });
  },

  /* 
    CREATE TICKET FORM
  */
  async createTicketForm({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/create_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket form config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket form response", response.data);
        commit(CREATE_TICKET_FORM_SUCCESS, response.data);
        dispatch("getTicketForm");
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
          commit(CREATE_TICKET_FORM_FAIL, error.response.data);
          dispatch("getTicketForm");
        }
      });
  },
  /* 
    CREATE TICKET
  */
  async clearTicketData() {
    state.activateTicketForm = "";
    state.ticketFormJson = {};
    state.currentCallDetails = [];
    state.currentCallerDetails = [];
    state.currentConversationDetails = [];
  },
  async createTicket({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/create_ticket`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket response", response.data);
        commit(CREATE_TICKET_SUCCESS, response.data);
        dispatch("getCompanyTickets");
        state.activateTicketForm = "";
        state.ticketFormJson = {};
        state.currentCallDetails = [];
        state.currentCallerDetails = [];
        state.currentConversationDetails = [];
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
          commit(CREATE_TICKET_FAIL, error.response.data);
          dispatch("getCompanyTickets");
        }
      });
  },
  /* 
          GET TICKET FORM
        */
  async getTicketForm({ commit }, payload) {
    commit(GET_TICKET_FORM_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/get_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket form config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket form response", response.data);
        commit(GET_TICKET_FORM_SUCCESS, response.data);
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
          commit(GET_TICKET_FORM_FAIL, error.response.data);
        }
      });
  },
  /* 
          GET TICKET FORM JSON
        */
  async getTicketFormJson({ commit }, payload) {
    commit(GET_TICKET_FORM_JSON_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/get_ticket_form_json?ticket_form_id=${payload.ticket_form_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket form json config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket form json response", response.data);
        commit(GET_TICKET_FORM_JSON_SUCCESS, response.data);
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
          commit(GET_TICKET_FORM_JSON_FAIL, error.response.data);
        }
      });
  },
  /* 
          GET FORM ITEMS
        */
  async getFormItems({ commit }, payload) {
    commit(GET_FORM_ITEMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/get_form_items?ticket_form_id=${payload.ticket_form_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get form items config", config);

    axios(config)
      .then(function (response) {
        console.log("get form items response", response.data);
        commit(GET_FORM_ITEMS_SUCCESS, response.data);
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
          commit(GET_FORM_ITEMS_FAIL, error.response.data);
        }
      });
  },
  /* 
          UPDATE TICKET FORM
        */
  async updateTicketForm({ commit, dispatch }, payload) {
    commit(UPDATE_TICKET_FORM_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/update_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update ticket form config", config);

    axios(config)
      .then(function (response) {
        console.log("update ticket form response", response.data);
        commit(UPDATE_TICKET_FORM_SUCCESS, response.data);
        dispatch("getTicketForm");
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
          commit(UPDATE_TICKET_FORM_FAIL, error.response.data);
          dispatch("getTicketForm");
        }
      });
  },
  /* 
          ADD TICKET FORM ITEMS
        */
  async addTicketFormItems({ commit }, payload) {
    commit(ADD_TICKET_FORM_ITEMS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/add_items_to_ticket_form`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get single ticket FORM config", config);

    axios(config)
      .then(function (response) {
        console.log("get single ticket FORM response", response.data);
        commit(ADD_TICKET_FORM_ITEMS_SUCCESS, response.data);
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
          commit(ADD_TICKET_FORM_ITEMS_FAIL, error.response.data);
        }
      });
  },

  /* 
    CREATE TICKET ESCALATION MATRIX
  */
  async createTicketEscalationMatrix({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/addEscallationMatrix`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket escalation matrix response", response.data);
        commit(CREATE_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
        dispatch("getTicketEscalationMatrix");
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
          commit(CREATE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationMatrix");
        }
      });
  },

  /* CREATE TICKET ESCALATION POINT
   */

  async createTicketEscalationPoint({ commit, dispatch }, payload) {
    commit(CREATE_TICKET_ESCALATION_POINT_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}escalationPoints`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("create ticket escalation point config", config);

    axios(config)
      .then(function (response) {
        console.log("create ticket escalation point response", response.data);
        commit(CREATE_TICKET_ESCALATION_POINT_SUCCESS, response.data);
        dispatch("getTicketEscalationPoint");
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
          commit(CREATE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationPoint");
        }
      });
  },

  /*    GET TICKET ESCALATION MATRIX
   */
  async getTicketEscalationMatrix({ commit }, payload) {
    commit(GET_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/escallationMatrices`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket escalation matrix response", response.data);
        commit(GET_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
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
          commit(GET_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
        }
      });
  },

  /*    GET TICKET ESCALATION POINT
   */
  async getTicketEscalationPoint({ commit }, payload) {
    commit(GET_TICKET_ESCALATION_POINT_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}escalationPoints`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log("get ticket escalation matrix response", response.data);
        commit(GET_TICKET_ESCALATION_POINT_SUCCESS, response.data);
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
          commit(GET_TICKET_ESCALATION_POINT_FAIL, error.response.data);
        }
      });
  },
  /* 
            UPDATE TICKET ESCALATION MATRIX
          */
  async updateTicketEscalationMatrix({ commit, dispatch }, payload) {
    commit(UPDATE_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "put",
      url: `${baseUrl}escalationPoints/${payload.escalation_matrix_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("update ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log("update ticket escalation matrix response", response.data);
        commit(UPDATE_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
        dispatch("getTicketEscalationPoint");
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
          commit(UPDATE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationPoint");
        }
      });
  },
  /* 
            DELETE TICKET ESCALATION MATRIX
          */
  async deleteTicketEscalationMatrix({ commit, dispatch }, payload) {
    commit(DELETE_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "delete",
      url: `${baseUrl}escalationPoints/${payload.escalation_matrix_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("delete ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log("delete ticket escalation matrix response", response.data);
        commit(DELETE_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
        dispatch("getTicketEscalationPoint");
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
          commit(DELETE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationPoint");
        }
      });
  },
  /* 
            GET USER CREATED TICKETS
          */
  async getUserCreatedTickets({ commit }, payload) {
    commit(GET_USER_CREATED_TICKETS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/createdTickets`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get user created tickets config", config);

    axios(config)
      .then(function (response) {
        console.log("get user created tickets response", response.data);
        commit(GET_USER_CREATED_TICKETS_SUCCESS, response.data.tickets);
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
          commit(GET_USER_CREATED_TICKETS_FAIL, error.response.data);
        }
      });
  },
  /* 
            GET ASSIGNED TICKETS
          */
  async getAssignedTickets({ commit }, payload) {
    commit(GET_ASSIGNED_TICKETS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/assignedTickets`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get assigned tickets config", config);

    axios(config)
      .then(function (response) {
        console.log("get assigned tickets response", response.data);
        commit(GET_ASSIGNED_TICKETS_SUCCESS, response.data.tickets);
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
          commit(GET_ASSIGNED_TICKETS_FAIL, error.response.data);
        }
      });
  },
  /* 
            GET COMPANY TICKETS
          */
  async getCompanyTickets({ commit }, payload) {
    commit(GET_COMPANY_TICKETS_REQUEST);

    var config = {
      method: "get",
      url: `${baseUrl}tickets/companyTickets`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("get company tickets config", config);

    axios(config)
      .then(function (response) {
        console.log("get company tickets response", response.data);
        commit(GET_COMPANY_TICKETS_SUCCESS, response.data);
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
          commit(GET_COMPANY_TICKETS_FAIL, error.response.data);
        }
      });
  },
  /* 
            ACTIVATE TICKET ESCALATION MATRIX
          */
  async activateTicketEscalationMatrix({ commit, dispatch }, payload) {
    commit(ACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/activateEscallationMatrix/${payload.escalation_matrix_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("activate ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "activate ticket escalation matrix response",
          response.data
        );
        commit(ACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
        dispatch("getTicketEscalationMatrix");
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
          commit(ACTIVATE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationMatrix");
        }
      });
  },
  /* 
            DEACTIVATE TICKET ESCALATION MATRIX
          */
  async deactivateTicketEscalationMatrix({ commit, dispatch }, payload) {
    commit(DEACTIVATE_TICKET_ESCALATION_MATRIX_REQUEST);

    var config = {
      method: "post",
      url: `${baseUrl}tickets/deactivateEscallationMatrix/${payload.escalation_matrix_id}`,
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: payload,
    };
    console.log("deactivate ticket escalation matrix config", config);

    axios(config)
      .then(function (response) {
        console.log(
          "deactivate ticket escalation matrix response",
          response.data
        );
        commit(DEACTIVATE_TICKET_ESCALATION_MATRIX_SUCCESS, response.data);
        dispatch("getTicketEscalationMatrix");
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
          commit(DEACTIVATE_TICKET_ESCALATION_MATRIX_FAIL, error.response.data);
          dispatch("getTicketEscalationMatrix");
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
