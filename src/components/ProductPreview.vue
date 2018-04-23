<template lang="html">
  <div class="ProductPreview">
    <b-row v-if="product">
      <b-col>
        <h4>Product Info</h4>
        <p>
          <b>{{product.title}} :</b> {{product.description.slice(0, 100)}}...
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="product">
        <h4>Select Images</h4>
        <p>Selected images will be included in the GIF. Each image will be shown for 1 second.</p>
        <ImagesSelector :images="product.images" @change="gifImages = $event" />
        <b-button type="submit" variant="primary" @click="downloadGIF">
          Download
        </b-button>
      </b-col>
      <b-col>
        <h4>Preview</h4>
        <canvas ref="gifPreview" height="800" width="800" style="height:400px;width:400px;"></canvas>
      </b-col>
    </b-row>
</div>
</template>

<script>
/* global CCapture:true */
import '@/lib/CCapture.all.min.js'
import GIFMaker from '@/helper/gifMaker'
import ImagesSelector from '@/components/ImagesSelector'

const capturerDefaultOptions = {
  verbose: false,
  display: false,
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
  components: { ImagesSelector },
  data: () => ({
    maker: null,
    gifImages: []
  }),
  watch: {
    product () {
      this.previewGIF()
    },
    gifImages () {
      this.previewGIF()
    }
  },
  methods: {
    previewGIF () {
      const { product: originalProduct } = this
      if (!originalProduct) {
        return
      }

      const images = this.gifImages.length ? this.gifImages : originalProduct.images
      const startTime = new Date().getTime()
      const canvas = this.$refs.gifPreview
      const product = Object.assign({}, originalProduct, { images })
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
  }
}
</script>

<style lang="css">
</style>
