<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-10 m-4">
    <div class="grid grid-cols-4 grid-flow-col gap-2 mt-5">
      <div class="col-span-1 w-full">
        <div class="">
          <div class="bg-white max-w-xs w-full block rounded-sm shadow-sm p-2">
            <div class="mx-3">
              <Dropdown
                select="Filter By ..."
                label="Filter By ..."
                :options="selectFilter"
                v-model="filterId"
              />
            </div>
            <div class="mx-3">
              <SearchBar />
            </div>
            <div v-for="cont in contactPending.data" :key="cont.id">
              <h2 id="accordion-collapse-heading-1">
                <div class="justify-center mr-4">
                  <button
                    type="button"
                    @click="handlePendingContactDetails(cont)"
                    class="flex w-full m-3 p-1 font-medium border border-b-0 border-gray-200 justify-between rounded-sm focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 bg-slate-100"
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                  >
                    <span class="text-sm text-left p-2"
                      ><span>{{ Object.values(cont)[2] }}</span></span
                    >
                    <div>
                      <span
                        v-if="cont.approval_type == 'CREATE'"
                        class="text-xs p-1 text-green-700 bg-green-100 rounded-sm"
                        >{{ cont.approval_type }}</span
                      >
                      <span
                        v-if="cont.approval_type == 'UPDATE'"
                        class="text-xs p-1 text-orange-700 bg-orange-100 rounded-sm"
                        >{{ cont.approval_type }}</span
                      >
                      <span
                        v-if="cont.approval_type == 'DECLINED'"
                        class="text-xs p-1 text-red-700 bg-orange-100 rounded-sm"
                        >{{ cont.approval_type }}</span
                      >
                    </div>
                  </button>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Object.keys(currentContact).length != 0"
        class="col-span-3 w-full"
      >
        <div class="col-span-3 w-full">
          <UserPendingApprovalContactDetailsCard :contacts="currentContact" />
        </div>
      </div>
      <div v-else class="text-center col-span-3 w-full">
        <p class="text-2xl text-gray-400 text-center mt-24">
          Select an contact to view details.
        </p>
      </div>
    </div>
  </div>
  <DeclineWithMessageModal :show="showDeclineWithMessageModal" />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import UserPendingApprovalContactDetailsCard from "@/components/cards/CRMCards/UserPendingApprovalContactDetailsCard.vue";
import DeclineWithMessageModal from "@/components/modals/CRMModals/DeclineWithMessageModal.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  components: {
    UserPendingApprovalContactDetailsCard,
    DeclineWithMessageModal,
    SearchBar,
    Dropdown,
  },
  data() {
    return {
      currentContact: {},
      selectFilter: [
        { label: "Created", value: "Created" },
        { label: "Updated", value: "Updated" },
      ],
    };
  },
  setup() {
    const showDeclineWithMessageModal = ref(false);

    return {
      showDeclineWithMessageModal,
    };
  },
  created() {
    this.getContactPending();
  },
  methods: {
    ...mapActions(["getContactPending"]),
    handlePendingContactDetails(data) {
      this.currentContact = data;
    },
  },
  computed: {
    ...mapGetters(["contactPending"]),
  },
};
</script>

<style></style>
