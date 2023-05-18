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
//import MainNav from "@/components/MainNav.vue";
import SideBar from "@/components/Sidebars/CampaignSidebar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    SideBar,
    NavBar,
  },
};
</script>
