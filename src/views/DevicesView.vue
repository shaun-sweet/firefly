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
      <device />

    </div>
  </div>
</template>

<script>
import Device from '@/Device'
export default {
  components: {
    Device
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
