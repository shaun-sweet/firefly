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
    <q-btn color="primary" @click="$refs.addNodeMenu.open()" big icon="ion-plus">Add Node</q-btn>
    <q-btn color="primary" @click="$refs.addPresenceDeviceMenu.open()" big icon="ion-toggle-filled">Add Presence Device</q-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
</style>
