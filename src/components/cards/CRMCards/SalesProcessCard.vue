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
      </div>
    </div>
    <p class="my-3 font-normal text-xs text-gray-700 dark:text-gray-400">
      {{ form.description }}
    </p>
    <div class="flex justify-between">
      <div>
        <router-link :to="{ name: 'SalesProcessConfiguration' }">
          <div>
            <button
              class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Configure Process
            </button>
          </div>
        </router-link>
      </div>
      <div v-if="checktrue(form.id)">
        <button
          class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Deactivate
        </button>
      </div>
      <div v-else>
        <button
          class="rounded-sm m-2 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Activate
        </button>
      </div>
      <div class="">
        <button
          @click="showCreateSalesProcessModal = !showCreateSalesProcessModal"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateSalesProcess :show="showCreateSalesProcessModal" />
</template>

<script>
import { ref } from "vue";
import CreateSalesProcess from "@/components/modals/CRMModals/CreateSalesProcess.vue";

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

  components: { CreateSalesProcess },
  setup() {
    const showCreateSalesProcessModal = ref(false);

    return {
      showCreateSalesProcessModal,
    };
  },

  methods: {
    checktrue(data) {
      if (data === this.activateSalesProcess) {
        console.log("true form");
        return true;
      } else {
        console.log("false form");
        return false;
      }
    },
  },
};
</script>

<style></style>
