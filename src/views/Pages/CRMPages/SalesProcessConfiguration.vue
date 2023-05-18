<template>
  <main>
    <div class="ml-12">
      <div class="flex justify-between mt-10 border-b">
        <div class="">
          <h2 class="font-bold text-xl p-3">
            Sales Process Configuration(Configure Sales Process)
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mt-10">
        <div class="col-span-1 m-3">
          <CreateSalesConfigurationStep />
        </div>
        <div class="col-span-2 w-full">
          <div>
            <Draggable
              v-model="currentSalesConfiguration"
              group="currentSalesConfiguration"
              @start="drag = true"
              @end="drag = false"
              sort="element.sequence"
              item-key="element.sequence"
            >
              <template #item="{ element }">
                <div
                  class="bg-white flex rounded-sm justify-between shadow-sm p-5 m-3"
                >
                  <div class="text-xs">
                    <div class="font-semibold">{{ element.name }}</div>
                    <div class="mt-3">
                      {{ element.description }}
                    </div>
                    <div class="mt-3">Form : {{ element.form }}</div>
                    <div class="mt-3">SLA : {{ element.sla }}</div>
                  </div>
                  <div>
                    <ActionButton
                      @click="handleDelete(element)"
                      text="Delete"
                      class="bg-red-400"
                    />
                  </div>
                </div>
              </template>
            </Draggable>
          </div>
          <div v-if="reorderButton" class="m-3">
            <ActionButton
              @click="handleReorderConfiguration"
              text="Reorder ConfigurationSales Process Steps"
              class="bg-lime-500"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CreateSalesConfigurationStep from "@/components/cards/CRMCards/CreateSalesConfigurationStep.vue";
import Draggable from "vuedraggable";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: { CreateSalesConfigurationStep, Draggable, ActionButton },
  data() {
    return {
      currentConfigurations: [
        {
          name: "Lead Stage",
          description:
            "This is the Lead Stage's Sales Process Step. Placed Here for Test Purposes",
          form: "Form 1",
          sla: "12 Hours",
          sequence: 1,
        },
        {
          name: "Demonstration Stage",
          description:
            "This is the Demonstration Stage's Sales Process Step. Placed Here for Test Purposes",
          form: "Form 34",
          sla: "3 Hours",
          sequence: 2,
        },
        {
          name: "Quotation Stage",
          description:
            "This is the Quotation Stage's Sales Process Step. Placed Here for Test Purposes",
          form: "Form 1",
          sla: "5 Hours",
          sequence: 3,
        },
      ],
      currentSalesConfiguration: [],
      orderedConfigurationSteps: [],
      reorderButton: false,
    };
  },
  created() {
    this.currentSalesConfiguration = this.currentConfigurations;
    this.currentSalesConfiguration = this.currentSalesConfiguration.sort(
      (a, b) => a.sequence - b.sequence
    );
  },
  watch: {
    currentSalesConfiguration: function (val) {
      this.reorderButton = true;
      for (const [i, value] of val.entries()) {
        value.sequence = i + 1;
        console.log("%d: %s", i + 1, value.name);
      }
      this.orderedConfigurationSteps = val.map((file) => {
        return { file_id: file.id, sequence: file.sequence };
      });
    },
    moh: function () {
      this.currentSalesConfiguration = this.currentConfigurations.moh_files;
      this.currentSalesConfiguration = this.currentSalesConfiguration.sort(
        (a, b) => a.sequence - b.sequence
      );
    },
  },

  methods: {
    handleDeleteMohFile(configuration_step) {
      console.log("moh file", configuration_step);
      if (confirm("Confirm Delete " + configuration_step.name + "?") == true) {
        this.deleteMohFile({
          moh_file_id: configuration_step.id,
        });
      } else {
        console.log("deleting cancelled");
      }
    },
    handleReorderConfiguration() {
      this.reorderMohFile({
        currentConfigurations: this.orderedConfigurationSteps,
      });
      this.reorderButton = false;
    },
  },
};
</script>

<style></style>
