<template>
  <v-container id="about" tag="section">
    <div class="row py-5 align-items-center">
      <div class="col-12 col-lg-6 mb-5">
        <img
          :src="require(`@/assets/products/about.jpg`)"
          alt="Sobre nosotros"
        />
      </div>
      <div class="col-12 col-lg-6 about-text">
        <h2 class="mb-3">Sobre<b> nosotros</b></h2>
        <p>
          Somos distribuidores oficiales de grandes marcas como Nike, Adidas,
          Puma, Converse, Champion, entre muchas otras.
        </p>
        <p>
          Nuestros productos están pensados para gente con estilo, que le gusta
          la moda urbana o la deportiva y que quiere sentirse cómodo y cool. No
          nos limitamos a ningún género ni rango de edades, ya que las
          zapatillas, ropa y complementos, son productos que todo el mundo gasta
          y necesita.
        </p>
        <v-btn @click="about" class="btn-primary mt-3">Saber más</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AbotComponent1",

  methods: {
    about() {
      this.$router.push("/about");
    }
  }
}
</script>