<template>
  <div>
    <div class="app relative flex min-h-screen">
      <div class="mr-0 fixed top-16">
        <SideBar />
      </div>

      <div class="flex-1">
        <NavBar />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Sidebars/QualityAssuranceSidebar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "QAHome",
  components: {
    SideBar,
    NavBar,
  },
};
</script>
