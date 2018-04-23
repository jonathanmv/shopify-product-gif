<template lang="html">
  <div class="ImagesSelector">
    <b-card-group deck>
        <b-card v-for="(image, index) in imageObjects"
                v-bind:border-variant="image.selected ? 'primary' : 'default'"
                :img-src="image.src"
                img-alt="Image"
                img-top
                class="mb-3"
                style="width: 150px; min-width: 150px; max-width: 150px;"
                :key="index" @click="imageClicked(image, $event)">
          <div slot="footer">
            <b-button variant="outline-primary" @click="moveTo(index, -1)" v-if="index" class="card-link float-left">&lt;</b-button>
            <b-button variant="outline-primary" @click="moveTo(index, 1)" v-if="(index + 1) < imageObjects.length" class="card-link float-right">&gt;</b-button>
          </div>
        </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'ProductImagesSelector',
  props: ['images'],
  data: () => ({
    imageObjects: []
  }),
  methods: {
    fillImageObjects () {
      this.imageObjects = this.images.map(src => ({ src, selected: true }))
    },
    imageClicked (image, event) {
      if (event.target.tagName.toLowerCase() === 'img') {
        image.selected = !image.selected
        this.$emit('change', this.imagesList)
      }
    },
    moveTo (index, direction) {
      const image = this.imageObjects[index]
      const swapIndex = index + direction
      const swapImage = this.imageObjects[swapIndex]
      this.imageObjects.splice(index, 1, swapImage)
      this.imageObjects.splice(swapIndex, 1, image)
      this.$emit('change', this.imagesList)
    }
  },
  computed: {
    imagesList () {
      return this.imageObjects
        .filter(({selected}) => selected)
        .map(({src}) => src)
    }
  },
  mounted () {
    this.fillImageObjects()
  },
  watch: {
    images () {
      this.fillImageObjects()
      this.$emit('change', this.imagesList)
    }
  }
}
</script>

<style lang="css">
</style>
