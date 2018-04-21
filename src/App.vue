<template>
  <b-container fluid id="app">
    <ProductDataLoader v-on:change="productData = $event" />
    <div v-if="productData">
      {{productData.description}}
    </div>
  </b-container>
</template>

<script>
import ProductDataLoader from './components/ProductDataLoader'

export default {
  name: 'App',
  data: () => ({
    productData: null
  }),
  components: {
    ProductDataLoader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
