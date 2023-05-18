<template>
  <div class="bg-white overflow-hidden shadow-sm">
    <TextBox
      type="text"
      placeholder="Enter Audio File Name"
      label="Audio File Name"
      v-model="name"
    />
    <div class="flex mt-3">
      <div class="rounded-sm w-full">
        <div class="">
          <label class="inline-block mb-2 text-gray-500">{{ audio_url }}</label>
          <div class="flex items-center border-gray-300 justify-center w-full">
            <label
              class="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300"
            >
              <div
                class="flex flex-col w-full items-center justify-center pt-7"
              >
                <span class="material-icons text-gray-500">audio_file</span>
                <p
                  v-if="audio_url"
                  class="pt-1 text-xs text-gray-400 group-hover:text-gray-600"
                >
                  Update Audio Files
                </p>
                <p
                  v-else
                  class="pt-1 text-xs text-gray-400 group-hover:text-gray-600"
                >
                  Upload audio files
                </p>
              </div>
              <input
                type="file"
                class="opacity-0 w-full"
                accept="audio/*"
                @change="onFilePicked"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ActionButton
        v-if="isLoaded"
        text="Upload Music File"
        @click="handleUploadivrs"
      />
      <ButtonLoading v-if="isLoading" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import TextBox from "./TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import ButtonLoading from "@/components/loaders/ButtonLoading.vue";

export default {
  name: "AudioUpload",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  components: { TextBox, ActionButton, ButtonLoading },
  data() {
    return {
      audio_url: "",
      name: "",
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
    ...mapActions(["uploadAudioIvr"]),
    handleUploadivrs() {
      this.audio_url = this.audio_url.replace(/\s/g, "_");
      this.uploadAudioIvr({
        ivr_files: [
          {
            name: this.name,
            file_url: this.audio_url,
          },
        ],
      });
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
          "call_center/IVR_Files/" +
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
          this.audio_url =
            "https://goipspace.fra1.digitaloceanspaces.com/" + bucketParams.Key;
          this.$emit("imageUrl", this.audio_url);
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
};
</script>

<style></style>
