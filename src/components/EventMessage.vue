<template>
  <q-item class="event row justify-between">
    <div class="device">{{device}}</div>
    <div class="state">{{state}}</div>
    <div class="timestamp">{{timestamp}}</div>
  </q-item>
</template>

<script>
export default {
  props: ['device', 'state', 'timestamp'],
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
</style>
