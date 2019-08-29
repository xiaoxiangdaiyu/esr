import { ADD_LIST} from '../utils/const';
export function getList(){
    return {
        type: ADD_LIST,
        data:[1,2,3,4]
    }
}