<template>
  <div class="">
    <div
      class="p-3 max-w-md bg-white rounded-sm shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-between items-center mb-4">
        <h5 class="font-bold leading-none text-gray-900 dark:text-white">
          User Information
        </h5>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-900">
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span class="material-icons text-gray-500">badge</span>
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  Name
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{ name }}
                </p>
              </div>
            </div>
          </li>
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span class="material-icons text-gray-500">mail</span>
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  Email
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{ email }}
                </p>
              </div>
            </div>
          </li>
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span class="material-icons text-gray-500">call</span>
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  Phone Number
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{ phone_number }}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <ActionButton
            class="mt-10"
            text="Edit Profile"
            @click="showModal = !showModal"
          />
        </div>
      </div>
    </div>
    <EditUserProfileInformation
      :show="showModal"
      :currentUser="{
        name: this.name,
        email: this.email,
        phone_number: this.phone_number,
      }"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import ActionButton from "../../ActionButton.vue";
import EditUserProfileInformation from "../../modals/ContactCenterModals/EditUserProfileInformation.vue";

export default {
  name: "UserInformationCard",
  data() {
    return {
      name: "",
      email: "",
      phone_number: "",
    };
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { ActionButton, EditUserProfileInformation },
  created() {
    this.name = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.phone_number = localStorage.getItem("phone_number");
  },
  methods: {
    storageListener() {
      this.name = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.phone_number = localStorage.getItem("phone_number");
    },
  },
  mounted() {
    document.addEventListener("storage", this.storageListener());
  },
  beforeUnmount() {
    document.removeEventListener("storage", this.storageListener());
  },
};
</script>

<style></style>
