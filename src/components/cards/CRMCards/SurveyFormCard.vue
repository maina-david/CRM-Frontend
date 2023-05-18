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
            class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            @click="storeCurrentSurveyForm(form)"
          >
            {{
              // form.form_items?.length > 0
              //   ? "Manage Form Items"
              //   : "Create Form Items"
              "Manage Form Items"
            }}
          </button>
        </div>
      </div>
      <div class="">
        <button
          @click="handleEditSurveyForm('Edit', form)"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateSurveyForm :show="showFormModal" :state="state" />
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import CreateSurveyForm from "@/components/modals/CRMModals/CreateSurveyForm.vue";

export default {
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      state: "",
      currentQualityAssuranceForm: "",
    };
  },
  components: { CreateSurveyForm },
  setup() {
    const showFormModal = ref(false);

    return {
      showFormModal,
    };
  },
  methods: {
    ...mapActions(["storeCurrentSurveyForm"]),
    handleEditSurveyForm(state, form) {
      localStorage.setItem("current_survey_form", JSON.stringify(form));
      this.state = state;
      this.showFormModal = !this.showFormModal;
    },
  },
};
</script>

<style></style>
