<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card max-width="500" class="mx-auto">
          <v-img :src="'http://backoffice.g06.batoilogic.es' + user.photo" height="300px" dark>
          </v-img>

          <v-card-title class="darken-1">
            <span class="headline">{{ user.name + " " + user.surname }}</span>

            <v-spacer></v-spacer>

            <v-btn icon @click.stop="editUser()">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon @click.stop="dialogLogout = true">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider inset></v-divider>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo"> mdi-cloud-upload </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.created_at }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo"> mdi-email </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo"> mdi-map-marker </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.address }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card>
          <v-list two-line>
            <template>
              <v-toolbar color="#E54B4B" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Pedidos pendientes</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="allProducts">
                  <v-icon>mdi-widgets</v-icon>
                </v-btn>
              </v-toolbar>

              <v-divider></v-divider>

              <v-list-item v-for="order in orders" :key="order.id">
                <v-list-item-content>
                  <v-list-item-title
                    v-html="order.productName"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="
                      order.state +
                      ' | ' +
                      order.orderLine.quantity +
                      ' paquetes | ' +
                      order.orderLine.price +
                      '€/paquete'
                    "
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="order.address"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="order.created_at"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="dialogEdit(order)">
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <!-- Mensaje Logout -->
      <v-dialog v-model="dialogLogout" max-width="290">
        <v-card>
          <v-card-title class="headline">¿Cerrar sesión?</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" @click="logout">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Mensaje Edit Order -->
      <v-dialog v-model="dialogEditOrder" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar cantidad pedido</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    :rules="[rules.required, rules.min]"
                    v-model="quantityEdit"
                    label="Cantidad"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Actualizar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Mensaje Edit User -->
      <v-dialog v-model="dialogEditUser" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar perfil</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :rules="[rules.required]"
                    v-model="userEdit.name"
                    label="Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :rules="[rules.required]"
                    v-model="userEdit.surname"
                    label="Apellidos"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="[rules.required]"
                    v-model="userEdit.address"
                    label="Dirección"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="d-flex justify-space-between caption">
                <div>
                  <div class="grey--text mb-2">
                    Si quiere editar más campos de su perfil vaya a la nuestra
                    página oficial backoffice.g06.batoilogic.es
                  </div>
                </div>
              </div>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelUpdateUser">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateUser">
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialogLogout: false,
      dialogEditOrder: false,
      dialogEditUser: false,

      idEdit: 0,
      quantityEdit: 0,

      userEdit: {},

      rules: {
        required: (value) => !!value || "Campo obligatorio",
        min: (v) => (v && v >= 1) || "Mínimo 1 paquete",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    orders() {
      return this.$store.state.orders;
    },
  },
  methods: {
    logout() {
      this.dialogLogout = false;
      this.$store.commit("logout");
      this.$router.push("/autenticacion");
    },
    initialize() {
      this.$store
        .dispatch("allOrders", this.user.id)
        .then(() => {})
        .catch((err) => {
          alert(err.message || err);
        });
    },
    dialogEdit(order) {
      this.quantityEdit = order.orderLine.quantity;
      this.idEdit = order.orderLine.id;
      this.dialogEditOrder = true;
    },
    close() {
      this.quantityEdit = 0;
      this.idEdit = 0;
      this.dialogEditOrder = false;
    },
    save() {
      if (Number(this.quantityEdit)) {
        this.$store
          .dispatch("editOrder", {
            id: this.idEdit,
            quantity: Number(this.quantityEdit),
          })
          .then(() => {
            this.close();
            this.initialize();
          })
          .catch((err) => {
            alert(err.message || err);
          });
      }
    },
    editUser() {
      this.dialogEditUser = true;
      this.userEdit = {
        name: this.user.name,
        surname: this.user.surname,
        address: this.user.address,
      };
    },
    cancelUpdateUser() {
      this.dialogEditUser = false;
      this.userEdit = {};
    },
    updateUser() {
      if (
        this.userEdit.name &&
        this.userEdit.surname &&
        this.userEdit.address
      ) {
        this.$store
          .dispatch("editUser", {
            id: this.user.id,
            data: this.userEdit,
          })
          .then(() => {
            this.cancelUpdateUser();
          })
          .catch((err) => {
            alert(err.message || err);
          });
      }
    },
    allProducts() {
      this.$router.push("/pedidos");
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>
