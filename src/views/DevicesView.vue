<template>
  <div class="layout-padding">
    <q-modal 
      class="device-modal"
      :content-css="{minWidth: '60vw', padding: '1em'}" 
      @close="closeDeviceMenuHandler()" 
      ref="deviceMenu"
    >
      <!-- <div class="layout-padding"> -->
        <action
          v-for="(action, index) in deviceModalActions"
          :key="index"
          :actionMetadata="action"
         />
        <q-btn class="close-btn" color="primary" @click="$refs.deviceMenu.close()">Close</q-btn>
      <!-- </div> -->
    </q-modal>
    <div class="row search-bar">
      <div class="col-6">
        <q-search v-model="searchTerms" placeholder="Search a device"> 
          <q-autocomplete
            separator
            :filter="fuzzyFind"
            :static-data="{field: 'alias', list: devicesViewList}"
            @search="fuzzyFind"
            @selected="selected"
          />
        </q-search>
      </div>
    </div>
    <div class="row">
      <device 
        v-for="device in devicesViewList"
        :key="device.ff_id"
        :title="device.alias"
        :device-id="device.ff_id"
        :on-click-handler="onDeviceMenuHandler"
        :device-metadata="device.metadata"
      />
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import Device from '@/Device'
import Action from '@/Action'

export default {
  components: {
    Device,
    Action
  },
  computed: {
    devicesViewList () {
      return this.$store.getters.devicesViewList.sort((a, b) => {
        if (a.alias < b.alias) return -1
        if (a.alias > b.alias) return 1
        return 0
      })
    },
    deviceModalActions () {
      return this.$store.getters.deviceModalActions
    }
  },
  methods: {
    onDeviceMenuHandler (deviceId, deviceMetadata) {
      const payload = {
        deviceId,
        deviceMetadata
      }
      this.$store.dispatch('openDeviceMenu', payload)
      this.$refs.deviceMenu.open()
    },
    closeDeviceMenuHandler () {
      this.$store.dispatch('closeDeviceMenu')
    },
    fuzzyFind () {
      const fuzzyFinder = new Fuse(this.devicesViewList, this.fuzzyFindoptions)
      return fuzzyFinder.search(this.searchTerms)
    },
    selected (item) {
      return item
    }
  },
  data () {
    return {
      searchTerms: '',
      checked: false,
      fuzzyFindoptions: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "alias"
        ]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.options-menu 
  margin-left 0.2em
  cursor pointer

.close-btn
  margin-left 8px

</style>
