<template>
  <div class="mt-10"><MOHCard /></div>
</template>

<script>
import MOHCard from "../components/cards/ContactCenterCards/MOHCard.vue";

export default {
  name: "MOH",
  data() {
    return { moh: true };
  },
  components: { MOHCard },
};
</script>

<style></style>
