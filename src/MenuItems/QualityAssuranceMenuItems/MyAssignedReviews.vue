<template>
  <div class="w-full mt-10">
    <div class="bg-white rounded-sm shadow-sm p-4">
      <MyReviewsTable
        :tableHead="reviewsTableHead"
        :tableData="qualityAssuranceOpenReviews"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MyReviewsTable from "@/components/tables/QAManagementTables/MyReviewsTable.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AssignedReviews",
  data() {
    return {
      reviewsTableHead: [
        "Interaction Id",
        "Call Date",
        "Team",
        "Channel",
        "action",
      ],
    };
  },
  components: {
    MyReviewsTable,
  },
  created() {
    this.getQualityAssuranceOpenReviews();
  },
  computed: {
    ...mapGetters(["qualityAssuranceOpenReviews"]),
  },
  methods: {
    ...mapActions(["getQualityAssuranceOpenReviews"]),
  },
};
</script>

<style></style>
