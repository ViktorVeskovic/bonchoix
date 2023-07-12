// INIT ALL ACCORDIONS ON THE PAGE 
// @param { string } selector - accordion element selector
// @return { array } - returns the array of all accordions
const eventBus = require('js-event-bus')()

import _size from 'lodash/size'
import _each from 'lodash/each'
import Accordion from '../modules/r7/r7-accordion'

const initAccordions = (selector = '.accordion') => {
  	let accordionElements = document.querySelectorAll(selector)

  	if(!_size(accordionElements)){
  		console.warn('[init-accordions.js] no accordion elements on the page')
  		return
  	}

  	let accordions = []
  	_each(accordionElements, el => {
	    accordions.push(new Accordion({
	      el, // accordion wraper element
	      itemSelector: '.accordion-item', // accordion item selectors
	      contentSelector: '.accordion-item-content', // toggleable content selector
	      onUpdate: () => {
	      	eventBus.emit('loco.update')
	      }
	    }))
  	})

  	return accordions
}

export default initAccordions