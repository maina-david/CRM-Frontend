import { createRouter, createWebHistory } from "vue-router";

const LogIn = () =>
  import(/* webpackChunkName: "auth" */ "@/views/Auth/LogIn.vue");
const SignUp = () =>
  import(/* webpackChunkName: "auth" */ "@/views/Auth/SignUp.vue");
const AcceptInvitation = () =>
  import(
    /* webpackChunkName: "auth" */ "@/views/Auth/AcceptInvitationPage.vue"
  );
const ResetPassword = () =>
  import(/* webpackChunkName: "auth" */ "@/views/Auth/ResetPassword.vue");
const ForgotPassword = () =>
  import(/* webpackChunkName: "auth" */ "@/views/Auth/ForgotPassword.vue");
const OTP = () => import(/* webpackChunkName: "auth" */ "@/views/Auth/OTP.vue");
const AgentDashboard = () =>
  import("@/views/Pages/ContactCenterPages/AgentDashboard.vue");
const AdminDashboard = () =>
  import("@/views/Pages/ContactCenterPages/AdminDashboard.vue");
const HomePage = () => import("@/views/Pages/HomePage.vue");
const CallInternalAgents = () => import("@/views/Pages/CallInternalAgents.vue");

//Contact Center
const AllComponents = () => import("@/views/Pages/AllComponents.vue");
const Settings = () => import("@/views/Pages/ContactCenterPages/Settings.vue");
const NotFound = () => import("@/views/NotFound.vue");
const Home = () => import("@/views/Home/ContactCenterHome.vue");
const CRMHome = () => import("@/views/Home/CRMHome.vue");

const CompanySetup = () => import("@/views/Auth/CompanySetup.vue");
const ContactInformation = () => import("@/views/Auth/ContactInformation");
const UserManagement = () =>
  import("@/views/Pages/ContactCenterPages/UserManagement");
const CompanyManagement = () =>
  import("@/views/Pages/ContactCenterPages/CompanyManagement");
const ChannelManagement = () =>
  import("@/views/Pages/ContactCenterPages/ChannelManagement");
const IVRManagement = () =>
  import("@/views/Pages/ContactCenterPages/IVRManagement");
const CreateIVR = () =>
  import("@/views/Pages/ContactCenterPages/CreateIVRpage");
const QueueManagement = () =>
  import("@/views/Pages/ContactCenterPages/QueueManagement");
const MOHFiles = () => import("@/views/Pages/ContactCenterPages/MOHFiles");
const MusicFiles = () =>
  import("@/views/Pages/ContactCenterPages/MusicFilesPage");
const CompanyMusicFiles = () =>
  import("@/views/Pages/ContactCenterPages/CompanyMusicFiles");
const UserProfile = () => import("@/views/Pages/ProfilePage");
const Reports = () => import("@/views/Pages/ContactCenterPages/ReportPage");
const AccessDenied = () => import("@/views/AccessDeniedPage.vue");

//CRM Pages

const AccountTypes = () => import("@/views/Pages/CRMPages/AccountTypes");
const Account = () => import("@/views/Pages/CRMPages/Account.vue");
const Groups = () => import("@/views/Pages/CRMPages/Groups.vue");
const Forms = () => import("@/views/Pages/CRMPages/Forms.vue");
const AccountFormBuilder = () =>
  import("@/views/Pages/CRMPages/AccountFormBuilder.vue");
const ContactFormBuilder = () =>
  import("@/views/Pages/CRMPages/ContactFormBuilder.vue");
const Contacts = () => import("@/views/Pages/CRMPages/Contacts.vue");
const LeadManagementFormBuilder = () =>
  import("@/views/Pages/CRMPages/LeadManagementFormBuilder.vue");
const LeadManagement = () =>
  import("@/views/Pages/CRMPages/LeadManagement.vue");
const LeadManagementCards = () =>
  import("@/views/Pages/CRMPages/LeadManagementCards.vue");
