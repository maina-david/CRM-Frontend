<template>
  <div>
    <div
      class="flex-1 p-2 sm:pb-6 justify-between flex flex-col h-max hidden xl:flex"
    >
      <div
        class="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3"
      >
        <template v-if="currentAccountChat.conversation_id">
          <div class="flex items-center space-x-4">
            <Avatar :initials="currentAccountChat.customer_name" />
            <div class="flex flex-col leading-tight">
              <div class="text-1xl mt-1 flex items-center">
                <span class="text-gray-700 mr-3">
                  {{ currentAccountChat.customer_name }}
                </span>
                <span class="text-green-500">
                  <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div class="relative">
            <ActionButton
              text="Actions"
              @click="showDropdown = !showDropdown"
            />
            <template v-if="showDropdown">
              <ul
                class="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg"
              >
                <li class="selector px-4 py-2" @click="handleCloseConversation">
                  Close Conversation
                </li>
                <li class="selector px-4 py-2" @click="handleReturnToQueue">
                  Return to Queue
                </li>
                <li
                  class="selector px-4 py-2"
                  @click="showUserDetailsModal = !showUserDetailsModal"
                >
                  View User Details
                </li>
              </ul>
            </template>
          </div>
        </template>
      </div>

      <!-- MESSAGES START HERE -->
      <template v-if="currentAccountChat.conversation_id">
        <div
          id="messages"
          class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <div class="overflow-y-auto h-96 p-3">
            <div v-for="message in messages" :key="message.message_id">
              <!-- SENDER MSG -->
              <div
                class="chat-message p-2"
                v-if="message.direction == 'OUTGOING'"
              >
                <div class="flex items-end justify-end">
                  <div class="flex align-right">
                    <Avatar :initials="username" />
                  </div>

                  <div class="space-y-2 text-xs max-w-xs mx-2 order-1">
                    <div class="">
                      <span
                        class="px-4 py-2 rounded-xl inline-block rounded-br-none bg-slate-600 text-white"
                      >
                        <div v-if="message.attachment_type == 'image'">
                          <img
                            class="w-64 h-64 rounded-md order-1"
                            :src="message.attachment"
                          />
                        </div>
                        <div v-if="message.attachment_type == 'video'">
                          <video-player
                            :src="message.attachment"
                            controls
                            :loop="false"
                            :volume="1"
                            width="300"
                            height="200"
                            responsive="true"
                          />
                        </div>
                        <div v-if="message.attachment_type == 'audio'">
                          <video-player
                            :src="message.attachment"
                            controls
                            :loop="false"
                            :volume="1"
                            width="300"
                            height="70"
                          />
                        </div>
                        <div v-if="message.attachment_type == 'document'">
                          <VueDocPreview
                            :value="message.attachment"
                            type="office"
                          />
                        </div>
                        <div
                          v-if="message.message_type == 'html'"
                          v-html="message.message"
                        ></div>
                        {{ message.message }}
                      </span>
                      <div class="text-gray-400 text-xs my-2">
                        {{ formatDate(message.created_at) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- RECEIVER MSG -->
              <div class="chat-message p-2" v-else>
                <div class="flex items-end">
                  <div
                    class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
                  >
                    <div class="">
                      <span
                        class="px-4 py-2 rounded-xl inline-block rounded-bl-none bg-slate-200 text-slate-600"
                      >
                        <div v-if="message.attachment_type == 'image'">
                          <img
                            class="w-64 h-64 rounded-md order-1"
                            :src="message.attachment"
                          />
                        </div>
                        <div v-if="message.attachment_type == 'video'">
                          <video-player
                            :src="message.attachment"
                            controls
                            :loop="false"
                            :volume="1"
                            width="300"
                            height="200"
                            responsive="true"
                          />
                        </div>
                        <div v-if="message.attachment_type == 'audio'">
                          <video-player
                            :src="message.attachment"
                            controls
                            :loop="false"
                            :volume="1"
                            width="300"
                            height="70"
                          />
                        </div>
                        <div v-if="message.attachment_type === 'document'">
                          this is a document
                        </div>
                        {{ message.message }}
                      </span>
                      <div class="text-gray-400 text-xs my-2">
                        {{ formatDate(message.created_at) }}
                      </div>
                    </div>
                  </div>
                  <Avatar :initials="currentAccountChat.customer_name" />
                </div>
              </div>
            </div>
          </div>
          <!-- MESSAGES END HERE -->

          <div
            v-if="replyMode == 'text'"
            class="border-t-2 border-gray-200 px-4 pt-4 mb-2"
          >
            <div class="relative flex">
              <span class="mr-4">
                <button
                  @click="handleReplyMode('image')"
                  class="inline-flex items-center justify-center rounded-full h-12 w-12 bg-white transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                >
                  <span class="material-icons text-slate-600">attach_file</span>
                </button>
              </span>
              <input
                v-model="replyMessage"
                @keyup.enter="handleSendReply"
                placeholder="Type something..."
                class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-white rounded-full py-3"
              />
              <span
                @click="handleSendReply"
                class="absolute inset-y-0 right-0 flex items-center"
              >
                <button
                  class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                >
                  <span class="material-icons text-slate-600">send</span>
                </button>
              </span>
            </div>
          </div>
          <div
            v-if="
              replyMode == 'image' ||
              replyMode == 'document' ||
              replyMode == 'audio' ||
              replyMode == 'video'
            "
            class="border-t-2 border-gray-200 px-4 pt-4 mb-2"
          >
            <div class="relative flex justify-between">
              <button
                @click="handleReplyMode('text')"
                class="inline-flex items-center justify-center rounded-full h-12 w-12 bg-white transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
              >
                <span class="material-icons text-slate-600">chat</span>
              </button>

              <span @click="handleReplyMode('document')" class="ml-2">
                <label>
                  <p
                    class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 px-6 bg-white rounded-full py-3 transition duration-500 ease-in-out hover:bg-gray-300"
                  >
                    Attach Document
                  </p>
                  <input
                    type="file"
                    name="file_upload"
                    class="hidden"
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    @change="onFilePicked"
                  />
                </label>
              </span>
              <span @click="handleReplyMode('image')" class="ml-2">
                <label>
                  <p
                    class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 px-6 bg-white rounded-full py-3 transition duration-500 ease-in-out hover:bg-gray-300"
                  >
                    Attach Image
                  </p>
                  <input
                    type="file"
                    name="file_upload"
                    class="hidden"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </label>
              </span>
              <span @click="handleReplyMode('audio')" class="ml-2">
                <label>
                  <p
                    class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 px-6 bg-white rounded-full py-3 transition duration-500 ease-in-out hover:bg-gray-300"
                  >
                    Attach Audio
                  </p>
                  <input
                    type="file"
                    name="file_upload"
                    class="hidden"
                    accept="audio/*"
                    @change="onFilePicked"
                  />
                </label>
              </span>
              <span @click="handleReplyMode('video')" class="ml-2">
                <label>
                  <p
                    class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 px-6 bg-white rounded-full py-3 transition duration-500 ease-in-out hover:bg-gray-300"
                  >
                    Attach Video
                  </p>
                  <input
                    type="file"
                    name="file_upload"
                    class="hidden"
                    accept="video/*"
                    @change="onFilePicked"
                  />
                </label>
              </span>
              <span v-if="isLoaded" @click="handleSendReply" class="ml-2">
                <button
                  class="inline-flex items-center justify-center rounded-full h-12 w-12 bg-white transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                >
                  <span class="material-icons text-slate-600">send</span>
                </button>
              </span>
            </div>
            <ButtonLoading v-if="isLoading" />
          </div>
        </div>
      </template>
    </div>
  </div>
  <ViewAllUserDetailsModal :show="showUserDetailsModal" />
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import Avatar from "@/components/avatar/Avatar.vue";
import ButtonLoading from "@/components/loaders/ButtonLoading.vue";
import ViewAllUserDetailsModal from "@/components/modals/ChatModals/ViewAllUserDetailsModal.vue";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { VideoPlayer } from "@videojs-player/vue";
import moment from "moment";
import "video.js/dist/video-js.css";
import { defineComponent, ref } from "vue";
import VueDocPreview from "vue-doc-preview";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    messages: { type: Object },
    currentAccountChat: { type: Object },
  },
  components: {
    ActionButton,
    Avatar,
    ButtonLoading,
    ViewAllUserDetailsModal,
    VideoPlayer,
    VueDocPreview,
  },
  data() {
    return {
      username: "",
      message: "",
      conversation: "",
      replyMessage: "",
      replyMode: "text",
      isLoaded: false,
      isLoading: false,
      file_upload: "",
      showDropdown: false,
    };
  },
  setup() {
    const showUserDetailsModal = ref(false);
    return {
      showUserDetailsModal,
    };
  },
  created() {
    this.connect();
    this.username = localStorage.getItem("username");
  },
  watch: {
    conversation: function (val) {
      console.log("conversation has changed", val);
      this.getAssignedConversations();
    },
    message: function (val) {
      console.log("message has changed", val);

      console.log(
        "current conversation id",
        this.currentAccountChat.conversation_id,
        val.conversation_id
      );
      if (this.currentAccountChat.conversation_id === val.conversation_id) {
        this.getMessagesInAConversation({
          conversation_id: val.conversation_id,
        });
      } else {
        console.log("no new message to display");
      }
    },
  },
  methods: {
    ...mapActions([
      "getMessagesInAConversation",
      "replyToAConversation",
      "getAssignedConversations",
      "closeAConversation",
      "returnToQueue",
    ]),
    formatDate(date) {
      return moment(date).calendar();
    },
    loaded() {
      this.isLoaded = true;
      this.isLoading = false;
    },
    download_document(url) {
      window.location.href = url;
    },
    loading() {
      this.isLoading = true;
      this.isLoaded = false;
    },
    handleReplyMode(mode) {
      this.replyMode = mode;
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
          "call_center/ChatMedia/" +
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
          this.file_upload = this.file_upload.replace(/\s/g, "_");
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
    handleSendReply() {
      console.log("reply: ", this.replyMessage);
      this.replyToAConversation({
        conversation_id: this.messages[0]?.conversation_id,
        message_type: this.replyMode,
        message: this.replyMessage,
        file_url: this.file_upload,
      });
      this.replyMessage = "";
      this.replyMode = "text";
      this.file_upload = "";
      this.getMessagesInAConversation({
        conversation_id: this.messages[0]?.conversation_id,
      });
    },
    handleCloseConversation() {
      if (
        confirm(
          "Confirm close " +
            this.currentAccountChat.customer_name +
            "'s conversation"
        ) == true
      ) {
        console.log(
          "close this conversation",
          this.currentAccountChat.customer_name
        );
        this.closeAConversation({
          conversation_id: this.messages[0]?.conversation_id,
        });
        this.$emit("resetConversations", true);
      } else {
        console.log("close this conversation cancelled");
      }
    },
    handleReturnToQueue() {
      if (
        confirm(
          "Confirm return " +
            this.currentAccountChat.customer_name +
            "'s conversation to queue"
        ) == true
      ) {
        console.log(
          "return this conversation to queue",
          this.currentAccountChat.customer_name
        );
        this.returnToQueue({
          conversation_id: this.messages[0]?.conversation_id,
        });
        this.$emit("resetConversations", true);
      } else {
        console.log("return this conversation to queue cancelled");
      }
    },
    connect() {
      var userId = localStorage.getItem("userid");
      var conversation = "assigned.conversation." + userId;
      var event = "." + "assigned.conversation." + userId;
      window.Echo.channel(conversation).listen(event, (e) => {
        console.log("i am here for new conversation");
        console.log(e);
        this.conversation = e;
      });
      var conv = "new.conversation.message." + userId;
      var convIdEvent = "." + "new.conversation.message." + userId;
      window.Echo.channel(conv).listen(convIdEvent, (e) => {
        console.log("i am here for new message");
        console.log(e);
        this.message = e;
      });
    },
  },
});
</script>

<style>
.selector:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
