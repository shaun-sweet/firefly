<template>
  <div @click="activateRoutine()" class="routine col-xs-12 col-sm-12 col-md-3 col-lg-2">
    <q-card>
      <q-card-title>
        {{name}}
      </q-card-title>
      <q-card-main>
        {something else?}
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['name'],
  data () {
    return {}
  },
  methods: {
    activateRoutine () {
      this.$emit('activateRoutine', `${this.name} routine has activated`)
    }
  }
}
</script>

<style  lang="stylus" scoped>
.routine
  cursor pointer
</style>
