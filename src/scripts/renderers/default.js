import Highway from '@dogstudio/highway'
import LocoSroll from '../modules/r7/r7-locoScroll'

class DefaultRenderer extends Highway.Renderer {
    onEnter() {}
    onLeave() {}
    onEnterCompleted() {
        this.LocoSroll = new LocoSroll({
            el: document.querySelector("#wrapper")
        })
    }
    onLeaveCompleted() {
        this.LocoSroll && this.LocoSroll.destroyScroll() 
    }
}

export default DefaultRenderer