<template>
  <div>
    <v-container class="page-404">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <v-btn class="btn-primary mt-5" target="_top" @click="home"
        >Ir al inicio</v-btn
      >
    </v-container>
    <footer-page></footer-page>
  </div>
</template>

<script>
export default {
  name: "Not found",

  components: {
    FooterPage: () => import("../components/Footer"),
  },

  methods: {
    home() {
      this.$router.push("/");
    },
  },
};
</script>