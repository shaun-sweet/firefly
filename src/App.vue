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
      <div slot="right">
        <q-toolbar-title>
        <span >Current Mode: {{ currentMode | capitalize }}</span>
        <span slot="subtitle">Alarm Status: {{ alarmStatus | capitalize }}</span>
        </q-toolbar-title>
      </div>
    </q-toolbar>
    <div slot="left">
      <navigation />
    </div>
    <router-view />

    <q-toolbar slot="footer" class="justify-around">
      <small>Firefly </small>

      <div style="display:block">
      <q-btn ref="target" flat v-show="messages.length > 0">
        <i>Messages</i>
        <q-tooltip>
          <div v-for="message in messages">
            {{message}}
          </div>
        </q-tooltip>
      </q-btn>
      </div>

    </q-toolbar>

  </q-layout>
</template>





<script>
  import Navigation from '@/Navigation'
  import values from 'lodash/values'
  export default {
    name: 'app',
    components: {
      Navigation
    },
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
      locationStatus () {
        return this.$store.getters.locationStatus
      },
      currentMode () {
        return this.locationStatus.mode
      },
      alarmStatus () {
        return this.locationStatus.security.status
      },
      messages () {
        return values(this.locationStatus.messages)
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
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
