// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE

import { onAuthStateChange } from 'src/firebase'
import Vue from 'vue'
import store from 'src/store'
import Quasar, {
  QBtn,
  QCard,
  QCardMain,
  QField,
  QIcon,
  QToggle,
  QAutocomplete,
  QSearch,
  QModal,
  QInput,
  QToolbar,
  QItemMain,
  QItemSide,
  QSideLink,
  QListHeader,
  QSelect,
  QList,
  QLayout,
  QToolbarTitle,
  QCardTitle,
  QItem,
  QTab,
  QTabs,
  QTabPane,
  QItemSeparator,
  QModalLayout,
  QSlider,
  QTooltip
} from 'quasar'
import router from './router'
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'

require(`quasar/dist/quasar.${__THEME}.css`) // eslint-disable-line no-undef
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: {
    QBtn,
    QCard,
    QCardMain,
    QField,
    QIcon,
    QToggle,
    QAutocomplete,
    QSearch,
    QModal,
    QInput,
    QToolbar,
    QItemMain,
    QItemSide,
    QSideLink,
    QListHeader,
    QSelect,
    QList,
    QLayout,
    QToolbarTitle,
    QCardTitle,
    QItem,
    QTab,
    QTabs,
    QTabPane,
    QItemSeparator,
    QModalLayout,
    QSlider,
    QTooltip
  }
})

if (__THEME === 'mat') { // eslint-disable-line no-undef
  require('quasar-extras/roboto-font')
}
// import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'\

onAuthStateChange((user) => {
  if (user) {
    store.dispatch('getInitialAppState')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  router,
  store,
  render: h => h(require('./App'))
})
