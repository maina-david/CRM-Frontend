<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{
                    state == "Create"
                      ? "Create Campaign"
                      : state == "Edit"
                      ? "Edit Campaign"
                      : ""
                  }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <TextBox
                  type="text"
                  placeholder="Enter Name"
                  label="Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Enter Description"
                  label="Description"
                  v-model="description"
                />
                <Dropdown
                  select="Select Campaign Type"
                  :options="selectCampaignType"
                  v-model="campaignType"
                  label="Select Campaign Type"
                />
                <div class="mt-3" v-if="campaignType == 'AGENTLED'">
                  <Dropdown
                    select="Select Campaign Queue"
                    :options="selectQueues"
                    v-model="campaignQueue"
                    label="Campaign Queue"
                  />
                  <Dropdown
                    select="Select DID"
                    :options="selectAllocatedDids"
                    v-model="did"
                    label="DID"
                  />
                </div>
                <div class="mt-3" v-if="campaignType == 'SMSCAMPAIGN'">
                  <Dropdown
                    select="Select Sender ID"
                    :options="selectSenderId"
                    v-model="senderId"
                    label="Sender Id"
                  />
                  <TextArea
                    type="text"
                    placeholder="Compose your message here ..."
                    label="Compose Message"
                    v-model="smsMessage"
                  />
                </div>
                <div class="mt-3" v-if="campaignType == 'VOICEBROADCAST'">
                  <BulkCampaignAudioUpload
                    label="Upload Campaign Audio File"
                    @audioUrl="handleAudioUrl"
                  />
                  <Dropdown
                    select="Select DID"
                    :options="selectAllocatedDids"
                    v-model="did"
                    label="DID"
                  />
                </div>
                <ActionButton
                  @click="handleCampaign"
                  :text="
                    state == 'Edit' ? 'Update Campaign' : 'Create Campaign'
                  "
                  class="mt-10"
                />
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import TextArea from "@/components/TextArea.vue";
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";
import BulkCampaignAudioUpload from "@/components/BulkCampaignAudioUpload.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentCampaign: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateCampaignModal",
  props,
  components: {
    TextBox,
    TextArea,
    ActionButton,
    Dropdown,
    BulkCampaignAudioUpload,
  },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      campaignType: "",
      campaignQueue: "",
      did: "",
      senderId: "",
      smsMessage: "",
      audioUrl: "",
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
    };
  },
  created() {
    this.getCampaignType();
  },
  updated() {
    if (this.state == "Edit") {
      this.id = this.currentCampaign.id;
      this.name = this.currentCampaign.name;
      this.description = this.currentCampaign.description;
    } else {
      this.id = "";
      this.name = "";
      this.description = "";
      this.campaignType = "";
    }
  },
  watch: {
    campaignType: function (val) {
      if (val == "AGENTLED") {
        this.getQueues();
        this.getAllocatedDids();
      } else if (val == "SMSCAMPAIGN") {
        this.getSenderId();
      } else if (val == "VOICEBROADCAST") {
        this.getAllocatedDids();
      } else {
        console.log("campaign type doesnt exist");
      }
    },
  },
  methods: {
    ...mapActions([
      "getCampaignType",
      "createCampaign",
      "updateCampaign",
      "getQueues",
      "getSenderId",
      "getAllocatedDids",
    ]),
    handleAudioUrl(url) {
      this.audioUrl = url;
    },
    handleCampaign() {
      if (this.state == "Edit") {
        this.updateCampaign({
          campaign_id: this.id,
          name: this.name,
          description: this.description,
        });
      } else {
        if (this.campaignType == "AGENTLED") {
          this.createCampaign({
            campaign_type_id: this.campaignType,
            name: this.name,
            description: this.description,
            queue_id: this.campaignQueue,
            did_id: this.did,
          });
        } else if (this.campaignType == "SMSCAMPAIGN") {
          this.createCampaign({
            campaign_type_id: this.campaignType,
            name: this.name,
            description: this.description,
            sms_message: this.smsMessage,
            sender_id: this.senderId,
          });
        } else if (this.campaignType == "VOICEBROADCAST") {
          this.createCampaign({
            campaign_type_id: this.campaignType,
            name: this.name,
            description: this.description,
            audio_url: this.audioUrl,
            did_id: this.did,
          });
        } else {
          console.log("campaign type doesnt exist");
        }
      }
      this.id = "";
      this.name = "";
      this.description = "";
      this.campaignType = "";
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters([
      "selectCampaignType",
      "selectQueues",
      "selectSenderId",
      "selectAllocatedDids",
    ]),
  },
};
</script>

<style></style>
