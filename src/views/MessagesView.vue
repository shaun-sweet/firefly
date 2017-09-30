<template>
  <q-tabs no-pane-border v-model="selectedTab">
    <q-tab slot="title" name="events" label="Events" default></q-tab>
    <q-tab slot="title" name="notifications" label="Notifications"></q-tab>
    <div class="main-content">
      <q-tab-pane name="events">
        <q-list class="events" no-border>
          <q-list-header>
            <h5>Events</h5>
          </q-list-header>
          <event-message device="component" state="on" timestamp="today" />
          </q-list>
      </q-tab-pane>

      <q-tab-pane name="notifications">
        <q-list class="notifications" no-border>
          <q-list-header class="header">
            <h5>Notifications</h5>
          </q-list-header>
          <notification-message
            trigger="this is the thing triggered"
            timestamp="today" 
          />
          </q-list>
      </q-tab-pane>
    </div>

  </q-tabs>
</template>

<script>
import EventMessage from '@/EventMessage'
import NotificationMessage from '@/NotificationMessage'
export default {
  components: {
    EventMessage,
    NotificationMessage
  },
  data () {
    return {
      selectedTab: 'events'
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
