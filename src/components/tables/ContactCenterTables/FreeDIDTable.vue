<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="pt-4">
      <h1 class="font-semibold">Available Numbers</h1>
      <hr
        class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
      />
    </div>
    <SearchBar />
    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="py-2 px-3"
            v-for="head in tableHead"
            :key="head"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
          v-for="data in tableData"
          :key="data"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.did }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.carrier.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span v-if="data.ivr">{{ data.ivr.name }}</span>
            <span v-else class="text-red-400">N/A</span>
          </td>

          <td class="py-2 px-3">
            <button
              @click="handleAssignDids(data.id)"
              class="font-medium bg-blue-400 rounded-md text-xs text-white py-1 px-2"
            >
              Select DID
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500"
        >Showing
        <span class="font-semibold text-gray-900"
          >1- {{ tableData.length }}</span
        >
        of
        <span class="font-semibold text-gray-900">{{
          tableData.length
        }}</span></span
      >
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import SearchBar from "../../SearchBar.vue";

export default {
  name: "FreeDIDTable",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { SearchBar },
  methods: {
    ...mapActions(["assignDids"]),
    handleAssignDids(id) {
      this.assignDids({ did_id: id });
    },
  },
};
</script>

<style></style>