const SalesTeamPage = () => import("@/views/Pages/CRMPages/SalesTeamPage.vue");
const SurveyForms = () => import("@/views/Pages/CRMPages/SurveyForms.vue");
const SurveyFormBuilder = () =>
  import("@/views/Pages/CRMPages/SurveyFormBuilder.vue");

const SalesProcessManagement = () =>
  import("@/views/Pages/CRMPages/SalesProcessManagement.vue");
const SalesProcessConfiguration = () =>
  import("@/views/Pages/CRMPages/SalesProcessConfiguration.vue");
const CRMSettings = () => import("@/views/Pages/CRMPages/Settings.vue");
const CRMReports = () => import("@/views/Pages/CRMPages/CRMReports.vue");

//Case Management
const CaseManagementHome = () => import("@/views/Home/CaseManagementHome.vue");
const CaseManagementDashboard = () =>
  import("@/views/Pages/CaseManagementPages/CaseManagementDashboard.vue");
const MyTickets = () =>
  import("@/views/Pages/CaseManagementPages/MyTickets.vue");
const MyTicketSetup = () =>
  import("@/views/Pages/CaseManagementPages/MyTicketSetup.vue");
const TicketSetup = () =>
  import("@/views/Pages/CaseManagementPages/TicketSetup.vue");
const TicketManagement = () =>
  import("@/views/Pages/CaseManagementPages/TicketManagement.vue");
const TicketFormBuilder = () =>
  import("@/views/Pages/CaseManagementPages/TicketFormBuilder.vue");
const TicketDetails = () =>
  import("@/views/Pages/CaseManagementPages/TicketDetails.vue");
const EscalationMatrix = () =>
  import("@/views/Pages/CaseManagementPages/EscalationMatrix.vue");
const EscalationLevels = () =>
  import("@/views/Pages/CaseManagementPages/EscalationLevels.vue");
const EscalationForms = () =>
  import("@/views/Pages/CaseManagementPages/CaseManagementForms.vue");
const EscalationFormBuilder = () =>
  import("@/views/Pages/CaseManagementPages/EscalationFormBuilder.vue");
const HelpDesk = () => import("@/views/Pages/CaseManagementPages/HelpDesk.vue");
const CaseManagementReports = () =>
  import("@/views/Pages/CaseManagementPages/CaseManagementReports.vue");
const CaseManagementSettings = () =>
  import("@/views/Pages/CaseManagementPages/Settings.vue");

// Chat Pages
const ChatHome = () => import("@/views/Home/ChatHome.vue");
const ChatAdminDashboard = () =>
  import("@/views/Pages/ChatPages/ChatAdminDashboard.vue");
const ChatManagement = () =>
  import("@/views/Pages/ChatPages/ChatManagement.vue");
const Chat = () => import("@/views/Pages/ChatPages/ChatPage.vue");
const ClosedChatsPage = () =>
  import("@/views/Pages/ChatPages/ClosedChatsPage.vue");
const CreateChat = () => import("@/views/Pages/ChatPages/CreateChatPage.vue");
const ChatQueues = () => import("@/views/Pages/ChatPages/ChatQueues.vue");
const ChannelBox = () => import("@/views/Pages/ChatPages/ChannelBox.vue");
const AttachmentFiles = () =>
  import("@/views/Pages/ChatPages/AttachmentFiles.vue");
const ChatReports = () => import("@/views/Pages/ChatPages/ChatReports.vue");

const ChatSettings = () => import("@/views/Pages/ChatPages/Settings.vue");

//Campaign Pages
const CampaignHome = () => import("@/views/Home/CampaignHome.vue");
const CampaignManagement = () =>
  import("@/views/Pages/CampaignPages/CampaignManagement.vue");
const ViewCampaign = () =>
  import("@/views/Pages/CampaignPages/ViewCampaign.vue");

//Workflow Pages
const WorkflowHome = () => import("@/views/Home/WorkflowHome.vue");
const WorkflowManagement = () =>
  import("@/views/Pages/WorkflowManagementPages/WorkflowManagement.vue");
