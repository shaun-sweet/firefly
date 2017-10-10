<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
    <q-card @click="test()">
      <q-card-main>
        {{ title}}
        <q-icon class="options-menu" name="ion-android-more-vertical" />
        <q-toggle class="pull-right" v-model="switchState" />
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'deviceId'
  ],
  computed: {
    switchState: {
      get () {
        const state = this.$store.state
        const deviceState = state.homes[state.selectedHome].devicesViewList[this.deviceId].primaryStateStatus
        return this.isActive(deviceState)
      },
      set (newVal) {
        const payload = newVal ? 'on' : 'off'
        this.$store.commit('DEVICE_PRIMARY_STATE_UPDATE', {
          homeId: this.$store.state.selectedHome,
          deviceId: this.deviceId,
          primaryStateStatus: payload
        })
      }
    }
  },
  methods: {
    isActive (status) {
      return (status === 'on')
    }
  }
}
</script>

<style  lang="stylus" scoped>

</style>
