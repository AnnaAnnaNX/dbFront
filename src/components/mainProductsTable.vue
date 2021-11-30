<template>
  <div>
    <v-data-table
      v-if="headers && mainProducts"
      :headers="headers"
      :items="mainProducts"
      :items-per-page="5"
      :search="search"
      :single-select="true"
      :value="[idMainAssortForBinding]"
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
  name: "mainProductsTable",
  props: ['mainProducts'],

  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters([
      'idMainAssortForBinding'
    ]),
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
  },
  methods: {
    ...mapMutations([
      "SET_idMainAssortForBinding"
    ]),
    clickRow(obj) {
      console.log('clickRow');
      console.log(obj);
      if (obj) {
        this.SET_idMainAssortForBinding(obj);
      }
    }
  }
};
</script>