const Teams = () => import("@/views/Pages/WorkflowManagementPages/Teams.vue");
const WorkFlowForms = () =>
  import("@/views/Pages/WorkflowManagementPages/WorkFlowForms.vue");
const MyWorkFlows = () =>
  import("@/views/Pages/WorkflowManagementPages/MyWorkFlows.vue");
const WorkflowFormBuilder = () =>
  import("@/views/Pages/WorkflowManagementPages/WorkflowFormBuilder.vue");
const WorkFlowDrawFlow = () =>
  import("@/views/Pages/WorkflowManagementPages/WorkFlowDrawFlow.vue");

//Quality Assurance Management
const QualityAssuranceHome = () =>
  import("@/views/Home/QualityAssuranceHome.vue");
const MyReviews = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/MyReviews.vue");
const ReviewsPage = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/ReviewsPage.vue");
const CompletedReviewsPage = () =>
  import(
    "@/views/Pages/QualityAssuranceManagementPages/CompletedReviewsPage.vue"
  );
const CompletedReviews = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/CompletedReviews.vue");
const QualityAssuranceManagement = () =>
  import(
    "@/views/Pages/QualityAssuranceManagementPages/QualityAssuranceManagement.vue"
  );
const QualityAssuranceTeams = () =>
  import(
    "@/views/Pages/QualityAssuranceManagementPages/QualityAssuranceTeams.vue"
  );
const QualityAssuranceForms = () =>
  import(
    "@/views/Pages/QualityAssuranceManagementPages/QualityAssuranceForms.vue"
  );
const QualityAssuranceFormBuilder = () =>
  import(
    "@/views/Pages/QualityAssuranceManagementPages/QualityAssuranceFormBuilder.vue"
  );
const TeamDetails = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/TeamDetails.vue");
const QAReportsPage = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/QAReportsPage.vue");
const TeamReportDetails = () =>
  import("@/views/Pages/QualityAssuranceManagementPages/TeamReportDetails.vue");

