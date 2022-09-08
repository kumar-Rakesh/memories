import { ADD_COMMENT, FETCH_COMMENTS } from "../constants/actionTypes"

export default (state = { comments: [], comment: [] }, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        default:
            return state
    }
}
