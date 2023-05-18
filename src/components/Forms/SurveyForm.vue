<template>
  <div>
    <div v-for="survey in surveys" :key="survey.id">
      <div class="text-xs">
        <div
          class="my-3"
          v-if="
            survey.data_type == 'singlename' ||
            survey.data_type == 'firstname' ||
            survey.data_type == 'maidenname' ||
            survey.data_type == 'lastname' ||
            survey.data_type == 'multiplenames'
          "
        >
          <label
            for="user-icon"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">person</span>
            </div>
            <input
              type="text"
              v-model="form[survey.id]"
              id="user-icon"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'text'">
          <label
            for="user-icon"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">person</span>
            </div>
            <input
              type="text"
              v-model="form[survey.id]"
              id="user-icon"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'email'">
          <label
            for="email-address-icon"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">email</span>
            </div>
            <input
              type="email"
              v-model="form[survey.id]"
              id="email-address-icon"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'phone'">
          <label
            for="email-address-icon"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">phone</span>
            </div>
            <input
              type="number"
              v-model="form[survey.id]"
              id="email-address-icon"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>

        <div class="my-5 col-span-3" v-if="survey.data_type == 'textarea'">
          <label
            for="message"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-400"
            >{{ survey.name }}</label
          >
          <textarea
            id="message"
            v-model="form[survey.id]"
            rows="3"
            class="block p-1.5 w-full text-xs text-gray-900 bg-slate-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="survey.placeholder"
          ></textarea>
        </div>

        <div class="my-3" v-if="survey.data_type == 'number'">
          <label
            for="number"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            ></div>
            <input
              type="number"
              v-model="form[survey.id]"
              id="number"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'password'">
          <label
            for="password"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">key</span>
            </div>
            <input
              type="password"
              v-model="form[survey.id]"
              id="password"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'date'">
          <label
            for="date"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >{{ survey.name }}</label
          >
          <div class="relative">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <span class="material-icons text-gray-400">calendar_month</span>
            </div>
            <input
              type="date"
              v-model="form[survey.id]"
              id="date"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="survey.placeholder"
            />
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'select'">
          <label
            for="select"
            class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-400"
            >{{ survey.name }}</label
          >
          <select
            id="select"
            v-model="form[survey.id]"
            class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option
              v-for="option in survey.options"
              :key="option.id"
              :value="option.id"
            >
              {{ option.option_name }}
            </option>
          </select>
        </div>
        <div class="my-3" v-if="survey.data_type == 'checkbox'">
          {{ survey.name }}
          <div
            class="flex items-center mb-4"
            v-for="option in survey.options"
            :key="option.id"
          >
            <input
              id="checkbox"
              type="checkbox"
              value="option.id"
              v-model="form[survey.id]"
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ option.option_name }}</label
            >
          </div>
        </div>
        <div class="my-3" v-if="survey.data_type == 'radio'">
          {{ survey.name }}
          <div
            class="flex items-center mb-4"
            v-for="option in survey.options"
            :key="option.id"
          >
            <input
              id="radio"
              type="radio"
              :value="option.id"
              v-model="form[survey.id]"
              class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="radio"
              class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {{ option.option_name }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <ActionButton
      @click="handleSubmitSurvey"
      text="Submit Survey"
      class="mt-5"
    />
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { mapActions } from "vuex";
export default {
  components: { ActionButton },
  props: {
    surveys: { type: Array },
    campaign_form_id: { type: String },
    campaign_contact_id: { type: String },
  },
  data() {
    return {
      form: {},
    };
  },

  updated() {
    console.log("updatingForm");
    this.handleInput();
  },
  watch: {
    form: function (val) {
      console.log("updatingForm", val);
      this.handleInput();
    },
  },
  methods: {
    ...mapActions(["submitSurvey"]),
    handleInput() {
      this.$emit("form", this.form);
    },
    handleSubmitSurvey() {
      console.log("these are the form items", this.form);
      this.submitSurvey({
        campaign_form_id: this.campaign_form_id,
        campaign_contact_id: this.campaign_contact_id,
        survey_responses: this.form,
      });
      this.form = {};
    },
  },
};
</script>

<style></style>
