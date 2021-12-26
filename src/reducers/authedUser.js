import { SET_AUTHED_USER, CLEAR_AUTHED_USER } from '../actions/authedUser'

export default function verifyUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.userId
        case CLEAR_AUTHED_USER:
            return null;
        default:
            return state;
    }
}