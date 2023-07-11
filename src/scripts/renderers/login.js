import DefaultRenderer from './default'
import { initLogin } from '../modules/login'

class LoginRenderer extends DefaultRenderer {
    onEnterCompleted() {
        super.onEnterCompleted()
        initLogin();
    }
    onLeaveCompleted() {
        super.onLeaveCompleted()
    }
}

export default LoginRenderer;