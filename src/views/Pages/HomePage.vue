<template>
  <main>
    <div class="flex justify-between p-3 bg-white">
      <div></div>
      <div class="p-2"><LogoutIcon /></div>
    </div>
    <div class="text-center my-20">
      <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto w-36 h-42" />
      <h1 class="mb-4 text-lg font-semibold">
        Welcome to GoIP Cloud Call Center.
      </h1>
      <h3 class="font-normal text-md">
        Which module would you like to access?
      </h3>
      <div class="grid grid-cols-4 mt-12 gap-6 justify-center mx-10">
        <div>
          <router-link :to="{ name: 'AgentDashboard' }">
            <HomePageCard module="Contact Center" />
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'AccountTypes' }">
            <HomePageCard module="Customer Relation Management (CRM)" />
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'CaseManagementDashboard' }">
            <HomePageCard module="Case Management" />
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'ChatAdminDashboard' }">
            <HomePageCard module="Chat Desk" />
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'WorkflowManagement' }">
            <HomePageCard module="Workflow Management" />
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'MyReviews' }">
            <HomePageCard module="Quality Assurance Management" />
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import logoUrl from "@/assets/logo.svg";
import HomePageCard from "@/components/HomePageCard.vue";
import LogoutIcon from "@/components/LogoutIcon.vue";

export default {
  name: "HomePage",
  data() {
    return {
      logoUrl: logoUrl,
    };
  },
  components: { HomePageCard, LogoutIcon },
};
</script>
