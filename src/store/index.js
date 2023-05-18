import { createStore } from "vuex";
import auth from "./modules/auth";
import setup from "./modules/setup";
import company from "./modules/company";
import groups from "./modules/groups";
import accessRights from "./modules/accessRights";
import invites from "./modules/invites";
import users from "./modules/users";
import ivr from "./modules/ivr";
import channels from "./modules/channels";
import queues from "./modules/queues";
import agents from "./modules/agents";
import calls from "./modules/calls";
import reports from "./modules/reports";
import notifications from "./modules/notifications";
import accountForm from "./CRM/accountForm";
import accountType from "./CRM/accountType";
import contactForm from "./CRM/contactForm";
import account from "./CRM/account";
import contact from "./CRM/contact";
import channelBox from "./Chat/channelBox";
import chatQueue from "./Chat/chatQueue";
import metaAccessToken from "./Chat/metaAccessToken";
import chatBot from "./Chat/chatBot";
import conversations from "./Chat/conversations";
import chatReports from "./Chat/reports";
import tickets from "./CaseManagement/Tickets/tickets";
import helpDeskTeam from "./CaseManagement/HelpDeskTeams/helpDeskTeam";
import campaign from "./CRM/campaign";
import centralForms from "./CaseManagement/CentralizedForms/forms";
import qualityAssuranceForm from "./QualityAssurance/qualityAssuranceForm";
import qualityAssuranceReview from "./QualityAssurance/qualityAssuranceReview";
import qualityAssuranceTeam from "./QualityAssurance/qualityAssuranceTeam";
import qualityAssurenceReports from "./QualityAssurance/qualityAssuranceReports";

const store = createStore({
  modules: {
    auth,
    centralForms,
    chatReports,
    setup,
    company,
    groups,
    accessRights,
    invites,
    users,
    ivr,
    channels,
    queues,
    agents,
    calls,
    reports,
    notifications,
    accountForm,
    accountType,
    contactForm,
    account,
    contact,
    channelBox,
    chatQueue,
    metaAccessToken,
    chatBot,
    tickets,
    helpDeskTeam,
    campaign,
    conversations,
    qualityAssuranceForm,
    qualityAssuranceReview,
    qualityAssuranceTeam,
    qualityAssurenceReports,
  },
});

export default store;
