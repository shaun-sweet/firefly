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

      <div class="messageContainer">
        <q-btn flat v-if="statusMessages.length > 0">
          <i>Messages</i>
          <q-tooltip>
            <div v-for="(message, key) in statusMessages" :key="key">
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
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    components: {
      Navigation
    },
    computed: {
      ...mapGetters([
        'statusMessages',
        'locationStatus',
        'alarmStatus'
      ]),
      currentMode () {
        return this.locationStatus.mode
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

.messageContainer
  display block
</style>
