/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
/*! **************************  locoScroll.js *************************** */

import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import imagesLoaded from 'imagesloaded'
import _isFunction from 'lodash/isFunction'
const eventBus = require('js-event-bus')()

export default class LocoSroll {
    constructor (options){
        let self = this
        this.$el = options.el
        this.onUpdate = options.onUpdate

        this.initScroll()
        this.initScrollEvents()

        eventBus.on('loco.update', this.updateScroll)

        this.updateScroll = this.updateScroll.bind(this)
    }

    initScrollEvents() {
        this.scroll.on('scroll', args => {
            if (_isFunction(this.onUpdate)) {
                this.onUpdate(args)
            }
        })
    }

    initScroll() {
        this.scroll = new LocomotiveScroll({
            el: this.$el,
            smooth: true,
            inertia: 1
        })

        // update scroll when the images are loaded
        imagesLoaded( this.$el, this.updateScroll )

        // update scroll when the fonts are loaded
        document.fonts.onloadingdone = () => {
          this.updateScroll()
        }

        // update the scroll for anycase
        setTimeout(() => {
            this.updateScroll()
        }, 1000)
    }

    destroyScroll() {
        this.scroll.destroy()
    }

    updateScroll(el) {
        if(!this.scroll){
            return
        }
    
        this.scroll.update()

        if(typeof el === 'object' && el.nodeType !== undefined) {
            this.scroll.scrollTo(el, {
                duration:1000,
                offset:-100
            })
        }        
    }
}