import DefaultRenderer from './default'
import Slider from '../modules/slider'

import _each from 'lodash/each'
import _filter from 'lodash/filter'

class HomepageRenderer extends DefaultRenderer {
    onEnter() {}
    onLeave() {
      super.onLeave()
    }
    onEnterCompleted() {
      super.onEnterCompleted()


      // MULTI SWIPER 🧙 
      let multiSlider = document.querySelector('.multi-slider-index')
      let swipers = multiSlider.querySelectorAll('.swiper')
      let navigation = multiSlider.querySelectorAll('.swiper-nav')

      this.sliders = []
      _each(swipers, (el, i) => this.sliders[i] = new Slider({el, options: { resistanceRatio: .4 }}))

       // SYNC THE SLIDERS
      _each(this.sliders, (slider, index) => {
        // first one to controll all other slides
        if(index == 0){
            let others = _filter(this.sliders, (s, i) => index != i)
            slider.controller.control = others
        // all others to control first slide
        } else {
            slider.controller.control = this.sliders[0]
        }
      })

      // INIT THE CLICKS
      _each(navigation, (el) => {
        el.addEventListener('click', (e) => {
          let f = el.dataset.next ? 'slideNext' : 'slidePrev'
          this.sliders[0][f]()
        })
      })


    }
    onLeaveCompleted() {
      super.onLeaveCompleted()
    }
}

export default HomepageRenderer;