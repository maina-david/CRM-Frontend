<template>
  <div
    class="p-3 max-w-sm bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between">
      <div>
        <h5 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          {{ form.name }}
        </h5>
      </div>
      <div v-if="checktrue(form.id)">
        <span class="bg-green-100 text-green-700 rounded-sm px-1 py-0.5 text-xs"
          >Active</span
        >
      </div>
      <div v-else>
        <span
          class="bg-orange-100 text-orange-700 rounded-sm px-1 py-0.5 text-xs"
          >Inactive</span
        >
        <span
          v-if="form.priority == 'Low Priority'"
          class="bg-green-100 text-green-700 rounded-sm px-1 py-0.5 text-xs"
          >{{ form.priority }}</span
        >
      </div>
    </div>
    <p class="my-3 font-normal text-xs text-gray-700 dark:text-gray-400">
      {{ form.description }}
    </p>
    <div class="flex justify-between">
      <div @click="handleTicketFormId(form)">
        <router-link :to="{ name: 'MyTicketSetup' }">
          <div>
            <button
              class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              View
            </button>
          </div>
        </router-link>
      </div>
      <div
        @click="deactivateTicketForm({ ticket_form_id: form.id })"
        v-if="checktrue(form.id)"
      >
        <button
          class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Deactivate
        </button>
      </div>
      <div
        @click="activateActiveTicketForm({ ticket_form_id: form.id })"
        v-else
      >
        <button
          class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Activate
        </button>
      </div>
      <div class="">
        <button
          @click="handleEditTicketForm(form, 'Edit')"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateTicketCreationForm
    :state="state"
    :currentTicketForm="currentTicketForm"
    :show="showCreateTicketCreationModal"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import CreateTicketCreationForm from "@/components/modals/CRMModals/CreateTicketCreationForm.vue";

export default {
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      state: "",
      currentTicketForm: {},
    };
  },

  components: { CreateTicketCreationForm },
  setup() {
    const showCreateTicketCreationModal = ref(false);

    return {
      showCreateTicketCreationModal,
    };
  },

  created() {
    this.getActiveTicketForm();
    console.log("this is the current ticket form", this.activateTicketForm);
  },
  methods: {
    ...mapActions([
      "activateActiveTicketForm",
      "deactivateTicketForm",
      "getActiveTicketForm",
    ]),

    checktrue(data) {
      if (data === this.activateTicketForm) {
        console.log("true form");
        return true;
      } else {
        console.log("false form");
        return false;
      }
    },
    handleEditTicketForm(data, state) {
      this.state = state;
      this.currentTicketForm = data;
      this.showCreateTicketCreationModal = !this.showCreateTicketCreationModal;
    },
    handleTicketFormId(data) {
      localStorage.setItem("ticket_form", JSON.stringify(data));
    },
  },
  computed: {
    ...mapGetters(["activateTicketForm"]),
  },
};
</script>

<style></style>
