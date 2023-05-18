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
                <h2 v-if="state == false" class="font-medium text-blue-400">
                  Queues in this QA Team
                </h2>

                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <ViewQueuesTable
                  :state="state"
                  :tableData="queues"
                  :tableHead="tableHead"
                  @closeModal="handleCloseModal"
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
import ViewQueuesTable from "@/components/tables/WorkflowTables/ViewQueuesTable.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentQualityAssuranceTeam: {
    type: Object,
    default: {},
  },
  state: {
    type: String,
    default: false,
  },
};
export default {
  name: "ViewUsersInQualityAssurance",
  props,
  components: { ViewQueuesTable },
  data() {
    return {
      queues: {},

      tableHead: ["Name", "Type", "Actions"],
    };
  },
  updated() {
    this.queues = this.currentQualityAssuranceTeam;
  },
  created() {
    this.teamUsers = this.tableData?.members;
    this.supervisors = this.tableData?.supervisors;
  },
  methods: {
    handleCloseModal(e) {
      console.log("closing modal if true", e);
      this.closeModal();
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
