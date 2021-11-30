<template>
  <div>
    <v-data-table
      v-if="mainProducts"
      :headers="headers"
      :items="mainProducts"
      :items-per-page="5"
      :search="search"
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
export default {
  name: "mainProductsTable",
  props: ['mainProducts'],

  data: () => ({
    search: '',
  }),
  computed: {
    headers() {
      return [
        'id',
        'YMId', 
        'YMName',
        'OzonId',
        'OzonName',
        '1CId',
        '1CName',
        'providerName',
        'providerProductName',
      ].map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
  }
};
</script>
