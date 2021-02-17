import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    products: [],
    orders: [],
    totalOrders: [],
    categories:  [],
    providers: [],
    isAuthenticated: false
  },
  mutations: {
    login(state, user) {
      sessionStorage.setItem('token', user.token);
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      sessionStorage.removeItem('token');
      state.user = [];
      state.orders = [];
      state.isAuthenticated = false;
    },
    allProducts(state, products) {
      state.products = products;
    },
    allOrders(state, orders) {
      state.orders = orders;
    },
    allAllOrders(state, orders) {
      state.totalOrders = orders;
    },
    allCategories(state, categories) {
      state.categories = categories;
    },
    allProviders(state, providers) {
      state.providers = providers;
    },
    editUser(state, user) {
      state.user.name = user.name;
      state.user.surname = user.surname;
      state.user.address = user.address;
    },
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        api.users.login(user).then((response) => {
          if (response.data) {
            context.commit('login', response.data)
            resolve()
          } else {
            reject('No se ha encontrado ningún usuario');
          }
        }).catch(err => reject(err))
      })
    },
    register(context, user) {
      return new Promise((resolve, reject) => {
        api.users.register(user).then((response) => {
          if (response.data) {
            resolve()
          } else {
            reject('No se ha podido regstrar');
          }
        }).catch(err => reject(err))
      })
    },
    allProducts(context) {
      return new Promise((resolve, reject) => {
        api.products.getAll().then((response) => {
          if (response.data) {
            context.commit('allProducts', response.data);
            resolve();
          } else {
            reject('No se ha podido cargar los productos');
          }
        }).catch(err => reject(err))
      })
    },
    createOrder(context, order) {
      return new Promise((resolve, reject) => {
        api.orders.create(order).then((response) => {
          if (response.data) {
            resolve();
          } else {
            reject('No se ha podido hacer el pedido');
          }
        }).catch(err => reject(err))
      })
    },
    allOrders(context, id) {
      return new Promise((resolve, reject) => {
        api.orders.getAll(id).then((response) => {
          if (response.data) {
            context.commit('allOrders', response.data);
            resolve();
          } else {
            reject('No se ha podido cargar los pedidos');
          }
        }).catch(err => reject(err))
      })
    },
    allAllOrders(context, id) {
      return new Promise((resolve, reject) => {
        api.orders.getAllAll(id).then((response) => {
          if (response.data) {
            context.commit('allAllOrders', response.data);
            resolve();
          } else {
            reject('No se ha podido cargar los pedidos');
          }
        }).catch(err => reject(err))
      })
    },
    editOrder(context, order) {
      return new Promise((resolve, reject) => {
        api.orders.edit(order).then((response) => {
          if (response.data) {
            resolve();
          } else {
            reject('No se ha podido editar el pedido');
          }
        }).catch(err => reject(err))
      })
    },
    allCategories(context) {
      return new Promise((resolve, reject) => {
        api.categories.getAll().then((response) => {
          if (response.data) {
            context.commit('allCategories', response.data);
            resolve();
          } else {
            reject('No se ha podido cargar las categorias');
          }
        }).catch(err => reject(err))
      })
    },
    allProviders(context) {
      return new Promise((resolve, reject) => {
        api.providers.getAll().then((response) => {
          if (response.data) {
            context.commit('allProviders', response.data);
            resolve();
          } else {
            reject('No se ha podido cargar los proveedores');
          }
        }).catch(err => reject(err))
      })
    },
    editUser(context, user) {
      const userData = {
        id: user.id,
        address: user.data.address,
        name: user.data.name,
        surname: user.data.surname
      }

      return new Promise((resolve, reject) => {
        api.users.update(userData).then((response) => {
          if (response.data) {
            context.commit('editUser', user.data);
            resolve();
          } else {
            reject('No se ha podido editar el usuario');
          }
        }).catch(err => reject(err))
      })
    },
    changeCategorie(context, id) {
      return new Promise((resolve, reject) => {
          context.commit('changeCategorie', id);
          resolve()
          reject('No se ha podido cargar las categorias');
      })
    }
  },
  getters: {
    getIsAuth: (state) => {
      //return sessionStorage.token;
      return state.isAuthenticated;
    },
    getNameUser: (state) => {
      return state.user.name;
    },
    getAddressUser: (state) => {
      return state.user.address;
    },
    getIdUser: (state) => {
      return state.user.id;
    },
    getUrlPhoto: (state) => {
      return state.user.photo;
    }
  }
})
