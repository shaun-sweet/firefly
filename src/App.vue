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
      <navigation :emailAddress="emailAddress" :homesList="homesList" :selectedHome="selectedHome" />
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
  computed: {
    homesList () {
      return this.$store.getters.homesList
    },
    emailAddress () {
      return this.$store.getters.user.email
    },
    selectedHome () {
      return this.$store.getters.defaultHome[0]
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
</style>
