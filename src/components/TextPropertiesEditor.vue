<template lang="html">
  <div class="my-3">
    <b-row>
      <b-col>
        <b>Position</b>
        <NumericSlider v-model="properties.relativeY" :min="1" :max="10" :tooltip="false" />
      </b-col>
      <b-col>
        <b>Size</b>
        <NumericSlider v-model="properties.relativeSize" :min="1" :max="5" :tooltip="false" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b>Color</b>
        <div class="px-2">
          <div class="color-slider">
            <ColorSlider v-model="properties.color" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// https://github.com/NightCatSama/vue-slider-component
import Vue from 'vue'
import NumericSlider from 'vue-slider-component'
import Hue from 'vue-color/src/components/common/Hue.vue'
import colorMixin from 'vue-color/src/mixin/color'

const ColorSlider = Vue.component('ColorSlider', {
  mixins: [colorMixin],
  components: { Hue },
  template: `<Hue v-model="colors" @change="hueChange" />`,
  methods: {
    hueChange (data) {
      this.colorChange(data)
    }
  }
})

export default {
  // relativeY: 1, // Bigger number closer to the bottom
  // color: '#F00',
  // relativeSize: 3 // Bigger number larger size
  props: ['properties'],
  components: { NumericSlider, ColorSlider }
}
</script>

<style lang="css">
.color-slider {
  height: 10px;
  position: relative;
}
.color-slider .vc-hue-picker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-6px, -4px);
  background-color: white;
  box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
}
</style>
