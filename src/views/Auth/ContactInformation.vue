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
                Contact Information
              </h4>
              <p class="text-sm mb-12">Enter your contact information</p>
            </div>
            <form class="grid justify-center">
              <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                <TextBox
                  placeholder="Name"
                  label="Name"
                  type="text"
                  v-model="contactsName"
                />
                <TextBox
                  placeholder="Email"
                  label="Email"
                  type="email"
                  v-model="contactsEmail"
                />
              </div>
              <div class="mb-4 ml-3 grid grid-cols-2 gap-4">
                <Dropdown
                  select="Contact Type"
                  label="Contact Type"
                  :options="contact_types"
                  v-model="contactsCompanyContactTypeId"
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
                      v-model="contactsPhone"
                      class="form-control block w-80 px-5 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-row pt-1 mb-5 mt-2 pb-1">
                <ActionButton text="Back" @click.prevent="handleBack" />
                <ActionButton
                  text="Submit"
                  @click.prevent="handleCreateCompany"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: "CompanyInformation",
  components: { TextBox, ActionButton, Dropdown },
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
    this.getContactTypes();
    if (localStorage.getItem("company_setup_info")) {
      const existingData = JSON.parse(
        localStorage.getItem("company_setup_info")
      );
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
    }
  },
  computed: {
    ...mapGetters(["contact_types"]),
  },
  methods: {
    ...mapActions(["getContactTypes", "companySetup"]),
    handleCreateCompany() {
      console.log("submitting track");
      this.companySetup({
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
      });
    },
    handleBack() {
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
      router.push({ name: "CompanySetup" });
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 6rem;
}
</style>
