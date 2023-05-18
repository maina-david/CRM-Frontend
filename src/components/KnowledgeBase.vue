<template>
  <div class="p-3">
    <div class="grid grid-cols-5 gap-5">
      <div class="col-span-2 bg-white p-3">
        <div>
          <TextBox
            type="text"
            label="Title "
            placeholder="Enter the Title"
            v-model="title"
          />
          <QuillEditor theme="snow" />
        </div>
      </div>
      <div class="col-span-3">
        <h3 class="font-semibold text-lg">Knowledge Base</h3>
        <SearchBar />
        <div class="grid grid-cols-2 gap-3">
          <div v-for="data in knowledgeBaseData" :key="data.title">
            <div class="bg-slate-100 p-3 m-2">
              <h3 class="font-semibold text-sm my-1">{{ data.title }}</h3>
              <p class="text-xs my-1">{{ data.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import TextBox from "@/components/TextBox.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    QuillEditor,
    TextBox,
    SearchBar,
  },
  data() {
    return {
      title: "",
      knowledgeBaseData: [
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Conscious",
          description: "Aware of and responding to one's surrounding",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Conscious",
          description: "Aware of and responding to one's surrounding",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Conscious",
          description: "Aware of and responding to one's surrounding",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
        {
          title: "Feasible",
          description: "Possible to do so easily or conviniently",
        },
      ],
    };
  },
};
</script>

<style></style>
