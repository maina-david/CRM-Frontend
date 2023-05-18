<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Upload Contacts</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <Dropdown
          select="Select Account Type"
          label="Select Account Type"
          :options="selectAccountTypes"
          v-model="accountType"
        />
        <Dropdown
          select="Select Account"
          label="Select Account"
          :options="selectAccount"
          v-model="account"
        />
        <div class="mt-3">
          <label
            for="dropDown"
            class="form-label text-xs inline-block mb-2 text-gray-700"
            >Select Filters</label
          >
          <CheckBoxList :options="selectFilters" v-model:value="filter" />
        </div>
        <ActionButton text="Retrieve Contacts" class="mt-5" />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import CheckBoxList from "@/components/CheckBoxList.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.getAccountTypes();
  },
  name: "UploadContactsCard",
  data() {
    return {
      accountType: "",
      account: "",
      filter: "",
      selectAccountTypesData: [
        { label: "Account Type 1", value: "Account Type 1" },
        { label: "Account Type 2", value: "Account Type 2" },
        { label: "Account Type 3", value: "Account Type 3" },
      ],
      selectAccount: [
        { label: "Account 1", value: "Account 1" },
        { label: "Account 2", value: "Account 2" },
        { label: "Account 3", value: "Account 3" },
      ],
      selectFilters: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Teachers", value: "Account 3" },
      ],
    };
  },

  computed: {
    ...mapGetters(["selectAccountTypes"]),
  },
  methods: {
    ...mapActions(["getAccountTypes"]),
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { ActionButton, Dropdown, CheckBoxList },
};
</script>

<style></style>
