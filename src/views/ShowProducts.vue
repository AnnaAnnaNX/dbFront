<template>
  <div>
    <!-- {{ products }} -->
    <v-data-table
      v-if="products"
      :headers="headers"
      :items="products"
      :sort-by="['id']"
    >
    </v-data-table>
    <div v-if="error !== null">Error - {{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProducts",
  components: {},
  data() {
    return {
      products: null,
      error: null,
      headers: [
        {
          text: "id",
          value: "id",
          sort: (a, b) => a - b,
        },
        {
          text: "name",
          value: "name",
        },
        {
          text: "skuYm",
          value: "skuYm",
        },
        {
          text: "artOzon",
          value: "artOzon",
        },
        {
          text: "retailPrice",
          value: "retailPrice",
        },
        // {
        //   text: "purchasePrice",
        //   value: "purchasePrice",
        // },
      ],
    };
  },
  mounted() {
    console.log("MOUNTED");
    this.products = null;
    this.error = null;
    axios
      .get("http://localhost:3000/api/getProducts")
      .then((result) => {
        console.log(result.data);
        console.log("SUCCESS");
        if (result && result.data && result.data.data) {
          this.products = result.data.data;
        }
      })
      .catch((error) => {
        console.log("ERROR");
        const text =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error;
        this.error = text;
      });
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>
