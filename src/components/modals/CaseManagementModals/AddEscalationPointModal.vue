<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          :set="(is_showing_modal = true)"
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            v-if="show_form_data === 'load'"
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div>
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  Current Escalation Matrix
                </h2>
                <div
                  v-for="(value, key) in current_escalation_matrix"
                  :key="key"
                >
                  {{ key }}: {{ value }}
                </div>
              </div>
            </div>
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">Add Escalation Matrix</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal_vlue"
                    >close</span
                  >
                </button>
              </div>
            </div>

            <div v-for="item in form_array_data" :key="item">
              <div v-if="item.data.data.data_type === 'dropdown'">
                <Dropdown
                  :options="item.data.data.options"
                  :label="item.data.data.label"
                  select="Select option"
                  v-model="form_entry_data[item.id]"
                  :modelValue="platform"
                />
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
              <ActionButton
                @click="handleSubmitEscalationMatrix"
                class="mt-5"
                text="Add Escalation Point"
              />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
//import treeview from "vue3-treeview";
//import "vue3-treeview/dist/style.css";
import ActionButton from "@/components/ActionButton.vue";

import Dropdown from "@/components/Dropdown2.vue";

import { mapActions, mapGetters } from "vuex";
const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentGroup: {
    type: Object,
    default: {},
  },
  currentAccountType: {
    type: Object,
    default: {},
  },
};
export default {
  computed: {
    ...mapGetters(["activateTicketForm", "ticketFormJson"]),
  },
  watch: {
    is_showing_modal() {
      if (this.is_showing_modal == true) {
        this.current_escalation_matrix = "";
        this.current_escalation_matrix = JSON.parse(
          localStorage.getItem("escalation_point_current")
        ).formatted_escalation;
        console.log("showing modal changing", this.is_showing_modal);
        this.getActiveTicketForm();
        console.log("this is the ticket form json", this.activateTicketForm);
        this.is_showing_modal = false;
        console.log(
          "gettinng current escalation point ",
          JSON.parse(localStorage.getItem("current_escalation_point"))
        );
        var escalation_matrix_current = JSON.parse(
          JSON.parse(localStorage.getItem("escalation_point_current"))
            .escalation_matrix
        );
        console.log(
          "this is the current escalation matrix object",
          escalation_matrix_current
        );
        this.form_entry_data = JSON.parse(
          localStorage.getItem("escalation_point_current")
        );
        console.log(
          "this is the form entry data",
          this.form_entry_data.ui_form
        );
      }
    },
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

        this.get_draw_flow_data();
        this.show_form_data = "load";
      }
    },
  },
  name: "AddEscalationPointModal",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      form_array_data: [],
      show_form_data: "",
      is_showing_modal: false,
      selected_node: "",
      next_node: "",
      continue_looping: "",
      form_entry_data: {},

      dummy_data: {
        drawflow: {
          Home: {
            data: {},
          },
        },
      },

      nodes: {
        id3: {
          text: "Sales",
          children: ["id4", "id5", "id6"],
        },
        id4: {
          text: "Hardware",
        },
        id5: {
          text: "Software",
        },
        id6: {
          text: "Network",
        },
        id7: {
          text: "Support",
          children: ["id8", "id9"],
        },
        id8: {
          text: "Hardware",
        },
        id9: {
          text: "Software",
        },
      },

      config: {
        roots: ["id3", "id7"],
        checkboxes: true,
        dragAndDrop: false,
        editable: true,
        checkMode: 0,
      },
      groups: [],
      current_escalation_matrix: "",
      current_escalation_point: "",
    };
  },

  methods: {
    ...mapActions([
      "getTicketFormJson",
      "getActiveTicketForm",
      "createTicketEscalationMatrix",
    ]),
    handleSubmitEscalationMatrix() {
      this.current_escalation_point = JSON.parse(
        localStorage.getItem("current_escalation_point")
      );

      console.log(this.current_escalation_point);
      var final_data = {};
      final_data.escalation_point_id = this.current_escalation_point;
      final_data.escalation_matrix = this.form_entry_data;
      final_data.ticket_form_id = this.activateTicketForm;
      console.log("i am logging final data to send to api", final_data);
      this.createTicketEscalationMatrix(final_data);
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
    log(s) {
      // console.log(s);
      var selected = [];
      for (var key in s) {
        var obj = s[key];
        // console.log(obj);
        if (!obj.children) {
          for (var prop in obj) {
            if (prop == "state") {
              if (obj[prop].checked) {
                selected.push(obj.text);
                console.log(prop + " = " + obj[prop].checked);
              }
            }
          }
        }
      }
      this.editedAccessRights = selected;
    },
    nodechecking(e) {
      console.log(e);
    },
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = true;
    }

    function closeModal_vlue() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
      closeModal_vlue,
    };
  },
};
</script>

<style></style>
