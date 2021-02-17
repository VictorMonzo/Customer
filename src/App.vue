<template>
  <v-app>
    <v-app-bar app color="navbar-dark" dark>
      <v-container>
        <v-row>
          <div class="d-flex align-center">
            <router-link to="/">
              <v-img
                alt="Vuetify Name"
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                src="logo.svg"
                width="100"
              />
            </router-link>
          </div>
          <v-col class="links-nav">
            <router-link to="/productos" class="s-light">
              <span class="mx-5">Productos</span>
            </router-link>
            <router-link to="/about" class="s-light">
              <span class="mx-5">Nosotros</span>
            </router-link>
          </v-col>
          <v-col class="text-right">
            <router-link
              to="/autenticacion"
              class="s-light"
              v-if="!isAuthenticated"
            >
              <span class="mr-2"> Login <v-icon>mdi-account</v-icon> </span>
            </router-link>

            <div v-else class="userinfo">
              <router-link to="/profile" class="s-light">
                <span class="mr-2">{{ nameUser }} </span> 
              </router-link>
              <router-link to="/profile" class="s-light">
                <img :src="'http://backoffice.g06.batoilogic.es' + this.$store.getters.getUrlPhoto" class="rounded-circle mx-4" height="30" width="30" style="object-fit: cover">
              </router-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  computed: {
    isAuthenticated() {
      return this.$store.getters.getIsAuth;
    },
    nameUser() {
      return this.$store.getters.getNameUser;
    },
  },
};
</script>
