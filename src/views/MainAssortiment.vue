<template>
  <div>
    <h3>Основной ассортимент</h3>
    <v-data-table
      v-if="assort && assort.rows"
      :headers="headers"
      :items="assort.rows"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.id="{ item }">
        <div v-if="item.id">
          {{ item.id }}
        </div>
        <div v-else>
          <v-select
            :items="['New', ...mainProducts.map((el) => el.id)]"
            label="Связать"
            @change="
              (val) => {
                select(val, item);
              }
            "
          ></v-select>
        </div>
      </template>
      <template v-slot:item._1CUpdate="{ item }">
        {{ moment(item["1CUpdate"]) }}
      </template>
    </v-data-table>
    <div v-if="error !== null">Error - {{ error }}</div>
    <div style="margin: 0 auto; width: 900px;">
      <v-btn @click.prevent="writeRowsInExcel" color="primary"
        >Выгрузить ассортимент в Excel</v-btn
      >
      <v-btn @click.prevent="writeMarkupInExcel" color="primary" class="ml-5"
        >Выгрузить файл для установки наценки</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainAssortiment",
  components: {},
  data() {
    return {
      search: '',
      providerProducts: null,
      mainProducts: null,
      providers: null,
      error: null,
      shortListHeaders: true,
      showNotLinkedProduct: null,
      assort: null
    };
  },
  // column name - <имя поля> #<idProvider>
  computed: {
    headers() {
      if (!this.assort) {
        return null;
      }
      let list = this.assort.shortListHeaders;
      return list.map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
  },
  mounted() {
    console.log("MOUNTED");
    this.products = null;
    this.error = null;
    axios
      .get("http://localhost:3000/api/getAssort", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result && result.data) {
          this.assort = result.data;
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
    select(val, row) {
      console.log(val);
      console.log(row);
      //  idProvider || !idProductProvider || !idMainProduct
      if (!this.showNotLinkedProduct) {
        return "error";
      }
      const idProductProvider = row[`id #${this.showNotLinkedProduct}`];
      const idProvider = this.showNotLinkedProduct;
      const obj = {
        idProductProvider,
        idProvider,
      };
      if (val !== "New") {
        obj.idMainProduct = val;
      }
      axios
        .post("http://localhost:3000/api/addLink", obj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log("SUCCESS");
          alert("Связан");
        })
        .catch(() => {
          console.log("ERROR");
          alert("Ошибка");
        });
    },
    writeRowsInExcel() {
      axios({
        url: "http://localhost:3000/api/writeRowsInExcel",
        method: "POST",
        data: {
          headers: this.assort && this.assort.shortListHeaders,
          rows: this.assort && this.assort.rows,
        },
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          let date = new Date();
          let hours = date.getHours();
          let seconds = date.getSeconds();
          let month = date.getMonth();
          let day = date.getDate();
          fileLink.setAttribute(
            "download",
            `yml_${name}_${month}_${day}__${hours}_${seconds}.xlsx`
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {
          console.log("ERROR");
        });
    },
    writeMarkupInExcel() {
      axios({
        url: "http://localhost:3000/api/writeMarkupInExcel",
        method: "POST",
        data: {
          headers: this.assort && this.assort.shortListHeaders,
          rows: this.assort && this.assort.rows,
        },
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          let date = new Date();
          let hours = date.getHours();
          let seconds = date.getSeconds();
          let month = date.getMonth();
          let day = date.getDate();
          fileLink.setAttribute(
            "download",
            `yml_${name}_${month}_${day}__${hours}_${seconds}.xlsx`
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((e) => {
          console.log(e);
          console.log("e.message");
          console.log(e.message);
        });
    },
  },
};
</script>
