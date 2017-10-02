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


// for each device... metadata > primary (which points to the type of action that is the primary) 
//  actions > actionType (eg. alarm, battery, contact (like if a contact sensor has contact or not))
// so an on/off device will have a type === "switch"
// action title = label for title when pulling up the modal
// can_command = is changable by the user (vs state reporting ie. if proxy sensor is going off or not)
// can_request = can be used as a trigger (typically true)
// color_mapping = has colors as the keys that point to an array with the various states
// text_mapping = key = text to display, while the value is when to display them (based on states)
// request = where front end/automation will target keywise to collect the data on that action.  
// it grabs it from the deviceStatus

//  context = description