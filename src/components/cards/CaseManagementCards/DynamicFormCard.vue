<template>
  <div v-if="show_form_data === 'load'">
    <div v-for="item in form_array_data" :key="item">
      <div v-if="item.data.data.data_type === 'text'">
        <TextBox
          type="text"
          :placeholder="item.data.data.placeholder"
          :label="item.data.data.label"
          v-model="form_entry_data[item.id]"
        />
      </div>
      <div v-if="item.data.data.data_type === 'number'">
        <TextBox
          type="number"
          :placeholder="item.data.data.placeholder"
          :label="item.data.data.label"
          v-model="form_entry_data[item.id]"
        />
      </div>
      <div v-if="item.data.data.data_type === 'textarea'">
        <TextArea
          type="text"
          :placeholder="item.data.data.placeholder"
          :label="item.data.data.label"
          v-model="form_entry_data[item.id]"
        />
      </div>
      <div v-if="item.data.data.data_type === 'upload'">
        <FileInput
          type="text"
          :placeholder="item.data.data.placeholder"
          :label="item.data.data.label"
          v-model="form_entry_data[item.id]"
        />
      </div>
      <div v-if="item.data.data.data_type === 'dropdown'">
        <Dropdown
          :options="item.data.data.options"
          :label="item.data.data.label"
          select="Select option"
          v-model="form_entry_data[item.id]"
          :modelValue="platform"
        />
      </div>
      <div class="my-3" v-if="item.data.data.data_type === 'checkbox'">
        <div
          class="flex items-center mb-4"
          v-for="option in item.data.data.options"
          :key="option"
        >
          <input
            id="checkbox"
            type="checkbox"
            value="option.id"
            v-model="form_entry_data[item.id]"
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{ option }}</label
          >
        </div>
      </div>
      <div v-if="item.data.data.data_type === 'radio'">
        <label
          class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {{ item.data.data.label }}
        </label>
        <div
          class="flex items-center mb-4"
          v-for="option in item.data.data.options"
          :key="option"
        >
          <input
            @change="get_next_items(item.id, form_entry_data[item.id])"
            id="radio"
            type="radio"
            v-model="form_entry_data[item.id]"
            :value="option"
            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="radio"
            class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {{ option }}
          </label>
        </div>
      </div>
    </div>
    <slot>
      <div class="flex justify-evenly gap-4">
        <ActionButton
          @click="handleTicketCreation('PENDING')"
          text="Mark as Open"
          class="mt-5"
        />
        <ActionButton
          @click="handleTicketCreation('RESOLVED')"
          text="Resolve Ticket"
          class="mt-5 bg-blue-500"
        />
        <ActionButton
          @click="handleTicketCreation('ESCALATED')"
          text="Escalate Ticket"
          class="bg-red-500 mt-5"
        />
      </div>
    </slot>
  </div>
  <div v-else><LoaderSpinner /></div>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import { mapActions, mapGetters } from "vuex";
import Dropdown from "@/components/Dropdown2.vue";
import TextArea from "@/components/TextArea.vue";
import FileInput from "@/components/FileInput.vue";
import ActionButton from "@/components/ActionButton.vue";
import LoaderSpinner from "@/components/loaders/LoaderSpinner.vue";

