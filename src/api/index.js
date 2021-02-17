import axios from 'axios'
//const baseURL = "http://localhost/api";
const baseURL = "http://backoffice.g06.batoilogic.es/api";
const DEBUG = false;

const users = {
    login: (user) => axios.post(`${baseURL}/login-customer`, user),
    register: (user) => axios.post(`${baseURL}/user-api`, user),  
    update: (user) => axios.put(`${baseURL}/user-api/${user.id}`, user),  
};

const products = {
    getAll: () => axios.get(`${baseURL}/product-api`),
}

const orders = {
    create: (order) => axios.post(`${baseURL}/order-api`, order),
    getAll: (id) => axios.get(`${baseURL}/order-customer/${id}`),
    getAllAll: (id) => axios.get(`${baseURL}/order-customer-all/${id}`),
    edit: (order) => axios.put(`${baseURL}/order-line/${order.id}`, { quantity: order.quantity }),
}

const categories = {
    getAll: () => axios.get(`${baseURL}/categorie`),
}

const providers = {
    getAll: () => axios.get(`${baseURL}/provider-api`),
}

axios.interceptors.request.use((config) => {
    if(sessionStorage.token) { config.headers['Authorization'] = 'Bearer ' + sessionStorage.token; }

    if (DEBUG) { console.info('Request: ', config); }  
    return config;
}, (error) => {
    if (DEBUG) { console.error('Request error: ', error); }
    return Promise.reject(error);
});
  
axios.interceptors.response.use((response) => {
    if (DEBUG) { console.info('Response: ', response); }
    return response;
}, (error) => {
    if (error.response && error.response.status !== 400) { alert('Response error ' + error.response.status + '(' + error.response.statusText + ')') }
    if (DEBUG) { console.info('Response error: ', error);}
    return Promise.reject(error);
});


export default {
    users,
    products,
    orders,
    categories,
    providers
};