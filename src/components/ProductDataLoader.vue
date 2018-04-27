<template>
  <b-row>
    <b-col>
      <h1>
        GIF for your Product
      </h1>
      <p>
        Enter your product url to create an animated gif from its images
      </p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group description="Example: https://colourpop.com/products/yes-please">
          <b-input-group>
            <b-form-input id="productUrl"
                          name="productUrl"
                          type="url"
                          v-model="productUrl"
                          required
                          placeholder=""></b-form-input>
            <b-input-group-append>
              <b-btn type="submit" variant="primary">Preview</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ProductDataLoader',
  data: () => ({
    productUrl: null
  }),
  methods: {
    async onSubmit () {
      const { productUrl } = this
      if (productUrl && productUrl.length) {
        const url = new URL(productUrl)
        const fetchUrl = `${url.origin}${url.pathname}.js`
        const data = await fetch(fetchUrl, { mode: 'cors' })
          .then(response => response.json())
          // .catch(error => null)
        if (data) {
          this.$emit('change', data)
          this.productUrl = null
        }
      }
    }
  }
}
</script>
