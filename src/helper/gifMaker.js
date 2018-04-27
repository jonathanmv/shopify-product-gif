const defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export default class GIFMaker {
  constructor (options) {
    const {
      capturer,
      startTime,
      product,
      canvas,
      titleTextProperties,
      priceTextProperties
    } = options || {}
    if (!canvas) {
      throw new Error('Canvas element required')
    }
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.capturer = capturer
    this.startTime = startTime
    this.product = product
    this.titleTextProperties = titleTextProperties
    this.priceTextProperties = priceTextProperties

    this.update = this.update.bind(this)

    this.loadProductImages()
  }

  loadProductImages () {
    const { product } = this
    this.images = product.images.map(src => {
      const image = new Image()
      image.src = src
      image.crossOrigin = 'Anonymous'
      return image
    })
  }

  draw () {
    const { context, canvas, images } = this

    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    if (!images.length) {
      return
    }
    // context.save()
    this.drawCurrentImage()
    this.drawTexts()
    context.restore()
  }

  drawCurrentImage () {
    const { context, canvas, startTime, images } = this
    const numberOfImages = images.length
    if (!numberOfImages) {
      return
    }
    const currentTime = new Date().getTime()
    const diffInSeconds = (currentTime - startTime) / 1000
    const index = Math.floor(diffInSeconds % numberOfImages)
    const image = images[index]
    const isWider = canvas.width < image.naturalWidth
    const canvasImageRatio = canvas.width / image.naturalWidth
    const imageWidth = isWider ? canvas.width : image.naturalWidth
    const imageHeight = isWider ? image.naturalHeight * canvasImageRatio : image.naturalHeight
    const x = isWider ? 0 : (canvas.width / 2) - (imageWidth / 2)
    const y = isWider ? 0 : (canvas.height / 2) - (imageHeight / 2)
    context.drawImage(image, x, y, imageWidth, imageHeight)
  }

  getYFromRelativeY (relativeY = 1) {
    const { height } = this.canvas
    const adjustedTitleY = (relativeY / 10) * height
    return Math.min(height * 0.95, adjustedTitleY)
  }

  getFontFromRelativeSize (relativeSize = 1) {
    const { width } = this.canvas
    const unitFontSize = width / 20
    const size = unitFontSize * relativeSize
    return `${size}px ${defaultFontFamily}`
  }

  getColor (color) {
    return typeof color === 'string' ? color : color.hex
  }

  drawTexts () {
    const {
      context,
      canvas,
      titleTextProperties = {},
      priceTextProperties = {},
      product
    } = this
    const { title, price } = product
    context.textAlign = 'center'

    // Draw Title
    context.font = this.getFontFromRelativeSize(titleTextProperties.relativeSize)
    context.fillStyle = this.getColor(titleTextProperties.color)
    let y = this.getYFromRelativeY(titleTextProperties.relativeY)
    context.fillText(title, canvas.width / 2, y)

    // Draw Price
    context.font = this.getFontFromRelativeSize(priceTextProperties.relativeSize)
    context.fillStyle = this.getColor(priceTextProperties.color)
    y = this.getYFromRelativeY(priceTextProperties.relativeY)
    context.fillText(`$${price / 100}`, canvas.width / 2, y)
  }

  update () {
    requestAnimationFrame(this.update)
    this.draw()
    if (this.capturer) {
      this.capturer.capture(this.canvas)
    }
  }
}
