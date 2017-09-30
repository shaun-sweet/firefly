<template>
  <div class="layout-padding routines-view">
    <div class="row">
      <routine 
        :key="routine"
        v-for="routine in routines"
        :name="routine.name"
        v-on:activateRoutine="activateRoutine"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import Routine from '@/Routine'

export default {
  components: {
    Routine
  },
  data () {
    return {
      routines: [
        {
          name: 'Piano',
          type: 'test'
        },
        {
          name: 'Cooking',
          type: 'test'
        },
        {
          name: 'Getting Home',
          type: 'test'
        }
      ]
    }
  },
  methods: {
    activateRoutine (msg) {
      Toast.create.positive({
        html: msg || 'Routine Activated',
        icon: 'ion-ios-checkmark'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
