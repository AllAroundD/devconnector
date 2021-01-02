import {
    TOGGLE_DARKMODE
} from '../actions/types'

const initialState = {
    darkmode: localStorage.getItem('devconnector_darkmode')
}

function darkReducer(state = initialState, action) {
    const { type, payload } = action
    switch(type) {
        case TOGGLE_DARKMODE:
            return {
                ...state,
                loading: false,
                darkmode: payload
            }
        default: 
            return state
    }
}

export default darkReducer;