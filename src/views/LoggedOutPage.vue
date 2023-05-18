<template>
  <main>
    <div class="text-center my-28">
      <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />
      <h1 class="mb-4 text-xl">
        Oops, it looks like the page you're looking for doesn't exist.
      </h1>
      <img :src="locked" alt="Locked" />

      <router-link :to="{ name: 'LogIn' }" replace>
        <h3 class="m-4 text-blue-700 hover:text-lg hover:text-blue-900">
          Log Back In
        </h3>
      </router-link>
    </div>
  </main>
</template>

<script>
import logoUrl from "@/assets/logo.svg";
import locked from "@/assets/locked.svg";

export default {
  name: "NotFound",
  data() {
    return {
      logoUrl: logoUrl,
      locked: locked,
    };
  },
};
</script>
