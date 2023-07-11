import DefaultRenderer from './default'
import Slick from '../modules/slider'

class FindRenderer extends DefaultRenderer {
    onEnter() {}
    onLeave() {
        super.onLeave()
    }
    onEnterCompleted() {
        super.onEnterCompleted()
    }
    onLeaveCompleted() {
        super.onLeaveCompleted()
    }
}

export default FindRenderer;