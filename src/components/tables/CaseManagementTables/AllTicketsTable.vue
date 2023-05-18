<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="py-2 px-3"
            v-for="head in tableHead"
            :key="head"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
          v-for="data in tableData"
          :key="data"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.ticket_number }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.created_by }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ formatdate(data.created_on) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.updated_at) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.priority }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.status == 'PENDING'"
              class="rounded-sm m-2 px-2 py-1 bg-orange-100 text-orange-600 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              PENDING
            </span>
            <span
              v-if="data.status == 'RESOLVED'"
              class="rounded-sm m-2 px-2 py-1 text-green-600 bg-green-100 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >RESOLVED
            </span>
            <span
              v-if="data.status == 'ESCALATED'"
              class="rounded-sm m-2 px-2 py-1 bg-red-100 text-red-600 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              ESCALATED
            </span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div v-if="data.channel == 'WhatsApp'">
              <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
            </div>
            <div v-if="data.channel == 'instagram'">
              <img class="w-6 h-6 rounded-full order-1" :src="InstagramIcon" />
            </div>
            <div v-if="data.channel == 'facebook'">
              <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
            </div>
            <div v-if="data.channel == 'twitter'">
              <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
            </div>
            <div v-if="data.channel == 'Voice'">Voice</div>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.assigned_to }}
          </td>
          <td>
            <div>
              <router-link :to="{ name: 'TicketDetails' }">
                <button
                  @click="storeCurrentTicket(data.id)"
                  class="font-medium text-xs text-center m-2 px-2 py-1 rounded-sm text-gray-500 hover:bg-lime-500 hover:text-white"
                >
                  View <span class="material-icons text-xs">visibility</span>
                </button>
              </router-link>
            </div>
            <div v-if="handleGuardCreateTicketUser() == true">
              <button
                @click="showCreateTicketModal = !showCreateTicketModal"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                @click="showAssignTicketModal = !showAssignTicketModal"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Assign Ticket to User
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500"
        >Showing
        <span class="font-semibold text-gray-900"
          >1- {{ tableData.length }}</span
        >
        of
        <span class="font-semibold text-gray-900">{{
          tableData.length
        }}</span></span
      >
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >...</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >100</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <ViewTicket :show="showViewTicketModal" />
  <CreateTicketModal :show="showCreateTicketModal" />
  <AssignTicketToUser :show="showAssignTicketModal" />
</template>

<script>
import { ref } from "vue";
import ViewTicket from "@/components/modals/CRMModals/ViewTicket.vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import AssignTicketToUser from "@/components/modals/CaseManagementModals/AssignTicketToUser.vue";
import moment from "moment";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import { mapActions } from "vuex";
import accessRights from "@/componentGuard.js";

export default {
  methods: {
    ...mapActions(["storeCurrentTicket"]),
    formatdate(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
    handleGuardTicketUser() {
      return accessRights.ticketUser();
    },
    handleGuardCreateTicketUser() {
      return accessRights.createTicketUser();
    },
  },
  name: "BreaksTable",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  components: { ViewTicket, CreateTicketModal, AssignTicketToUser },
  setup() {
    const showViewTicketModal = ref(false);
    const showCreateTicketModal = ref(false);
    const showAssignTicketModal = ref(false);

    return {
      showViewTicketModal,
      showCreateTicketModal,
      showAssignTicketModal,
    };
  },
};
</script>

<style></style>
