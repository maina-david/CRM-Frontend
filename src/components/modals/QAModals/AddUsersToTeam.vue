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
                <h2 class="font-medium text-blue-400" v-if="state === false">
                  Add Users to {{ currentQualityAssuranceTeam.name }} Team
                </h2>
                <h2 class="font-medium text-blue-400" v-if="state">
                  Add Supervisors to {{ currentQualityAssuranceTeam.name }} Team
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <CheckBoxList
                :options="selectQualityAssuranceUsers"
                v-model:value="teamUsers"
              />

              <ActionButton
                v-if="state == false"
                @click="handleAddUsersToQualityAssuranceTeam"
                class="mt-5"
                text="Add Users To Team"
              />
              <ActionButton
                v-if="state == true"
                @click="handleAddUsersToQualityAssuranceTeam"
                class="mt-5"
                text="Add Supervisors To Team"
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
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CheckBoxList from "@/components/CheckBoxList.vue";

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
  name: "AddUsersToQATeamsModal",
  props,
  components: { ActionButton, CheckBoxList },
  methods: {
    ...mapActions([
      "getQualityAssuranceUsers",
      "addMembersToQualityAssuranceTeam",
      "addSupervisorsToQualityAssuranceTeam",
    ]),
    handleAddUsersToQualityAssuranceTeam() {
      console.log("this is the current state", this.state);
      if (this.state == false) {
        this.addMembersToQualityAssuranceTeam({
          qa_team_id: this.currentQualityAssuranceTeam.id,
          users: this.teamUsers,
        });
      } else {
        console.log("I am adding supervisors");
        this.addSupervisorsToQualityAssuranceTeam({
          team_id: this.currentQualityAssuranceTeam.id,
          user_id: this.teamUsers[0],
        });
      }

      this.closeModal();
    },
    log(s) {
      console.log(s);
    },
  },
  data() {
    return {
      select: "Select teamUsers to add",
      text: "",
      teamUsers: [],
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
    this.getQualityAssuranceUsers();
  },
  computed: {
    ...mapGetters(["selectQualityAssuranceUsers"]),
  },
};
</script>

<style></style>
