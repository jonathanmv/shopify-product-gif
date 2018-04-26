<template lang="html">
  <div>
    <Slider v-model="properties.relativeY" :min="1" :max="10" />
  </div>
</template>

<script>
// https://github.com/NightCatSama/vue-slider-component
import Slider from 'vue-slider-component'

export default {
  // relativeY: 1, // Bigger number closer to the bottom
  // color: '#F00',
  // relativeSize: 3 // Bigger number larger size
  props: ['properties'],
  components: { Slider },
  watch: {
    relativeY () {
      this.emitChanges()
    }
  },
  methods: {
    emitChanges () {
      const event = `update:properties`
      this.$emit(event, this.properties)
    }
  }
}
</script>

<style lang="css">
</style>
