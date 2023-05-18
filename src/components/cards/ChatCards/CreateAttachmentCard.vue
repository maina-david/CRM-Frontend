<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Upload File</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <BulkFileUpload />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";
import BulkFileUpload from "@/components/BulkFileUpload.vue";

export default {
  name: "CreateFile",
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
  components: { BulkFileUpload },
  computed: {},
  methods: {},
};
</script>

<style></style>
