<template>
  <div class="p-1">
    <div class="border-b">
      <h5 class="mt-5 font-bold text-sm p-2">Escalation Form</h5>
    </div>
    <div v-if="ticketDetail.escalation_form">
      <div
        v-for="form_item in ticketDetail.escalation_form.form_items"
        :key="form_item"
      >
        <div class="text-xs">
          <div
            class="my-3"
            v-if="
              form_item.data_type == 'singlename' ||
              form_item.data_type == 'firstname' ||
              form_item.data_type == 'maidenname' ||
              form_item.data_type == 'lastname' ||
              form_item.data_type == 'multiplenames'
            "
          >
            <label
              for="user-icon"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.data_name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">person</span>
              </div>
              <input
                type="text"
                v-model="form[form_item.id]"
                id="user-icon"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'text'">
            <label
              for="user-icon"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.data_name }}</label
            >
            <div>
              <input
                type="text"
                v-model="form[form_item.id]"
                id="user-icon"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'email'">
            <label
              for="email-address-icon"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.data_name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">email</span>
              </div>
              <input
                type="email"
                v-model="form[form_item.id]"
                id="email-address-icon"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'phone'">
            <label
              for="email-address-icon"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">phone</span>
              </div>
              <input
                type="number"
                v-model="form[form_item.id]"
                id="email-address-icon"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div class="my-5 col-span-3" v-if="form_item.data_type == 'textarea'">
            <label
              for="message"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-400"
              >{{ form_item.data_name }}</label
            >
            <textarea
              id="message"
              v-model="form[form_item.id]"
              rows="3"
              class="block p-1.5 w-full text-xs text-gray-900 bg-slate-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>

          <div class="my-3" v-if="form_item.data_type == 'number'">
            <label
              for="number"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.data_name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">phone</span>
              </div>
              <input
                type="number"
                v-model="form[form_item.id]"
                id="number"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'password'">
            <label
              for="password"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.data_name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">key</span>
              </div>
              <input
                type="password"
                v-model="form[form_item.id]"
                id="password"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'date'">
            <label
              for="date"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >{{ form_item.name }}</label
            >
            <div class="relative">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <span class="material-icons text-gray-400">calendar_month</span>
              </div>
              <input
                type="date"
                v-model="form[form_item.id]"
                id="date"
                class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'select'">
            <label
              for="select"
              class="block my-2 text-xs font-medium text-gray-900 dark:text-gray-400"
              >{{ form_item.data_name }}</label
            >
            <select
              id="select"
              v-model="form[form_item.id]"
              class="bg-slate-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                v-for="option in get_form_options(form_item.options)"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'checkbox'">
            <div
              class="flex items-center mb-4"
              v-for="option in form_item.checkbox_options"
              :key="option.id"
            >
              <input
                id="checkbox"
                type="checkbox"
                value="option.id"
                v-model="form[form_item.id]"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ option.data_name }}</label
              >
            </div>
          </div>
          <div class="my-3" v-if="form_item.data_type == 'radio'">
            <div
              class="flex items-center mb-4"
              v-for="option in form_item.radio_options"
              :key="option.id"
            >
              <input
                id="radio"
                type="radio"
                :value="option.id"
                v-model="form[form_item.id]"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked
              />
              <label
                for="radio"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ option.data_name }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ActionButton
          @click="
            escalateTicket({
              ticket_id: this.ticketDetail.ticket.id,
              form_id: this.ticketDetail.escalation_form.id,
              form_items: this.form,
            })
          "
          text="Escalate Ticket"
        />
        <div class="mt-2">
          <ActionButton
            @click="
              resolveTicket({
                ticket_id: this.ticketDetail.ticket.id,
                form_id: this.ticketDetail.escalation_form.id,
                form_items: this.form,
              })
            "
            text="Resolve Ticket"
          />
        </div>
      </div>
    </div>
    <div class="m-4 p-2" v-else>Nothing to show</div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["resolveTicket", "escalateTicket"]),
    submit_ticket() {
      console.log("this is the final escalation_form", this.form, "the final", {
        ticket_id: this.ticketDetail.ticket.id,
        form_id: this.ticketDetail.escalation_form.id,
        form_items: this.form,
      });
    },
    get_form_options(data) {
      var new_data = data.map((data_map) => {
        return { label: data_map.option_name, value: data_map.id };
      });
      console.log("this is the option data", new_data);
      return new_data;
    },
  },
  computed: {
    ...mapGetters(["ticketDetail"]),
  },
  props: {
    forms: { type: Array },
    state: { type: String },
    currentForm: { type: Object },
  },
  data() {
    return {
      form: {},
    };
  },
  components: { ActionButton },
};
</script>

<style></style>
