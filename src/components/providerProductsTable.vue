<template>
  <div>
    <v-data-table
      v-if="headers && providerProducts"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"></v-data-table>
  </div>
</template>

<script>
export default {
  name: "providerProductsTable",
  props: ['providerProducts', 'idProvider', 'providers'],

  data: () => ({}),
  computed: {
    headerNames() {
       if (!this.providers || !this.idProvider) {
        return null;
      }
      const headersArr = this.providers.filter((el) => (el.id === this.idProvider));
      if (!headersArr || !headersArr.length) {
        return null;
      }
      return headersArr[0].fieldsNames;     
    },
    headers() {
      if (!this.providers || !this.headerNames) {
        return null;
      }
      return this.headerNames.map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
    items() {
      if (!this.providerProducts) {
        return [];
      }
      const arr = this.providerProducts
        .filter(el => (el.idProvider === this.idProvider));
      return arr.map((el) => {
        const values = JSON.parse(el.values);
        const obj = {};
        values.forEach((val, i) => {
          const index = this.headerNames[i];
          if (index) {
            obj[this.headerNames[i]] = val;
          }
        })
        return obj;
      });
    }
  }
};
</script>
