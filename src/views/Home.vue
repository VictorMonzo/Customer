<template>
  <div class="page-home">
    <v-carousel
      cycle
      height="500"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(carousel, i) in carousels"
        :key="i"
        :src="require(`@/assets/carousel/${carousel.src}`)"
      >
      </v-carousel-item>
    </v-carousel>

    <about2-page></about2-page>

    <about-page></about-page>

    <instagram-page></instagram-page>

    <footer-page></footer-page>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    FooterPage: () => import("../components/Footer"),
    InstagramPage: () => import("../components/Instagram"),
    AboutPage: () => import("../components/AboutComponent"),
    About2Page: () => import("../components/About2Component"),
  },
  data: () => ({
    carousels: [{ src: "portada1.jpg" }, { src: "portada2.jpg" }],
  }),
};
</script>
