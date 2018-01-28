import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCurrentUser } from 'src/firebase'
const Login = () => import('views/LoginView.vue')
const DeviceSettings = () => import('views/DeviceSettingsView.vue')
const HomeSettings = () => import('views/HomeSettingsView.vue')
const MessagesView = () => import('views/MessagesView.vue')
const RoutinesView = () => import('views/RoutinesView.vue')
const DevicesView = () => import('views/DevicesView.vue')
const Profile = () => import('views/ProfileView.vue')
const SignupView = () => import('views/Signup.vue')
Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }, {
      name: 'profile',
      path: '/profile',
      component: Profile
    }, {
      name: 'deviceSettings',
      path: '/device-settings',
      component: DeviceSettings
    }, {
      name: 'homeSettings',
      path: '/home-settings',
      component: HomeSettings
    },
    {
      name: 'messagesView',
      path: '/messages',
      component: MessagesView
    },
    {
      name: 'routinesView',
      path: '/routines',
      component: RoutinesView
    },
    {
      name: 'devicesView',
      path: '/devices',
      component: DevicesView
    },
    {
      name: 'signupView',
      path: '/signup',
      component: SignupView
    },
    {
      path: '*',
      redirect: '/devices'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (getCurrentUser() || to.path === '/login') {
    return next()
  }
  console.error(`You aren't logged in`)
  return next('/login')
})
export default router
