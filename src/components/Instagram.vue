<template>
  <div>
    <v-row class="bg-dark text-light instagram-1">
      <div class="container text-center">
        <h2 class="mb-5">
          Comparte tus fotos en #<span class="font-weight-bold text-danger"
            >SneakShoes</span
          >
        </h2>
        <v-btn class="btn-light" href="https://instagram.com" target="_blank"
          >Seguir @sneak</v-btn
        >
      </div>
    </v-row>
    <v-row>
      <v-col
        v-for="(post, i) in posts"
        :key="i"
        class="pa-0 instagram-grid col-6 col-md-4 col-lg-3"
      >
        <v-card
          :href="post.href"
          color="grey lighten-2"
          height="100%"
          tag="a"
          class="item"
        >
          <img
            v-if="post.src"
            :src="require(`@/assets/products/${post.src}`)"
            height="100%"
          />
          <i class="fab fa-instagram"></i>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Instagram",

  data: () => ({
    posts: [
      { src: "gallery1.jpg" },
      { src: "gallery2.jpg" },
      { src: "gallery3.jpg" },
      { src: "gallery4.jpg" },
      { src: "gallery5.jpg" },
      { src: "gallery6.jpg" },
      { src: "gallery7.jpg" },
      { src: "gallery8.jpg" },
    ],
  }),
};
</script>
