import _merge from "lodash/merge"
import Swiper from 'swiper'
const eventBus = require('js-event-bus')()

const defaultOptions = {
   slidesPerView: 'auto',
   grabCursor: true,
   effect: 'drag',

   // navigation: {
   //    nextEl: '.button-next',
   //    prevEl: '.button-prev',
   // }
}

export default class Slider {
   constructor ({el, options}){
      let self = this

      this.el = el
      this.options = _merge({}, defaultOptions, options)

      console.log("[slider.js] initialising swiper:", this.el, options)

      this.initSlider()

      setTimeout(() => {
         self.swiper.update()
      }, 1000)

      eventBus.on('swiper.update', function() {
         self.swiper.update()
      })

      return this.swiper
   }
   initSlider() {
      this.swiper = new Swiper(this.el, this.options)

      // console.log("swiper:", this.swiper, this.el.swiper)
   }
 }