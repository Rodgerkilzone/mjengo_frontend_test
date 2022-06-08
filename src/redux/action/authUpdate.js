import { UPDATE_AUTH } from './actionTypes';
export const authUpdate = (status) => ({
    type: UPDATE_AUTH,
        status: status
})