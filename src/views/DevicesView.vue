<template>
  <div class="layout-padding">
    <q-modal 
      class="device-modal"
      :content-css="{minWidth: '60vw'}" 
      @close="closeDeviceMenuHandler()" 
      ref="deviceMenu"
    >
    <q-tabs no-pane-border v-model="selectedTab">
      <q-tab slot="title" name="actions" label="Actions" default></q-tab>
      <q-tab slot="title" name="settings" label="Settings" ></q-tab>
      <q-icon @click="$refs.deviceMenu.close()" class="x-close-button" name="ion-close" />
      <div class="main-content">

        <q-tab-pane name="actions">
          <q-list class="actions" no-border>
            <div class="actions-container">
              <action
                v-for="(action, index) in deviceModalActions"
                :key="index"
                :actionMetadata="action"
              />
              <q-btn class="close-btn" color="primary" @click="$refs.deviceMenu.close()">Close</q-btn>
            </div>
            </q-list>
        </q-tab-pane>

        <q-tab-pane name="settings">
          <q-list class="settings" no-border>
            <q-list-header>
              <h5>Settings</h5>
              <form>
                <q-field>
                  <q-input type="text" stack-label="Device Alias" v-model="deviceSettings.alias" />
                </q-field>
                <q-field>
                  <q-btn color="primary" icon="ion-ios-checkmark-outline" @click.prevent="onSaveHandler()">Save</q-btn>
                  <q-btn outline icon="ion-ios-arrow-thin-left" @click.prevent="$refs.deviceMenu.close()">Cancel</q-btn>
                </q-field>
              </form>
            </q-list-header>
          </q-list>
        </q-tab-pane>
      </div>
    </q-tabs>
    
      
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
        :key="device.ffUid"
        :title="device.alias"
        :device-id="device.ffUid"
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
import { issueCommand } from 'src/firebase'

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
    },
    onSaveHandler () {
      const getters = this.$store.getters
      const command = {
        set_alias: {
          alias: this.deviceSettings.alias
        }
      }
      const payload = {
        homeId: getters.selectedHome,
        deviceId: getters.modalDeviceId,
        command
      }
      issueCommand(payload)
      this.$refs.deviceMenu.close()
    }
  },
  data () {
    return {
      selectedTab: '',
      searchTerms: '',
      checked: false,
      fuzzyFindoptions: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['alias']
      },
      deviceSettings: {
        alias: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.options-menu
  margin-left 0.2em
  cursor pointer

.x-close-button
  position absolute
  top 8px
  right 8px
  color white
  cursor pointer


.close-btn
  margin-left 8px
</style>
