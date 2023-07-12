import DefaultRenderer from './default'
import initAccordions from '../modules/init-accordions'
import _each from 'lodash/each'


// THIS IS RELATED TO FILTERS AND DOESNT BELONG HERE
import Dropdown from '../modules/r7/r7-dropdown'
import Filter from '../modules/r7/r7-filter'

class DefPageRenderer extends DefaultRenderer {
    onEnterCompleted() {
      super.onEnterCompleted()

      // INIT ACCORDIONS IF THERE ARE ANY
      initAccordions()
      

      // INIT ALL DROPDOWNS
      let dropdowns = document.querySelectorAll('.dropdown')
      _each(dropdowns, el => new Dropdown({ el }))

      // INIT ALL FILTERS
      let filters = document.querySelectorAll('.filter-group')
      _each(filters, el => {
         new Filter({
            options: el.querySelectorAll('.filter-option'), // filter options/links
            elements: document.querySelectorAll('.product-card'), // elements to filter
            sortKeys: [], // possible sort values 
            filterKeys: ['color', 'size'], // possible filter keys,
            onUpdate: () => {
                this.LocoSroll.updateScroll()
            }
        })
      })

    }
    onLeaveCompleted() {
      super.onLeaveCompleted()

      // destroy the accordions
      _each(this.accordions, a => a.destroy())
    }
}

export default DefPageRenderer;