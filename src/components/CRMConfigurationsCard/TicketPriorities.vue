<template>
  <div>
    <div class="text-xs m-3">
      <div class="bg-slate-100 shadow-sm rounded-sm my-5 p-3">
        <div v-if="editMode" class="">
          <div class="flex justify-between border-b">
            <div class="">
              <h3 class="py-1">
                <span class="font-semibold"> Ticket Priorities </span>
              </h3>
            </div>
            <div @click="editMode = !editMode">
              <span class="material-icons text-sm text-gray-700 ml-3"
                >close</span
              >
            </div>
          </div>
          <div>
            <div class="">
              <TextBox
                v-model="name"
                type="text"
                label="Priority Name"
                placeholder="Enter the name of your priority"
              />
              <TextBox
                v-model="description"
                type="text"
                label="Priority Description"
                placeholder="Enter your description"
              />
              <TextBox
                v-model="sla"
                type="text"
                label="Service Level Agreement(SLA) in Hours"
                placeholder="Enter SLA in hours"
              />
              <div class="justify-around">
                <ActionButton
                  @click="handleUpdateTicketPriorityConofiguration"
                  class="my-5"
                  text="Update Ticket Priority Configuration"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <div class="flex justify-between border-b">
              <div class="">
                <h3 class="p-2">
                  <span class="font-semibold"> {{ priority.name }} </span>
                </h3>
              </div>
              <div @click="editMode = !editMode">
                <span class="material-icons text-sm text-gray-700">edit</span>
              </div>
            </div>
            <h3 class="p-2">
              Name:
              <span> {{ priority.name }} </span>
            </h3>
            <h3 class="p-2">
              Description:
              <span> {{ priority.description }} </span>
            </h3>
            <h3 class="p-2">
              SLA:
              <span> {{ priority.sla }} </span>
            </h3>
            <h3 class="p-2">
              State:
              <span>
                {{ priority.active == "1" ? "ACTIVE" : "DEACTIVATED" }}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  props: {
    priority: { type: Object, required: true },
  },
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      sla: "",
      editMode: false,
    };
  },
  created() {
    this.id = this.priority.id;
    this.name = this.priority.name;
    this.description = this.priority.description;
    this.sla = this.priority.sla;
  },
  methods: {
    ...mapActions(["updateTicketPriority"]),
    handleUpdateTicketPriorityConofiguration() {
      this.updateTicketPriority({
        ticket_priority_id: this.id,
        name: this.name,
        description: this.description,
        sla: this.sla,
      });
      this.editMode = false;
    },
  },
};
</script>

<style></style>
