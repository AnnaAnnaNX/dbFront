<template>
  <div>
    <h3>Основной ассортимент</h3>
    <v-data-table
      v-if="tableInfo && tableInfo.rows"
      :headers="headers"
      :items="tableInfo.rows"
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
      <template v-slot:item._1CUpdate="{ item }">
        {{ moment(item['1CUpdate']) }}
      </template>
    </v-data-table>
    <div v-if="error !== null">Error - {{ error }}</div>
    <!-- <v-btn @click="writeRowsInExcel" color="primary">Выгрузить в Excel</v-btn> -->
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';

export default {
  name: "MainAssortiment",
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
      // иметь сопоставление idProvider с именем провайдера
      // nameProviderIdProviderObj {idProvider: nameProvider}
      const nameProviderIdProviderObj = {};
      this.providers.forEach((provider) => {
        if (provider.id) {
          nameProviderIdProviderObj[provider.nameProvider] = {
            id: provider.id,
            fieldsNames: provider.fieldsNames && JSON.parse(provider.fieldsNames)
          };
        }
      });
      const idProviderNameProviderObj = {};
      this.providers.forEach((provider) => {
        if (provider.id && provider.nameProvider) {
          idProviderNameProviderObj[provider.id] = provider.nameProvider;
        }
      });
      this.providerProducts.forEach((el) => {
        if (el.idMainProduct) {
          // obj[idMainProduct][`count #${el.idProvider}`] = el.count;
          
          if (nameProviderIdProviderObj['YM'] &&
            (el.idProvider === nameProviderIdProviderObj['YM'].id)) {
            obj[el.idMainProduct]['YMId'] = el.idProductProvider;
            const fieldsNames = nameProviderIdProviderObj['YM'].fieldsNames;
            const n = fieldsNames.indexOf('name');
            const values = el.values && JSON.parse(el.values);
            obj[el.idMainProduct]['YMName'] = values && values[n];
          } else
          if (nameProviderIdProviderObj['Ozon'] &&
            (el.idProvider === nameProviderIdProviderObj['Ozon'].id)) {
            obj[el.idMainProduct]['OzonId'] = el.idProductProvider;
            const fieldsNames = nameProviderIdProviderObj['Ozon'].fieldsNames;
            const n = fieldsNames.indexOf('name');
            const values = el.values && JSON.parse(el.values); 
            obj[el.idMainProduct]['OzonName'] = values && values[n];
          } else
          if (nameProviderIdProviderObj['1C'] &&
            (el.idProvider === nameProviderIdProviderObj['1C'].id)) {
            obj[el.idMainProduct]['1CId'] = el.idProductProvider;
            const values = el.values && JSON.parse(el.values); 
            const fieldsNames = nameProviderIdProviderObj['1C'].fieldsNames;
            let n = fieldsNames.indexOf('name');
            obj[el.idMainProduct]['1CName'] = values && values[n];
            n = fieldsNames.indexOf('price');
            obj[el.idMainProduct]['1CPrice'] = values && values[n];
            obj[el.idMainProduct]['1CUpdate'] = el.updatedAt;
          } else    
          if (nameProviderIdProviderObj['markup'] &&
            (el.idProvider === nameProviderIdProviderObj['markup'].id)) {
            obj[el.idMainProduct]['markupId'] = el.idProductProvider;
            const values = el.values && JSON.parse(el.values);
            const fieldsNames = nameProviderIdProviderObj['markup'].fieldsNames;
            let n = fieldsNames.indexOf('markup');
            obj[el.idMainProduct]['markup'] = values && values[n];
          } else
          // здесь только поставщики (берем любого поставщика)
          if (!obj[el.idMainProduct]['providerName']) {            
            console.log('el.idProvider');
            console.log(el.idProvider);
            const providerName = idProviderNameProviderObj[el.idProvider];
            console.log('providerName');
            console.log(providerName);
            obj[el.idMainProduct]['providerName'] = providerName;
            const fieldsNames = nameProviderIdProviderObj[providerName]
            && nameProviderIdProviderObj[providerName].fieldsNames;
            let n = fieldsNames && fieldsNames.indexOf('name');
            const values = el.values && JSON.parse(el.values); 
            obj[el.idMainProduct]['providerProductName'] = values && values[n];
            n = fieldsNames && fieldsNames.indexOf('price');
            obj[el.idMainProduct]['providerProductprice'] = values && values[n];
            obj[el.idMainProduct]['providerProductUpdate'] = el.updatedAt;
          }
          // newPrice
          if (obj[el.idMainProduct]['providerProductprice']
            && obj[el.idMainProduct]['1CPrice']) {
              const dataProvider = obj[el.idMainProduct]['providerProductUpdate']
                &&  moment(obj[el.idMainProduct]['providerProductUpdate']);
              const data1C = obj[el.idMainProduct]['1CUpdate']
                &&  moment(obj[el.idMainProduct]['1CUpdate']);
              console.log('dataProvider');
              console.log(dataProvider);
              console.log('data1C');
              console.log(data1C);
          }

        }
      });
      const rows = Object.keys(obj).map((id) => ({id: id, ...obj[id]}));
      console.log('rows');
      console.log(rows);
      const shortListHeaders = [
        'YMId',
        'YMName',
        'OzonId',
        'OzonName',
        '1CId',
        '1CName',
        '1CPrice',
        '1CUpdate',
        'markupId',
        'markup',
        'providerName',
        'providerProductName',
        'providerProductprice',
        'providerProductUpdate'
      ];

      return {
        rows,
        shortListHeaders: ['id', ...shortListHeaders],
      };
    },
    headers() {
      if (!this.tableInfo) {
        return null;
      }
      let list = this.tableInfo.shortListHeaders;
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
