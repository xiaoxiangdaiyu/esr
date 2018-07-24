const defaultstate = {
    conditionList: [
        {
            rules: []
        }
    ]
};


export function condition(state = defaultstate, action) {
    //debugger;
    //console.dir('reducer');
    switch (action.type) {
        case 'ACTIVITY_CONDITION':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}