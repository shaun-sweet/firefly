<template>
  <div @click="activateRoutine()" class="routine col-xs-12 col-sm-12 col-md-3 col-lg-2">
    <q-card>
      <q-card-title>
        {{name | capitalize}}
      </q-card-title>
      <q-card-main>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['name', 'routineId', 'icon', 'command'],
  data () {
    return {}
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    activateRoutine () {
      this.$emit('activateRoutine', {
        msg: `${this.name} routine has activated`,
        routineId: this.routineId,
        command: this.command
      })
    }
  }
}
</script>

<style  lang="stylus" scoped>
.routine
  cursor pointer
</style>
