<template>
  <div class="mt-10 m-4">
    <div class="grid grid-cols-4 grid-flow-col gap-2 mt-5">
      <div class="col-span-1 w-full">
        <div class="">
          <div class="bg-white max-w-xs w-full block rounded-sm shadow-sm p-2">
            <div class="mx-3">
              <SearchBar />
            </div>
            <div v-for="contact in contacts.data" :key="contact.id">
              <h2 id="accordion-collapse-heading-1">
                <div class="justify-center mr-4">
                  <button
                    type="button"
                    @click="handleApprovedContactDetails(contact)"
                    class="flex w-full m-3 p-1 font-medium border border-b-0 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 bg-slate-100"
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                  >
                    <span :key="index" class="text-sm text-left p-2">
                      <span>{{ Object.values(contact)[1] }}</span>
                    </span>
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
        <UserContactDetailsCard :contacts="currentContact" />
      </div>
      <div v-else class="text-center col-span-3 w-full">
        <p class="text-2xl text-gray-400 text-center mt-24">
          Select an contact to view details.
        </p>
      </div>
    </div>
  </div>
  <CreateContactModal :show="showCreateContactModal" />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import UserContactDetailsCard from "@/components/cards/CRMCards/UserContactDetailsCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";

export default {
  components: {
    UserContactDetailsCard,
    SearchBar,
    CreateContactModal,
  },
  data() {
    return {
      currentContact: {},
    };
  },
  setup() {
    const showCreateContactModal = ref(false);
    return {
      showCreateContactModal,
    };
  },
  created() {
    this.getContacts();
  },
  methods: {
    ...mapActions(["getContacts"]),
    handleApprovedContactDetails(data) {
      this.currentContact = data;
    },
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
};
</script>

<style></style>
