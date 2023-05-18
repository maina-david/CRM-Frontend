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
                    Edit Company Information
                  </h4>
                </div>
                <form class="grid justify-center">
                  <TextBox
                    placeholder="Company Name"
                    label="Company Name"
                    type="text"
                    v-model="companyName"
                  />
                  <Dropdown
                    select="Preferred language"
                    label="Preferred language"
                    :options="languages"
                    v-model="preferedLanguage"
                  />

                  <div class="mb-4 w-full">
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
                  <div class="pt-1 mt-2 pb-1">
                    <ActionButton
                      text="Edit Company Info"
                      @click.prevent="handleUpdateCompanyInfo"
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
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "EditCompanyInfo",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    existingCompanyInfo: {
      type: Object,
      required: true,
    },
  },
  components: { TextBox, ActionButton, Dropdown, ImageUpload },
  data() {
    return {
      logoUrl: logoUrl,
      image_url: "",
      companyName: "",
      preferedLanguage: "",
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
  updated() {
    this.companyName = this.existingCompanyInfo.companyName;
    this.preferedLanguage = this.existingCompanyInfo.preferedLanguage;
    this.image_url = this.existingCompanyInfo.companyLogo;
    this.getLanguages();
  },
  computed: {
    ...mapGetters(["languages"]),
  },
  methods: {
    ...mapActions(["getLanguages", "editCompanyInfo"]),
    handleUpdateCompanyInfo() {
      this.editCompanyInfo({
        name: this.companyName,
        prefered_language: this.preferedLanguage,
        logo: this.image_url,
      });
      this.showModal = false;
    },
    imageUrl(url) {
      this.image_url = url;
    },
  },
};
</script>

<style></style>
