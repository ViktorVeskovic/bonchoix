import DefaultRenderer from './default'
import Slider from '../modules/slider'
import LocoSroll from '../modules/r7/r7-locoScroll'
import initAccordions from '../modules/init-accordions'
import AddAll from '../modules/r7/r7-addAll'
// import ProductColors from '../modules/productColors';

class ProductRenderer extends DefaultRenderer {
    onEnter() {
    }
    onLeave() {
        super.onLeave()
    }

    // onEnterDeferred() {
    //     const fromHighway = (APP.Highway.running);

    //     // Product colors
    //     setTimeout( () => {
    //       if(fromHighway) {
    //         ProductColors.init();
    //       } else {
    //         ProductColors.startPoll();
    //       }
    //       ProductColors.controlSwatchesFadeIn();
    //     }, 1200)
    // }

    // INIT THE PRODUCT IMAGES SLIDER
    initProductSlider() {
      let productSwiperEl = document.querySelector(".image-swiper")
      this.imageSlider = new Slider({
        el: productSwiperEl,
        options: {
          slidesPerView: 1,
          effect: 'fade',
          navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          }
        }
      })
    }

    // RELATED PRODUCTS SLIDER
    initRelatedSlider() {
      let relatedSwiperEl = document.querySelector(".related-swiper")
      this.relatedSlider = new Slider({
        el: relatedSwiperEl,
        options: {
          effect: 'drag',
          slidesPerView: 1.2,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          breakpoints: {
            768: {
              slidesPerView: 2
            },
            1200: {
              slidesPerView: 3
            }
          }
        }
      })
    }

    onEnterCompleted() {
      // super.onEnterCompleted()

      this.LocoSroll = new LocoSroll({
          el: document.querySelector("#wrapper")
      })

      // INIT ACCORDIONS IF THERE ARE ANY
      initAccordions()

      // ADD ALL EVENT
      this.addAll = new AddAll({
          button:'.add-to-cart',
          variants: '.variant-box'
      })

      // INIT SLIDERS
      this.initProductSlider()
      this.initRelatedSlider()
    }

    onLeaveCompleted() {
        super.onLeaveCompleted()
    }
}

export default ProductRenderer;