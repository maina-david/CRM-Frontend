<template>
  <div>
    <div class="border-b">
      <h5 class="mt-5 font-bold text-sm p-3">Ticket Details</h5>
    </div>
    <div class="mt-5">
      <div v-for="ticket in ticketDetail?.ticket_details" :key="ticket">
        <div class="">
          <div
            class="p-3 bg-slate-50 flex"
            v-for="(value, key) in ticket"
            :key="key"
          >
            <h3 class="text-sm font-semibold">{{ key }} :</h3>
            <h4 class="text-sm font-medium">
              {{ value }}
            </h4>
          </div>
        </div>
      </div>

      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Created By :</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.created_by }}
        </h4>
      </div>
      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Created On :</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.created_on }}
        </h4>
      </div>
      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Channel:</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.channel }}
        </h4>
      </div>
      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Priority:</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.priority }}
        </h4>
      </div>
      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Status:</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.status }}
        </h4>
      </div>
      <div class="p-3 bg-slate-50 flex">
        <h3 class="text-sm font-semibold">Assigned To:</h3>
        <h4 class="text-sm font-medium">
          {{ ticketDetail?.ticket?.assigned_to }}
        </h4>
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
      ticketDetails: [],
    };
  },
};
</script>

<style></style>
