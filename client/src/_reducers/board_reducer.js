import {
    FIND_BOARD
} from '../_actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case FIND_BOARD:
            return { ...state, findBoardData: action.payload }
            break;
        default:
            return state;
    }
}