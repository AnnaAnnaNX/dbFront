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
        <v-btn icon :to="{ path: '/' }">
          <v-icon style="font-size: 50px"> mdi-electron-framework </v-icon>
        </v-btn>
        <span class="ml-5" style="font-size: 20px"> АртемидаСофт </span>
           
      </div>

      <v-spacer></v-spacer>

      <v-btn plain to="providers" class="mr-10">
        Источники
      </v-btn>
      <v-btn plain to="AddAllProducts" class="mr-10">
        Добавление данных
      </v-btn>
      <v-btn plain :to="{ path: '/' }" class="mr-10">
        Основной ассортимент
      </v-btn>
      <v-btn plain to="Binding" class="mr-10">
        Связывание товаров
      </v-btn>
      <v-btn plain to="feeds" class="mr-10">
        Выгрузить фиды
      </v-btn>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- <v-navigation-drawer
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

        <v-list-item to="providers">
          <v-list-item-title>Источники</v-list-item-title>
        </v-list-item>

        <v-list-item to="AddAllProducts">
          <v-list-item-title>Добавление данных</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/' }">
          <v-list-item-title>Основной ассортимент</v-list-item-title>
        </v-list-item>

        <v-list-item to="Binding">
          <v-list-item-title>Связывание товаров</v-list-item-title>
        </v-list-item>

        <v-list-item to="feeds">
          <v-list-item-title>Выгрузить фиды</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer> -->

    <v-main>
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
