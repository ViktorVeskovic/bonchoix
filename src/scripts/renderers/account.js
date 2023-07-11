import { initAccount } from '../modules/account'
import DefaultRenderer from './default'

class AccountRenderer extends DefaultRenderer {
    onEnter() {}
    onLeave() {}
    onEnterCompleted() {
        initAccount()
    }
    onLeaveCompleted() {}
}

export default AccountRenderer