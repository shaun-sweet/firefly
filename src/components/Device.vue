<template>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
    <q-card>
      <q-card-main>
        {{ title }}
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
        const state = this.$store.state
        const payload = {
          command: newVal ? 'on' : 'off',
          homeId: state.selectedHome,
          deviceId: this.deviceId
        }

        this.$store.commit('DEVICE_PRIMARY_STATE_UPDATE', {
          homeId: this.$store.state.selectedHome,
          deviceId: this.deviceId,
          primaryStateStatus: payload.command
        })
        this.$store.dispatch('toggleLight', payload)
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
