import axios from 'axios';
import {
    FIND_BOARD
} from './types';

export function findBoard(dataTosubmit) {
    const request = axios.get('/api/boards/find', dataTosubmit)
    .then(response => response.data)

    return {
        type: FIND_BOARD,
        payload: request
    }
}