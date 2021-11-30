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
    <v-dialog
      v-model="openConfirmBinding"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Связать с новым товаром
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Связать товар #{{ idProductSourceForBinding
            && idProductSourceForBinding.innerId }}
          с товаром основного ассортимента {{ idMainAssortForBinding
            && idMainAssortForBinding.id
            ? idMainAssortForBinding
            && idMainAssortForBinding.id
            : '(создать новый товар в основном ассортименте)'}}
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="() => {
              SET_idProductSourceForBinding(null);
              SET_idMainAssortForBinding(null);
            }"
          >
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="binding"
          >
            Связать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
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
      "PROVIDERS",
      "openConfirmBinding",
      "idProductSourceForBinding",
      "idMainAssortForBinding"
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
    ...mapMutations([      
      "SET_idProductSourceForBinding",
      "SET_idMainAssortForBinding"
    ]),
    ...mapActions([
      "GET_MAIN_PRODUCTS",
      "GET_PROVIDER_PRODUCTS",
      "GET_PROVIDERS",
      "ADD_LINK"
    ]),
    binding() {
      console.log('binding');
      console.log(this.idProductSourceForBinding);
      console.log(this.idProductSourceForBinding.innerId);
      this.ADD_LINK({
        idProductProvider: this.idProductSourceForBinding
          && this.idProductSourceForBinding.innerId,
        idProvider: this.idProvider,
        idMainProduct: this.idMainAssortForBinding
          && this.idMainAssortForBinding.id
      });
    }
  }
};
</script>
