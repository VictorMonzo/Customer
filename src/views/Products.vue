<template>
  <v-container class="mt-5">
    <v-row justify="center" content="center">
      <v-col cols="12" md="2" class="filter">
        <p class="mr-2 title-chip1">Categorías</p>

        <v-chip
          v-for="(category, c) in categories"
          :key="c + '-category'"
          class="mr-2"
          color="secondary"
          label
          small
          tag
          text-color="white"
          @click="categorieIdSelected = category.id"
        >
          {{ category.name }}
        </v-chip>

        <v-chip
          v-if="categorieIdSelected != 0"
          class="mr-2"
          color="secondary"
          label
          small
          tag
          text-color="white"
          @click="categorieIdSelected = 0"
        >
          Todos
        </v-chip>

        <p class="mr-2 title-chip2">Proveedores</p>
        <v-chip
          v-for="(provider, p) in providers"
          :key="p + '-provider'"
          class="mr-2"
          color="secondary"
          label
          small
          tag
          text-color="white"
          @click="providerIdSelected = provider.id"
        >
          {{ provider.name }}
        </v-chip>

        <v-chip
          v-if="providerIdSelected != 0"
          class="mr-2"
          color="secondary"
          label
          small
          tag
          text-color="white"
          @click="providerIdSelected = 0"
        >
          Todos
        </v-chip>
      </v-col>

      <v-col cols="12" md="10">
        <v-sheet class="mx-auto my-5" elevation="8" max-width="100%">
          <v-slide-group v-model="model" class="pa-4 flechas" show-arrows>
            <v-slide-item
              v-for="product in products"
              :key="product.id"
              v-slot="{ active, toggle }"
            >
              <v-card
                v-if="showCard(product.provider_id, product.categorie_id)"
                :loading="loading"
                :color="active ? '#2B59C3' : 'white'"
                class="ma-4 product"
                height="auto"
                max-width="374"
                @click="selectedProduct(toggle, product)"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img
                    width="100%"
                    height="280"
                    :src="'http://backoffice.g06.batoilogic.es' + product.photo"
                  ></v-img>

                  <v-card-title>{{ product.name }}</v-card-title>

                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>

                      <div class="grey--text ml-4"></div>
                    </v-row>

                    <p class="my-2 text-danger">
                      <small>Publicado el {{ product.created_at }}</small>
                    </p>
                    <p class="my-2 text-danger">
                      <b>Solo quedan</b> {{ product.stock }} en stock
                    </p>

                    <div class="my-4 subtitle-1">{{ product.price }}€</div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-title>{{ product.nameProvider }}</v-card-title>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn
                      class="btn-primary"
                      text
                      @click="
                        reserve(product.description, product.price, product.id)
                      "
                    >
                      Comprar
                    </v-btn>
                  </v-card-actions>

                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>

          <v-expand-transition>
            <v-sheet v-if="model != null" tile>
              <!--v-sheet v-if="dialog" tile-->
              <v-row
                class="fill-height pl-12 pr-12"
                align="center"
                justify="center"
              >
                <v-col cols="12" align="left" justify="left">
                  <h3 class="title">Descripción</h3>
                  <p class="my-2 text-danger">{{ descriptionSelected }}</p>
                </v-col>

                <v-col cols="12" align="left" justify="center">
                  <v-form ref="createOrderForm" v-model="valid" lazy-validation>
                    <v-row justify="center">
                      <v-col cols="12" md="8">
                        <v-textarea
                          v-model="userAddress"
                          :rules="[rules.required]"
                          filled
                          label="Dirección"
                          auto-grow
                          disabled
                          required
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="foo"
                          label="Cantidad"
                          append-outer-icon="add"
                          @click:append-outer="increment"
                          prepend-icon="remove"
                          @click:prepend="decrement"
                          :rules="[rules.required, rules.min]"
                          required
                        >
                        </v-text-field>

                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          class="btn-primary"
                          @click="createOrder"
                        >
                          Comprar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    model: null,
    descriptionSelected: "",
    priceSelected: 0,
    productIdSelected: 0,
    foo: 0,

    providerIdSelected: 0,
    categorieIdSelected: 0,

    dialog: false,

    valid: true,
    rules: {
      required: (value) => !!value || "Campo obligatorio",
      min: (v) => (v && v >= 1) || "Cantidad mínima 1",
    },
  }),

  computed: {
    products() {
      return this.$store.state.products;
    },
    userAddress() {
      return this.$store.getters.getAddressUser;
    },
    categories() {
      return this.$store.state.categories;
    },
    providers() {
      return this.$store.state.providers;
    },
  },

  methods: {
    selectedProduct(toggle, product) {
      toggle();
      this.reserve(product.description, product.price, product.id);
    },

    showCard(provider_id, categorie_id) {
      return (
        (this.providerIdSelected === 0 ||
          this.providerIdSelected === provider_id) &&
        (this.categorieIdSelected === 0 ||
          this.categorieIdSelected === categorie_id)
      );
    },

    reserve(description, price, id) {
      //this.dialog = true;

      this.loading = true;
      this.descriptionSelected = description;
      this.priceSelected = price;
      this.productIdSelected = id;
      setTimeout(() => (this.loading = false), 2000);
    },
    
    initialize() {
      this.$store
        .dispatch("allCategories")
        .then(() => {})
        .catch((err) => {
          alert(err.message || err);
        });

      this.$store
        .dispatch("allProducts")
        .then(() => {})
        .catch((err) => {
          alert(err.message || err);
          this.$router.push("/");
        });

      this.$store
        .dispatch("allProviders")
        .then(() => {})
        .catch((err) => {
          alert(err.message || err);
        });
    },
    increment() {
      this.foo = parseInt(this.foo, 10) + 1;
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1;
    },
    createOrder() {
      if (this.$refs.createOrderForm.validate()) {
        const newOrder = {
          address: this.userAddress,
          user_id: this.$store.getters.getIdUser,
          quantity: this.foo,
          price: this.priceSelected,
          product_id: this.productIdSelected,
        };

        this.$store
          .dispatch("createOrder", newOrder)
          .then(() => {
            this.$router.push("/pedidos");
          })
          .catch((err) => {
            alert(err.message || err);
          });
      }
    },
  },

  mounted() {
    this.initialize();
  },
};
</script>
