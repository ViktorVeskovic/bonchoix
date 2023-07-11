import Highway from '@dogstudio/highway'
import { gsap } from 'gsap'

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0)

    // Remove Old View
    from.remove()

    done()
  }

  out({ from, done }) {
    // Animation
    gsap.to(from, 0.25,{
        opacity: 0,
        onComplete: done
    })
  }
}
  
export default Fade