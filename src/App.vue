<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="ion-navicon" />
      </q-btn>
      <q-toolbar-title>
        Firefly
        <span slot="subtitle">Home Automation</span>
      </q-toolbar-title>
    </q-toolbar>
    <div slot="left">
      <navigation />
    </div>
    <router-view />

    <q-toolbar slot="footer">
      <small>Firefly</small>
    </q-toolbar>

  </q-layout>
</template>

<script>
import Navigation from '@/Navigation'
export default {
  name: 'app',
  components: {
    Navigation
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
body.with-modal
  padding-right 0px !important
</style>
