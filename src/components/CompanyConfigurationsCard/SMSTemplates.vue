<template>
  <div class="grid grid-cols-3 gap-3">
    <div v-for="text in textTemplates" :key="text">
      <div class="bg-slate-100 shadow-sm rounded-sm p-3 text-xs m-3">
        <div class="flex justify-between">
          <div>
            <h3 class="p-2">
              <span class="font-semibold"> {{ text.name }} </span>
            </h3>
          </div>
          <div class="p-1 cursor-pointer flex gap-3">
            <span
              @click="handleEditSMSTemplate(text)"
              class="material-icons text-xs p-1 bg-slate-200"
              >edit</span
            >
            <span
              class="material-icons text-sm p-1 text-red-500 bg-red-100 cursor-pointer"
              @click="deleteSmsTemplate({ id: text.id })"
              >delete</span
            >
          </div>
        </div>
        <div>
          <h3 class="p-2">
            {{ text.sms_text }}
            <span> {{ text.name }} </span>
          </h3>
        </div>
      </div>
      <SMSTemplateModal
        :show="showTemplateModal"
        :state="'Edit'"
        :currentTemplateData="currentTemplateData"
      />
    </div>
  </div>
</template>

<script>
import SMSTemplateModal from "../modals/ContactCenterModals/SMSTemplateModal.vue";
import { ref } from "vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentTemplateData: {},
    };
  },
  components: { SMSTemplateModal },
  props: {
    textTemplates: { type: Array },
  },
  methods: {
    ...mapActions(["deleteSmsTemplate"]),
    handleEditSMSTemplate(currentTemplate) {
      this.showTemplateModal = !this.showTemplateModal;
      this.currentTemplateData = currentTemplate;
    },
  },
  setup() {
    const showTemplateModal = ref(false);

    return {
      showTemplateModal,
    };
  },
};
</script>

<style></style>
