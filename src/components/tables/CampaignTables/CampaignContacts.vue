<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="flex justify-between">
      <div class="pt-2">
        <h1 class="font-semibold">Campaign Contacts</h1>
      </div>
      <div v-if="isRunning == false" class="flex gap-5">
        <div>
          <ActionButton
            v-if="currentCampaign.campaign_type_id == 'AGENTLED'"
            @click="showSurveyFormsModal = !showSurveyFormsModal"
            text="Attach Survey Form"
          />
        </div>
        <div>
          <ActionButton
            @click="showCampaignStartModal = !showCampaignStartModal"
            text="Schedule Campaign"
          />
        </div>
      </div>
      <div v-else><ActionButton text="Stop Campaign" class="bg-red-500" /></div>
    </div>
    <hr
      class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
    />
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
            {{ data.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.phone_number }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.status == 'CONTACTED'"
              class="bg-green-100 text-green-700 px-2 py-1"
              >{{ data.status }}</span
            >
            <span v-else class="bg-red-100 text-red-700 px-2 py-1">{{
              data.status
            }}</span>
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
  <CreatecampaignTimeModal :show="showCampaignStartModal" />
  <CreateCampaignModal :show="showCreateCampaignModal" />
  <AttachGroupsToCampaign :show="showAttachGroupsModal" />
  <AttachSurveyForm
    :show="showSurveyFormsModal"
    :currentCampaignData="currentCampaign"
  />
</template>

<script>
import { ref } from "vue";

import CreateCampaignModal from "@/components/modals/CampaignModals/CreateCampaignModal.vue";
import AttachGroupsToCampaign from "@/components/modals/CampaignModals/AttachGroupsToCampaign.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreatecampaignTimeModal from "@/components/modals/CampaignModals/CreatecampaignTimeModal.vue";
import AttachSurveyForm from "@/components/modals/CampaignModals/AttachSurveyForm.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CampaignContacts",
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
      isRunning: false,
      currentCampaign: {},
    };
  },
  created() {
    this.currentCampaign = JSON.parse(localStorage.getItem("current_campaign"));
  },
  methods: {},
  setup() {
    const showCreateCampaignModal = ref(false);
    const showAttachGroupsModal = ref(false);
    const showCampaignStartModal = ref(false);
    const showSurveyFormsModal = ref(false);

    return {
      showCreateCampaignModal,
      showAttachGroupsModal,
      showCampaignStartModal,
      showSurveyFormsModal,
    };
  },
  components: {
    CreateCampaignModal,
    AttachGroupsToCampaign,
    ActionButton,
    CreatecampaignTimeModal,
    AttachSurveyForm,
  },
};
</script>

<style></style>
