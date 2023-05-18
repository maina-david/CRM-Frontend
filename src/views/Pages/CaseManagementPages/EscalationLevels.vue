<template>
  <main>
    <div class="ml-12">
      <div class="flex justify-between mt-10 border-b">
        <div class="">
          <h2 class="font-bold text-xl p-3">
            Escalation Levels for {{ currentEscalationPoint.name }}
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mt-10">
        <div class="col-span-1">
          <CreateEscalationLevelCard />
        </div>
        <div class="col-span-2 w-full">
          <div>
            <Draggable
              v-model="currentEscalationLevels"
              group="currentEscalationLevels"
              @start="drag = true"
              @end="drag = false"
              sort="element.sequence"
              item-key="element.sequence"
            >
              <template #item="{ element }">
                <div
                  class="bg-white rounded-sm justify-between shadow-sm p-5 m-3"
                >
                  <div class="text-xs">
                    <div class="flex justify-between">
                      <div class="font-semibold my-4">
                        Name: {{ element.name }}
                      </div>
                      <div class="flex gap-4">
                        <ActionButton text="Edit" />
                        <ActionButton text="Delete" class="bg-red-400" />
                      </div>
                    </div>

                    <div class="my-4">
                      Attached Form: {{ element.form.name }}
                    </div>
                    <div class="my-4">
                      Assigned Help Desk: {{ element.helpdesk.name }}
                    </div>
                    <div class="my-4">
                      Service Level Agreement: {{ element.sla }}
                      {{ element.sla_measurement }}
                    </div>
                  </div>
                </div>
              </template>
            </Draggable>
          </div>
          <div v-if="reorderButton" class="m-3">
            <ActionButton text="Reorder Files" class="bg-lime-500" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CreateEscalationLevelCard from "@/components/cards/CaseManagementCards/CreateEscalationLevelCard.vue";
import Draggable from "vuedraggable";
import ActionButton from "@/components/ActionButton.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  watch: {
    ticketEscalationLevels() {
      this.currentEscalationLevels = this.ticketEscalationLevels;
      console.log("getting escalation levels", this.currentEscalationLevels);
    },
  },
  computed: {
    ...mapGetters(["ticketEscalationLevels"]),
  },
  methods: { ...mapActions(["getEscalationLevel"]) },
  created() {
    this.currentEscalationPoint = JSON.parse(
      localStorage.getItem("escalation_point_current")
    );
    console.log("this is the new level", this.currentEscalationPoint);
    this.getEscalationLevel({
      escalation_point_id: this.currentEscalationPoint.id,
    });
    console.log("logging found", this.ticketEscalationLevels);
  },

  components: {
    CreateEscalationLevelCard,
    Draggable,
    ActionButton,
  },
  data() {
    return {
      currentMOH: {},
      getting_escalation: false,
      currentEscalationPoint: "",
      audioUrl: "",
      currentEscalationLevels: [],
      orderedEscalationLevels: [],
      reorderButton: false,
    };
  },
};
</script>

<style></style>
