<template>
  <div class="bg-slate-50 p-3">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Integrations
      </h3>
    </div>

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
          v-if="integrations.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ integrations.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ integrations.scope_name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <button
              @click="OpenTab(integrations.url)"
              class="rounded-sm mt-1 p-0.5 px-2 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Open
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    OpenTab(data) {
      console.log(data);
      window.open(data);
    },
  },
  computed: {
    ...mapGetters(["currentCallDetails"]),
  },
  props: {
    integrations: {
      type: Array,

      required: false,
    },
  },

  data() {
    return {
      tableHead: ["Name", "Scope", "Action"],
    };
  },
};
</script>

<style></style>
