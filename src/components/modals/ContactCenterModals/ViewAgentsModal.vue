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
                <h2 class="font-medium text-blue-400">Agents in this queue</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <ViewAgentsTable
                  :tableData="agent_data"
                  :tableHead="tableHead"
                  :currentQueue="currentQueueId"
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
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import ViewAgentsTable from "../../tables/ContactCenterTables/ViewAgentsTable.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentQueueId: {
    type: String,
  },
};
export default {
  name: "ViewAgents",
  props,
  components: { ViewAgentsTable },
  data() {
    return {
      agent_data: [],
      tableHead: ["Name", "Email", "Phone", "Actions"],
      queueData: {},
    };
  },
  computed: {
    ...mapGetters(["agents"]),
  },
  updated() {
    this.agent_data = JSON.parse(localStorage.getItem("current_agents"));
    console.log("current agent data is", this.agent_data);
    this.getAgents();
    this.queueData = this.currentQueue;
  },
  methods: {
    ...mapActions(["getAgents"]),
    log(s) {
      console.log(s);
    },
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
};
</script>

<style></style>
