<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <v-icon style="font-size: 50px"> mdi-electron-framework </v-icon>
        <span class="ml-5" style="font-size: 20px"> АртемидаСофт </span>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      permanent
      style="padding-top: 100px"
      dense
      nav
      fixed
    >
      <v-list>
        <!-- <v-list-item to="/">
          Добавить товары или обновить цены и наличие
        </v-list-item> -->

        <!-- <v-list-item to="set-prices">
          <v-list-item-title>Обновить цены и наличие</v-list-item-title>
        </v-list-item> -->

        <!-- <v-list-item to="all-products">
          <v-list-item-title>Просмотр товаров</v-list-item-title>
        </v-list-item> -->

        <!-- <v-list-item to="add-products">
          <v-list-item-title>Добавление товаров с сопоставлением</v-list-item-title>
        </v-list-item> -->

        <v-list-item to="providers">
          <v-list-item-title>(new)Провайдеры</v-list-item-title>
        </v-list-item>

        <v-list-item to="AddAllProducts">
          <v-list-item-title>(new)Добавление товаров</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/' }">
          <v-list-item-title>Основной ассортимент</v-list-item-title>
        </v-list-item>

        <v-list-item to="Sources">
          <v-list-item-title>Источники</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="feeds">
          <v-list-item-title>Выгрузить фиды</v-list-item-title>
        </v-list-item>

        <!-- <v-list-item to="ShowAllProducts">
          <v-list-item-title>(new)Показ всех товаров</v-list-item-title>
        </v-list-item> -->
        
      </v-list>
    </v-navigation-drawer>

    <v-main style="padding-left: 256px">
      <div class="pa-10">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: true,
  }),
};
</script>
