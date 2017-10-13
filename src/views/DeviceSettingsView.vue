<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-modal ref="addNodeMenu">
      <div class="layout-padding">
        <h4>
          Add Node
        </h4>
        <q-btn color="primary" @click="$refs.addNodeMenu.close()">Close</q-btn>
      </div>
    </q-modal>
    <q-modal ref="addPresenceDeviceMenu">
      <div class="layout-padding">
        <h4>Add Presence Device</h4>
        <q-btn color="primary" @click="$refs.addPresenceDeviceMenu.close()">Close</q-btn>
      </div>
    </q-modal>
    <div class="button-group">
      <q-btn color="primary" @click.prevent="handleAddZwave" big icon="ion-plus">Add Zwave Node</q-btn><br />
      <q-btn color="faded" @click.prevent="handleRemoveZwave" big icon="ion-android-cancel">Remove Zwave Node</q-btn><br />
      <q-btn color="negative" @click.prevent="handleCancelZwave" big icon="ion-toggle-filled">Cancel Zwave Command</q-btn><br />
      <q-btn color="amber" @click.prevent="handleRepairZwave" big icon="ion-toggle-filled">Repair Zwave Command</q-btn>
    </div>

  </div>
</template>

<script>
import * as firebase from 'src/firebase'

export default {
  data () {
    return {

    }
  },
  methods: {
    handleAddZwave () {
      const state = this.$store.state
      const payload = {
        homeId: state.selectedHome,
        command: 'add_node'
      }
      firebase.zWaveCommand(payload)
    },

    handleRemoveZwave () {
      const state = this.$store.state
      const payload = {
        homeId: state.selectedHome,
        command: 'remove_node'
      }
      firebase.zWaveCommand(payload)
    },

    handleCancelZwave () {
      const state = this.$store.state
      const payload = {
        homeId: state.selectedHome,
        command: 'cancel'
      }
      firebase.zWaveCommand(payload)
    },
    handleRepairZwave () {

    }
  }
}
</script>

<style lang="stylus">
.button-group button
  margin-bottom 1em

</style>
