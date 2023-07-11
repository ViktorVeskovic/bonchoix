/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * ************************  r7-multi-slider.js ****************************
 *  @param { string } selector - main wrapper of the swipers
 *  to enable the nav add data-prev and data-next attributes to the buttons
 * *************************************************************************
 */

import _each from 'lodash/each'
import _filter from 'lodash/filter'
import Slider from '../modules/slider'

class MultiSlider {
    constructor ({selector, navBtns, options}) {

        // INIT VARS
        let multiSlider = document.querySelector(selector)
        let swipers = multiSlider.querySelectorAll('.swiper')
        let navigation = multiSlider.querySelectorAll(navBtns)

        // INTI
        this.sliders = []
        _each(swipers, (el, i) => this.sliders[i] = new Slider({el, options}))

        // SYNC THE SLIDERS 🧙
        this.syncSliders()

        let self = this

        // INIT THE CLICKS
        _each(navigation, (el) => {
            el.addEventListener('click', (e) => {
                let f = el.dataset.next ? 'slideNext' : 'slidePrev'
                self.sliders[0][f]()
            })
        })

    }

    syncSliders() {
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
    }
  
}

export default MultiSlider