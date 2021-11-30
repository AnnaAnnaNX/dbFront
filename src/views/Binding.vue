<template>
  <v-row class="mt-10">
    <v-col class="providerProduct" cols="6"> {{ MAIN_PRODUCTS }} </v-col>
    <v-col class="mainProduct" cols="6"> {{ PROVIDER_PRODUCTS }} </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Binding",
  components: {},
  data() {
    return {
      providerProducts: null,
    };
  },
  computed: {
    ...mapGetters(["MAIN_PRODUCTS", "PROVIDER_PRODUCTS"]),
  },
  mounted() {
    console.log("MOUNTED");
    this.GET_MAIN_PRODUCTS();
    this.GET_PROVIDER_PRODUCTS();
  },
  methods: {
    ...mapActions(["GET_MAIN_PRODUCTS", "GET_PROVIDER_PRODUCTS"]),
  }
};
</script>
