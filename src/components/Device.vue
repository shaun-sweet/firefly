<template>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
    <q-card>
      <q-card-main>
        {{ title }}
        <q-icon class="options-menu" name="ion-android-more-vertical" />
        <q-toggle v-if="isPrimaryCommadable" class="pull-right" v-model="primaryStateBool" />
        <span v-if="!isPrimaryCommadable" class="caption pull-right">{{ notCommandableStatus }}</span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import * as firebase from 'src/firebase'
import get from 'lodash/get'

export default {
  props: [
    'title',
    'deviceId',
    'deviceMetadata'
  ],
  computed: {
    primaryStateText () {
      const state = this.$store.state
      const device = state.homes[state.selectedHome].devicesViewList[this.deviceId]
      const devicePrimaryStateText = device.primaryStateStatus
      return devicePrimaryStateText
    },
    primaryStateBool: {
      get () {
        const state = this.$store.state
        const device = state.homes[state.selectedHome].devicesViewList[this.deviceId]
        const devicePrimaryState = device.primaryStateStatus
        return this.isActive(devicePrimaryState)
      },
      set (newVal) {
        const state = this.$store.state
        const payload = {
          command: newVal ? this.primaryOnCommand : this.primaryOffCommand,
          homeId: state.selectedHome,
          deviceId: this.deviceId
        }

        this.$store.commit('DEVICE_PRIMARY_STATE_UPDATE', {
          homeId: this.$store.state.selectedHome,
          deviceId: this.deviceId,
          primaryStateStatus: payload.command
        })
        firebase.issueCommand(payload)
      }
    },
    notCommandableStatus () {
      const primaryAction = this.deviceMetadata.actions[this.primaryAction]
      const textMapping = get(primaryAction, 'text_mapping', null)
      var displayText
      if (typeof(textMapping) !== null) {
        for (let key in textMapping) {
          let mapping = textMapping[key]
          if (mapping.includes(this.primaryStateText)) {
            displayText = key
          }
        }
      }
      if (displayText) return displayText
      return this.primaryStateText
    },
    primaryAction () {
      return this.deviceMetadata.primary
    },
    isPrimaryCommadable () {
      return get(this.deviceMetadata.actions[this.primaryAction], 'can_command', null)
    },
    canRequest () {
      return this.deviceMetadata.actions[this.primaryAction].can_request
    },
    primaryDescription () {
      return this.deviceMetadata.actions[this.primaryAction].context
    },
    primaryOnCommand () {
      return get(this.deviceMetadata.actions[this.primaryAction], 'on_command', null)
    },
    primaryOffCommand () {
      return get(this.deviceMetadata.actions[this.primaryAction], 'off_command', null)
    }
  },
  data () {
    return {
      statusMap: {
        on: true,
        off: false,
        open: true,
        close: false
      }
    }
  },
  methods: {
    isActive (status) {
      if (typeof(status) === 'boolean') return status
      return this.statusMap[status]
    }
  }
}
</script>

<style  lang="stylus" scoped>

</style>
