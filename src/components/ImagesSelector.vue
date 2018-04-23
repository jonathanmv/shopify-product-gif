<template lang="html">
  <div class="ImagesSelector">
    <b-card-group deck>
        <b-card v-for="(image, index) in imageObjects"
                v-bind:border-variant="image.selected ? 'primary' : 'default'"
                :img-src="image.src"
                img-alt="Image"
                img-top
                :key="index" @click="imageClicked(image)">
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
    imageClicked (image) {
      image.selected = !image.selected
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
    }
  }
}
</script>

<style lang="css">
</style>
