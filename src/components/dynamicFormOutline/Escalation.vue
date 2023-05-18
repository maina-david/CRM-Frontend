<template>
  <div class="flex flex-row border-b-2">
    <Radio
      :options="[
        {
          label: optionChild.name,
          value: optionChild.tree_id,
        },
      ]"
    >
    </Radio>
    <div
      v-if="optionChild.child && optionChild.child.length"
      class="ml-4 w-fit"
    >
      <div v-for="item in optionChild.child" :key="item.tree_id">
        <Escalation :optionChild="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "@/components/Radio.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Escalation",
  props: {
    optionChild: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  components: {
    Radio,
  },
};
</script>

<style></style>
