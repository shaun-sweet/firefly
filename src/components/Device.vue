<template>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
    <q-card>
      <q-card-main>
        <span @click="onClickHandler(deviceId, deviceMetadata)" class="click-target">
          {{ title }}
          <q-icon class="options-menu" name="ion-android-more-vertical" />
        </span>
        <q-toggle v-if="isPrimaryCommadable" class="pull-right" v-model="primaryStateBool" />
        <span v-if="!isPrimaryCommadable" :style="primaryStateStyle" class="caption pull-right">
          {{ notCommandablePrimaryStatus }}
        </span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import * as firebase from 'src/firebase'
import get from 'lodash/get'
import { isActive } from 'src/utils/deviceHelper'

export default {
  props: [
    'title',
    'deviceId',
    'deviceMetadata',
    'onClickHandler'
  ],
  computed: {
    primaryStateStyle () {
      const primaryAction = this.deviceMetadata.actions[this.primaryAction]
      const colorMapping = get(primaryAction, 'colorMapping', null)
      var color = ''
      if (colorMapping !== null) {
        for (let key in colorMapping) {
          let mapping = colorMapping[key]
          if (mapping.includes(this.primaryStateText)) {
            color = key
          }
        }
      }
      return { color }
    },
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
        return isActive(devicePrimaryState)
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
    notCommandablePrimaryStatus () {
      const primaryAction = this.deviceMetadata.actions[this.primaryAction]
      const textMapping = get(primaryAction, 'textMapping', null)
      var displayText
      if (textMapping !== null) {
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
      return get(this.deviceMetadata.actions[this.primaryAction], 'canCommand', null)
    },
    canRequest () {
      return this.deviceMetadata.actions[this.primaryAction].canRequest
    },
    primaryDescription () {
      return this.deviceMetadata.actions[this.primaryAction].context
    },
    primaryOnCommand () {
      return get(this.deviceMetadata.actions[this.primaryAction], 'onCommand', null)
    },
    primaryOffCommand () {
      return get(this.deviceMetadata.actions[this.primaryAction], 'offCommand', null)
    }
  },
  data () {
    return {}
  }
}
</script>

<style  lang="stylus" scoped>
.options-menu
  padding-right 1em
  font-size 20px
  
.click-target
  cursor pointer
</style>
