import { gsap } from 'gsap'
import _each from 'lodash/each'
import _size from 'lodash/size'
const eventBus = require('js-event-bus')()

class Tabs {
    constructor({sections, tabs, barButtons, scroll}) {

        if(!_size(sections) || !_size(tabs)){
            return
        }

        this.sections = sections
        this.tabs = tabs
        this.barButtons = barButtons
        this.scroll = scroll


        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section')
        this.activeIndex = section ? parseInt(section) : 0
        this.activeSection = this.sections[this.activeIndex]

        // SHOW THE FIRST ONE
        gsap.set(this.activeSection, {
            display: 'block'
        })

        this.setActiveLinks()

        _each(this.tabs, (tab, i) => {
            tab.addEventListener('click', (e) => {
                this.onClick(e)
            })
        })
    }

    onClick(e) {
        if(this.activeIndex == e.currentTarget.dataset.index){
            return
        }

        // FADE OUT THE OLD SECTION
        this.activeSection.classList.add('transitioning')
        gsap.to(this.activeSection, 1, {
            opacity: 0,
            onComplete: () => {
                gsap.set(this.activeSection, { display: 'none' })
            }
        })


        // FADE IN THE NEW SECTION
        this.activeIndex = e.currentTarget.dataset.index
        let newActiveSection = this.sections[this.activeIndex]
        newActiveSection.classList.remove('transitioning')
        gsap.set(newActiveSection, { display: 'block' })

        setTimeout(() => {
            eventBus.emit('swiper.update', newActiveSection)
        })

        gsap.fromTo(newActiveSection, 1, {
            opacity: 0
        }, {
            opacity: 1,
            delay: .05,
            onComplete: () => {
                this.scroll.updateScroll()
                this.activeSection = newActiveSection
            }
        })

        
        this.setActiveLinks()

        // UPDATE SCROLL
        setTimeout(() => {
            this.scroll.updateScroll('.shopify-tabs')
        })

        console.log("[tabs.js] active section changed:", this.activeSection, newActiveSection)
    }

    setActiveLinks() {
        // TABS
        if(_size(this.tabs)){            
            this.tabs.forEach(t => t.classList.remove('active')) // MAIN LINS
            this.tabs[this.activeIndex].classList.add('active')
        }

        // BAR BUTTONS
        if(_size(this.barButtons)){
            this.barButtons.forEach(b => b.classList.remove('tabs-bar__button--active')) // BAR LINKS
            this.barButtons[this.activeIndex].classList.add('tabs-bar__button--active')
        }
    }
}

export default Tabs