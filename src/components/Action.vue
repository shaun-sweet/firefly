<template>
  <q-card>
    <div class="row">
    <q-card-title class="col-6">
      <h6>{{ title }}</h6>
      <span slot="subtitle" class="context-text">{{ context }}</span>
    </q-card-title>
    <q-card-main class="col-6 status-text-container">
      <span class="status-text">
        <q-toggle v-if="isSwitch" class="pull-right" v-model="switchStateBool" />
        <span 
          v-if="!isCommandable"
          class="caption pull-right"
        >
          {{ deviceStatus }}
        </span>
      </span>
    </q-card-main>

    </div>
  </q-card>
</template>

<script>
import { isActive } from 'src/utils/deviceHelper'
import * as firebase from 'src/firebase'
import get from 'lodash/get'

export default {
  props: [
    'actionMetadata'
  ],
  computed: {
    isSwitch () {
      return this.actionMetadata.type === 'switch'
    },
    onCommand () {
      return get(this.actionMetadata, 'onCommand', null)
    },
    offCommand () {
      return get(this.actionMetadata, 'offCommand', null)
    },
    isCommandable () {
      return get(this.actionMetadata, 'canCommand', null)
    },
    statusKey () {
      return get(this.actionMetadata, 'request', null)
    },
    actionType () {
      return get(this.actionMetadata, 'type', null)
    },
    title () {
      return get(this.actionMetadata, 'title', null)
    },
    context () {
      return get(this.actionMetadata, 'context', null)
    },
    switchStateBool: {
      get () {
        return isActive(this.deviceStatus)
      },

      set (newVal) {
        const state = this.$store.state
        const deviceId = this.$store.getters.modalDeviceId
        const command = newVal ? this.onCommand : this.offCommand
        const homeId = state.selectedHome
        const payload = {
          command,
          homeId,
          deviceId
        }

        this.$store.commit('DEVICE_STATE_UPDATE', {
          [this.statusKey]: command
        })
        firebase.issueCommand(payload)
      }
    },
    deviceStatus: {
      get () {
        return this.$store.getters.deviceModalStatus[this.statusKey]
      },
      set () {

      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style  lang="stylus" scoped>
.context-text
  margin-bottom 0px
  font-size 12px

.status-text-container
  display flex
  justify-content flex-end
  align-items center
  padding 16px
</style>

