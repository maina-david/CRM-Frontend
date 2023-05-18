<template>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between p-2">
      <div>
        <h2 class="font-bold text-lg py-2">Contact Details</h2>
      </div>
      <div class="flex gap-2">
        <ActionButton
          @click="
            handleApproveContact(
              contactsDetailPending.account_updated[0].contact_stage_id,
              'APPROVE'
            )
          "
          text="Approve Contact"
        />
        <ActionButton
          text="Decline Contact"
          class="bg-red-500"
          @click="
            handleApproveContact(
              contactsDetailPending.account_updated[0].contact_stage_id,
              'DECLINE'
            )
          "
        />
      </div>
    </div>
    <div class="flex gap-3 right-0">
      <h2 class="font-md text-xs py-3 px-2">Changes made by :</h2>
      <h2 class="font-md text-xs py-3 px-2">
        When : {{ formatDate(contacts.updated_at) }}
      </h2>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-green-100">
        <h2 class="font-bold text-sm py-3 px-2">Previous Data</h2>
        <div class="mt-5">
          <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
            <div class="mt-5">
              <div v-if="!contactsDetailPending.account_original" class="">
                <div class="text-center col-span-3 w-full">
                  <p class="text-2xl text-gray-400 text-center mt-24">
                    No contact details.
                  </p>
                </div>
              </div>
              <div
                v-else
                v-for="contact in contactsDetailPending.account_original"
                :key="contact.id"
              >
                <div class="">
                  <div class="p-3 bg-slate-50 flex">
                    <h3 class="text-sm font-semibold">
                      {{ contact.contact_form_attr.name }} :
                    </h3>
                    <h4 class="text-sm font-medium">
                      {{ contact.value }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-orange-100">
        <h2 class="font-bold text-sm py-3 px-2">Proposed Changes</h2>
        <div class="mt-5">
          <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
            <div class="mt-5">
              <div v-if="!contactsDetailPending.account_updated" class="">
                <div class="text-center col-span-3 w-full">
                  <p class="text-2xl text-gray-400 text-center mt-24">
                    No contact details.
                  </p>
                </div>
              </div>
              <div
                v-else
                v-for="contact in contactsDetailPending.account_updated"
                :key="contact.id"
              >
                <div class="">
                  <div class="p-3 bg-slate-50 flex">
                    <h3 class="text-sm font-semibold">
                      {{ contact.contact_form_attr.name }} :
                    </h3>
                    <h4 class="text-sm font-medium">
                      {{ contact.value }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateContactModal
    :show="showCreateContactModal"
    :state="state"
    :currentContact="currentContact"
    :contactTypeId="contacts.contact_type_id"
    :contactFormId="contacts.contact_form_id"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import moment from "moment";
import ActionButton from "@/components/ActionButton.vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";

export default {
  props: {
    contacts: { type: Array },
  },
  components: {
    ActionButton,
    CreateContactModal,
  },
  setup() {
    const showCreateContactModal = ref(false);
    return {
      showCreateContactModal,
    };
  },
  created() {
    this.getContactDetailPending({
      contact_id: this.contacts.id,
    });
  },
  watch: {
    contacts: function (val) {
      this.getContactDetailPending({
        contact_id: val.id,
      });
    },
  },
  methods: {
    ...mapActions(["getContactDetailPending", "contactApproveRequest"]),
    handleEditContact(data, state) {
      this.state = state;
      this.currentContact = data;
      this.showCreateContactModal = !this.showCreateContactModal;
    },
    handleApproveContact(data, state) {
      if (confirm("Confirm " + state + " this contact?") == true) {
        console.log("approve/decline contact", data, state);
        this.contactApproveRequest({
          contact_stage_id: data,
          action: state,
        });
      } else {
        console.log("approve/decline contact cancelled");
      }
    },
    formatDate(date) {
      return moment(date).calendar();
    },
  },
  computed: {
    ...mapGetters(["contactsDetailPending"]),
  },
};
</script>

<style></style>
