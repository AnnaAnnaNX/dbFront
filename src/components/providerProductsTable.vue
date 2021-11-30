<template>
  <div>
    <v-data-table
      v-if="headers && items"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :search="search"
      :single-select="true"
      :value="[idProductSourceForBinding]"
      item-key="id"
      @click:row="clickRow"
      class="elevation-1">
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "providerProductsTable",
  props: ['providerProducts', 'idProvider', 'providers'],

  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters([
      'idProductSourceForBinding'
    ]),
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
      return [
        'idMainProduct',
        ...this.headerNames
      ].map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
    items() {
      if (!this.providerProducts) {
        return [];
      }
      const arr = this.providerProducts.filter(el => (el.idProvider === this.idProvider));
      return arr.map((el) => {
        const values = JSON.parse(el.values);
        const obj = {
          id: el.id,
          idMainProduct: el.idMainProduct
        };
        values.forEach((val, i) => {
          const index = this.headerNames[i];
          if (index) {
            obj[this.headerNames[i]] = val;
          }
        })
        return obj;
      });
    }
  },
  methods: {
    ...mapMutations([
      "SET_idProductSourceForBinding"
    ]),
    clickRow(obj) {
      console.log('clickRow');
      console.log(obj);
      if (obj) {
        this.SET_idProductSourceForBinding(obj);
      }
    }
  }
};
</script>
