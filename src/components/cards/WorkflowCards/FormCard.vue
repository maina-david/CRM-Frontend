<template>
  <div
    class="p-3 max-w-sm bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <h5 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        {{ form.name }}
      </h5>
    </a>
    <p class="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
      {{ form.description }}
    </p>
    <div class="flex justify-between">
      <div>
        <div>
          <router-link :to="{ name: 'WorkflowFormBuilder' }">
            <button
              class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              {{
                form.form_items.length > 0
                  ? "Manage Form Items"
                  : "Create Form Items"
              }}
            </button>
          </router-link>
        </div>
      </div>
      <div class="">
        <button
          @click="showFormModal = !showFormModal"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateWorkflowForm :show="showFormModal" />
</template>

<script>
import { ref } from "vue";
import CreateWorkflowForm from "@/components/modals/WorkflowManagementModals/CreateWorkflowForm.vue";

export default {
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      state: "",
      currentAccountForm: "",
    };
  },
  components: { CreateWorkflowForm },
  setup() {
    const showFormModal = ref(false);

    return {
      showFormModal,
    };
  },
};
</script>

<style></style>
