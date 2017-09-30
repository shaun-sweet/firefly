<template>
  <q-item class="row notification">
    <div class="device col">{{trigger}}</div>
    <div class="timestamp col row">
      <span class='value'>{{timestamp}}</span>
    </div>
  </q-item>
</template>

<script>
export default {
  props: ['trigger', 'timestamp'],
  data () {
    return {}
  }
}
</script>

<style  lang="stylus" scoped>
</style>
