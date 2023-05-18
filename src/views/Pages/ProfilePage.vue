<template>
  <main>
    <div class="mt-10 flex flex-row justify-evenly w-full h-full text-gray-800">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <UserInformationCard class="my-2"></UserInformationCard>
          <ResetPasswordCard class="my-2" />
        </div>
        <div class="col-span-2"><NotificationsCard class="" /></div>
      </div>
    </div>
  </main>
  <DialerModal :show="showDialerModal" />
</template>

<script>
import { ref } from "vue";
import UserInformationCard from "@/components/cards/ContactCenterCards/UserInformationCard.vue";
import ResetPasswordCard from "@/components/cards/ContactCenterCards/ResetPasswordCard.vue";
import NotificationsCard from "@/components/cards/ContactCenterCards/NotificationsCard.vue";

export default {
  components: { UserInformationCard, ResetPasswordCard, NotificationsCard },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
  },
};
</script>

<style></style>
