<template lang="html">
  <div class="ProductPreview">
    <b-row v-if="product">
      <b-col>
        <h4>Product Info</h4>
        <p>
          <b>{{product.title}} :</b> {{productDescription}}
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="product">
        <h4>Select Images</h4>
        <p>Selected images will be included in the GIF. Each image will be shown for 1 second.</p>
        <ImagesSelector :images="product.images" @change="gifImages = $event" />
      </b-col>
      <b-col>
        <b-alert :show="shouldSelectImages" variant="warning">
          Please select at least one image
        </b-alert>
        <div v-if="!shouldSelectImages">
          <div>
            <h4>Product Name Style</h4>
            <TextPropertiesEditor :properties.sync="titleTextProperties" />
          </div>
          <div>
            <h4>Product Price Style</h4>
            <TextPropertiesEditor :properties.sync="priceTextProperties" />
          </div>
        </div>
        <div v-if="!shouldSelectImages">
          <b-button class="float-right" type="submit" variant="primary" @click="downloadGIF">
            Download
          </b-button>
        </div>
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
import TextPropertiesEditor from '@/components/TextPropertiesEditor'
import sanitize from 'sanitize-html'

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
  components: { ImagesSelector, TextPropertiesEditor },
  data: () => ({
    maker: null,
    gifImages: [],
    titleTextProperties: {
      relativeY: 3, // Bigger number closer to the bottom
      color: '#FF0000',
      relativeSize: 2 // Bigger number larger size
    },
    priceTextProperties: {
      relativeY: 8, // Bigger number closer to the bottom
      color: '#0F0',
      relativeSize: 3 // Bigger number larger size
    }
  }),
  computed: {
    shouldSelectImages () {
      return this.product && !this.gifImages.length
    },
    productDescription () {
      const { description } = this.product || {}
      if (!description) {
        return ''
      }

      const cleanDescription = sanitize(description, { allowedTags: [] })
      const ellipsis = cleanDescription.length > 100 ? '...' : ''
      return cleanDescription.slice(0, 100) + ellipsis
    }
  },
  watch: {
    product ({ title }) {
      this.previewGIF()
    },
    gifImages () {
      this.previewGIF()
    }
  },
  methods: {
    previewGIF () {
      const {
        product: originalProduct,
        titleTextProperties,
        priceTextProperties
      } = this
      if (!originalProduct) {
        return
      }

      const images = this.gifImages
      const startTime = new Date().getTime()
      const canvas = this.$refs.gifPreview
      const product = { ...originalProduct, images }
      const maker = new GIFMaker({
        startTime,
        product,
        canvas,
        titleTextProperties,
        priceTextProperties
      })
      maker.update()
      this.maker = maker
    },
    downloadGIF () {
      const timeLimit = this.product.images.length
      const options = { ...capturerDefaultOptions, timeLimit }
      const capturer = CCapture(options)
      const startTime = performance.now()
      capturer.start()
      this.maker.startTime = startTime
      this.maker.capturer = capturer
    }
  },
  mounted () {
    if (this.product) {
      this.gifImages = this.product.images
    }
    this.previewGIF()
  }
}
</script>

<style lang="css">
</style>