const routes = [
  //Quality Assurance Routes
  {
    path: "/QualityAssurance",
    name: "QualityAssuranceHome",
    component: QualityAssuranceHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/myReviews",
        name: "MyReviews",
        component: MyReviews,
      },
      {
        path: "/completedReviews",
        name: "CompletedReviews",
        component: CompletedReviews,
      },
      {
        path: "/quality_assurance_forms",
        name: "QualityAssuranceForms",
        component: QualityAssuranceForms,
      },
      {
        path: "/team_details",
        name: "TeamDetails",
        component: TeamDetails,
      },
      {
        path: "/quality_assurance_management",
        name: "QualityAssuranceManagement",
        component: QualityAssuranceManagement,
      },
      {
        path: "/quality_assurance_form_builder",
        name: "QualityAssuranceFormBuilder",
        component: QualityAssuranceFormBuilder,
      },
      {
        path: "/quality_assurance_teams",
        name: "QualityAssuranceTeams",
        component: QualityAssuranceTeams,
      },
      {
        path: "/review_page",
        name: "ReviewsPage",
        component: ReviewsPage,
      },
      {
        path: "/completed_review_page",
        name: "CompletedReviewsPage",
        component: CompletedReviewsPage,
      },
      {
        path: "/reports",
        name: "QAReportsPage",
        component: QAReportsPage,
      },
      {
        path: "/reviewerReportDetails",
        name: "TeamReportDetails",
        component: TeamReportDetails,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },

  //Workflow Routes
  {
    path: "/Workflow",
    name: "WorkflowHome",
    component: WorkflowHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/workflow_management",
        name: "WorkflowManagement",
        component: WorkflowManagement,
      },
      {
        path: "/my_workflows",
        name: "MyWorkFlows",
        component: MyWorkFlows,
      },
      {
        path: "/teams",
        name: "Teams",
        component: Teams,
      },
      {
        path: "/workflow_forms",
        name: "WorkFlowForms",
        component: WorkFlowForms,
      },
      {
        path: "/workflow_formbuilder",
        name: "WorkflowFormBuilder",
        component: WorkflowFormBuilder,
      },
      {
        path: "/workflow_drawFlow",
        name: "WorkFlowDrawFlow",
        component: WorkFlowDrawFlow,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },
  //Campaign Routes
  {
    path: "/Campaigns",
    name: "CampaignHome",
    component: CampaignHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },
  //Chat Routes
  {
    path: "/Chat",
    name: "ChatHome",
    component: ChatHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/dashboard",
        name: "ChatAdminDashboard",
        component: ChatAdminDashboard,
      },
      {
        path: "/create_chat",
        name: "CreateChat",
        component: CreateChat,
      },
      {
        path: "/chat",
        name: "Chat",
        component: Chat,
      },
      {
        path: "/closedChats",
        name: "ClosedChatsPage",
        component: ClosedChatsPage,
      },
      {
        path: "/chat_queues",
        name: "ChatQueues",
        component: ChatQueues,
      },
      {
        path: "/chat_management",
        name: "ChatManagement",
        component: ChatManagement,
      },
      {
        path: "/channel_box",
        name: "ChannelBox",
        component: ChannelBox,
      },
      {
        path: "/attachment_files",
        name: "AttachmentFiles",
        component: AttachmentFiles,
      },
      {
        path: "/reports",
        name: "ChatReports",
        component: ChatReports,
      },
      {
        path: "/chat_settings",
        name: "ChatSettings",
        component: ChatSettings,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },
  //Case Management Routes
  {
    path: "/Ticket",
    name: "CaseManagementHome",
    component: CaseManagementHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/dashboard",
        name: "CaseManagementDashboard",
        component: CaseManagementDashboard,
      },
      {
        path: "/myTicketSetup",
        name: "MyTicketSetup",
        component: MyTicketSetup,
      },
      {
        path: "/ticketSetup",
        name: "TicketSetup",
        component: TicketSetup,
      },
      {
        path: "/ticketManagement",
        name: "TicketManagement",
        component: TicketManagement,
      },
      {
        path: "/ticketFormBuilder",
        name: "TicketFormBuilder",
        component: TicketFormBuilder,
      },
      {
        path: "/ticketDetails",
        name: "TicketDetails",
        component: TicketDetails,
      },
      {
        path: "/myTickets",
        name: "MyTickets",
        component: MyTickets,
      },
      {
        path: "/escalationMatrix",
        name: "EscalationMatrix",
        component: EscalationMatrix,
      },
      {
        path: "/escalationLevels",
        name: "EscalationLevels",
        component: EscalationLevels,
      },
      {
        path: "/escalationForms",
        name: "EscalationForms",
        component: EscalationForms,
      },
      {
        path: "/escalationFormBuilder",
        name: "EscalationFormBuilder",
        component: EscalationFormBuilder,
      },
      {
        path: "/helpDesk",
        name: "HelpDesk",
        component: HelpDesk,
      },
      {
        path: "/report",
        name: "CaseManagementReports",
        component: CaseManagementReports,
      },
      {
        path: "/caseManagementSettings",
        name: "CaseManagementSettings",
        component: CaseManagementSettings,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },

  //CRM Routes
  {
    path: "/CRM",
    name: "CRMHome",
    component: CRMHome,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "/accountTypes",
        name: "AccountTypes",
        component: AccountTypes,
      },
      {
        path: "/groups",
        name: "Groups",
        component: Groups,
      },
      {
        path: "/account",
        name: "Account",
        component: Account,
      },
      {
        path: "/forms",
        name: "Forms",
        component: Forms,
      },
      {
        path: "/accountFormBuilder",
        name: "AccountFormBuilder",
        component: AccountFormBuilder,
      },
      {
        path: "/contactFormBuilder",
        name: "ContactFormBuilder",
        component: ContactFormBuilder,
      },
      {
        path: "/contacts",
        name: "Contacts",
        component: Contacts,
      },
      {
        path: "/campaignManagement",
        name: "CampaignManagement",
        component: CampaignManagement,
      },
      {
        path: "/viewCampaign",
        name: "ViewCampaign",
        component: ViewCampaign,
      },
      {
        path: "/surveyForms",
        name: "SurveyForms",
        component: SurveyForms,
      },
      {
        path: "/surveyFormBuilder",
        name: "SurveyFormBuilder",
        component: SurveyFormBuilder,
      },
      {
        path: "/salesTeam",
        name: "SalesTeam",
        component: SalesTeamPage,
      },
      {
        path: "/leadFormItems",
        name: "LeadManagementFormBuilder",
        component: LeadManagementFormBuilder,
      },
      {
        path: "/leadManagement",
        name: "LeadManagement",
        component: LeadManagement,
      },
      {
        path: "/leadManagementCards",
        name: "LeadManagementCards",
        component: LeadManagementCards,
      },
      {
        path: "/salesProcessManagement",
        name: "SalesProcessManagement",
        component: SalesProcessManagement,
      },
      {
        path: "/salesProcessConfiguration",
        name: "SalesProcessConfiguration",
        component: SalesProcessConfiguration,
      },
      {
        path: "/crmReports",
        name: "CRMReports",
        component: CRMReports,
      },
      {
        path: "/crmSettings",
        name: "CRMSettings",
        component: CRMSettings,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },

  //Contact Center Routes
  {
    path: "/CC",
    name: "CCHome",
    component: Home,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!localStorage.getItem("company_setup_info")) {
        if (token) {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next("/company_setup");
          } else {
            next();
          }
        } else {
          next("/login");
        }
      } else {
        next("/company_setup");
      }
    },
    children: [
      {
        path: "agentDashboard",
        name: "AgentDashboard",
        component: AgentDashboard,
      },
      {
        path: "adminDashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "callInternalAgents",
        name: "CallInternalAgents",
        component: CallInternalAgents,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
      {
        path: "userManagement",
        name: "UserManagement",
        component: UserManagement,
      },
      {
        path: "/companyManagement",
        name: "CompanyManagement",
        component: CompanyManagement,
      },
      {
        path: "/channelManagement",
        name: "ChannelManagement",
        component: ChannelManagement,
      },
      {
        path: "/ivrManagement",
        name: "IVRManagement",
        component: IVRManagement,
      },
      {
        path: "allComponents",
        name: "AllComponents",
        component: AllComponents,
      },
      {
        path: "create_IVR",
        name: "CreateIVR",
        component: CreateIVR,
      },
      {
        path: "queueManagement",
        name: "QueueManagement",
        component: QueueManagement,
      },
      {
        path: "viewMOH",
        name: "MOHFiles",
        component: MOHFiles,
      },
      {
        path: "viewMusicFiles",
        name: "MusicFiles",
        component: MusicFiles,
      },
      {
        path: "userProfile",
        name: "UserProfile",
        component: UserProfile,
      },
      {
        path: "reports",
        name: "Reports",
        component: Reports,
      },
      {
        path: "companyMusicFiles",
        name: "CompanyMusicFiles",
        component: CompanyMusicFiles,
      },
      {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
    ],
  },
  {
    path: "/access_denied",
    name: "AccessDenied",
    component: AccessDenied,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/company_setup",
    name: "CompanySetup",
    component: CompanySetup,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        if (!localStorage.getItem("access_rights")) {
          next();
        } else {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next();
          } else {
            next("/");
          }
        }
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/home_page",
    name: "HomePage",
    component: HomePage,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Home Page");
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/contact_information",
    name: "ContactInformation",
    component: ContactInformation,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        if (!localStorage.getItem("access_rights")) {
          next();
        } else {
          const access_rights = localStorage.getItem("access_rights");
          if (
            access_rights == "null" ||
            access_rights == "undefined" ||
            access_rights.length <= 0
          ) {
            next();
          } else {
            next("/");
          }
        }
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/acceptInvite",
    name: "AcceptInvitation",
    component: AcceptInvitation,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/reset_password",
    name: "ResetPassword",
    component: ResetPassword,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/forgot_password",
    name: "ForgotPassword",
    component: ForgotPassword,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/otp",
    name: "OTP",
    component: OTP,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (token) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
