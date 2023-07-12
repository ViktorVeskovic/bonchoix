/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * *****************************  r7-menu.js *******************************
 *  @param { HTMLElement } [el] - only toggles the class on this one
 *  @param { HTMLElement } [menu] - main element that fade in/out
 *  @param { HTMLElement } [hamburger] - click on this el toggles the menu
 *  @param { string } [openClass = open] - to which side it should hide
 *  @param { boolean } [initiallyOpen] - to which side it should hide
 * *************************************************************************
 */
 
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { gsap } from 'gsap'

class Menu {
    constructor ({el, menu, hamburger, openClass = "open"}) {
        // INIT VARS
        this.open = false
        this.animationDuration = .5

        this.$el = el
        this.menu = menu
        this.hamburger = hamburger
        this.openClass = openClass

        // INIT EVENTS
        this.hamburger.addEventListener('click', (e) => {
            this.toggleHamburger(e)
        })

        // MAKE IT CLOSED INITIALLY
        this.closeMenu(true)
    }

    toggleHamburger() {
        this.open = !this.open
        this[this.open ? 'openMenu' : 'closeMenu']()
    }

    openMenu(instant) {
        this.$el.classList.add(this.openClass)
        disableBodyScroll(this.menu)

        let duration = instant ? 0 : this.animationDuration
        gsap.set(this.menu, { visibility: 'visible' })
        gsap.to(this.menu, {
            opacity: 1,
            duration,
            overwrite: true
        })
    }

    closeMenu(instant) {
        this.$el.classList.remove(this.openClass)
        enableBodyScroll(this.menu)

        let duration = instant ? 0 : this.animationDuration
        gsap.to(this.menu, {
            opacity: 0,
            overwrite: true,
            duration,
            onComplete: () => {
                gsap.set(this.menu, { visibility: 'hidden' })
            }
        })
    }
}

export default Menu