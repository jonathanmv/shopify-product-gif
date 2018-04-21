<template lang="html">
  <b-row>
    <b-col>
      <canvas ref="gifPreview" height="800" width="800" style="height:400px;width:400px;"></canvas>
    </b-col>
    <b-col v-if="product">
      <h2>{{product.title}}</h2>
      <p v-html="product.description"></p>
      <b-button type="submit" variant="primary" @click="$emit('downloadGIF')">
        Download
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import GIFMaker from '../helper/gifMaker'

export default {
  name: 'ProductPreview',
  props: ['product'],
  data: () => ({
    maker: null
  }),
  watch: {
    product () {
      this.previewGIF()
    }
  },
  methods: {
    previewGIF () {
      const { product } = this
      if (!product) {
        return
      }

      const startTime = new Date().getTime()
      const canvas = this.$refs.gifPreview
      const maker = new GIFMaker({ startTime, product, canvas })
      maker.update()
      this.maker = maker
    }
  },
  mounted () {
    this.previewGIF()
  }
}
</script>

<style lang="css">
</style>
