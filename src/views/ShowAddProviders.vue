<template>
  <div>
    <h3>Показ файлов-источников</h3>
    <div class="mt-5">
      <v-data-table
        v-if="providers"
        :headers="headers"
        :items="providers"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.fields="{ item }">
          {{ item.fileds }}
        </template>
      </v-data-table>
    </div>
    <h3 class="mt-10">Добавить поставщика</h3>
    <v-form>
      <div>
        <label>Название поставщика</label>
        <v-text-field v-model="nameProvider" class="input" required />
      </div>
      <div>
        <label>Строка в таблице, где начинается товар</label>
        <v-text-field v-model="row" class="input" />
      </div>
      <div>
        <label>Имя страницы в документе (не заполняется для .csv)</label>
        <v-text-field v-model="tabName" class="input" />
      </div>
      <div>
        <label>Буква столбца с идентификаторов товара у поставщика</label>
        <v-text-field v-model="columnNumInnerId" class="input" />
      </div>
      <div>
        <label>Буква столбца с названием товара</label>
        <v-text-field v-model="columnNumName" class="input" />
      </div>
      <div>
        <label>Буква столбца с ценой товара</label>
        <v-text-field v-model="columnNumPrice" class="input" />
      </div>
      <div>
        <label>Буква столбца с количеством товара</label>
        <v-text-field v-model="columnNumCountProduct" class="input" />
      </div>
      <div>
        <v-btn @click="save" color="primary" class="mr-5"
          >Сохранить поставщика</v-btn
        >
        <v-btn @click="reset">Очистить</v-btn>
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
      columnNumCountProduct: null,
    };
  },
  computed: {
    ...mapGetters(["PROVIDERS"]),
    headers() {
      const fields = ["id", "nameProvider", "row", "tabName", "fields"];
      return fields.map((el) => ({
        text: el,
        align: "start",
        value: el,
      }));
    },
    providers() {
      return this.PROVIDERS.map((obj) => {
        let fileds = null;
        if (
          obj.fieldsNames &&
          obj.fieldsNames.length &&
          obj.fieldsSymbols &&
          obj.fieldsSymbols.length &&
          obj.fieldsNames.length === obj.fieldsSymbols.length
        ) {
          fileds = obj.fieldsNames
            .map((name, i) => {
              return `${name} (${obj.fieldsSymbols[i]})`;
            })
            .join(", \n");
        }
        return {
          ...obj,
          fileds,
        };
      });
    },
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
      if (
        this.nameProvider &&
        this.row &&
        this.columnNumInnerId &&
        this.columnNumName &&
        this.columnNumPrice &&
        this.columnNumCountProduct
      ) {
        await this.NEW_PROVIDER({
          nameProvider: this.nameProvider,
          row: this.row,
          tabName: this.tabName,
          fieldsNames: JSON.stringify(["innerId", "name", "price", "count"]),
          fieldsSymbols: JSON.stringify([
            this.columnNumInnerId,
            this.columnNumName,
            this.columnNumPrice,
            this.columnNumCountProduct,
          ]),
        });
        this.reset();
      } else {
        alert("Заполнены не все поля");
      }
    },
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
