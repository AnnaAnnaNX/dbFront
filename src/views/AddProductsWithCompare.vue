<template>
  <div>
    <h3>Select file</h3>
    <div>
      <label
        >File
        <input
          type="file"
          id="file"
          ref="file"
          @change="handleFileUpload($event)"
        />
      </label>
      <div class="my-10">
        <v-btn :disabled="!this.file" v-on:click="submitFile()">Submit</v-btn>
      </div>
      <div v-if="readFromFile !== null">
        Read from file - {{ readFromFile }}
      </div>
      <div v-if="added !== null">Created or updated - {{ added }}</div>
      <div v-if="error !== null">Error - {{ error }}</div>
    </div>
    <h3>Products from files</h3>
    <v-container>
      <v-row>
        <v-col lg="6">
          <v-data-table
            v-if="headers && items"
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
        <v-col lg="6">
          <v-data-table
            v-if="headersProductDb && productsInDb"
            :headers="headersProductDb"
            :items="productsInDb"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
const showHeaders = ["name", "skuYm", "artOzon", "innerId"];

export default {
  name: "AddProducts",
  components: {},
  data() {
    return {
      file: null,
      readFromFile: null,
      listFields: null,
      contentWithId: null,

      productsInDb: null,

      added: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["doubleCount"]),
    headers() {
      if (!this.listFields) {
        return null;
      }

      const fields = [
        ...this.listFields.filter((el) => showHeaders.includes(el)),
        "innerId",
      ];
      return fields.map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
    items() {
      if (!this.contentWithId || !this.listFields) {
        return null;
      }
      return this.contentWithId.map((row) => ({
        ...row,
        innerId: null,
      }));
    },
    headersProductDb() {
      if (!this.productsInDb) {
        return null;
      }
      return ["name", "skuYm", "artOzon", "id"].map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/getProducts", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result && result.data && result.data.data) {
          this.productsInDb = result.data.data;
        }
      })
      .catch(() => {
        console.log("ERROR");
        this.productsInDb = null;
      });
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      this.error = null;
      this.readFromFile = null;
      this.added = null;
      let formData = new FormData();
      console.log(this.file);
      formData.append("file1", this.file);
      axios
        .post("http://localhost:3000/api/readYmOrOzonExcel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.data.readFromFile);
          console.log("SUCCESS");
          this.readFromFile = null;
          this.added = null;
          this.error = null;
          if (
            result &&
            result.data &&
            result.data.listFields &&
            result.data.contentWithId
          ) {
            this.listFields = result.data.listFields;
            this.contentWithId = result.data.contentWithId;
          }
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(JSON.stringify(error.response));
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.data.error);
          const text =
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error;
          this.error = text;
          this.readFromFile = null;
          this.added = null;
        });
    },
  },
};
</script>
