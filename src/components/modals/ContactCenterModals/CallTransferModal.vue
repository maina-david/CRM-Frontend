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
                <h2 class="font-medium text-blue-400">Transfer Call</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot v-if="showDropdown">
              <div class="mt-5">
                <Dropdown
                  select="Select Unit"
                  label="Select Unit to Transfer Call To"
                  :options="selectUnit"
                  v-model="unit"
                />
                <Dropdown
                  v-if="unit == 'User'"
                  select="Select User"
                  label="Select User to Transfer Call To"
                  :options="selectUser"
                  v-model="user_id"
                />
                <Dropdown
                  v-if="unit == 'Queue'"
                  select="Select Queue"
                  label="Select Queue to Transfer Call To"
                  :options="selectQueue"
                  v-model="queue_id"
                />
                <ActionButton
                  text="Transfer Call"
                  class="mt-5"
                  @click="
                    transferCall({
                      user_id: user_id,
                    })
                  "
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
import { ref, watch, onMounted } from "vue";
import ActionButton from "../../ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import { mapGetters, mapActions } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentIvr: {
    type: Object,
    required: true,
  },
  activeagent: {
    type: Array,
    required: false,
  },
  activequeues: {
    type: Array,
    required: false,
  },
};
export default {
  updated() {
    this.showDropdown = false;
    this.getActiveAgents();
    this.getQueues();
    console.log("i am executing all updates");
    console.log(
      "getting active agents",
      JSON.parse(localStorage.getItem("active_queues"))
    );
    this.selectUser = JSON.parse(localStorage.getItem("active_agents"));
    this.selectQueue = JSON.parse(localStorage.getItem("active_queues"));
    this.showDropdown = true;
  },
  methods: {
    ...mapActions(["getActiveAgents", "getQueues", "transferCall"]),
  },

  computed: {
    ...mapGetters[("selectActiveAgents", "selectQueues")],
  },
  name: "DidModal",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      user_id: "",
      showDropdown: false,
      queue_id: "",
      unit: "",
      selectUser: [
        { label: "Jane Doe", value: "1" },
        { label: "Nassir Yusuf", value: "2" },
        { label: "Nathan Wesef", value: "3" },
      ],
      selectQueue: [
        { label: "Customer Service Queue", value: "1" },
        { label: "Support Queue", value: "2" },
      ],
      selectUnit: [
        { label: "User", value: "User" },
        { label: "Queue", value: "Queue" },
      ],
    };
  },
  setup(props) {
    var active_agents = [];
    var active_users = [];
    const showModal = ref(false);

    onMounted(() => {
      console.log("active agents", props.activeagent);
      active_agents = props.activeagent;
      active_users = props.activeusers;
    });

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
        console.log("active agents", props.activeagent);
      }
    );

    return {
      closeModal,
      showModal,
      active_agents,
      active_users,
    };
  },
};
</script>

<style></style>
