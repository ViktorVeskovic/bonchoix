/*!
██████╗░███████╗██████╗░███████╗██╗░░░░░██╗░░░░░██╗░█████╗░███╗░░██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝██║░░░░░██║░░░░░██║██╔══██╗████╗░██║╚════██║
██████╔╝█████╗░░██████╦╝█████╗░░██║░░░░░██║░░░░░██║██║░░██║██╔██╗██║░░░░██╔╝
██╔══██╗██╔══╝░░██╔══██╗██╔══╝░░██║░░░░░██║░░░░░██║██║░░██║██║╚████║░░░██╔╝░
██║░░██║███████╗██████╦╝███████╗███████╗███████╗██║╚█████╔╝██║░╚███║░░██╔╝░░
╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝░░╚═╝░░░
 * ***************************  dropdown.js ********************************
 *  @param { HTMLElement } [el] - dropdown parent element
 *  inside [el] .dropdown-toggle and .dropdown-content need to exist
 * *************************************************************************
 */
import { gsap } from 'gsap'

class Dropdown {
    constructor ({el}) {
        this.el = el
        this.toggleBtn = el.querySelector('.dropdown-toggle')
        this.dropdown = el.querySelector('.dropdown-content')

        this.toggleBtn.addEventListener('click', (e) => this.open())
        this.el.addEventListener('focusout', (e) => this.close())

        // close it initially
        this.close(true)
    }

    open(e){
        this.el.classList.add('open')

         gsap.set(this.dropdown, {
            display: 'block'
        })

        gsap.to(this.dropdown, {
            opacity: 1,
            duration: .4,
            overwrite: true
        })
    }

    close(instant) {
        this.el.classList.remove('open')

        gsap.to(this.dropdown, {
            opacity: 0,
            duration: instant ? 0 : .4,
            overwrite: true,
            onComplete: () => {
                gsap.set(this.dropdown, {
                    display: 'none'
                })
            }
        })
    }
}

export default Dropdown