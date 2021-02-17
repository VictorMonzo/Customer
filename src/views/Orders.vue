<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="totalOrders"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Historial de pedidos de {{ userName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mb-2 btn-primary"
              v-bind="attrs"
              v-on="on"
              @click="newOrderBtn"
            >
              Nuevo pedido
            </v-btn>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
        <div class="pt-4 pb-4" justify="center" content="center" >
          <div>
            <div class="grey--text mb-2 no-product-text">
              <h4>
                No ha realizado ningún pedido.
              </h4>
            </div>
          </div>
        </div>

        <v-btn color="btn-primary" @click="newOrderBtn">
          Hacer pedido
        </v-btn>
      </template>
      
  </v-data-table>
</v-container>
</template>

<script>
export default {
  name: "Order",
  
  data: () => ({
    headers: [
      {
        text: "Nombre producto",
        align: "start",
        sortable: false,
        value: "productName",
        class: "s-red s-light"
      },
      { text: "Estado", value: "state", sortable: false, class: "s-red s-light" },
      { text: "Dirección", value: "address", sortable: false, class: "s-red s-light" },
      { text: "Pedido", value: "created_at", class: "s-red s-light" },
      { text: "Cantidad", value: "orderLine.quantity", class: "s-red s-light" },
      { text: "Precio (€)", value: "orderLine.price", class: "s-red s-light" },
    ],
  }),
  computed: {
    userName() {
      return this.$store.getters.getNameUser;
    },
    totalOrders() {
      return this.$store.state.totalOrders;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store
        .dispatch("allAllOrders", this.$store.getters.getIdUser)
        .then(() => {})
        .catch((err) => {
          alert(err.message || err);
        });
    },

    newOrderBtn() {
      this.$router.push("/productos");
    },
  },
};
</script>