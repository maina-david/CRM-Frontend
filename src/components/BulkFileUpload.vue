<template>
  <div>
    <div class="max-w-xl">
      <TextBox
        type="text"
        placeholder="Enter  File Name"
        label="File Name"
        v-model="name"
      />

      <Radio
        label="Choose file type: "
        :options="fileTypeOptions"
        v-model="file_type"
      />

      <label
        v-if="file_type"
        class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <span class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span class="font-medium text-gray-600">
            Drop
            {{
              file_type == "image/*"
                ? "Image"
                : file_type == "audio/*"
                ? "Audio"
                : file_type == "video/*"
                ? "Video"
                : "Document"
            }}
            to Attach, or
            <span class="text-blue-600 underline">browse</span>
          </span>
        </span>
        <input
          type="file"
          name="file_upload"
          class="hidden"
          :accept="file_type"
          @change="onFilePicked"
        />
      </label>
      <div>
        <ActionButton
          v-if="isLoaded"
          text="Upload Media File"
          @click="handleUploadMedia"
        />
        <ButtonLoading v-if="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import Radio from "@/components/Radio.vue";
import ButtonLoading from "@/components/loaders/ButtonLoading.vue";

export default {
  data() {
    return {
      name: "",
      isLoaded: false,
      isLoading: false,
      file_type: "",
      file_upload: "",
      fileTypeOptions: [
        { label: "image", value: "image/*" },
        {
          label: "document",
          value:
            ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
        { label: "audio", value: "audio/*" },
        { label: "video", value: "video/*" },
      ],
    };
  },
  components: { TextBox, ActionButton, Radio, ButtonLoading },
  methods: {
    loaded() {
      this.isLoaded = true;
      this.isLoading = false;
    },
    loading() {
      this.isLoading = true;
      this.isLoaded = false;
    },
    ...mapActions(["uploadChatBotFiles"]),
    handleUploadMedia() {
      var uploadFileType =
        this.file_type == "image/*"
          ? "image"
          : this.file_type == "audio/*"
          ? "audio"
          : this.file_type == "video/*"
          ? "video"
          : "document";
      this.file_upload = this.file_upload.replace(/\s/g, "_");
      this.uploadChatBotFiles({
        chatbot_files: [
          {
            name: this.name,
            file_type: uploadFileType,
            file_url: this.file_upload,
          },
        ],
      });
      this.name = "";
      this.file_upload = "";
    },
    onFilePicked(e) {
      console.log("target test", e);
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
          "call_center/media/" +
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
          this.file_upload =
            "https://goipspace.fra1.digitaloceanspaces.com/" + bucketParams.Key;
          this.$emit("imageUrl", this.file_upload);
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
