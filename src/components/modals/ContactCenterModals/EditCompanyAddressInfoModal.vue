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
                    Edit Company Address
                  </h4>
                </div>
                <form class="grid justify-center">
                  <div>
                    <label
                      for="number"
                      class="form-label text-sm inline-block mb-0 text-gray-700"
                      >Phone No.</label
                    >
                    <div class="flex flex-row mt-4 mr-5">
                      <select
                        v-model="countryCode"
                        class="form-select block w-24 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option selected>(***)</option>
                        <option
                          v-for="option in country_codes"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <input
                        type="phone"
                        placeholder="Phone No."
                        v-model="phoneNo"
                        class="form-control block w-56 px-5 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <TextBox
                    placeholder="Email"
                    label="Email"
                    type="email"
                    v-model="email"
                  />
                  <TextBox
                    placeholder="City"
                    label="City"
                    type="text"
                    v-model="city"
                    class="mb-3"
                  />
                  <TextBox
                    placeholder="Office Number"
                    label="Office Number"
                    type="number"
                    v-model="officeNumber"
                    class="mb-3"
                  />
                  <div class="mb-4">
                    <TextArea
                      label="Additional Information"
                      placeholder="Enter Additional Information"
                      v-model="additionalInfo"
                      class="mb-3"
                    />
                  </div>
                  <div class="pt-1 mt-2 pb-1">
                    <ActionButton
                      @click="handleEditAddress"
                      text="Edit Address"
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
import TextArea from "@/components/TextArea.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  existingCompanyAddressInfo: {
    type: Object,
    required: true,
  },
};
export default {
  name: "EditCompanyInfo",
  props,
  components: { TextBox, ActionButton, TextArea },
  data() {
    return {
      logoUrl: logoUrl,
      countryCode: "",
      phoneNo: "",
      email: "",
      city: "",
      officeNumber: "",
      additionalInfo: "",
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
    this.getCountryCodes();
  },
  updated() {
    this.countryCode = this.existingCompanyAddressInfo.country_code;
    this.phoneNo = this.existingCompanyAddressInfo.phone;
    this.email = this.existingCompanyAddressInfo.email;
    this.city = this.existingCompanyAddressInfo.city;
    this.officeNumber = this.existingCompanyAddressInfo.office_number;
    this.additionalInfo =
      this.existingCompanyAddressInfo.additional_information;
  },
  computed: {
    ...mapGetters(["country_codes"]),
  },
  methods: {
    ...mapActions(["getCountryCodes", "editCompanyAddress"]),
    handleEditAddress() {
      this.editCompanyAddress({
        country_code: this.countryCode,
        phone: this.phoneNo,
        email: this.email,
        city: this.city,
        office_number: this.officeNumber,
        additional_information: this.additionalInfo,
      });
      this.showModal = false;
    },
  },
};
</script>

<style></style>