export default {
  name: "DynamicFormCard",
  components: {
    ActionButton,
    TextBox,
    TextArea,
    FileInput,
    Dropdown,
    LoaderSpinner,
  },

  data() {
    return {
      form_array_data: [],
      ticket_status_creation: "",
      show_form_data: "",
      selected_node: "",
      next_node: "",
      continue_looping: "",
      form_entry_data: [],
      formItems: {
        drawflow: {
          Home: {
            data: {},
          },
        },
      },

      dummy_data: {
        drawflow: {
          Home: {
            data: {},
          },
        },
      },
    };
  },

  created() {
    this.getActiveTicketForm();

    console.log("this is the ticket form json", this.activateTicketForm);
    this.getTicketFormJson({ ticket_form_id: this.activateTicketForm });
  },
  unounted() {
    this.clearTicketData();
  },
  methods: {
    ...mapActions([
      "getTicketFormJson",
      "getActiveTicketForm",
      "createTicket",
      "clearTicketData",
    ]),

    handleTicketCreation(data) {
      this.ticket_status_creation = data;
      var current_call_log = "";
      console.log("current ticket status", this.ticket_status_creation);
      if (JSON.parse(localStorage.getItem("current_ticket_channel")) == 7) {
        console.log(
          "I AM CREATING A TICKET VIA THE VOICE CHANNEL ",
          this.currentCallDetails
        );

        this.currentCallDetails.call_log.forEach((element) => {
          if (element.call_status === "RINGAGENT") {
            current_call_log = element.call_id;
          }
        });
        console.log("THIS IS THE CURRENT CALL LOG ", current_call_log);
        this.createTicket({
          interaction_reference: current_call_log,
          account_id: this.currentCallerDetails.account,
          contact: this.currentCallerDetails.phone,
          contact_id: this.currentCallerDetails.contact,
          ticket_form_id: this.activateTicketForm,
          channel_id: JSON.parse(
            localStorage.getItem("current_ticket_channel")
          ),
          status: this.ticket_status_creation,
          ticket_entry: this.form_entry_data,
        });
      } else {
        console.log("I AM CREATING A TICKET VIA THE OTHER CHANNELS ");
        this.createTicket({
          interaction_reference:
            this.currentConversationDetails.conversation_id,
          account_id: this.currentConversationDetails.account_id,
          contact: this.currentConversationDetails.channel_identifier,
          contact_id: this.currentConversationDetails.contact_id,
          ticket_form_id: this.activateTicketForm,
          channel_id: JSON.parse(
            localStorage.getItem("current_ticket_channel")
          ),
          status: this.ticket_status_creation,
          ticket_entry: this.form_entry_data,
        });
      }
    },
    get_draw_flow_data() {
      var items_data = this.dummy_data.drawflow.Home.data;
      for (const key in items_data) {
        if (items_data[key].name === "Start") {
          console.log(
            "start",
            (this.next_node =
              items_data[key].outputs.output_1["connections"][0].node)
          );
        }
      }
      this.continue_looping = true;
      while (this.continue_looping == true) {
        // console.log(items_data[this.next_node]);
        this.form_array_data.push(items_data[this.next_node]);

        if (
          items_data[this.next_node].name === "Radio" ||
          items_data[this.next_node].name === "Stop" ||
          items_data[this.next_node].name === "Dropdown"
        ) {
          this.continue_looping = false;
        } else {
          this.next_node =
            items_data[this.next_node].outputs.output_1["connections"][0].node;
        }
      }

      console.log(this.form_array_data);
    },

    get_form_item_store() {
      console.log("i am getting here");
      this.getTicketFormJson({ ticket_form_id: this.activateTicketForm });
      console.log("this is the ticket form json", this.ticketFormJson);
      return false;
    },
    get_next_items(current_node, selection) {
      var new_form_array_data = [];
      var new_form_entry_data = {};
      for (const object in this.form_array_data) {
        if (this.form_array_data[object].id == current_node) {
          new_form_array_data.push(this.form_array_data[object]);
          console.log("i am appendeing new form data");
          this.form_array_data = [];
          this.form_array_data = new_form_array_data;
          console.log("this is the new form data", this.form_array_data);
          var current_node_id = this.form_array_data[object].id;
          new_form_entry_data[current_node_id] =
            this.form_entry_data[current_node_id];
          console.log("i am appending form entry data here");
          this.form_entry_data = {};
          this.form_entry_data = new_form_entry_data;
          console.log(this.form_entry_data);
          console.log("are you getting here");
          var drawflow_data = this.dummy_data.drawflow.Home.data;
          var items_data =
            drawflow_data[current_node].outputs.output_1["connections"];
          console.log(items_data);
          console.log(selection);
          for (const key in items_data) {
            if (drawflow_data[items_data[key].node].name === "Stop") {
              console.log("empty node");
            } else {
              if (
                drawflow_data[items_data[key].node].data.data.selectednode ===
                selection
              ) {
                this.next_node = items_data[key].node;
                console.log("this is the next node", this.next_node);
              }
            }
          }

          this.continue_looping = true;
          while (this.continue_looping == true) {
            // console.log(items_data[this.next_node]);
            this.form_array_data.push(drawflow_data[this.next_node]);

            if (
              drawflow_data[this.next_node].name === "Radio" ||
              drawflow_data[this.next_node].name === "Stop" ||
              drawflow_data[this.next_node].name === "Dropdown"
            ) {
              this.continue_looping = false;
            } else {
              this.next_node =
                drawflow_data[this.next_node].outputs.output_1[
                  "connections"
                ][0].node;
            }
          }
          console.log(this.form_array_data);
          console.log(items_data);

          break;
        } else {
          new_form_array_data.push(this.form_array_data[object]);
          console.log("i am adding a new object", new_form_array_data);

          current_node_id = this.form_array_data[object].id;
          new_form_entry_data[current_node_id] =
            this.form_entry_data[current_node_id];
        }
      }
    },
  },

  computed: {
    ...mapGetters([
      "activateTicketForm",
      "ticketFormJson",
      "currentCallDetails",
      "currentCallerDetails",
      "currentConversationDetails",
    ]),
  },
  watch: {
    activateTicketForm() {
      console.log("changed ticket form", this.activateTicketForm);
      if (this.activateTicketForm === "") {
        console.log("I am empty");
      } else {
        console.log("i am getting here");
        this.getTicketFormJson({ ticket_form_id: this.activateTicketForm });
        console.log("this is the ticket form json", this.ticketFormJson);
      }
    },
    ticketFormJson() {
      console.log("changed ticket form", this.ticketFormJson);
      if (this.ticketFormJson === {}) {
        console.log("I am empty");
      } else {
        this.dummy_data.drawflow.Home.data = JSON.parse(
          this.ticketFormJson.json_ui
        ).Home.data;
        console.log("logging dummy data", this.dummy_data);
        this.formItems.drawflow.Home.data = JSON.parse(
          this.ticketFormJson.json_ui
        ).Home.data;
        this.get_draw_flow_data();
        this.show_form_data = "load";
      }
    },
  },
};
</script>

<style></style>
