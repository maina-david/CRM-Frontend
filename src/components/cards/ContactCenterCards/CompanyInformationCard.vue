<template>
  <div
    class="bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
    v-if="handleGuard(company)"
  >
    <div class="flex flex-col p-2">
      <div class="grid">
        <div class="bg-slate-100 rounded-sm p-2 my-3">
          <div class="flex justify-between items-center pt-2">
            <div>
              <img class="w-24 h-24" :src="companyLogo" alt="Profile" />
            </div>
            <div>
              <span
                class="material-icons text-sm hover:text-blue-400"
                @click="showCompanyInfoModal = !showCompanyInfoModal"
                >edit</span
              >
            </div>
          </div>
          <h5 class="m-1 p-2 text-sm font-medium text-gray-600 dark:text-white">
            Company Name: {{ companyName }}
          </h5>
          <span class="p-2 text-sm text-gray-600 dark:text-gray-600 m-1"
            >Preferred Language: {{ preferedLanguage }}</span
          >
        </div>
      </div>
      <div class="bg-slate-100 rounded-sm p-2 my-3">
        <span class="text-sm p-2 text-gray-600 dark:text-gray-600 m-2"
          ><div class="flex justify-between">
            <div>Address:</div>
            <div>
              <span
                class="material-icons text-sm hover:text-blue-400"
                @click="
                  showCompanyAddressInfoModal = !showCompanyAddressInfoModal
                "
                >edit</span
              >
            </div>
          </div>
          <span class="m-3">
            <ul class="list-none">
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                Country Code: {{ companyAddress.country_code }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                Phone Number: {{ companyAddress.phone }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                Email Address: {{ companyAddress.email }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                City: {{ companyAddress.city }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                Office Number: {{ companyAddress.office_number }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-3">
                Additional Information:
                {{ companyAddress.additional_information }}
              </li>
            </ul>
          </span>
        </span>
      </div>
      <div class="bg-slate-100 rounded-sm p-2 my-3">
        <span
          class="text-sm p-2 font-medium text-gray-600 dark:text-gray-600 m-2"
        >
          <div class="flex justify-between">
            <div>Contact Information:</div>
          </div>

          <span
            class="m-3"
            v-for="contact in companyContacts"
            :key="contact.id"
          >
            <ul class="list-none border-t p-2">
              <div class="flex justify-between mb-4">
                <div>
                  <li class="text-xs text-gray-600 dark:text-gray-600 m-2">
                    Contact type: {{ contact.company_contact_type_id }}
                  </li>
                </div>
                <span
                  class="material-icons text-sm hover:text-blue-400"
                  @click="handleCompanyContactInfo('Edit', contact)"
                  >edit</span
                >
              </div>

              <li class="text-xs text-gray-600 dark:text-gray-600 m-2">
                Name: {{ contact.name }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-2">
                Email address: {{ contact.email }}
              </li>
              <li class="text-xs text-gray-600 dark:text-gray-600 m-2">
                Phone: {{ contact.phone_number }}
              </li>
            </ul>
          </span>
          <ActionButton
            text="Add Contact Information"
            @click="handleCompanyContactInfo('Add', {})"
          />
        </span>
      </div>
    </div>
    <EditCompanyInfoModal
      :show="showCompanyInfoModal"
      :existingCompanyInfo="{ companyName, preferedLanguage, companyLogo }"
    />
    <EditCompanyAddressInfoModal
      :show="showCompanyAddressInfoModal"
      :existingCompanyAddressInfo="companyAddress"
    />
    <EditCompanyContactInfo
      :show="showCompanyContactInfoModal"
      :currentState="currentState"
      :existingCompanyContactInfo="existingCompanyContactInfo"
    />
  </div>
  <div
    v-else
    class="bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    Nothing for your eyees
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import EditCompanyInfoModal from "../../modals/ContactCenterModals/EditCompanyInfoModal.vue";
import EditCompanyContactInfo from "../../modals/ContactCenterModals/EditCompanyContactInfo.vue";
import EditCompanyAddressInfoModal from "../../modals/ContactCenterModals/EditCompanyAddressInfoModal.vue";
import ActionButton from "../../ActionButton.vue";
/*import Channel from "@/componentGuard.js";
import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";*/
import Guard from "@/componentGuard.js";
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";

export default {
  name: "UserCard",
  props: [],
  setup() {
    const showCompanyInfoModal = ref(false);
    const showCompanyAddressInfoModal = ref(false);

    const showCompanyContactInfoModal = ref(false);

    return {
      showCompanyInfoModal,
      showCompanyAddressInfoModal,
      showCompanyContactInfoModal,
    };
  },
  components: {
    EditCompanyInfoModal,
    EditCompanyContactInfo,
    EditCompanyAddressInfoModal,
    ActionButton,
  },
  data() {
    return {
      currentState: "",
      existingCompanyContactInfo: {},
      company: "Company Management",
      myState: false,
    };
  },
  created() {
    this.getCompanyInfo();
  },
  computed: {
    ...mapGetters([
      "loadingCompany",
      "errorCompany",
      "companyName",
      "preferedLanguage",
      "companyLogo",
      "companyAddress",
      "companyContacts",
    ]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["getCompanyInfo"]),
    handleCompanyContactInfo(state, contact) {
      this.currentState = state;
      this.existingCompanyContactInfo = contact;
      this.showCompanyContactInfoModal = !this.showCompanyContactInfoModal;
    },
  },
};
</script>

<style></style>
