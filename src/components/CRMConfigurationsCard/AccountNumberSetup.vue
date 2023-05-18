<template>
  <div>
    <div class="text-xs m-3 border-b">
      <div class="bg-slate-100 shadow-sm rounded-sm my-5 p-3">
        <div v-if="editMode" class="">
          <div class="flex justify-between border-b">
            <div class="">
              <h3 class="py-2">
                <span class="font-semibold"> Account Number Setup </span>
              </h3>
            </div>
            <div @click="editMode = !editMode">
              <span class="material-icons text-sm text-gray-700 ml-3"
                >close</span
              >
            </div>
          </div>
          <div>
            <div class="">
              <TextBox
                v-model="name"
                type="text"
                label="Account Name"
                placeholder="Enter the name of your account"
              />
              <TextBox
                v-model="prefix"
                type="text"
                label="Account Prefix"
                placeholder="Account Prefix"
              />
              <Dropdown
                select="Select Separator"
                label="Select Separator"
                :options="selectSeparator"
                v-model="separator"
              />
            </div>
            <div class="my-3">
              <CheckBox label="Has Number" :checked="has_number" />
              <CheckBox label="Has Characters" :checked="has_character" />
            </div>
            <div class="justify-around">
              <ActionButton
                @click="handleUpdateAccountNumber"
                class="my-5"
                text="Update Account Number"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <div class="flex justify-between border-b">
              <div class="">
                <h3 class="p-2">
                  <span class="font-semibold"> {{ number.name }} </span>
                </h3>
              </div>
              <div @click="handleEditMode">
                <span class="material-icons text-sm text-gray-700">edit</span>
              </div>
            </div>
            <h3 class="p-2">
              Account Name:
              <span> {{ number.name }} </span>
            </h3>
            <h3 class="p-2">
              Account Prefix:
              <span> {{ number.prefix }} </span>
            </h3>
            <h3 class="p-2">
              Separator:
              <span> {{ number.separator }} </span>
            </h3>
            <h3 class="p-2">
              Has Number:
              <span> {{ number.has_number == "1" ? "Yes" : "No" }} </span>
            </h3>
            <h3 class="p-2">
              Has Character:
              <span> {{ number.has_character == "1" ? "Yes" : "No" }} </span>
            </h3>
            <h3 class="p-2">
              Attached Account Types: (<span
                v-for="type in number.account_types"
                :key="type.id"
              >
                {{ type.name }}, </span
              >)
            </h3>
          </div>

          <div class="flex justify-between"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TextBox from "@/components/TextBox.vue";
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";
import CheckBox from "@/components/CheckBox.vue";

export default {
  props: {
    number: { type: Object, required: true },
  },
  components: { TextBox, ActionButton, Dropdown, CheckBox },
  methods: {
    ...mapActions(["updateAccountNumber"]),
    handleUpdateAccountNumber() {
      this.updateAccountNumber({
        account_number_id: this.account_number_id,
        name: this.name,
        prefix: this.prefix,
        has_number: this.has_number,
        has_character: this.has_character,
        separator: this.separator,
      });
      this.editMode = false;
    },
    handleEditMode() {
      this.editMode = !this.editMode;
    },
  },
  data() {
    return {
      account_number_id: "",
      name: "",
      prefix: "",
      has_number: false,
      has_character: false,
      separator: "",
      editMode: false,
      selectSeparator: [
        { label: "-", value: "-" },
        { label: "/", value: "/" },
        { label: "*", value: "*" },
        { label: "_", value: "_" },
      ],
    };
  },
  created() {
    this.account_number_id = this.number.id;
    this.name = this.number.name;
    this.prefix = this.number.prefix;
    this.has_number = this.number.has_number == "1" ? true : false;
    this.has_character = this.number.has_character == "1" ? true : false;
    this.separator = this.number.separator;
  },
};
</script>

<style></style>
