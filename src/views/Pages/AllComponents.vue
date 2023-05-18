<template>
  <main>
    <h1 class="font-bold text-lg m-3">View the components here</h1>
    <h3 class="font-semibold text-md m-3">Sub Menu Tab</h3>
    <SubMenuTabs :menuItems="menuItems" />

    <h3 class="font-semibold text-md m-3">User Card</h3>
    <UserCard />

    <h3 class="font-semibold text-md m-3">Button</h3>
    <ActionButton :text="text" />

    <h3 class="font-semibold text-md m-3">File Input</h3>
    <FileInput />

    <h3 class="font-semibold text-md m-3">Check Box</h3>
    <CheckBox :label="label" :value="value" />

    <h3 class="font-semibold text-md m-3">Drop Down</h3>
    <Dropdown :select="select" :options="options" />

    <h3 class="font-semibold text-md m-3">Text Box</h3>
    <TextBox :placeholder="placeholder" />

    <h3 class="font-semibold text-md m-3">Radio</h3>
    <Radio :label="label" />

    <h3 class="font-semibold text-md m-3">ManagementCard</h3>
    <ManagementCard :label="label" :head="head" />

    <h3 class="font-semibold text-md m-3">List Items</h3>
    <ListItems />

    <h3 class="font-semibold text-md m-3">Phone Text Box</h3>
    <Phone />

    <h3 class="font-semibold text-md m-3">Image Upload</h3>
    <ImageUpload />

    <p>Hereee</p>

    <router-link :to="{ name: 'Settings' }">Go to Settings</router-link>
  </main>
</template>

<script>
import SubMenuTabs from "@/components/SubMenuTabs.vue";
import UserCard from "@/components/UserCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import FileInput from "@/components/FileInput.vue";
import CheckBox from "../../components/CheckBox.vue";
import Dropdown from "@/components/Dropdown.vue";
import TextBox from "@/components/TextBox.vue";
import Radio from "@/components/Radio.vue";
import ManagementCard from "@/components/ManagementCard.vue";
import ListItems from "@/components/ListItems.vue";
import Phone from "@/components/Phone.vue";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "AllComponents",
  components: {
    SubMenuTabs,
    UserCard,
    ActionButton,
    FileInput,
    CheckBox,
    Dropdown,
    TextBox,
    Radio,
    ManagementCard,
    ListItems,
    Phone,
    ImageUpload,
  },
  data() {
    return {
      text: "My Button",
      label: "Label Me",
      value: "My Value",
      placeholder: "Check Me Out",
      head: "Queue",
      options: ["Option 1", "Option 2"],
      select: "Select Here",
      phone: "Enter phone number",
      menuItems: [
        "Queue",
        "Music On Hold",
        "Agent Management",
        "User Management",
      ],
      tableHead: ["id", "name", "age", "email", "roles", "Actions"],
      persons: [
        {
          id: 1,
          name: "Max Atieno",
          age: 20,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          id: 2,
          name: "Jan February",
          age: 30,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          id: 3,
          name: "Ana Livingstone",
          age: 40,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          id: 4,
          name: "Max Atieno",
          age: 20,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          id: 5,
          name: "Jan February",
          age: 30,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
        {
          id: 6,
          name: "Ana Livingstone",
          age: 40,
          email: "johndoe@gmail.com",
          roles: ["Admin", "SuperAdmin"],
        },
      ],
    };
  },
};
</script>
