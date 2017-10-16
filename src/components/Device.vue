<template>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
    <q-card>
      <q-card-main>
        {{ title }}
        <q-icon class="options-menu" name="ion-android-more-vertical" />
        <q-toggle v-if="isPrimaryCommadable" class="pull-right" v-model="primaryState" />
        <span v-if="!isPrimaryCommadable" class="caption pull-right">{{ notCommandableStatus }}</span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import * as firebase from 'src/firebase'

export default {
  props: [
    'title',
    'deviceId',
    'deviceMetadata'
  ],
  computed: {
    primaryState: {
      get () {
        const state = this.$store.state
        const device = state.homes[state.selectedHome].devicesViewList[this.deviceId]
        const deviceState = state.homes[state.selectedHome].devicesViewList[this.deviceId].primaryStateStatus
        return this.isActive(deviceState)
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
      const trueText = this.deviceMetadata.actions[this.primaryAction].text_mapping.Open[0]
      const falseText = this.deviceMetadata.actions[this.primaryAction].text_mapping.Closed[0]
      return this.primaryState ? trueText : falseText
    },
    primaryAction () {
      return this.deviceMetadata.primary
    },
    isPrimaryCommadable () {
      return this.deviceMetadata.actions[this.primaryAction].can_command
    },
    canRequest () {
      return this.deviceMetadata.actions[this.primaryAction].can_request
    },
    primaryDescription () {
      return this.deviceMetadata.actions[this.primaryAction].context
    },
    primaryOnCommand () {
      if (this.isPrimaryCommadable) {
        return this.deviceMetadata.actions[this.primaryAction].on_command
      }
      return null
    },
    primaryOffCommand () {
      if (this.isPrimaryCommadable) {
        return this.deviceMetadata.actions[this.primaryAction].off_command
      }
      return null
    }
  },
  data () {
    return {
      // deviceMetadata: this.$store.state.homes[this.$store.state.selectedHome].devicesViewList[this.deviceId].metadata,
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
      return this.statusMap[status]
    }
  }
}
</script>

<style  lang="stylus" scoped>

</style>
