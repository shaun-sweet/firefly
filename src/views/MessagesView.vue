<template>
  <q-tabs no-pane-border v-model="selectedTab">
    <q-tab slot="title" name="notifications" label="Notifications" default></q-tab>
    <q-tab slot="title" name="events" label="Events" ></q-tab>
    <div class="main-content">

      <q-tab-pane name="notifications">
        <q-list class="notifications" no-border>
          <q-list-header class="header">
            <h5>Notifications</h5>
          </q-list-header>
          <notification-message
            v-for="notification in notifications"
            :key="notification.id"
            :trigger="notification.message"
            :timestamp="notification.time" 
          />
          </q-list>
      </q-tab-pane>

      <q-tab-pane name="events">
        <q-list class="events" no-border>
          <q-list-header>
            <h5>Events</h5>
          </q-list-header>
          <event-message 
            v-for="event in events"
            :key="event.id"
            :device="event.deviceAlias" 
            :state="getValue(event.event)" 
            :timestamp="event.time" />
          </q-list>
      </q-tab-pane>
    </div>

  </q-tabs>
</template>

<script>
import EventMessage from '@/EventMessage'
import NotificationMessage from '@/NotificationMessage'
import { getMessages } from 'src/firebase'
import { mapGetters } from 'vuex'
import get from 'lodash/get'

export default {
  components: {
    EventMessage,
    NotificationMessage
  },
  beforeCreate () {
    const eventsRef = `homeStatus/${this.$store.getters.selectedHome}/events`
    if (!this.$store.state.appState.activeSubscriptions.includes(eventsRef)) {
      this.$store.dispatch('subscribeToMessages')
    }
  },
  methods: {
    getValue (event) {
      var formattedString
      for (let key in event) {
        formattedString = `${key}: ${event[key]}`
      }
      return formattedString
    }
  },
  computed: {
    ...mapGetters([
      'notifications',
      'events'
    ])
  },
  data () {
    return {
      selectedTab: 'notifications'
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-content
  padding-right 0.5rem

.notifications .timestamp > .value
  margin-left auto

.header
  margin auto
</style>
