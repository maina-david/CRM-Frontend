<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Upload Audio File</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <SettingsAudioUpload />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";
import SettingsAudioUpload from "@/components/SettingsAudioUpload.vue";

export default {
  name: "CreateCompanyMusic",
  data() {
    return {
      name: "",
    };
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { SettingsAudioUpload },
};
</script>

<style></style>
