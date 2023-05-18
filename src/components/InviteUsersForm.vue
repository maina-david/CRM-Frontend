<template>
  <div>
    <FileInput />
    <Dropdown :select="select" :options="options" />
  </div>
</template>

<script>
export default {
  name: "InviteUsersForm",
  props: [],
  data() {
    return {
      options: ["Group A", "Group B", "Group C"],
      select: "Add Users to a Group",
    };
  },
};
</script>

<style></style>
