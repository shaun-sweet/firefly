import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from 'views/ProfileView.vue'
import Login from 'views/LoginView.vue'
import DeviceSettings from 'views/DeviceSettingsView'
import HomeSettings from 'views/HomeSettingsView'
import MessagesView from 'views/MessagesView'
import RoutinesView from 'views/RoutinesView'
import DevicesView from 'views/DevicesView'
Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

export default new VueRouter({
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
      path: '*',
      redirect: '/devices'
    }
  ]
})
