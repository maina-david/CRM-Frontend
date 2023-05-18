<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div v-if="interaction.channel === 'Voice'">
      <!-- <span
        >Call Duration:
        {{
          format_time(interaction.calls[0].call_detail[0].call_duration)
        }}</span
      >
      <span
        >Call Time:
        {{ format_date(interaction.calls[0].call_detail[0].call_date) }}</span
      >
      <span>Queue: {{ interaction.calls[0].call_detail[0].queue }}</span> -->
      <div class="flex justify-between border-b p-2">
        <div>
          <p class="font-semibold text-sm my-2">
            Agent: {{ interaction.agent }}
          </p>

          <p class="text-xs my-2">Queue: {{ interaction.queue }}</p>
          <p class="text-xs my-2">Team: {{ interaction.team }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold my-2">
            Call Date: {{ format_date(interaction.interaction_time) }}
          </p>
          <p class="text-xs my-2">
            Call Duration: {{ format_time(interaction.handling_time) }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-between border-b p-2">
        <div>
          <p class="font-semibold text-sm my-2">
            Agent: {{ interaction.agent }}
          </p>
          <p class="text-xs my-2">Queue: {{ interaction.queue }}</p>
          <p class="text-xs my-2">Team: {{ interaction.team }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold my-2">
            Call Date: {{ format_date(interaction.interaction_time) }}
          </p>
          <p class="text-xs my-2">
            Chat Duration: {{ interaction.handling_time }}
          </p>
        </div>
      </div>
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
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 py-2"
          v-else
          v-for="data in tableData"
          :key="data"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.question }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.result }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span v-if="data.type === 'toggle'">{{ data.weight }}</span>
            <span v-else>{{ data.range }}</span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.weight }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.score }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.comment }}
          </td>
        </tr>
        <tr
          class="bg-white dark:bg-gray-800 p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="mt-3">
            <div class="border-b flex justify-between mt-10">
              <span
                >Total Score:
                {{ interaction.evaluation.assessment_total }}</span
              >
              <span>Reveiwed By: {{ interaction.evaluation.reviewed_by }}</span>
              <span
                >Reveiwed On:
                {{ format_date(interaction.evaluation.reviewed_on) }}</span
              >
            </div>
          </div>
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
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >...</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >100</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <CreateTeamModal :show="showCreateTeamModal" />
  <ViewUsersTableModal :show="showTeamUsersModal" />
  <AddUsersToTeam :show="showAddTeamUsers" />
</template>

<script>
import { ref } from "vue";
import CreateTeamModal from "@/components/modals/QAModals/CreateTeamModal.vue";
import ViewUsersTableModal from "@/components/modals/QAModals/ViewUsersTableModal.vue";
import AddUsersToTeam from "@/components/modals/QAModals/AddUsersToTeam.vue";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "TeamTable",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    interaction: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(["submitReview"]),
    submitReviewForm() {
      this.final_data.interaction_reference =
        this.interaction.interaction_reference;
      this.final_data.review_id = JSON.parse(
        localStorage.getItem("current_interaction")
      );
      this.final_data.responses = this.responses;
      console.log("this is the final form data", this.final_data);
      this.submitReview(this.final_data);
    },
    format_data(data, event) {
      this.toArray = false;
      for (let index = 0; index < this.responses.length; index++) {
        const element = this.responses[index];
        if (element.form_attr_id === data.id) {
          console.log("existing data index", index);
          this.toArray = true;
          this.responses[index].form_attr_id = data.id;
          this.responses[index].response = event;
          this.responses[index].comment = this.comments[data.id];
        }
      }
      if (this.toArray == false) {
        console.log("this is the form data", data);
        console.log("this is the form value", event);
        this.responses.push({
          form_attr_id: data.id,
          response: event,
          comment: this.comments[data.id],
        });
      }

      console.log("these are the responses", this.responses);
    },
    format_data_comments(data) {
      this.toArray = false;
      for (let index = 0; index < this.responses.length; index++) {
        const element = this.responses[index];
        if (element.form_attr_id === data.id) {
          console.log("existing data index", index);
          this.toArray = true;

          this.responses[index].comment = this.comments[data.id];
        }
      }

      console.log("this is the form data", data);
      if (this.toArray == false) {
        this.responses.push({
          form_attr_id: data.id,
          response: "",
          comment: this.comments[data.id],
        });
      }

      console.log("these are the responses", this.responses);
    },
    format_date(date) {
      return moment(date).format("YYYY-MM-DD, h:mm:ss a");
    },
    format_time(s) {
      var seconds = s; // or "2000"
      seconds = parseInt(seconds); //because moment js dont know to handle number in string format
      var format =
        Math.floor(moment.duration(seconds, "seconds").asHours()) +
        ":" +
        moment.duration(seconds, "seconds").minutes() +
        ":" +
        moment.duration(seconds, "seconds").seconds();
      return format;
    },
    toggleAudio(sourceUrl) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      source.src = sourceUrl;
      audio.pause();
      console.log(sourceUrl);
      console.log(audio);
      if (sourceUrl) {
        audio.load();
        audio.play();
      }
    },
  },
  data() {
    return {
      state: "",
      final_data: {
        review_id: "",
        interaction_reference: "",
        responses: [],
      },
      comments: [],
      toArray: false,
      responses: [],
      currentTeamMembers: [],
      currentToggle: "",
      value: 0,
      min: 0,
      total: 156,
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);
    const showTeamUsersModal = ref(false);
    const showAddTeamUsers = ref(false);

    return {
      showCreateTeamModal,
      showTeamUsersModal,
      showAddTeamUsers,
    };
  },
  components: {
    CreateTeamModal,
    ViewUsersTableModal,
    AddUsersToTeam,
  },
};
</script>

<style></style>
