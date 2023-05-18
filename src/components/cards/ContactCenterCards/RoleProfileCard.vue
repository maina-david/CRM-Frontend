<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Create Role Profile</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <TextBox
          type="text"
          placeholder="Enter  Name"
          label="Name"
          v-model="name"
        />
        <TextBox
          type="text"
          placeholder="Enter  Description"
          label="Description"
          v-model="description"
        />
        <ActionButton
          @click="handleCreateRoleProfile"
          text="Submit Role Profile"
          class="mt-5"
        />
      </div>
    </slot>
  </div>
  <AccessRightsTreeModal :show="showModal" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TextBox from "@/components/TextBox2.vue";
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import AccessRightsTreeModal from "../../modals/ContactCenterModals/AccessRightsTreeModal.vue";

export default {
  name: "RoleProfileCard",
  data() {
    return {
      text: "Submit",
      name: "",
      description: "",
    };
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { TextBox, ActionButton, AccessRightsTreeModal },
  computed: {
    ...mapGetters(["loadingRoleProfile", "errorRoleProfile"]),
  },
  methods: {
    ...mapActions(["createRoleProfile"]),
    handleCreateRoleProfile() {
      this.createRoleProfile({
        name: this.name,
        description: this.description,
      });
      this.name = "";
      this.description = "";
    },
  },
};
</script>

<style></style>
