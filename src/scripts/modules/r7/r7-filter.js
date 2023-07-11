/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * ***********************************************  HTML/JS FILTER ***********************************************
 * 
 * 1. REGULAR FILTER LINKS
 * On the the links for regular filters we need to have data-filter and data-value 
 * @data-filter - this is the key we are filtering
 * @data-value - this is the value of the filter option
 * 
 * 2. RESET FILTERS LINKS
 * On the the reset links we need to have data-reset which can be either 'filters' or 'sort'
 * 
 * 3. SORT FILTERS LINKS
 * Add data-sort=key to the sorting links, key can be any attribute that exists on the filtering element
 * 
 * NOTE:
 * To all filtering elements add data-[key] for all properties you want to filter or sort
 * 
 * ****************************************************************************************************************
 */

import _each from 'lodash/each'
import _mapValues from 'lodash/mapValues'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _size from 'lodash/size'
import _includes from 'lodash/includes'
import _isFunction from 'lodash/isFunction'
import { gsap } from 'gsap'

class Filter {

	// @param {array} elements - Array of HTML objects to filter
	// @param {array} options - Array of filter options/links
	// @param {array} sortKeys - array of all possible sort keys ie [rating, score] and their values need to be NUMBERS
	// @param {array} filterKeys - array of all possible filter keys
	constructor({options, elements, sortKeys, filterKeys, onUpdate}) {
		let self = this

		if(!_size(options)){
			return
		}

		this.filterOptions = options
		this.elements = elements

		this.sortKeys = sortKeys
		this.filterKeys = filterKeys
		this.onUpdate = onUpdate

		// add click events
		_each(this.filterOptions, opt => {
			opt.addEventListener('click', (event) => this.onClick(event))
		})

		// enable back / forward in browser
		// window.addEventListener('popstate', (event) => this.filter())

		// make initial filtering / sorting
		this.filter(true)
		this.sort(true)
		this.setActiveLinks()

		console.log('[filter.js] Filters initialized', {
			options,
			elements,
			sortKeys,
			filterKeys
		})
	}

	onClick(event) {
		event.preventDefault()
		let dataset = _get(event, 'currentTarget.dataset')

		if(!dataset){
			return
		}

		// RESET - filters or sort
		let reset = dataset.reset
		if(reset){
			this.reset(reset)
		}

		// SORT / FILTER
		let sort = dataset.sort
		if(sort){
			this.toggleQueryParam('sort', sort)
			this.sort()
		} else {
			this.toggleQueryParam(dataset.filter, dataset.value)
			this.filter()
		}

		// SET ACTIVE LINKS
		this.setActiveLinks()
	}


	// Get query params from the URL
	getQuery() {
		const urlSearchParams = new URLSearchParams(window.location.search)
		return Object.fromEntries(urlSearchParams.entries())
	}

	// Sort elements based on the query params
	// @param {boolean} instant - if the animation should be instant
	sort(instant) {
		const params = this.getQuery()

		this.fade(() => {
			_each(this.elements, (el, key) => {
				let order = params.sort ? el.dataset[params.sort] * -100 : 1

				gsap.set(el, {
					order 
				})
			})
		}, instant)
	}

	// Filter elements based on the query params
	// @param {boolean} instant - if the animation should be instant
	filter(instant) {
		const params = this.getQuery()

		// FILTER ELEMENTS
		const visibleElements = _filter(this.elements, (element) => {
			let show = true

			let props = _mapValues(element.dataset, set => set.split(","))

			_each(params, (param, key) => {
				let filterValue = props[key]

				if(filterValue && !_includes(filterValue, param) && !_includes(this.sortKeys, key)){
					show = false
				}
			})

			return show
		})


		// ANIMATE THE ELEMENTS
		this.fade(() => {
			gsap.set(this.elements, {
				display: 'none'
			})

			gsap.set(visibleElements, {
				display: 'block'
			})
		}, instant)
	}

	// Fade in and out with a callback
	// @param {function} callback - executed when faded out
	// @param {boolean} instant - if the animation is instant
	fade(callback, instant) {
		// ANIMATE THE ELEMENTS
		gsap.to(this.elements, {
			duration: instant ? 0 : .2,
			opacity: 0,
			onComplete: () => {
				_isFunction(callback) && callback()

				gsap.to(this.elements, {
					duration: instant ? 0 : .4,
					opacity: 1
				})

				_isFunction(this.onUpdate) && this.onUpdate()
			}
		})
	}

	// Change query params
	// @param {string} key - query key
	// @param {string} value - query value
	toggleQueryParam = (key, value) => {
	  const url = new URL(window.location.href)
	  const params = this.getQuery()

	  if(params[key] == value){
	  	url.searchParams.delete(key)
	  } else{
	  	url.searchParams.set(key, value)
	  }

	  window.history.pushState({}, '', url.toString())
	}

	// Reset either the filter or the sort
	// @param {string} type - can reset filters / sort
	reset(type) {
		const url = new URL(window.location.href)
	  	const params = this.getQuery()

	  	_each(params, (param, key) => {	

		  	if(type == 'sort'){
		  		url.searchParams.delete('sort')

		  	} else if(type == "filters" && key != "sort") {
		  		url.searchParams.delete(key)
		  	}
	  	})

	  	window.history.pushState({}, '', url.toString())
	}

	// Set active class on links
	setActiveLinks() {
		if(!this.filterOptions){
			return
		}

		const params = this.getQuery()

		let activeLinks = _filter(this.filterOptions, (el) => {
			let dataset = el.dataset

			// SORT LINKS
			if(dataset.sort){
				return params.sort == dataset.sort
			}

			// RESET LINKS
			if(dataset.reset){
				let filtersSelected = _filter(this.filterKeys, f => params[f]).length
				return dataset.reset == 'sort' ? !params.sort : !filtersSelected
			}

			// REGULAR OPTION LINKS
			return (dataset.value == params[dataset.filter])
		})


		// SET ACTIVE CLASSES
		_each(this.filterOptions, el => el.classList.remove('active'))
		_each(activeLinks, el => el.classList.add('active'))
	}

}

export default Filter