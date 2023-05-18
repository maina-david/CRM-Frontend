<template>
  <section class="h-full gradient-form md:h-screen">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="lg:w-7/12 px-4 md:px-0 justify-center">
        <div class="md:p-12 md:mx-2 md:my-2">
          <div
            class="block bg-white shadow-lg rounded-lg py-10 md:py-10 md:px-4 px-4"
          >
            <div class="text-center justify-center">
              <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />
              <h4 class="text-xl font-semibold mt-1 mb-4 pb-1">
                Company Setup
              </h4>
              <p class="text-sm mb-12">Please setup your company below</p>
            </div>
            <form class="grid justify-center">
              <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                <TextBox
                  placeholder="Company Name"
                  label="Company Name"
                  type="text"
                  v-model="companyName"
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
                  select="Preferred language"
                  label="Preferred language"
                  :options="languages"
                  v-model="preferredLanguage"
                />
                <div>
                  <label
                    for="number"
                    class="form-label text-sm inline-block mb-0 text-gray-700"
                    >Phone No.</label
                  >
                  <div class="flex flex-row mt-4 mr-5">
                    <select
                      v-model="countryCode"
                      class="form-select block w-32 px-2 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="" disabled>(***)</option>
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
              </div>
              <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                <TextBox
                  placeholder="City"
                  label="City"
                  type="text"
                  v-model="city"
                />
                <TextBox
                  placeholder="Office Number"
                  label="Office Number"
                  type="text"
                  v-model="officeNumber"
                />
              </div>
              <div class="mb-4">
                <TextArea
                  label="Additional Information"
                  placeholder="Enter Additional Information"
                  v-model="additionalInfo"
                />
              </div>

              <div class="flex flex-row mb-4">
                <ImageUpload
                  label="Upload your logo in SVG."
                  @imageUrl="imageUrl"
                />
                <div v-if="image_url">
                  <img
                    :src="image_url"
                    alt="Uploaded Logo"
                    class="object-contain h-48 w-48"
                  />
                </div>
              </div>
              <div class="pt-1 mb-5 mt-2 pb-1">
                <ActionButton text="Next" @click.prevent="handleSetTrack" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Dropdown from "@/components/Dropdown.vue";
import TextArea from "@/components/TextArea.vue";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "CompanySetup",
  components: { TextBox, ActionButton, Dropdown, TextArea, ImageUpload },
  data() {
    return {
      logoUrl: logoUrl,
      companyName: "",
      image_url: "",
      email: "",
      countryCode: "",
      preferredLanguage: "",
      phoneNo: "",
      city: "",
      officeNumber: "",
      additionalInfo: "",
      contactsCompanyContactTypeId: "",
      contactsName: "",
      contactsEmail: "",
      contactsPhone: "",
    };
  },
  created() {
    if (localStorage.getItem("company_setup_info")) {
      const existingData = localStorage.getItem("company_setup_info");

      console.log(existingData);
      this.companyName = existingData?.company_name;
      this.preferredLanguage = existingData?.prefered_language;
      this.image_url = existingData?.logo;
      if (!existingData?.address) {
        console.log("No new address");
      } else {
        this.countryCode = existingData?.address?.country_code;
        this.phoneNo = existingData?.address?.phone;
        this.email = existingData?.address?.email;
        this.city = existingData?.address?.city;
        this.officeNumber = existingData?.address?.office_number;
        this.additionalInfo = existingData?.address?.additional_information;
      }
      if (!existingData?.contacts) {
        console.log("No new contact");
      } else {
        this.contactsCompanyContactTypeId =
          existingData?.contacts[0].company_contact_type_id;
        this.contactsName = existingData?.contacts[0].name;
        this.contactsEmail = existingData?.contacts[0].email;
        this.contactsPhone = existingData?.contacts[0].phone_number;
      }
    } else {
      const items = localStorage.setItem(
        "company_setup_info",
        JSON.stringify({})
      );
      console.log(items);
    }
    this.getLanguages();
    this.getCountryCodes();
  },
  computed: {
    ...mapGetters(["languages", "country_codes", "errorSetup"]),
  },
  methods: {
    ...mapActions(["getLanguages", "getCountryCodes"]),
    handleSetTrack() {
      var company_setup_info = {
        company_name: this.companyName,
        prefered_language: this.preferredLanguage,
        logo: this.image_url,
        address: {
          country_code: this.countryCode,
          phone: this.phoneNo,
          email: this.email,
          city: this.city,
          office_number: this.officeNumber,
          additional_information: this.additionalInfo,
        },
        contacts: [
          {
            company_contact_type_id: this.contactsCompanyContactTypeId,
            name: this.contactsName,
            email: this.contactsEmail,
            phone_number: this.contactsPhone,
          },
        ],
      };
      localStorage.setItem(
        "company_setup_info",
        JSON.stringify(company_setup_info)
      );
      router.push({ name: "ContactInformation" });
    },
    imageUrl(url) {
      this.image_url = url;
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 6rem;
}
</style>
