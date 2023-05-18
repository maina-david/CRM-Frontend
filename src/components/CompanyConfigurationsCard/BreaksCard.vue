<template>
  <div>
    <div class="mt-5 m-3">
      <TextBox
        v-model="name"
        type="text"
        label="Name of the break"
        placeholder=""
      />
      <TextBox
        v-model="description"
        type="text"
        label="Description of the break"
        placeholder=""
      /><TextBox
        v-model="minutes"
        type="number"
        label="Length of the break in minutes"
        placeholder=""
      />
      <TextBox
        v-model="breaks"
        type="number"
        label="Number of breaks agent can take per day"
        placeholder=""
      />

      <ActionButton text="Submit" />
    </div>
  </div>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
export default {
  components: { TextBox, ActionButton },
  data() {
    return {
      minutes: 0,
      breaks: 0,
    };
  },
};
</script>

<style></style>
