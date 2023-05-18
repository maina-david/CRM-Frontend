<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="pt-2">
      <h1 class="font-semibold">Campaigns</h1>
      <hr
        class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
      />
    </div>
    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <!-- <th scope="col" class="p-4">
            <div class="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th> -->
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
          <!-- <td class="p-4 w-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td> -->
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
            {{ data.description }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.campaign_type.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.groups.length == 0"
              class="bg-red-100 text-xs text-red-700 flex align-center text-center px-2 py-1 m-1"
              >No attached group
            </span>
            <span
              v-else
              class="bg-slate-100 text-xs text-slate-700 flex align-center text-center px-2 py-1 m-1"
              v-for="group in data.groups"
              :key="group"
              >{{ group.name }}
              <span
                @click="handleRemoveGroupFromCampaign(data, group)"
                class="material-icons text-xs text-center mx-1 text-slate-700"
                >close</span
              ></span
            >
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span class="bg-green-100 text-green-700 px-2 py-1">{{
              data.status
            }}</span>
            <!-- <span
              v-if="data.status == 'INACTIVE'"
              class="bg-red-100 text-red-700 px-2 py-1"
              >{{ data.status }}</span
            > -->
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div>
              <!-- <router-link :to="{ name: 'ViewCampaign' }" class="button"> -->
              <button
                @click="handleRouteToViewCampaign(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Manage Campaign
              </button>
              <!-- </router-link> -->
            </div>
            <div>
              <button
                @click="handleEditCampaign('Edit', data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                @click="handleAttachGroup(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Attach Group
              </button>
            </div>
            <div>
              <button
                @click="hancleChangeStatus(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Change Status
              </button>
            </div>
            <!-- <div v-if="data.status == 'ACTIVE'">
              <button
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Deactivate
              </button>
            </div>
            <div v-if="data.status == 'INACTIVE'">
              <button
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Activate
              </button>
            </div> -->
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
  <CreateCampaignModal
    :show="showCreateCampaignModal"
    :state="state"
    :currentCampaign="currentCampaign"
  />
  <AttachGroupsToCampaign
    :show="showAttachGroupsModal"
    :currentCampaign="currentCampaign"
  />
  <ChangeCampaignStatus
    :show="showChangeStatusnModal"
    :currentCampaign="currentCampaign"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import CreateCampaignModal from "@/components/modals/CampaignModals/CreateCampaignModal.vue";
import AttachGroupsToCampaign from "@/components/modals/CampaignModals/AttachGroupsToCampaign.vue";
import ChangeCampaignStatus from "@/components/modals/CampaignModals/ChangeCampaignStatus.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Campaigns",
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
      state: "",
      currentCampaign: {},
    };
  },
  setup() {
    const showCreateCampaignModal = ref(false);
    const showAttachGroupsModal = ref(false);
    const showChangeStatusnModal = ref(false);

    return {
      showCreateCampaignModal,
      showAttachGroupsModal,
      showChangeStatusnModal,
    };
  },
  methods: {
    ...mapActions(["removeGroupFromCampaign"]),
    handleEditCampaign(state, data) {
      this.state = state;
      this.currentCampaign = data;
      this.showCreateCampaignModal = !this.showCreateCampaignModal;
    },
    handleAttachGroup(data) {
      this.currentCampaign = data;
      this.showAttachGroupsModal = !this.showAttachGroupsModal;
    },
    hancleChangeStatus(data) {
      this.currentCampaign = data;
      this.showChangeStatusnModal = !this.showChangeStatusnModal;
    },
    handleRemoveGroupFromCampaign(data, group) {
      if (
        confirm(
          "Confirm REMOVE " + group.name + " group from " + data.name + "?"
        ) == true
      ) {
        console.log(
          "confirm remove group from campaign",
          data.name,
          group.name
        );
        this.removeGroupFromCampaign({
          campaign_id: data.id,
          group_id: group.id,
        });
      } else {
        console.log("cancel remove group from campaign");
      }
    },
    handleRouteToViewCampaign(data) {
      localStorage.setItem("current_campaign", JSON.stringify(data));
      router.push({ name: "ViewCampaign" });
    },
  },
  components: {
    CreateCampaignModal,
    AttachGroupsToCampaign,
    ChangeCampaignStatus,
  },
};
</script>

<style></style>
