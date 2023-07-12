/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * ************************  Off Canvas Panel.js ***************************
 *  @param { HTMLElement } [el] - wrapper element (place backdrop inside)
 *  @param { HTMLElement } [panel] - main element that will slide in/out
 *  @param { HTMLElement } [toggle] - click on this el toggles the panel
 *  @param { string } [hideDirection = left] - to which side it should hide
 *  @param { boolean } [initiallyOpen] - to which side it should hide
 * *************************************************************************
 */
 
import { gsap } from 'gsap'

const DIRECTIONS = {
    top: {
        x: 0,
        y: '-100%'
    },

    bottom: {
        x: 0,
        y: '100%'
    },

    left: {
        x: '-100%',
        y: 0
    },

    right: {
        x: '100%',
        y: 0
    }
}

class Drawer {
    constructor({ el, drawer, toggle, hideDirection = "left", initiallyOpen }) {
        // init variables
        this.el = el || drawer
        this.drawer = drawer
        this.toggle = toggle
        this.open = !!initiallyOpen
        this.hiddenProps = DIRECTIONS[this.hideDirection] || DIRECTIONS.left

        // add click event
        this.toggle.addEventListener('click', (e) => this.onClick())

        // close it initially
        this.closeDrawer(true)
    }

    onClick() {
      this.open = !this.open
      this.open ? this.openDrawer() : this.closeDrawer()
    }

    openDrawer(e) {
        this.el.classList.add('open')

        gsap.set(this.el, { visibility: 'visible' })

        gsap.to(this.drawer, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'Power2.easeOut',
            overwrite: true
        })
    }

    closeDrawer(instant) {
        this.el.classList.remove('open')
        let duration = instant ? 0 : .4

        gsap.to(this.drawer, {
            ...this.hiddenProps,
            duration,
            overwrite: true,
            ease: 'Power2.easeOut',
            onComplete: () => {
                gsap.set(this.el, { visibility: 'hidden' })
            }
        })
    }
}

export default Drawer