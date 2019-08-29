import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
const  configureStore = (reducer,initState)=>{
    return createStore(combineReducers(reducer), initState, compose(applyMiddleware(thunk)))
}
export default configureStore