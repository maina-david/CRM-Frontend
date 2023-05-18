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
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{ currentState }} Queue
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <TextBox
                  type="text"
                  placeholder="Enter  Name"
                  label="Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Enter  Description"
                  label="Description"
                  v-model="description"
                />
                <TextBox
                  type="number"
                  placeholder="Enter Wrap Up Time"
                  label="Wrap Up Time (Seconds)"
                  v-model="wrap_up_time"
                />
                <TextBox
                  type="number"
                  placeholder="Enter Time Out"
                  label="Enter Time Out (Seconds)"
                  v-model="time_out"
                />
                <CheckBox
                  label="Join Empty"
                  v-model="join_empty"
                  :checked="join_empty"
                />
                <CheckBox
                  label="Leave When Empty"
                  v-model="leave_when_empty"
                  :checked="leave_when_empty"
                />
                <Dropdown
                  select="Select Group"
                  label="Select Group"
                  :options="selectGroups"
                  v-model="group_id"
                />
                <ActionButton
                  @click="handleCreateQueue"
                  :text="currentState"
                  class="mt-5"
                />
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref, watch } from "vue";
import TextBox from "../../TextBox.vue";
import CheckBox from "../../CheckBox.vue";
import ActionButton from "../../ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Queue",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentQueue: {
      type: Object,
    },
    currentState: {
      type: String,
      required: true,
    },
  },
  components: { TextBox, CheckBox, ActionButton, Dropdown },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      group_id: "",
      wrap_up_time: 0,
      time_out: 0,
      join_empty: false,
      leave_when_empty: false,
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
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
    };
  },
  created() {
    this.getGroups();
  },
  updated() {
    var joinEmpty;
    if (this.currentQueue.join_empty == "Yes") {
      joinEmpty = true;
    } else if (this.currentQueue.join_empty == "No") {
      joinEmpty = false;
    }
    var leaveWhenEmpty;
    if (this.currentQueue.leave_when_empty == "Yes") {
      leaveWhenEmpty = true;
    } else if (this.currentQueue.leave_when_empty == "No") {
      leaveWhenEmpty = false;
    }
    if (this.currentState == "Edit") {
      this.id = this.currentQueue.id;
      this.name = this.currentQueue.name;
      this.description = this.currentQueue.description;
      this.group_id = this.currentQueue.group_id;
      this.wrap_up_time = this.currentQueue.wrap_up_time;
      this.time_out = this.currentQueue.time_out;
      this.join_empty = joinEmpty;
      this.leave_when_empty = leaveWhenEmpty;
    } else {
      this.name = "";
      this.description = "";
      this.group_id = "";
      this.wrap_up_time = 0;
      this.time_out = 0;
      this.join_empty = false;
      this.leave_when_empty = false;
    }
  },
  computed: {
    ...mapGetters(["selectGroups"]),
  },
  methods: {
    ...mapActions(["getGroups", "createQueue", "editQueue"]),
    handleCreateQueue() {
      var joinEmpty = this.join_empty ? "Yes" : "No";
      var leaveWhenEmpty = this.leave_when_empty ? "Yes" : "No";
      if (this.currentState == "Edit") {
        this.editQueue({
          id: this.id,
          name: this.name,
          description: this.description,
          group_id: this.group_id,
          wrap_up_time: this.wrap_up_time,
          time_out: this.time_out,
          join_empty: joinEmpty,
          leave_when_empty: leaveWhenEmpty,
        });
      } else {
        this.createQueue({
          name: this.name,
          description: this.description,
          group_id: this.group_id,
          wrap_up_time: this.wrap_up_time,
          time_out: this.time_out,
          join_empty: joinEmpty,
          leave_when_empty: leaveWhenEmpty,
        });
      }
      this.name = "";
      this.description = "";
      this.group_id = "";
      this.wrap_up_time = 0;
      this.time_out = 0;
      this.join_empty = "";
      this.leave_when_empty = "";
      this.showModal = false;
    },
  },
};
</script>

<style></style>
