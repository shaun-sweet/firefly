<template>
  <div class="layout-padding">
    <q-modal ref="deviceMenu">
      <div class="layout-padding">
        <h4>
          Device Menu
        </h4>
        <q-btn color="primary" @click="$refs.deviceMenu.close()">Close</q-btn>
      </div>
    </q-modal>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
        <q-card>
          <q-card-main>
            {Device Name}
            <q-icon class="options-menu" @click="$refs.deviceMenu.open()" name="ion-android-more-vertical" />
            <q-toggle class="pull-right" v-model="checked" />
          </q-card-main>
        </q-card>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.options-menu 
  margin-left 0.2em
  cursor pointer


</style>
