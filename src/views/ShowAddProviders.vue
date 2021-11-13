<template>
  <div>
    <h3>Show Providers</h3>
    <div class='mt-5'>
      <v-data-table
        v-if="PROVIDERS"
        :headers="headers"
        :items="PROVIDERS"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
    <h3 class='mt-10'>Add Provider</h3>
    <v-form>
      <div>
        <label>nameProvider</label>
        <v-text-field v-model='nameProvider' class='input' required />
      </div>
      <div>
        <label>row</label>
        <v-text-field v-model='row' class='input' />
      </div>
      <div>
        <label>tabName</label>
        <v-text-field v-model='tabName' class='input' />
      </div>
      <div>
        <label>columnInnerId</label>
        <v-text-field v-model='columnNumInnerId' class='input' />
      </div>
      <div>
        <label>columnName</label>
        <v-text-field v-model='columnNumName' class='input' />
      </div>
      <div>
        <label>columnPrice</label>
        <v-text-field v-model='columnNumPrice' class='input' />
      </div>
      <div>
        <label>columnCountProduct</label>
        <v-text-field v-model='columnNumCountProduct' class='input' />
      </div>
      <div>
        <v-btn @click="save" color='primary' class='mr-5'>Save</v-btn>
        <v-btn @click="reset">Reset</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShowAddProviders",
  components: {},
  data() {
    return {
      file: null,
      readFromFile: null,
      added: null,
      error: null,
      nameProvider: null, 
      row: null,
      tabName: null,
      columnNumInnerId: null,
      columnNumName: null,
      columnNumPrice: null, 
      columnNumCountProduct: null
    };
  },
  computed: {
    ...mapGetters(["PROVIDERS"]),
    headers() {
      const fields = ['id', 'nameProvider', 'row', 'tabName', 'columnInnerId', 'columnName', 'columnPrice', 'columnCountProduct'];
      return fields.map((el) => ({
        text: el,
        align: 'start',
        value: el,
      }));
    }
  },
  mounted() {
    this.GET_PROVIDERS();
  },
  methods: {
    ...mapActions(["GET_PROVIDERS", "NEW_PROVIDER"]),
    reset() {
      this.nameProvider = null; 
      this.row = null;
      this.tabName = null;
      this.columnNumInnerId = null;
      this.columnNumName = null;
      this.columnNumPrice = null;
      this.columnNumCountProduct = null;
    },
    async save() {
      await this.NEW_PROVIDER({
        nameProvider: this.nameProvider,
        row: this.row,
        tabName: this.tabName,
        columnInnerId: this.columnNumInnerId,
        columnName: this.columnNumName,
        columnPrice: this.columnNumPrice,
        columnCountProduct: this.columnNumCountProduct
      })
      this.reset();
    }
  },
};
</script>
<style scoped>
  label {
    width: 300px;
    display: inline-block;
  }
  .input {
    width: 300px;
    display: inline-block;
  }
</style>
