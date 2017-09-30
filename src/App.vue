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
    <q-list no-border link inset-delimiter>
      <q-list-header>{User information and home}</q-list-header>
      <q-side-link item to="/devices">
        <q-item-side icon="ion-radio-waves" />
        <q-item-main label="Devices" sublabel="{count w state on?}" />
      </q-side-link>
      <q-side-link item to="/routines">
        <q-item-side icon="ion-clipboard" />
        <q-item-main label="Routines" sublabel="{or nothing?}" />
      </q-side-link>
      <q-side-link item to="/messages">
        <q-item-side icon="ion-paper-airplane" />
        <q-item-main label="Messages" />
      </q-side-link>
      <q-list-header> Management </q-list-header>
      <q-side-link item to="/login">
        <q-item-side item icon="ion-power" />
        <q-item-main label="Login/Logout" />
      </q-side-link>
      <q-side-link item to="/profile">
        <q-item-side icon="ion-android-person" />
        <q-item-main label="Profile" />
      </q-side-link>
      <q-side-link item to="/home-settings">
        <q-item-side icon="ion-home" />
        <q-item-main label="Home Settings" />
      </q-side-link>
      <q-side-link item to="/device-settings">
        <q-item-side icon="ion-android-options" />
        <q-item-main label="Device Settings" />
      </q-side-link>
    </q-list>
  </div>

  <router-view />

  <q-toolbar slot="footer">
    <small>Firefly</small>
  </q-toolbar>

</q-layout>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
</style>
