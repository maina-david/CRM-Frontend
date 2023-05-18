<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Survey Forms</h2>
        </div>
        <div>
          <div class="p-3">
            <ActionButton
              @click="showCreateModal = !showCreateModal"
              text="Create Survey Form"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="mt-10 grid grid-cols-4 gap-4">
          <div v-for="form in surveyForms" :key="form.id">
            <FormCard :form="form" />
          </div>
        </div>
      </div>
    </div>
    <CreateSurveyForm :show="showCreateModal" :state="state" />
  </main>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateSurveyForm from "@/components/modals/CRMModals/CreateSurveyForm.vue";
import FormCard from "@/components/cards/CRMCards/SurveyFormCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  watch: {
    centralFormsSurvey() {
      this.surveyForms = this.centralFormsSurvey;
    },
  },
  created() {
    this.getCENTRALForms();
  },
  computed: {
    ...mapGetters(["centralFormsSurvey"]),
  },
  methods: {
    ...mapActions(["getCENTRALForms", "createCENTRALForm"]),
  },
  components: { ActionButton, CreateSurveyForm, FormCard },
  data() {
    return {
      state: "",
      currentQualityAssuranceForm: {},
      surveyForms: [],
    };
  },
  setup() {
    const showCreateModal = ref(false);

    return {
      showCreateModal,
    };
  },
};
</script>

<style></style>
