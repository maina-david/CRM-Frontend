<template>
  <div
    class="p-3 max-w-sm bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <h5 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        {{ form.name }}
      </h5>
    </a>
    <p class="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
      {{ form.description }}
    </p>
    <div class="flex justify-between">
      <div>
        <div>
          <button
            @click="handleFormItems(form)"
            class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            {{
              form.account_form_items.length > 0
                ? "Manage Form Items"
                : "Create Form Items"
            }}
          </button>
        </div>
      </div>
      <div class="">
        <button
          @click="handleEditAccountForm(form, 'Edit')"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateForm
    :show="showEditAccountFormModal"
    :currentAccountForm="currentAccountForm"
    :state="state"
  />
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "vue";
import router from "@/router";
import CreateForm from "@/components/modals/CRMModals/CreateForm.vue";

export default {
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      state: "",
      currentAccountForm: "",
    };
  },
  components: { CreateForm },
  setup() {
    const showEditAccountFormModal = ref(false);

    return {
      showEditAccountFormModal,
    };
  },
  created() {
    localStorage.removeItem("Form Info");
    localStorage.removeItem("currentAccountFormId");
  },
  methods: {
    ...mapActions(["getAccountFormItemsBuilder"]),
    handleFormItems(data) {
      console.log("current account form", data);
      if (data.account_form_items.length > 0) {
        console.log("Edit account form items");
        localStorage.setItem("currentAccountFormId", JSON.stringify(data.id));
        this.getAccountFormItemsBuilder({
          account_form_id: data.id,
        });
      } else {
        console.log("New account form items");
        localStorage.setItem("currentAccountFormId", JSON.stringify(data.id));
        localStorage.removeItem("Form Info");
        router.push({ name: "AccountFormBuilder" });
      }
    },
    handleEditAccountForm(data, state) {
      this.currentAccountForm = data;
      this.state = state;
      this.showEditAccountFormModal = !this.showEditAccountFormModal;
    },
  },
};
</script>

<style></style>
