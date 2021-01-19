/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



import Vue from "vue";

require("./bootstrap");
require("admin-lte");

window.Vue = require("vue");



import Gate from "./Gate";

Vue.prototype.$gate = new Gate(window.User);

//console.log(window.User);

/* For showing progress-bar while user data creating */
import VueProgressBar from 'vue-progressbar'
const options = {
  color: 'rgb(143,255,199)',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

/* TO customize date formate for more user readable formate */

import moment from "moment";

/* Creating sweet alert for shwing user created message  */
import Swal from 'sweetalert2'
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast = Toast;

/* Vue router  */

import VueRouter from "vue-router";
Vue.use(VueRouter);


/* importing component */

import Dashboard from "./components/Dashboard.vue";
import Profile from "./components/Profile.vue";
import Users from "./components/Users.vue";
import NotFound from "./components/NotFound.vue";





/* Importing vue V-form for more stunning data validation and more stuff */
import { Form, HasError, AlertError } from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/*Pagination registering here*/
Vue.component('pagination', require('laravel-vue-pagination'));
/* Define filter for customization  */

Vue.filter('capitalize',function(value){
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('customDate',function(date){
    return moment(date).format("LL");
})

/* Creating custom events for loading user after creating it */
window.Fire = new Vue()

/* Defining all vue routes */
let routes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/profile", component: Profile },
    { path: "/users", component: Users },
    { path: "*", component: NotFound }
];
const router = new VueRouter({
    mode: "history",
    routes // short for `routes: routes`
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    data:{
        search:''
    },
    methods:{
        searching:_.debounce(()=>{
            Fire.$emit('searching');

        },1000)
        ,
        printAsPdf(){
            window.print();
        }

    }
}).$mount("#app");
