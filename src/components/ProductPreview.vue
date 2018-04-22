<template lang="html">
  <b-row>
    <b-col>
      <canvas ref="gifPreview" height="800" width="800" style="height:400px;width:400px;"></canvas>
    </b-col>
    <b-col v-if="product">
      <h2>{{product.title}}</h2>
      <p v-html="product.description"></p>
      <b-button type="submit" variant="primary" @click="downloadGIF">
        Download
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import GIFMaker from '@/helper/gifMaker'
/* global CCapture:true */
import '@/lib/CCapture.all.min.js'

const capturerDefaultOptions = {
  verbose: false,
  display: true,
  // framerate: 60,
  // motionBlurFrames: ( 960 / 60 ),
  framerate: 1,
  motionBlurFrames: 0,
  quality: 99,
  format: 'gif',
  timeLimit: 3,
  frameLimit: 0,
  autoSaveTime: 0,
  workersPath: 'static/js/'
}

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
    },
    downloadGIF () {
      const timeLimit = this.product.images.length
      const options = Object.assign({}, capturerDefaultOptions, { timeLimit })
      const capturer = CCapture(options)
      const startTime = performance.now()
      capturer.start()
      this.maker.startTime = startTime
      this.maker.capturer = capturer
    }
  },
  mounted () {
    this.previewGIF()
  },
  created () {
  }
}
</script>

<style lang="css">
</style>
