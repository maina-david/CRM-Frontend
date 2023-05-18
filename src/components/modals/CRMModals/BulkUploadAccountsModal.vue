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
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{ state == "Edit" ? "Edit Account" : "Bulk Upload Account" }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <p>
                  <download-excel
                    class="btn col text-left text-xs mb-2"
                    style="color: blue"
                    :data="json_data"
                    :fields="json_fields"
                    worksheet="Groups"
                    name="groups.xlsx"
                  >
                    Download Excel Format to Upload
                  </download-excel>
                </p>
                <section>
                  <input
                    class="block mb-5 w-full text-xs text-gray-900 bg-white rounded-sm border border-gray-300 cursor-pointer p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="small_size"
                    type="file"
                    @change="onChange"
                  />

                  <xlsx-read :file="file">
                    <xlsx-json @parsed="jsondata"> </xlsx-json>
                  </xlsx-read>
                </section>
                <Dropdown
                  select="Select Account Type"
                  label="Select Account Type"
                  :options="selectAccountTypes"
                  v-model="bulkAccountId"
                />
                <ActionButton
                  text="Add Accounts"
                  class="mt-5"
                  @click.prevent="handleCreateBulkInvite"
                />
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
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccount: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateForm",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      bulkAccountId: "",
      selectAccountTypes: [
        { label: "Account Type 1", value: "Account Type 1" },
        { label: "Account Type 2", value: "Account Type 2" },
      ],
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
};
</script>

<style></style>
