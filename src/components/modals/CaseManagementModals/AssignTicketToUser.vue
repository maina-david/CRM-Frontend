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
                <h2 class="font-medium text-blue-400">Assign Ticket to User</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <Dropdown
                  select="Select Help Desk Team"
                  :options="options"
                  v-model="helpDeskTeam"
                  label="Select Help Desk Team"
                />
                <div>
                  <AssignTicketToUser
                    :tableData="helpDeskTeamData"
                    :tableHead="helpDeskTeamHead"
                  />
                </div>
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
import Dropdown from "@/components/Dropdown.vue";
import AssignTicketToUser from "@/components/tables/CaseManagementTables/AssignTicketToUserTable.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccountForm: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateHelpDeskTeam",
  props,
  components: { Dropdown, AssignTicketToUser },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      helpDeskTeam: "",
      options: [
        { label: "Help Desk Team 1", value: "Help Desk Team 1" },
        { label: "Help Desk Team 2", value: "Help Desk Team 2" },
        { label: "Help Desk Team 3", value: "Help Desk Team 3" },
        { label: "Help Desk Team 4", value: "Help Desk Team 4" },
      ],
      helpDeskTeamHead: ["Name", "Email", "Phone", "Actions"],
      helpDeskTeamData: [
        {
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          phone: "+254 7859 6987",
        },
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          phone: "+254 7859 6987",
        },
        {
          name: "Emmaculate Wanjugu ",
          email: "njugu@gmail.com",
          phone: "+254 7859 6987",
        },
      ],
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
};
</script>

<style></style>
