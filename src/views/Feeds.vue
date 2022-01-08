<template>
  <div style="margin: 0 auto; width: 700px;">
    <v-btn
      color="primary"
      @click="
        () => {
          onClick('http://localhost:3000/api/getUmlYml', 'ym');
        }
      "
      style="width: 300px;"
      >Выгрузить yml Яндекс.Маркет</v-btn
    >
    <v-btn
      color="primary"
      class="ml-10"
      @click="
        () => {
          onClick('http://localhost:3000/api/getUmlOzon', 'ozon');
        }
      "
      style="width: 300px;"
      >Выгрузить yml Ozon</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feeds",
  components: {},
  methods: {
    onClick(link, name) {
      axios({
        url: link,
        method: "GET",
        responseType: "application/json",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          let date = new Date();
          let hours = date.getHours();
          let seconds = date.getSeconds();
          let month = date.getMonth();
          let day = date.getDate();
          fileLink.setAttribute(
            "download",
            `yml_${name}_${month}_${day}__${hours}_${seconds}.xml`
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((e) => {
          console.log((e && e.response && e.response.data) || "");
          alert(
            (e && e.response && e.response.data && e.response.data.error) ||
              "error"
          );
        });
    },
  },
};
</script>
