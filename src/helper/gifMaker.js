export default class GIFMaker {
  constructor (options) {
    const { capturer, startTime, product, canvas } = options || {}
    if (!canvas) {
      throw new Error('Canvas element required')
    }
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.capturer = capturer
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.loadProductImages = this.loadProductImages.bind(this)
    this.startTime = startTime
    this.product = product
    this.loadProductImages()
  }

  loadProductImages () {
    const { canvas, product } = this
    this.images = product.images.map(src => {
      const image = new Image(canvas.width, canvas.height)
      image.src = `https:${src}`
      image.crossOrigin = 'Anonymous'
      return image
    })
  }

  draw () {
    const { context, canvas, startTime, product, images } = this
    const font = `${canvas.width / 10}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
    const titleFillStyle = `#FF0000`
    const priceFillStyle = `#FFFF00`
    const { title, price } = product

    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    const numberOfImages = images.length
    const currentTime = new Date().getTime()
    const diffInSeconds = (currentTime - startTime) / 1000
    const index = Math.floor(diffInSeconds % numberOfImages)
    const image = images[index]
    context.save()
    context.drawImage(image, 0, 0)
    context.font = font
    context.fillStyle = titleFillStyle
    context.textAlign = 'center'
    context.fillText(title, canvas.width / 2, canvas.height * 0.1, canvas.width * 0.94)
    context.fillStyle = priceFillStyle
    context.fillText(`$${price / 100}`, canvas.width / 2, canvas.height * 0.9, canvas.width * 0.94)
    context.restore()
  }

  update () {
    requestAnimationFrame(this.update)
    this.draw()
    if (this.capturer) {
      this.capturer.capture(this.canvas)
    }
  }
}
