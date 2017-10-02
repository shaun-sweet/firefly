<template>
  <q-list no-border link inset-delimiter>
    <q-list-header>
      {{ emailAddress }}
    </q-list-header>
    <q-select 
      separator
      v-model="test" 
      stack-label="Selected Home" 
      :options="homesList"
      @change="onChangeHandler" />
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
  props: [
    'homesList',
    'emailAddress',
    'selectedHome'
  ],
  mounted () {
    this.test = this.$store.getters.defaultHome[0]
    console.log(this.test)
  },
  methods: {
    onChangeHandler (event) {
      console.log(event)
    }
  },
  data () {
    return {
      test: this.$store.getters.defaultHome[0]
    }
  }
}
</script>

<style  lang="stylus" scoped>
</style>
