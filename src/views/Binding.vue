<template>
  <v-row class="mt-10">
    <v-col class="providerProduct" cols="6">
      {{ PROVIDERS }}
      <providerProductsTable
        :providerProducts="PROVIDER_PRODUCTS"
        :idProvider="idProvider"
        :providers="PROVIDERS"
      />
    </v-col>
    <v-col class="mainProduct" cols="6">
      {{ MAIN_PRODUCTS }}     
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import providerProductsTable from '../components/providerProductsTable.vue';

export default {
  name: "Binding",
  components: { providerProductsTable },
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
