/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * ***************************  accordion.js *******************************
 *  @param { HTMLElement } [el] - wrapper of the items
 *  @param { string, number } [activeId = false] - data-id value of the initially active element
 *  @param { string } [itemSelector=.accordion-item] - css selector for the items
 *  @param { string } [contentSelector=.accordion-item-content] - css selector for the togglable elements
 *  @param {function } [callback] - callback for the toggle animation
 *  @param { function } [onUpdate] - onUpdate animation callback
 * **************************************************************************
 */
import { gsap } from 'gsap'
import _each from 'lodash/each'
import _find from 'lodash/find'
import _isFunction from 'lodash/isFunction'

class Accordion {
    constructor ({el, activeId, itemSelector, contentSelector, callback, onUpdate}) {
        if(!el){
            console.warn('[accordion.js] no accordion element')
            return
        }

        // init
        this.activeId = activeId
        this.el = el
        this.items = el.querySelectorAll(itemSelector || '.accordion-item')
        this.contentSelector = contentSelector || '.accordion-item-content'
        this.callback = callback
        this.onUpdate = onUpdate

        // set initially active element
        if(this.activeId){
            this.activeElement = _find(this.items, item => item.dataset.id == this.activeId)
        }

        // bind methods to this
        this.setSizes = this.setSizes.bind(this)

        // add click events
        _each(this.items, item => {
            item.addEventListener('click', (e) => {
                this.toggleAccordion(e)
            })
        })
       
        // set height sizes and make it closed initially
        this.setSizes()

        // add resize event to set the height values
        window.addEventListener('resize', this.setSizes)
    }

    destroy() {
        window.removeEventListener('resize', this.setSizes)
    }

    setSizes() {
        _each(this.items, (item) => {
            let content = item.querySelector(this.contentSelector) 
            let id = item.dataset.id

            // reset the height so we could take the real size in the next frame
            gsap.set(content, {
                height: 'auto'
            })

            item.setAttribute('data-height', content.offsetHeight)
            
            let active = id == this.activeId

            let opts = {
                height: active ? content.offsetHeight : 0,
                opacity: active ? 1 : 0,
                y: active ? 0 : 20
            }

            gsap.set(content, opts)
        })
    }

    // toggle the active element
    toggleActiveElement(visible) {
        if(!this.activeElement){
            return
        }

        // toggle the open class - currently not doing anything
        this.activeElement.classList[visible ? 'add' : 'remove']('open')

        let content = this.activeElement.querySelector(this.contentSelector)

        let opts = {
            opacity: visible ? 1 : 0,
            height: visible ? this.activeElement.dataset.height : 0, 
            duration: .6,
            ease: 'Power2.easeOut',
            y: visible ? 0 : 20,
            onUpdate: () => {
                _isFunction(this.onUpdate) && this.onUpdate()
            },
            onComplete: () => {
                _isFunction(this.callback) && this.callback()
            }
        }

        gsap.to(content, opts)
    }


    toggleAccordion(e) {
        let el = e.currentTarget
        let id = el.dataset.id

        // close the active element
        this.toggleActiveElement(false)

        // click on the active / just close the element
        if(this.activeId == id){
            this.activeId = false
            return
        }

        // change the active element and open it
        this.activeId = id
        this.activeElement = _find(this.items, item => item.dataset.id == id)        
        this.toggleActiveElement(true)
    }
}

export default Accordion