<template>
  <main>
    <div class="text-center text-gray-700 mx-20 my-24">
      <div>
        <div class="flex justify-center m-5">
          <img :src="prohibitedImage" alt="Vue" class="object-fill h-48 w-96" />
        </div>
      </div>
      <h3 class="font-bold text-lg text-slate-700 m-5">We are Sorry !!</h3>
      <h5 class="m-5 text-sm">
        The page you are trying to access has restricted access
      </h5>
      <h6 class="m-2 text-sm">
        Please refer to your System Administrator for Access Rights
      </h6>
      <div class="text-center flex justify-center mt-10">
        <span
          class="rounded-sm py-1 pt-2 px-6 text-center text-white bg-lime-500 font-normal text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          <LogoutIcon class="mr-3" />
          Logout
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import LogoutIcon from "@/components/LogoutIcon.vue";
import prohibitedImage from "@/assets/prohibited.svg";

export default {
  name: "AccessDeniedPage",
  components: { LogoutIcon },
  data() {
    return {
      prohibitedImage: prohibitedImage,
    };
  },
};
</script>

<style></style>
