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
                  {{ currentSalesTeam.name }} Users
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="flex flex-row">
                <div class="mx-6 pr-6 border-r-2">
                  <Radio
                    :label="'Add Users to ' + currentSalesTeam.name"
                    :options="selectUsers"
                    v-model="newSalesTeamUser"
                  />
                  <ActionButton
                    v-if="newSalesTeamUser"
                    text="Add User to Sales Team"
                    class="mt-5"
                  />
                </div>
                <div class="mx-6">
                  <div class="border-b p-3">
                    <label
                      for="helpDesk"
                      class="form-label text-sm font-semibold inline-block mt-4 text-gray-700"
                      >{{ currentSalesTeam.name }} Users</label
                    >
                  </div>
                  <SalesUserTable
                    @updatedModal="handleUpdatedModal"
                    :tableHead="salesTeamUsersTableHead"
                    :tableData="currentSalesTeam.users"
                    :helpDeskTeamId="currentSalesTeam.id"
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
import { mapActions, mapGetters } from "vuex";
import SalesUserTable from "@/components/tables/CRMTables/SalesUserTable.vue";
import Radio from "@/components/Radio.vue";
import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentSalesTeam: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateForm",
  props,
  components: {
    SalesUserTable,
    Radio,
    ActionButton,
  },
  data() {
    return {
      newSalesTeamUser: "",
      salesTeamUsersTableHead: ["name", "email", "phone number", "actions"],
      salesTeamTableData: [
        {
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          phone: "+254 789 589 632",
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
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getUsers"]),

    handleUpdatedModal() {
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters(["selectUsers"]),
  },
};
</script>

<style></style>
