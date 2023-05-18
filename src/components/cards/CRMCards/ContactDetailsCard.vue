<template>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between py-2">
      <div>
        <h2 class="font-bold text-lg py-2">Contacts</h2>
      </div>
      <div>
        <ActionButton
          @click="showCreateContactModal = !showCreateContactModal"
          text="Create Contact"
        />
      </div>
    </div>
    <div class="mt-5">
      <div class="grid grid-cols-4 gap-3">
        <div v-for="contact in allContacts" :key="contact.id">
          <div class="flip">
            <div class="flip-content bg-slate-100 shadow-md">
              <div class="mt-4 flex justify-center">
                <span class="material-icons text-slate-700"
                  >account_circle</span
                >
              </div>
              <div class="flip-back">
                <div class="flex flex-col text-center mt-5">
                  <div v-for="contact_set in contact" :key="contact_set">
                    <div
                      v-for="(value, key) in contact_set"
                      :key="key"
                      class="bg-slate-100 flex"
                    >
                      <h3 class="text-sm font-semibold">{{ key }} :</h3>
                      <h4 class="text-sm font-medium">
                        {{ value }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="flip-front">
                  <div class="">
                    <strong>{{ contact.last_name }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateContactModal :show="showCreateContactModal" />
</template>

<script>
import { ref } from "vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";

export default {
  props: {
    allContacts: { type: Array },
  },
  setup() {
    const showCreateContactModal = ref(false);
    return {
      showCreateContactModal,
    };
  },
  components: { CreateContactModal },
};
</script>

<style>
.flip {
  width: 200px;
  height: 200px;
  text-align: center;
  perspective: 600px;
}
.flip-content {
  width: 100%;
  height: 100%;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}
.flip:hover .flip-content {
  transform: rotateY(180deg);
  transition: transform 0.3s;
}
.flip-front,
.flip-back {
  position: absolute;
  height: 100%;
  width: 100%;
  line-height: 200px;
  backface-visibility: hidden;
}
.flip-back {
  transform: rotateY(180deg);
}
</style>
