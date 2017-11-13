<template>
  <div class="layout-padding routines-view">
    <div class="row">
      <routine 
        v-if="routine.export_ui"
        :key="routine.ff_id"
        v-for="routine in routines"
        :name="routine.alias"
        :routineId="routine.ff_id"
        :command="routine.command"
        :icon="routine.icon"
        v-on:activateRoutine="activateRoutine"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import Routine from '@/Routine'
import { mapGetters } from 'vuex'
import { executeRoutine } from 'src/firebase'

export default {
  components: {
    Routine
  },
  beforeMount() {
    this.$store.dispatch('getRoutines')
  },
  computed: {
    ...mapGetters([
      'routines',
      'selectedHome'
    ])
  },
  methods: {
    activateRoutine ({ msg, routineId, command }) {
      const homeId = this.selectedHome
      executeRoutine({ routineId, homeId, command }, (err) => {
        if (err) {
          console.error(err)
        } else {
          Toast.create.positive({
            html: msg || 'Routine Activated',
            icon: 'ion-ios-checkmark'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
