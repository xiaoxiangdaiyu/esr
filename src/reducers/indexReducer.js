const defaultstate = {
    list:[]
};


export default function demo(state = defaultstate, action) {
    switch (action.type) {
        case 'ADD_LIST':
            return state.list.concat(action.data || [])
        default:
            return state;
    }
}