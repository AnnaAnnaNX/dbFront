<template>
  <v-row class="mt-10">
    <v-col class="providerProduct" cols="6">
      <h4>Источник</h4>
      <div>
        <v-select
          v-if="PROVIDERS"
          v-model="idProvider"
          :items="PROVIDERS"
          item-text="nameProvider"
          item-value="id"
          label="Выбор источника"
        />
      </div>
      <providerProductsTable
        :providerProducts="PROVIDER_PRODUCTS"
        :idProvider="idProvider"
        :providers="PROVIDERS"
      />
    </v-col>
    <v-col class="mainProduct" cols="6">
      <h4>Основной ассортимент</h4>
      <mainProductsTable :mainProducts="MAIN_PRODUCTS" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import providerProductsTable from '../components/providerProductsTable.vue';
import mainProductsTable from '../components/mainProductsTable.vue';

export default {
  name: "Binding",
  components: { providerProductsTable, mainProductsTable },
  data() {
    return {
      providerProducts: null,
      idProvider: null,
    };
  },
  computed: {
    ...mapGetters([
      "MAIN_PRODUCTS",
      "PROVIDER_PRODUCTS",
      "PROVIDERS"
    ]),
  },
  mounted() {
    console.log("MOUNTED");
    this.GET_MAIN_PRODUCTS();
    this.GET_PROVIDER_PRODUCTS();
    this.GET_PROVIDERS().then(() => {
      console.log('load');
      this.idProvider = this.PROVIDERS
        && this.PROVIDERS.length
        && this.PROVIDERS[0].id;
      console.log(this.idProvider);
    });
  },
  methods: {
    ...mapActions([
      "GET_MAIN_PRODUCTS",
      "GET_PROVIDER_PRODUCTS",
      "GET_PROVIDERS"
    ]),
  }
};
</script>
