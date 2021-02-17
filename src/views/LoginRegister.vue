<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-alert
        v-model="errorAuth"
        border="top"
        color="red lighten"
        dismissible
        elevation="2"
        type="error"
        >{{ errorMsg }}</v-alert
      >

      <v-alert
        v-model="registerExit"
        border="top"
        dismissible
        elevation="2"
        type="success"
        >Se ha registrado correctamente, inicise sesión</v-alert
      >

      <v-tabs
        v-model="tab"
        show-arrows
        background-color="#E54B4B"
        icons-and-text
        dark
        grow
      >
        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.id">
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="loginUser.login"
                      :rules="loginEmailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="loginUser.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      class="btn-primary"
                      @click="login"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="newUser.name"
                      :rules="[rules.required]"
                      label="Nombre"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="newUser.surname"
                      :rules="[rules.required]"
                      label="Apellidos"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newUser.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newUser.address"
                      :rules="addressRules"
                      filled
                      label="Dirección"
                      auto-grow
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newUser.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      block
                      v-model="verify"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, passwordMatch]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirmar contraseña"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12" align-end>
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      class="btn-primary"
                      @click="register"
                      >Registrar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    passwordMatch() {
      return () =>
        this.newUser.password === this.verify || "Las contraseñas no coinciden";
    },
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.errorAuth = false;
        this.$store
          .dispatch("login", this.loginUser)
          .then(() => {
            this.$router.push("/productos");
          })
          .catch((err) => {
            this.errorAuth = true;
            this.errorMsg = err.message || err;
          });
      }
    },
    register() {
      if (this.$refs.registerForm.validate()) {
        this.errorAuth = false;
        this.$store
          .dispatch("register", this.newUser)
          .then(() => {
            this.$router.push("/autenticacion");
            this.registerExit = true;
            this.tab = 0;
          })
          .catch((err) => {
            this.registerExit = false;
            this.errorAuth = true;
            this.errorMsg = err.message || err;
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account", id: 1 },
      { name: "Register", icon: "mdi-account-outline", id: 2 },
    ],
    valid: true,
    verify: "",

    registerExit: false,
    errorAuth: false,
    errorMsg: "",

    newUser: {},
    loginUser: {},

    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail no es válido",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail no es válido",
    ],
    addressRules: [(v) => !!v || "Required"],

    show1: false,
    rules: {
      required: (value) => !!value || "Campo obligatorio",
      min: (v) => (v && v.length >= 8) || "Minimo 8 carácteres",
    },
  }),
};
</script>