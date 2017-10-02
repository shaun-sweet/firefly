<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
    <q-card>
      <q-card-main>
        {{ title}}
        <q-icon class="options-menu" name="ion-android-more-vertical" />
        <q-toggle class="pull-right" v-model="primary.state" />
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ],
  data () {
    return {
      primary: {
        state: false,
        title: ''
      }
    }
  }
}
</script>

<style  lang="stylus" scoped>
</style>
