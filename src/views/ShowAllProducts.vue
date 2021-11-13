<template>
  <div>
    <v-row>
      <v-col>
        <p>Показывать непустые столбцы</p>
        <div>
          <v-switch
            v-model="shortListHeaders"
          ></v-switch>
        </div>
      </v-col>
      <v-col>
        <p>Отображать товары не основного ассортимента для сопоставления</p>
        <v-radio-group v-model="showNotLinkedProduct">
          <v-radio
            :value="null"      
            label="не показывать"
          ></v-radio>
          <v-radio
            v-for="provider in providers"
            :key="provider.id"
            :value="provider.id"      
            :label="`${provider.nameProvider} #${provider.id}`"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-data-table
      v-if="tableInfo && tableInfo.rows"
      :headers="headers"
      :items="[...tableInfo.rows, ...tableInfo.notLinkedRows]"
    >
      <template v-slot:item.id="{ item }">
        <div v-if="item.id">
          {{ item.id }}
        </div>
        <div v-else>
          <v-select
            :items="['New', ...mainProducts.map((el) => (el.id))]"
            label="Связать"
            @change="(val) => {select(val, item)}"
          ></v-select>
        </div>
      </template>
    </v-data-table>
    <div v-if="error !== null">Error - {{ error }}</div>
    <!-- <v-btn @click="writeRowsInExcel" color="primary">Выгрузить в Excel</v-btn> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowAllProducts",
  components: {},
  data() {
    return {
      providerProducts: null,
      mainProducts: null,
      providers: null,
      error: null,
      shortListHeaders: true,
      showNotLinkedProduct: null
    };
  },
  // column name - <имя поля> #<idProvider>
  computed: {
    // headers
    tableInfo() {
      if (!this.mainProducts || !this.providerProducts || !this.providers) {
        return null;
      }
      const mainIds = this.mainProducts.map((el) => (el.id));
      const obj = {};
      mainIds.forEach((el) => {obj[el] = {}});
      const shortListHeaders = []; 
      this.providerProducts.forEach((el) => {
        if (el.idMainProduct) {
          const idMainProduct = el.idMainProduct;
          if (!obj[idMainProduct]) {
            obj[idMainProduct] = {};
          }
          if (el.idProductProvider) {
            const title = `id #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`id #${el.idProvider}`);
            }
            obj[idMainProduct][`id #${el.idProvider}`] = el.idProductProvider;
          }
          if (el.name) {
            const title = `name #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`name #${el.idProvider}`);
            }
            obj[idMainProduct][`name #${el.idProvider}`] = el.name;
          }
          if (el.price) {
            const title = `price #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`price #${el.idProvider}`);
            }
            obj[idMainProduct][`price #${el.idProvider}`] = el.price;
          }
          if (el.count) {
            const title = `count #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`count #${el.idProvider}`);
            }
            obj[idMainProduct][`count #${el.idProvider}`] = el.count;
          }
        }
      });
      const rows = Object.keys(obj).map((id) => ({id: id, ...obj[id]}));
      let notLinkedRows = [];
      if (this.showNotLinkedProduct) {
        notLinkedRows = this.providerProducts
          .filter((el) => (el.idProvider === this.showNotLinkedProduct))
          .map((el) => {
            const obj = {};
            if (el.idProductProvider) {
            const title = `id #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`id #${el.idProvider}`);
            }
            obj[`id #${el.idProvider}`] = el.idProductProvider;
          }
            if (el.name) {
            const title = `name #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`name #${el.idProvider}`);
            }
            obj[`name #${el.idProvider}`] = el.name;
          }
          if (el.price) {
            const title = `price #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`price #${el.idProvider}`);
            }
            obj[`price #${el.idProvider}`] = el.price;
          }
          if (el.count) {
            const title = `count #${el.idProvider}`; 
            if (!shortListHeaders.includes(title)) {
              shortListHeaders.push(`count #${el.idProvider}`);
            }
            obj[`count #${el.idProvider}`] = el.count;
          }
          return obj;
        })
      }

      const fulllListHeaders = [];
      this.providers.forEach((el) => {
        const id = el.id;
        fulllListHeaders.push(`name #${id}`);
        fulllListHeaders.push(`price #${id}`);
        fulllListHeaders.push(`count #${id}`);
      });

      return {
        rows,
        notLinkedRows,
        shortListHeaders: ['id', ...shortListHeaders],
        fulllListHeaders: ['id', ...fulllListHeaders]
      };
    },
    headers() {
      if (!this.tableInfo) {
        return null;
      }
      let list = null;
      if (this.shortListHeaders) {
        list = this.tableInfo.shortListHeaders;
      } else {
        list = this.tableInfo.fulllListHeaders;
      }
      return list.map((el) => ({
        text: el,
        align: 'start',
        value: el,
      }));
    }
  },
  mounted() {
    console.log("MOUNTED");
    this.products = null;
    this.error = null;
    axios
      .get("http://localhost:3000/api/getProviderProducts")
      .then((result) => {
        console.log("SUCCESS");
        if (result && result.data && result.data.data) {
          this.providerProducts = result.data.data;
        }
      })
      .catch(() => {
        console.log("ERROR");
        this.providerProducts = null;
      });
    axios
      .get("http://localhost:3000/api/getMainProducts")
      .then((result) => {
        console.log("SUCCESS");
        if (result && result.data && result.data.data) {
          this.mainProducts = result.data.data;
        }
      })
      .catch(() => {
        console.log("ERROR");
        this.mainProducts = null;
      });
    axios
      .get("http://localhost:3000/api/getProviders", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (
          result &&
          result.data && 
          result.data.data
        ) {
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
    select(val, row) {
      console.log(val);
      console.log(row);
    //  idProvider || !idProductProvider || !idMainProduct
      if (!this.showNotLinkedProduct) {
        return 'error';
      }
      const idProductProvider = row[`id #${this.showNotLinkedProduct}`];
      const idProvider = this.showNotLinkedProduct;
      const obj = {
        idProductProvider,
        idProvider,
      };
      if (val !== 'New') {
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
          alert('Связан');
        })
        .catch(() => {
          console.log("ERROR");
          alert('Ошибка');
        });
    },
    writeRowsInExcel() {
      axios
        .post("http://localhost:3000/api/writeRowsInExcel", 
        { 
          headers: this.headers,
          rows: [
            ...this.tableInfo.rows, 
            ...this.tableInfo.notLinkedRows
          ]
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log("SUCCESS");
        })
        .catch(() => {
          console.log("ERROR");
        });
    }
  },
};
</script>
