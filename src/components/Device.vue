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
// const stateMap = {
//   'on': true,
//   'off': false
// }
export default {
  props: [
    'title',
    'ffId'
  ],
  beforeUpdate (e) {
    console.log('update hitting')
  },
  computed: {
    primaryStateStatus () {
      return this.$store.state.homes[this.$store.state.selectedHome].devicesViewList[this.ffId].primaryStateStatus === 'on'
    }
  },
  data () {
    return {
      switchState: this.$store.state.homes[this.$store.state.selectedHome].devicesViewList[this.ffId].primaryStateStatus === 'on'
    }
  },
  methods: {

    test () {
      console.log('this is a test')
      this.switchState = this.primaryStateStatus
    },
    determineState (status) {
      return (status === 'on')
    }
  }
}
</script>

<style  lang="stylus" scoped>
</style>
