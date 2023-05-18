<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Upload Audio File</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <BulkAudioUpload />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import BulkAudioUpload from "../../BulkAudioUpload.vue";

export default {
  name: "CreateMOHFile",
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
  components: { BulkAudioUpload },
  created() {
    this.getAudioIvr();
  },
  computed: {
    ...mapGetters(["ivr", "ivrAudios"]),
  },
  methods: {
    ...mapActions(["getAudioIvr"]),
  },
};
</script>

<style></style>
