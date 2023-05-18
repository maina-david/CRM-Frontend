<template>
  <section class="h-full gradient-form md:h-screen">
    <div
      class="flex justify-center items-center flex-wrap m-5 bg-white rounded-sm overflow-hidden shadow-sm p-4"
    >
      <div class="lg:w-4/12 px-4 md:px-0 justify-center">
        <div class="md:p-12 md:mx-2 md:my-2">
          <div class="block b py-10 md:py-10 md:px-4 px-4">
            <div class="justify-center">
              <div class="text-center">
                <img :src="empty" class="w-48 h-48 self-center" />
              </div>
              <div class="mt-10 text-center">
                <h3 class="text-sm">{{ message }}</h3>
              </div>
              <ActionButton
                @click="showModal = !showModal"
                :text="text"
                class="mt-5"
              />
            </div>
          </div>
        </div>
      </div>
      <CreateChatModal :show="showModal" />
    </div>
  </section>
</template>

<script>
import empty from "@/assets/empty.svg";
import ActionButton from "./ActionButton.vue";
import { ref } from "vue";
import CreateChatModal from "./modals/ChatModals/CreateChatModal.vue";

export default {
  name: "EmptyChat",
  props: ["message"],
  data() {
    return { empty: empty, text: "Create" };
  },
  components: { ActionButton, CreateChatModal },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
};
</script>

<style></style>
