import { openToast } from '../Redux/Slices/OpenToastSlice'
import store from '../Redux/store';
export const ToastEmmitor = (type="error", message="Internal Server Error") => {
    store.dispatch(openToast({
        open: true,
        type:type,
        message:message
    }))
}