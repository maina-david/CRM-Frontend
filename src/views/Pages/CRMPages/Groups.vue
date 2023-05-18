<template>
  <main>
    <div class="m-10">
      <div class="mt-5 flex justify-between border-b">
        <div class="">
          <h2 class="font-bold text-xl p-3">Groups</h2>
        </div>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-4">
        <div v-for="group in groups" :key="group">
          <GroupCard :form="group" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GroupCard from "@/components/cards/CRMCards/AccountFormCard.vue";

export default {
  name: "CRMGroups",
  components: { GroupCard },
  data() {
    return {
      groups: [
        {
          name: "Group 1",
          description: "This is Linda Tonui's Personal Test Group",
        },
        {
          name: "Group 2",
          description: "This is Linda Tonui's Personal Test Group",
        },
        {
          name: "Group 3",
          description: "This is Linda Tonui's Personal Test Group",
        },
        {
          name: "Group 4",
          description: "This is Linda Tonui's Personal Test Group",
        },
      ],
    };
  },
};
</script>

<style></style>
