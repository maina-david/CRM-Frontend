<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Create escalation Level</h2>
      </div>
    </div>
    <slot>
      <div class="mt-4">
        <div class="my-2">
          <TextBox
            type="text"
            placeholder="Enter Name"
            label="Name"
            v-model="name"
          />
        </div>
        <div class="my-2">
          <TextBox
            type="text"
            placeholder="Enter Description"
            label="Description"
            v-model="description"
          />
        </div>
        <div class="my-2">
          <Dropdown
            select="Select Help Desk"
            :options="helpDeskOptions"
            v-model="helpDesk"
            label="Select Help Desk Options"
          />
        </div>

        <div class="my-2">
          <Dropdown
            select="Select Helpdesk Form"
            :options="helpDeskFormOptions"
            v-model="helpDeskForm"
            label="Select Help Desk Options"
          />
        </div>

        <div class="my-2">
          <Dropdown
            select="Select the SLA measurement"
            :options="slaOptions"
            v-model="slaOption"
            label="Select the Service Level Agreement(SLA) measurement"
          />
        </div>
        <div class="my-2">
          <TextBox
            type="number"
            placeholder="Enter the Service Level Agreement(SLA)"
            label="Enter SLA"
            v-model="sla"
          />
        </div>
        <ActionButton
          v-if="state == 'Edit'"
          text="Update Escalation Level"
          class="mt-5"
        />

        <ActionButton
          @click="handleEscalationSubmit()"
          v-else
          text="Create Escalation Level"
          class="mt-5"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  watch: {
    selectHelpDeskTeam() {
      this.helpDeskOptions = this.selectHelpDeskTeam;
    },
    selectCENTRALFormsHelpdesk() {
      this.helpDeskFormOptions = this.selectCENTRALFormsHelpdesk;
    },
  },
  created() {
    this.getHelpDeskTeam();
    this.getActiveTicketForm();

    this.getCENTRALFormsHelpdesk();
  },
  name: "CreateFile",
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      helpDesk: "",
      helpDeskFormOptions: [],
      helpDeskForm: "",
      slaOption: "",
      sla: "",
      slaOptions: [
        { label: "Weeks", value: "weeks" },
        { label: "Days", value: "days" },
        { label: "Hours", value: "hours" },
        { label: "Minutes", value: "Minutes" },
        { label: "Seconds", value: "Seconds" },
      ],
      helpDeskOptions: [],
      formOptions: [
        { label: "Form 1", value: "Form 1" },
        { label: "Form 2", value: "Form 2" },
        { label: "Form 3", value: "Form 3" },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "selectHelpDeskTeam",
      "activateTicketForm",
      "ticketEscalationLevels",
      "selectCENTRALFormsHelpdesk",
    ]),
  },
  methods: {
    ...mapActions([
      "getHelpDeskTeam",
      "getActiveTicketForm",
      "createEscalationLevel",
      "getCENTRALFormsHelpdesk",
    ]),
    handleEscalationSubmit() {
      this.createEscalationLevel({
        name: this.name,
        helpdesk_id: this.helpDesk,
        form_id: this.helpDeskForm,
        escalation_point_id: JSON.parse(
          localStorage.getItem("escalation_point_current")
        ).id,
        sla: this.sla,
        sla_measurement: this.slaOption,
      });
      this.name = "";
      this.helpdesk_id = "";
      this.form_id = "";
      this.sla = "";
      this.sla_measurement = "";
    },
  },
};
</script>

<style></style>
