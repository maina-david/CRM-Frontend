<template>
  <main>
    <div class="text-center my-28">
      <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />
      <h1 class="mb-4 text-xl">
        Oops, it looks like the page you're looking for doesn't exist.
      </h1>

      <router-link :to="{ name: 'AgentDashboard' }" replace>
        <h3 class="m-4 text-blue-700 hover:text-lg hover:text-blue-900">
          Go back to Agent Dashboard
        </h3>
      </router-link>
      <!-- <router-link :to="{ name: 'AccountManagement' }" replace>
        <h3 class="m-4 text-blue-700 hover:text-lg hover:text-blue-900">
          Go back to Account Management
        </h3>
      </router-link> -->
      <router-link :to="{ name: 'AdminDashboard' }" replace>
        <h3 class="m-4 text-blue-700 hover:text-lg hover:text-blue-900">
          Go back to Admin Dashboard
        </h3>
      </router-link>
      <router-link :to="{ name: 'HomePage' }" replace>
        <h3 class="m-4 text-blue-700 hover:text-lg hover:text-blue-900">
          Go back to Home
        </h3>
      </router-link>
    </div>
  </main>
</template>

<script>
import logoUrl from "@/assets/logo.svg";

export default {
  name: "NotFound",
  data() {
    return {
      logoUrl: logoUrl,
    };
  },
};
</script>
