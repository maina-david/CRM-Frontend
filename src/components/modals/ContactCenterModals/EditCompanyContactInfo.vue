<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-5"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="">
              <div class="p-3">
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="block py-10 md:py-10 md:px-4 px-4">
                <div class="text-center justify-center">
                  <h4 class="text-xl font-semibold mt-1 mb-4 pb-1">
                    {{ currentState }} Company Contact
                  </h4>
                </div>
                <form class="grid justify-center">
                  <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                    <TextBox
                      placeholder="Name"
                      label="Name"
                      type="text"
                      v-model="name"
                    />
                    <TextBox
                      placeholder="Email"
                      label="Email"
                      type="email"
                      v-model="email"
                    />
                  </div>
                  <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                    <Dropdown
                      select="Contact Type"
                      label="Contact Type"
                      :options="contact_types"
                      v-model="company_contact_type_id"
                    />
                    <div>
                      <label
                        for="number"
                        class="form-label text-sm inline-block mb-0 text-gray-700"
                        >Phone No.</label
                      >
                      <div class="flex flex-row mr-5">
                        <input
                          type="phone"
                          placeholder="Phone No."
                          v-model="phone_number"
                          class="form-control block w-80 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row pt-1 mb-5 mt-2 pb-1">
                    <ActionButton
                      @click="handleCompanyContact"
                      :text="currentState"
                    />
                  </div>
                </form>
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  existingCompanyContactInfo: {
    type: Object,
    required: true,
  },
  currentState: {
    type: String,
    required: true,
  },
};
export default {
  name: "EditCompanyInfo",
  props,
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      logoUrl: logoUrl,
      contact_id: "",
      email: "",
      name: "",
      phone_number: "",
      company_contact_type_id: "",
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
    };
  },
  created() {
    this.getContactTypes();
  },
  updated() {
    if (this.currentState == "Edit") {
      this.contact_id = this.existingCompanyContactInfo.id;
      this.email = this.existingCompanyContactInfo.email;
      this.name = this.existingCompanyContactInfo.name;
      this.phone_number = this.existingCompanyContactInfo.phone_number;
      this.company_contact_type_id =
        this.existingCompanyContactInfo.company_contact_type_id;
    } else {
      this.contact_id = "";
      this.email = "";
      this.name = "";
      this.phone_number = "";
      this.company_contact_type_id = "";
    }
  },
  computed: {
    ...mapGetters(["contact_types"]),
  },
  methods: {
    ...mapActions([
      "getContactTypes",
      "editCompanyContact",
      "addCompanyContact",
    ]),
    handleCompanyContact() {
      if (this.currentState == "Edit") {
        this.editCompanyContact({
          contact_id: this.contact_id,
          company_contact_type_id: this.company_contact_type_id,
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
        });
        this.showModal = false;
      } else {
        this.addCompanyContact({
          company_contact_type_id: this.company_contact_type_id,
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
        });
        this.showModal = false;
      }
    },
  },
};
</script>

<style></style>
