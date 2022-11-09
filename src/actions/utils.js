import {
    TOGGLE_DARKMODE
} from './types'
import setDarkMode from '../utils/setDarkMode'

export const toggleDarkMode = darkmode => async dispatch => {
    if(localStorage.devconnector_darkmode) {
        // set the token with the header
        setDarkMode(localStorage.devconnector_darkmode)
    }
    dispatch({
        type: TOGGLE_DARKMODE,
        payload: darkmode
    })
}
