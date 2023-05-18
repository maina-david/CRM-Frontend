<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Create Sales Process Step</h2>
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
        <TextBox
          type="text"
          placeholder="Enter Service Level Agreement"
          label="Enter Service Level Agreement(SLA) in Hours"
          v-model="sla"
        />
        <Dropdown
          label="Select a Sales Form"
          :options="selectSalesProcessForm"
          select="Select"
          v-model="form_id"
        />
        <ActionButton text="Submit Sales Process Step" class="mt-5" />
      </div>
    </slot>
  </div>
</template>

<script>
import TextBox from "@/components/TextBox2.vue";
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: "CreateSalesProcessCard",
  data() {
    return {
      text: "Submit",
      name: "",
      description: "",
      form_id: "",
      sla: "",
      selectSalesProcessForm: [
        { label: "Sales Form 1", value: "Form 1" },
        { label: "Sales Form 2", value: "Form 2" },
        { label: "Sales Form 3", value: "Form 3" },
      ],
    };
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { TextBox, ActionButton, Dropdown },
};
</script>

<style></style>
