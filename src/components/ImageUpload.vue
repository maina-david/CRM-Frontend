<template>
  <div class="flex mt-3">
    <div class="rounded-sm">
      <div class="">
        <label class="inline-block mb-2 text-gray-500">{{ label }}</label>
        <div class="flex items-center border-gray-300 justify-center w-full">
          <label
            class="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300"
          >
            <div class="text-center my-10" v-if="isLoading">
              <LoaderSpinner />
            </div>
            <div
              class="flex flex-col w-full items-center justify-center pt-7"
              v-else
            >
              <span class="material-icons">image</span>
              <p
                v-if="id_link"
                class="pt-1 text-sm text-gray-400 group-hover:text-gray-600"
              >
                Update photo
              </p>
              <p
                v-else
                class="pt-1 text-sm text-gray-400 group-hover:text-gray-600"
              >
                Upload a photo
              </p>
            </div>
            <input
              type="file"
              class="opacity-0 w-full"
              accept="image/*"
              @change="onFilePicked"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import LoaderSpinner from "./loaders/LoaderSpinner.vue";

export default {
  name: "ImageUpload",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id_link: "",
      isLoaded: false,
      isLoading: false,
    };
  },
  methods: {
    loaded() {
      this.isLoaded = true;
      this.isLoading = false;
    },
    loading() {
      this.isLoading = true;
      this.isLoaded = false;
    },
    onFilePicked(e) {
      const s3Client = new S3({
        endpoint: "https://fra1.digitaloceanspaces.com",
        region: "us-east-1",
        credentials: {
          accessKeyId: "X6TNXYAOJWUDH4JPXRDA",
          secretAccessKey: "rIOLpoWBHi+QQ3NVTMtm6ka+fH17VKu4BieKJFWmxKo",
        },
      });
      const bucketParams = {
        Bucket: "goipspace",
        // Key: "election_uploads/" + Math.round(+new Date() / 1000) + "_" + e.target.files[0].name,
        Key:
          "call_center/company_logos/" +
          Math.round(+new Date() / 1000) +
          "_" +
          e.target.files[0].name.replace(/\s/g, "_"),
        ACL: "public-read",
        Body: e.target.files[0],
      };
      const run = async () => {
        try {
          this.loading();
          const data = await s3Client.send(new PutObjectCommand(bucketParams));
          console.log(
            "Successfully uploaded object: " +
              bucketParams.Bucket +
              "/" +
              bucketParams.Key
          );
          this.id_link =
            "https://goipspace.fra1.digitaloceanspaces.com/" + bucketParams.Key;
          this.$emit("imageUrl", this.id_link);
          this.loaded();
          return data;
        } catch (err) {
          console.log("Upload Image Error", err);
          // this.makeToast("warning", "Id failed to upload. " + err);
        }
      };
      run();
    },
  },
  components: { LoaderSpinner },
};
</script>

<style></style>
