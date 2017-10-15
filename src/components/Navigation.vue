<template>
  <q-list no-border link inset-delimiter>
    <q-list-header>
      {{ emailAddress }}
    </q-list-header>
    <q-list-header>
    <q-select 
      separator
      id="homeSelector"
      v-model="selectedHome" 
      stack-label="Selected Home"
      @change="onChange"
      :options="homesList" />

    </q-list-header>
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
</template>

<script>
export default {
  beforeUpdate () {
    if (!this.selectedHome) {
      this.selectedHome = this.$store.getters.defaultHome
    }
  },
  methods: {
    onChange (newSelectedHomeId) {
      this.$store.dispatch('changeSelectedHome', newSelectedHomeId)
    }
  },
  computed: {
    homesList () {
      return this.$store.getters.homesList
    },
    emailAddress () {
      return this.$store.getters.user.email
    }
  },
  data () {
    return {
      selectedHome: ''
    }
  }
}
</script>

<style  lang="stylus" scoped>

</style>
