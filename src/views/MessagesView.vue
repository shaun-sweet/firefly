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
import get from 'lodash/get'

export default {
  components: {
    EventMessage,
    NotificationMessage
  },
  beforeCreate () {
    const state = this.$store.state
    getMessages(state.selectedHome)
      .then((snaps) => {
        const notificationsObj = snaps[0].val()
        const eventsObj = snaps[1].val()
        this.notifications = Object.keys(notificationsObj).map((id) => {
          notificationsObj[id].id = id
          return notificationsObj[id]
        })
        this.events = Object.keys(eventsObj).map((id) => {
          eventsObj[id].id = id
          eventsObj[id].deviceAlias = get(state, `homes.${state.selectedHome}.devicesViewList.${eventsObj[id].ff_id}.alias`)
          return eventsObj[id]
        })
      })
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
  data () {
    return {
      selectedTab: 'notifications',
      notifications: [],
      events: []
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
