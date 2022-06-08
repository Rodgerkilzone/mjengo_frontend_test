import { UPDATE_TOKEN} from './actionTypes';
export const addToken=(token)=>({
    type:UPDATE_TOKEN,
    token:token
})