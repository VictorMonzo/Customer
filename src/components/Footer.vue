<template>
  <v-footer class="py-4" dark height="auto">
    <v-container id="subscribe" tag="section">
      <v-card class="pa-3" color="transparent" style="box-shadow: none">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <p class="mb-3">Regístrate!</p>

              <p>
                Nos centramos principalmente en la venta de todo tipo de
                zapatillas: running, casual, minimalistas… de muchas marcas
                reconocidas.
              </p>

              <v-row class="pa-2">
                <v-btn
                  :block="$vuetify.breakpoint.xsOnly"
                  class="ma-0 btn-light"
                  style="height: 48px"
                  @click="registrar"
                >
                  Registrar
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="12" md="4">
              <p>Contacto</p>

              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-avatar color="primary">
                    <v-icon class="elevation-4" dark>
                      mdi-email-outline
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-subtitle> info@sneak.com </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar color="primary">
                    <v-icon class="elevation-4" dark> mdi-phone </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-subtitle> 652 999 276 </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" md="4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d797504.8622407085!2d-1.3447217686455446!3d38.6660447899824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sjd%20sports!5e0!3m2!1ses!2ses!4v1611750570116!5m2!1ses!2ses"
                height="200"
                width="100%"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-row>
        <v-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  methods: {
    registrar() {
      if (!this.$store.getters.getIsAuth) {
        this.$router.push("/autenticacion");
      } else {
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style scoped>
.btn-light {
  background-color: #fafaff !important;
  border: 1px solid #fafaff;
  color: #333;
}
.btn-light:hover,
.btn-light:focus,
.btn-light:active {
  background-color: transparent !important;
  border-color: #fafaff !important;
  box-shadow: none !important;
  color: #fafaff !important;
}
</style>