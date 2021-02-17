<template>
  <div class="bg-danger text-white about2">
    <div class="container">
      <div class="row justify-content-center">
        <div class="text-center">
          <h2 class="font-wheight-bold h1">¡Tenemos lo que necesitas!</h2>
          <p class="my-4">
            Nos centramos principalmente en la venta de todo tipo de zapatillas:
            running, casual, minimalistas… de muchas marcas reconocidas. También
            ofrecemos una amplia colección de ropa urbana/deportiva y todo tipo
            de accesorios y complementos.
          </p>
          <v-btn
            :block="$vuetify.breakpoint.xsOnly"
            class="ma-0 btn-light"
            @click="productos"
          >
            Ver productos
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About2",

  methods: {
    productos() {
      this.$router.push("/productos");
    },
  },
};
</script>