<template>
  <div class="layout-padding">
    <q-modal ref="deviceMenu">
      <div class="layout-padding">
        <h4>
          Device Menu
        </h4>
        <q-btn color="primary" @click="$refs.deviceMenu.close()">Close</q-btn>
      </div>
    </q-modal>
    <div class="row">
      <device 
        v-for="device in devicesViewList" 
        :key="device.ff_id"
        :title="device.alias"
        :ff-id="device.ff_id"
      />
    </div>
  </div>
</template>

<script>

import Device from '@/Device'
export default {
  components: {
    Device
  },
  computed: {
    devicesViewList () {
      return this.$store.getters.devicesViewList
    }
  },
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.options-menu 
  margin-left 0.2em
  cursor pointer


</style>
