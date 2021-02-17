<template>
  <div class="about">
    <div class="portada-about">
      <video autoplay loop id="video-background" muted plays-inline>
        <source
          :src="require(`@/assets/products/video-about.mp4`)"
          type="video/mp4"
        />
      </video>
      <div class="container h-100">
        <div class="content-video">
          <h1 class="text-uppercase text-white font-weight-bold mb-4 pb-4">
            Be the exception
          </h1>
          <v-btn class="btn-primary" href="#about" target="_top"
            >Descubrir</v-btn
          >
        </div>
      </div>
    </div>

    <about-page></about-page>

    <about2-page></about2-page>

    <v-container>
      <div class="container py-5 about3">
        <div class="row py-5 align-items-center">
          <div class="col-12 col-lg-6 mb-5">
            <img
              :src="require(`@/assets/products/about1.jpg`)"
              alt="Sobre nosotros"
            />
          </div>
          <div class="col-12 col-lg-6">
            <h2 class="featurette-heading">
              #<span class="font-weight-bold text-danger">SneakShoes</span>
            </h2>
            <div class="row">
              <div class="col-md-6 text-left">
                <div class="mt-5">
                  <i class="fas fa-box mb-3"></i>
                  <h4 class="my-2 font-weight-bold">Envío gratis</h4>
                  <p class="text-muted mb-0">
                    Gastos de envío gratuitos para pedidos que superen los 40€.
                  </p>
                </div>
              </div>
              <div class="col-md-6 text-left">
                <div class="mt-5">
                  <i class="fas fa-star mb-3"></i>
                  <h4 class="my-2 font-weight-bold">Calidad</h4>
                  <p class="text-muted mb-0">
                    Sneak ofrece artículos de alta calidad con diseños
                    increbíles.
                  </p>
                </div>
              </div>
              <div class="col-md-6 text-left">
                <div class="mt-5">
                  <i class="fas fa-rocket mb-3"></i>
                  <h4 class="my-2 font-weight-bold">Nuevas marcas</h4>
                  <p class="text-muted mb-0">
                    Impulsamos nuevas marcas del sector a darse a conocer e
                    impulsar sus ventas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>

    <instagram-page></instagram-page>

    <footer-page></footer-page>
  </div>
</template>

<script>
export default {
  components: {
    FooterPage: () => import("../components/Footer"),
    InstagramPage: () => import("../components/Instagram"),
    AboutPage: () => import("../components/AboutComponent"),
    About2Page: () => import("../components/About2Component"),
  },
};
</script>
