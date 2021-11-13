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
      <div v-if="readFromFile !== null">Read from file - {{ readFromFile }}</div>
      <div v-if="added !== null">Created or updated - {{ added }}</div>
      <div v-if="error !== null">Error - {{ error }}</div>
    </div>
    <h3>Products from files</h3>
    <div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "AddProducts",
  components: {},
  data() {
    return {
      file: null,
      readFromFile: null,
      added: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["doubleCount"]),
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
        .post("http://localhost:3000/api/createProduct", formData, {
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
            result.data.readFromFile &&
            result.data.added
          ) {
            this.readFromFile = result.data.readFromFile;
            this.added = result.data.added;
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
