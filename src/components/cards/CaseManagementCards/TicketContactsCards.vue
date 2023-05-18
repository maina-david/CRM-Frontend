<template>
  <div>
    <div class="border-b">
      <h5 class="mt-5 font-bold text-sm p-3">User's Account and Contacts</h5>
    </div>
    <h5 class="mt-5 font-bold text-sm p-3">Account</h5>
    <div v-if="ticketDetail.account == 0">
      <span class="p-2 bg-red-100 text-red-700 flex justify-center m-5"
        >There are No account For This User</span
      >
    </div>
    <div class="mt-2">
      <div v-for="contact in ticketDetail.account" :key="contact">
        <div class="">
          <div
            class="p-3 bg-slate-50 flex"
            v-for="(value, key) in contact"
            :key="key"
          >
            <h3 class="text-sm font-semibold">{{ key }} :</h3>
            <h4 class="text-sm font-medium">
              {{ value }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <h5 class="mt-5 font-bold text-sm p-3">Contact</h5>
    <div v-if="ticketDetail.contact == 0">
      <span class="p-2 bg-red-100 text-red-700 flex justify-center m-5"
        >There are No Contacts For This User</span
      >
    </div>
    <div class="mt-2">
      <div v-for="contact in ticketDetail.contact" :key="contact">
        <div class="">
          <div
            class="p-3 bg-slate-50 flex"
            v-for="(value, key) in contact"
            :key="key"
          >
            <h3 class="text-sm font-semibold">{{ key }} :</h3>
            <h4 class="text-sm font-medium">
              {{ value }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["ticketDetail"]),
  },
  data() {
    return {
      contacts: [
        { name: "Email Address", value: "janedoe@gmail.com" },
        { name: "Phone Number", value: "+254 789 965 478" },
      ],
    };
  },
};
</script>

<style></style>
