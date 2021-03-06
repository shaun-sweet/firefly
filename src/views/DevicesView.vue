<template>
  <div class="layout-padding">
    <q-modal
      class="device-modal"
      :content-css="{minWidth: '60vw'}"
      @close="closeDeviceMenuHandler()"
      ref="deviceMenu"
    >
      <q-tabs class="tab-container" no-pane-border v-model="selectedTab">
        <q-tab slot="title" name="controls" label="Controls" default></q-tab>
        <q-tab slot="title" name="settings" label="Settings" ></q-tab>
        <q-tab slot="title" name="about" label="About" ></q-tab>
        <q-icon @click="$refs.deviceMenu.close()" class="x-close-button desktop-only" name="ion-close" />
        <q-tab-pane name="controls">
          <q-list class="controls" no-border>
            <q-list-header>
              <h5>Controls</h5>
            </q-list-header>
            <div class="controls-container">
              <action
                v-for="(action, index) in deviceModalActions"
                :key="index"
                :actionMetadata="action"
              />
              <q-btn class="close-btn desktop-only" color="primary" @click="$refs.deviceMenu.close()">Close</q-btn>
            </div>
            </q-list>
        </q-tab-pane>

        <q-tab-pane name="settings">
          <q-list class="settings" no-border>
            <q-list-header>
              <h5>Settings</h5>
            </q-list-header>
          </q-list>
          <form>
            <q-field>
              <q-input type="text" stack-label="Device Alias" v-model="deviceSettings.alias" />
            </q-field>
            <q-field>
              <q-btn color="primary" icon="ion-ios-checkmark-outline" @click.prevent="onSaveHandler()">Save</q-btn>
              <q-btn outline icon="ion-ios-arrow-thin-left" @click.prevent="$refs.deviceMenu.close()">Cancel</q-btn>
              <q-btn class="delete-device-btn float-right gt-md" color="red" icon="ion-ios-trash" @click.prevent="onDeleteHandler()">Delete</q-btn>
            </q-field>
          </form>
        </q-tab-pane>

        <q-tab-pane name="about">
          <q-list class="about" no-border>
            <q-list-header>
              <h5>About</h5>
            </q-list-header>

            <p>Device Alias: {{ modalDeviceAlias }}</p>
            <p>Device UUID: {{ modalDeviceId }}</p>
            <p>Device Info:</p>
            <q-list
              no-border
              separator>
                <q-item v-for="(value, key) in deviceModalStatus" tag="p" :key="key" class="device-view__item">
                  <strong>{{key.toUpperCase()}}</strong>: {{value}}
                </q-item>
            </q-list>
          </q-list>
        </q-tab-pane>
      </q-tabs>

      <q-btn
        round
        color="primary"
        @click="$refs.deviceMenu.close()"
        class="fixed mobile-only"
        style="left: 18px; bottom: 18px"
        >
        <q-icon name="ion-arrow-left-c" />
      </q-btn>
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
import { Dialog, Toast } from 'quasar'
import { issueCommand } from 'src/firebase'
import { mapGetters } from 'vuex'

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
    },
    ...mapGetters([
      'selectedHome',
      'modalDeviceId',
      'modalDeviceAlias',
      'deviceModalStatus'
    ])
  },
  methods: {
    onDeviceMenuHandler (deviceId, deviceMetadata) {
      const payload = {
        deviceId,
        deviceMetadata
      }
      this.$store.dispatch('openDeviceMenu', payload).then(() => {
        this.$refs.deviceMenu.open()
        this.deviceSettings.alias = this.modalDeviceAlias
      })
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
      const command = {
        set_alias: {
          alias: this.deviceSettings.alias
        }
      }
      const payload = {
        homeId: this.selectedHome,
        deviceId: this.modalDeviceId,
        command
      }
      issueCommand(payload)
      this.$refs.deviceMenu.close()
      this.deviceSettings.alias = ''
    },
    onDeleteHandler () {
      const command = 'delete'
      const payload = {
        homeId: this.selectedHome,
        deviceId: this.modalDeviceId,
        command
      }
      const closeDeviceModal = this.$refs.deviceMenu.close
      Dialog.create({
        title: 'Confirm',
        message: `Are you sure you want to delete ${this.modalDeviceAlias}?`,
        buttons: [
          {
            color: 'blue',
            label: 'Take me out of here!'
          },
          {
            label: 'OK',
            color: 'negative',
            handler: () => {
              issueCommand(payload)
              closeDeviceModal()
              Toast.create.positive(`${this.modalDeviceAlias} has been deleted.`)
            }
          }
        ]
      })
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

.tab-container
  padding-bottom 3.3em

.device-view__item
  margin-bottom 0
</style>
