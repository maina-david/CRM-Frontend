<template>
  <div class="w-full mt-10">
    <div class="bg-white rounded-sm shadow-sm p-4">
      <KnowledgeBase />
    </div>
  </div>
</template>

<script>
import KnowledgeBase from "@/components/KnowledgeBase.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AssignedReviews",
  data() {
    return {};
  },
  components: {
    KnowledgeBase,
  },
};
</script>

<style></style>
