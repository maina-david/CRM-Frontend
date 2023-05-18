<template>
  <div>
    <div class="text-xs m-3">
      <div class="bg-slate-100 shadow-sm rounded-sm my-5 p-3">
        <div v-if="editMode" class="">
          <div class="flex justify-between border-b">
            <div class="">
              <h3 class="py-1">
                <span class="font-semibold"> Ticket Reminder Type </span>
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
                label="Reminder Name"
                placeholder="Enter the name of your reminder"
              />
              <TextBox
                v-model="description"
                type="text"
                label="Reminder Description"
                placeholder="Enter your description"
              />
              <div class="justify-around">
                <ActionButton
                  @click="handleUpdateTicketReminder"
                  class="my-5"
                  text="Update Ticket Reminder"
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
                  <span class="font-semibold"> {{ reminder.name }} </span>
                </h3>
              </div>
              <div @click="editMode = !editMode">
                <span class="material-icons text-sm text-gray-700">edit</span>
              </div>
            </div>
            <h3 class="p-2">
              Name:
              <span> {{ reminder.name }} </span>
            </h3>
            <h3 class="p-2">
              State:
              <span>
                {{ reminder.active == "1" ? "ACTIVE" : "DEACTIVATED" }}
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
    reminder: { type: Object, required: true },
  },
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      active: "",
      editMode: false,
    };
  },
  created() {
    this.id = this.reminder.id;
    this.name = this.reminder.name;
    this.active = this.reminder.active;
  },
  methods: {
    ...mapActions(["updateTicketReminder"]),
    handleUpdateTicketReminder() {
      this.updateTicketReminder({
        ticket_reminder_id: this.id,
        name: this.name,
        active: this.active,
        description: this.description,
      });
      this.editMode = false;
    },
  },
};
</script>

<style></style>
