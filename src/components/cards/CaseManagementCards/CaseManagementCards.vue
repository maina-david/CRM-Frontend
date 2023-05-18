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
          <button
            @click="get_Form_data(form)"
            class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            {{ "Manage Form Items" }}
          </button>
        </div>
      </div>
      <div class="">
        <button
          @click="showEditEscalationFormModal = !showEditEscalationFormModal"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateEscalationForm :show="showEditEscalationFormModal" />
</template>

<script>
import { ref } from "vue";
import CreateEscalationForm from "@/components/modals/CaseManagementModals/CreateEscalationForm.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getCENTRALFormItems"]),
    get_Form_data(form) {
      localStorage.removeItem("Form Info");
      console.log("selected form", form);
      this.getCENTRALFormItems({ form_id: form.id });
      localStorage.setItem("current_escalation_form", JSON.stringify(form));
    },
  },
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      state: "",
      currentAccountForm: "",
    };
  },
  components: { CreateEscalationForm },
  setup() {
    const showEditEscalationFormModal = ref(false);

    return {
      showEditEscalationFormModal,
    };
  },
};
</script>

<style></style>
