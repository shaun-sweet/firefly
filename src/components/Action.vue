<template>
  <q-card>
    <div class="row">
    <q-card-title class="col-6">
      <h6>{{ title }}</h6>
      <span slot="subtitle" class="context-text">{{ context }}</span>
    </q-card-title>
    <q-card-main class="col-6 status-text-container">
        <q-toggle v-if="isSwitch" class="pull-right" v-model="switchStateBool" />
        <q-slider
          v-model="sliderValue"
          v-if="isSlider"
          :min="actionMetadata.minLevel"
          :max="actionMetadata.maxLevel"
          :step="actionMetadata.levelStep"
          label
          snap
        />
        <span 
          v-if="!isCommandable"
          class="caption pull-right"
        >
          {{ actionStatus }}
        </span>
    </q-card-main>

    </div>
  </q-card>
</template>

<script>
import { isActive } from 'src/utils/deviceHelper'
import * as firebase from 'src/firebase'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

export default {
  props: [
    'actionMetadata'
  ],
  methods: {
    handleSliderFirebaseCommand: debounce(function () {
      const state = this.$store.state
      const deviceId = this.$store.getters.modalDeviceId
      const homeId = state.selectedHome
      const command = {
        [this.actionMetadata.command]: {
          [this.actionMetadata.commandProp]: this.sliderValue
        }
      }
      const payload = {
        command,
        homeId,
        deviceId
      }
      firebase.issueCommand(payload)
    }, 200)
  },
  computed: {
    isSlider () {
      return this.actionMetadata.type === 'slider'
    },
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
    sliderValue: {
      get () {
        return this.actionStatus
      },

      set (newVal) {
        this.$store.commit('DEVICE_STATE_UPDATE', {
          [this.statusKey]: newVal
        })
        this.handleSliderFirebaseCommand()
      }
    },
    switchStateBool: {
      get () {
        return isActive(this.actionStatus)
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
    actionStatus: {
      get () {
        return this.$store.getters.deviceModalStatus[this.statusKey]
      },
      set () {

      }
    }
  },
  data () {
    return {
    }
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

.slider-container
  flex 1
</style>

