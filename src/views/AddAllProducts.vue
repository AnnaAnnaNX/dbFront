<template>
  <div>
    <h3>Загрузить источник</h3>
    <div>
      <div>
        <v-select
          v-model="idProvider"
          :items="providers"
          item-text="nameProvider"
          item-value="id"
          persistent-hint
          return-object
          single-line
          label="Провайдер"
          @change="reset"
        ></v-select>
      </div>
      Создавать новые товары в основном ассортименте
      <v-switch v-model="newMainProduct" />
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
        {{ showStatus }}
      </div>
    </div>
    <div v-if="contentFile">
      <h3>Products from files</h3>
      <div>
        <v-data-table
          v-if="idProvider && headers && contentFile"
          :headers="headers"
          :items="contentFile"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </div>
      <v-btn class="mt-10" color="primary" @click="save">Сохранить</v-btn>
      {{ saveStatus }}
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
      idProvider: null,
      contentFile: null,
      providers: null,
      showStatus: null,
      saveStatus: null,
      newMainProduct: false
    };
  },
  computed: {
    ...mapGetters(["doubleCount"]),
    provider() {
      if (!this.idProvider || !this.idProvider.id || !this.providers) {
        return null;
      }
      let provider = null;
      this.providers.forEach((obj) => {
        if (obj.id === this.idProvider.id) {
          provider = obj;
        }
      });
      return provider;
    },
    headers() {
      if (!this.provider || !this.provider.fieldsNames) {
        return null;
      }
      const fields = JSON.parse(this.provider.fieldsNames);
      // const fields = [
      //     'idProductProvider',
      //     'name',
      //     'price',
      //     'count'
      //   ];
      return fields.map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/getProviders", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result && result.data && result.data.data) {
          this.providers = result.data.data;
        }
      })
      .catch(() => {
        console.log("ERROR");
        this.providers = null;
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
      formData.append("idProvider", this.idProvider && this.idProvider.id);
      formData.append("newMainProduct", this.newMainProduct);
      axios
        .post("http://localhost:3000/api/readProviderFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.data.readFromFile);
          console.log("SUCCESS");
          this.showStatus = "Успешно загружен файл";
          this.contentFile = result && result.data;
        })
        .catch(() => {
          console.log("ERROR");
          this.showStatus = "Ошиюка загрузки файла";
          this.contentFile = null;
        });
    },
    save() {
      if (!this.contentFile) {
        console.log("empty content");
      }

      axios
        .post(
          "http://localhost:3000/api/addProviderProducts",
          {
            rows: this.contentFile.map((row) => {
              const fields = JSON.parse(this.provider.fieldsNames);
              return {
                ...row,
                idProductProvider: row["innerId"],
                values: JSON.stringify(fields.map((el) => row[el])),
              };
            }),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          console.log("SUCCESS");
          this.saveStatus =
            "Успешно сохранено" +
            JSON.stringify(result && result.data, null, 2);
          console.log(result);
          // this.contentFile = result && result.data;
        })
        .catch(() => {
          console.log("ERROR");
          this.saveStatus = "Ошибка при сохранении";
          // this.contentFile = null;
        });
    },
    reset() {
      this.showStatus = "";
      this.saveStatus = "";
      this.contentFile = null;
    },
  },
};
</script>
