import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import("@/views/home");
const SignIn = () => import("@/views/SignIn");
const Image = () => import("@/views/Images");
const homePage = () => import("@/views/homepage");
const psPage = () => import("@/views/ps");
const SignOn = () => import("@/views/SignOn");

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path : "/signIn",
    name : "SignIn",
    component : SignIn
  },
  {
    path : "/images",
    name : "Images",
    component : Image
  },
  {
    path : "/homepage",
    name : "HomePage",
    component : homePage
  },
  {
    path : "/pspage",
    name : "psPage",
    component : psPage
  },
  {
    path : "/signon",
    name : "SignOn",
    component : SignOn
  },
  {
    path : "*",
    redirect : "/home"
  }
]

const router = new VueRouter({
  routes
})

export default router
